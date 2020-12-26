import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Modal,Dimensions,Alert,BackHandler} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/6.png'
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../assets/icon/25.png';

import profileIcon from '../../../assets/ProfileIcon/24.png'
import revenueIcon from '../../../assets/ProfileIcon/23.png'
import settingIcon from '../../../assets/ProfileIcon/30.png'
import supporIcon from '../../../assets/ProfileIcon/29.png'
import logoutIcon from '../../../assets/ProfileIcon/36.png'


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-community/async-storage';

import {LogoutFunction} from '../../../Api/afterAuth';

export default class index extends Component {
    constructor(props){
        super(props)
        this.state={
          value: 'first',
          Model_Visibility: false,
          Alert_Visibility: false,
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
            Alert.alert("Message","Logout Sucessfully !")
        }
        else{
            // console.log("getting error on logout -------------",LogoutResponse.error)
        }        
        // console.log("getting country response----------------",countryData.country_list)
      };
    



      componentDidMount = async () => {
   
  
  
  
        BackHandler.addEventListener('hardwareBackPress', () =>
            this.handleBackButton(this.props.navigation),
          );
      }
      
    
    
    
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
    
    
    
    
    
    
    
    
    





      Show_Custom_Alert(visible) {
        this.setState({Alert_Visibility: visible});
      }
      Hide_Custom_Alert() {
        this.setState({Alert_Visibility: false}); 
        this.userLogoutFunction()       
      }

      Hide_Custom_Alert1() {
        this.setState({Alert_Visibility: false});         
      }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}>
        <View style={Styles.header}>
          <Image source={back} style={Styles.headertxtInputImg} />
          <Text style={Styles.headerTxt}>Mon compte</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>

          <View style={{marginTop:-15}}> 
            <Image source={People} style={Styles.peopleStyle} />
            
          </View>
          {/* <Text style={{fontSize:13,color:'gray',fontWeight:'700',alignSelf:'center'}}>Votre client</Text> */}
          <Text style={{alignSelf:'center',fontWeight:'700',fontSize:16,color:"#FF1493"}}>John Smith</Text>          
          <ScrollView>

            <View style={{flex:2,margin:10}}> 
        

                <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate("myprofile")}}
                >
                  <View style={{flexDirection:'row',margin:5}}>
                      <Image source={profileIcon} style={{height:24,width:24,margin:10}}  />
                      <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Mon profil</Text>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                     onPress={()=>{this.props.navigation.navigate("revenue")}}
                >
                <View style={{flexDirection:'row',margin:5}}>
                    <Image source={revenueIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15}}> Mes revenus</Text>
                </View>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('parameter')}}
                >
                <View style={{flexDirection:'row',margin:5}}>
                    <Image source={settingIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Paramètres</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={()=>{this.props.navigation.navigate('support')}}
                >
                <View style={{flexDirection:'row',margin:5}}>
                    <Image source={supporIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Support</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                <View style={{flexDirection:'row',margin:5}}>
                    <Image source={logoutIcon} style={{height:24,width:24,margin:10}}  />
                    <Text style={{fontSize:14,fontWeight:'700',margin:15}}>Déconnexion</Text>
                </View>
                </TouchableOpacity>




            </View>


          </ScrollView>  



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
                   
                    backgroundColor: '#FF1493',
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
                   
                    backgroundColor: '#FF1493',
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





        </ImageBackground>
          <BottomNavigator
            currentRoute={'profile'}
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