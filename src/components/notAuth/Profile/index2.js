import React, { Component,Fragment} from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,Alert,BackHandler,StatusBar} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/6.png'
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../assets/icon/avatar.png';

import profileIcon from '../../../assets/ProfileIcon/24.png'
import revenueIcon from '../../../assets/ProfileIcon/23.png'
import settingIcon from '../../../assets/ProfileIcon/30.png'
import supporIcon from '../../../assets/ProfileIcon/29.png'
import logoutIcon from '../../../assets/ProfileIcon/36.png'


import packageContent from '../../../../package.json'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {LogoutFunction,StudentProfile,online_offlineFunction,notification_count} from '../../../Api/afterAuth';

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
          value: 'first',
          Model_Visibility: false,
          Alert_Visibility: false,
          profileData:[],
          profile_url:"",
          isBodyLoaded:false,
          isSpinner:true,
          notificationCountValue:0
        }    
      }
          

      
      userLogoutFunction = async () => {
        const LogoutResponse = await LogoutFunction();
        
        if(LogoutResponse.result === true) {
            // console.log("getting logout response---------------",LogoutResponse.response)
           
            await AsyncStorage.setItem('userLoggedIn','false')
            let keys = ['token'];
            AsyncStorage.multiRemove(keys)           
            this.props.navigation.navigate("login")            
            Alert.alert("Message","Déconnexion réussie!")
        }
        else{
            // console.log("getting error on logout -------------",LogoutResponse.error)
        }        
        // console.log("getting country response----------------",countryData.country_list)
      };
    



      componentDidMount = async () => {
   
        setInterval(() => {
          this.fetchNotificationCount()
        }, 4000);  
        this.fetchStudentProfileData()
  
        BackHandler.addEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
      }
      
      fetchStudentProfileData = async () => {
        const GetProfileDetails = await StudentProfile();
        if (GetProfileDetails.result == true) {
          var profileData = GetProfileDetails.response.my_profile;
          var profile_url = GetProfileDetails.response.my_profile.profile_url
          // console.log("getting GetProfileDetails data----------",profileData,profile_url)
          this.setState({ isBodyLoaded: true,isSpinner: false,profileData,profile_url});
        }
       
        else{
          this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
            Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Okay",onPress:()=>{
                this.props.navigation.goBack();
            }}]);
        })
        }   
        // console.log("getting country response----------------",countryData.country_list)
      };
    

      fetchNotificationCount = async () => {
        const notification_countResponse = await notification_count();
        if (notification_countResponse.result == true) {
          var notificationCountValue = notification_countResponse.response.notification_count;          
          // console.log("getting notification_countResponse data----------",notificationCountValue)
          this.setState({ isBodyLoaded: true,isSpinner: false,notificationCountValue,});
        }
       
        else{
          this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
            Alert.alert("Message","Quelque chose a mal tourné, essayez encore !",[ { text: "Ok",onPress:()=>{
                this.props.navigation.goBack();
            }}]);
        })
        }   
        // console.log("getting country response----------------",countryData.country_list)
      };

    
    
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () =>
          this.handleBackButton(this.props.navigation),
        );
      }
    
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          BackHandler.removeEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
          return false;
        } else {
          nav.goBack();
          return true;
        }
      };
    
    
    
    
    
    
    
  FetchForTeacherOffline = async () => {
  
    const online_offlineResponse = await online_offlineFunction({
      online_offline:"0",
    });
    if (online_offlineResponse.result == true) {
      this.userLogoutFunction()
      // console.log("notification api call ot not chacking noe=============",online_offlineResponse.response)
    } else {
      Alert.alert('Error', online_offlineResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };

    
    





      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false}); 
        this.FetchForTeacherOffline()       
      }

      Hide_Custom_Alert1() {
        this.setState({Alert_Visibility: false});         
      }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {


    const { profileData,isBodyLoaded,isSpinner } = this.state;

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        {/* <ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}> */}
        {/* <View style={Styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("home")}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Mon compte</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View> */}




<ImageBackground source={require("../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}> 
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("home")}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>  Profil</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </ImageBackground>
        <Spinner visible={this.state.isSpinner} />


        <View style={{flex:2,width:"100%"}}>




          {

            this.state.isBodyLoaded == true ?

            <Fragment>


<View style={{marginTop:-105}}> 
          {
            this.state.profile_url == "" ?

                        <Image source={People}  style={Styles.peopleStyle} />
            :
            <Image source={{
              uri: `https://www.spyk.fr/${this.state.profile_url}`,
            }}  style={Styles.peopleStyle} />
          }
          </View>

          <Text style={{alignSelf:'center',fontWeight:'700',fontSize:16,color:"#000000"}}>{profileData.first_name} {profileData.last_name}</Text>          

          <ScrollView style={{margin:10}}> 
        


          <View>
        
      
        <TouchableOpacity 
          onPress={()=>{this.props.navigation.navigate("myprofile",{profileImg:this.state.profile_url})}}
        >
          <View style={{flexDirection:'row',margin:1}}>
              <Image source={profileIcon} style={{height:24,width:24,margin:10}}  />
              <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Mon profil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
             onPress={()=>{this.props.navigation.navigate("revenue")}}
        >
        <View style={{flexDirection:'row',margin:1}}>
            <Image source={revenueIcon} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Mes revenus</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=>{this.props.navigation.navigate('notificationdata')}}
        >
        <View style={{flexDirection:'row',margin:0}}>
            <Image source={require("../../../assets/ProfileIcon/notification.png")} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Notifications</Text>
            {
              this.state.notificationCountValue != 0 ?
              <Badge status="error" value={this.state.notificationCountValue} badgeStyle={{margin:-20,marginTop:4,marginStart:-15,righ:-30,width:27,height:27,borderRadius:30}}></Badge>
              :null
            }
            
        </View>
        </TouchableOpacity>


        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('parameter')}}
        >
        <View style={{flexDirection:'row',margin:1}}>
            <Image source={settingIcon} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Paramètres</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('demandamount')}}
        >
        <View style={{flexDirection:'row',margin:1}}>
        <Image source={revenueIcon} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Montant demandé</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=>{this.props.navigation.navigate('support')}}
        >
        <View style={{flexDirection:'row',margin:1}}>
            <Image source={supporIcon} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Support</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
        <View style={{flexDirection:'row',margin:1}}>
            <Image source={logoutIcon} style={{height:24,width:24,margin:10}}  />
            <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Déconnexion</Text>
        </View>
        </TouchableOpacity>
        </View> 


            </ScrollView>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',margin:10,color:"#b41565"}}>Version de l'application : {packageContent.version}</Text>            
            </Fragment>

            

            :<View>
              <Text></Text>
            </View>


          }
       
          <Modal
          visible={this.state.Alert_Visibility}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}>
          <View
            style={{
              // backgroundColor:'#FFF',
              backgroundColor: 'rgba(0,0,230,0.700)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: SCREEN_HEIGHT /2.7,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                    borderWidth: 0,
                    marginTop: -50,
                  }}>
                 <Image source={logoutIcon} style={{height:70,width:70,margin:18}} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:10,
                    marginTop:-10,
                    color: '#000000',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                 Déconnexion
                </Text>







                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                        Etes-vous sûr de vouloir vous
                </Text>


                <Text
                  style={{
                    fontSize: 15,
                    alignSelf: 'center',
                    fontWeight: '600',
                    margin:10,
                    marginTop:-10,
                    color: 'gray',
                    textAlign: 'center',
                   
                  }}>
                  déconnecter?
                </Text>
            
              </View>                        
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf:'center',
                  borderRadius:6,
                  textAlign: 'center',
                  margin: 5,                
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}                 
                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 13,
                      marginStart: 30,
                      marginEnd: 30,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Oui
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert1()}                 
                  style={{
                   
                    backgroundColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 13,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Retour
                  </Text>
                </TouchableOpacity>

             
              </View>
            </View>
          </View>
        </Modal>




</View>
        {/* </ImageBackground> */}
          <BottomNavigator
            currentRoute={'profile2'}
            navigation={this.props.navigation}
        />
      </View>
    )
  }
}



// 22.Mon compte
// John Smith
// Mon profil
// Mes revenus
// 
// 
// Déconnexion