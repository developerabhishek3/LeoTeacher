import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  BackHandler,
  Modal
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {RadioButton} from 'react-native-paper';

import {get_all_levels,update_level} from '../../../Api/auth'

import AsyncStorage from '@react-native-community/async-storage';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      value: 'second',
      value: 'third',  
      levelsData:[]  ,
      level_id:[],   
      Model_Visibility1: false,
      Alert_Visibility1: false,  
      alertValue:"",  
    };
  }

  componentDidMount = async () => {
    this.fetchlevelsData()

    let levelId = await AsyncStorage.getItem('level_id');
    let level_id = JSON.parse(levelId);
  
    console.log("getting level id here----------",level_id)


    BackHandler.addEventListener('hardwareBackPress', () =>
           this.handleBackButton(this.props.navigation),
         );
  }
  
    fetchlevelsData = async () => {
      const GetlevelsResponse = await get_all_levels();
      if (GetlevelsResponse.result == true) {
        console.log("getting levels data ------------------- ",)
        var levelsData = GetlevelsResponse.response.levels
        var newLeveldata = levelsData.map(i => ({...i, isSelected: false}));
        this.setState({levelsData: newLeveldata});
      }
      // console.log("getting country response----------------",levelsData.country_list)
    };
  


    Show_Custom_Alert1(visible,) {
      this.setState({Alert_Visibility1: visible});
    }
    Hide_Custom_Alert1() {
      this.setState({Alert_Visibility1: false}); 
      // this.props.navigation.navigate("login")    
    }

    update_levelFunction = async () => {
      // console.log("getting inside the function uuid --------",this.state.fcm_token)
      const {
        levelsData,     
      } = this.state;
      let levelIds = [];
      levelsData.map( i => {
        if(i.isSelected) {
          levelIds.push(i.id);
        }
      });

      console.log("finding level id ??????????????????",levelIds)


      const update_levelResponse = await update_level({
        level_id: levelIds  
      });
      if (update_levelResponse.result === true) {
        console.log("getting result here --------", update_levelResponse.response)
  
  
        // if(update_levelResponse.response.status == true){
        //   this.props.navigation.navigate("Home")
        // }
        // else{
        //   Alert.alert("Message",update_levelResponse.response.message)
        // }
        if (update_levelResponse.response.status === true) {           
            console.log("getting response >>>>>>>>>>>>>>>>",update_levelResponse.response)      
            this.props.navigation.navigate("login")
            Alert.alert("Message", update_levelResponse.response.message)
        }
        else {
          Alert.alert("Message", update_levelResponse.response.message)
        }
      } else {
        this.myAlert('Error', update_levelResponse.error);
        console.log('getting error here-------------');
      }
      return;
    };
  
    myAlert = (title = '', message = '') => {
      Alert.alert(title, message);
    };
  
    // validateUser = () => {
    //   const { email,  } = this.state;
  
    //   if (email.length === 0) {
    //     this.myAlert('Message', 'Please enter your email');
    //   } else {       
    //     this.update_levelFunction();
    //   }
    // };
  



    validateFunction(){
      let alertValue;
        let filters = this.state.levelsData.filter(i => i.isSelected);
        if(filters && filters.length == 0) {
          alertValue = "Veuillez sélectionner le niveau!"
          this.setState({alertValue})
          this.Show_Custom_Alert1()
         
          //  Alert.alert('Message','Veuillez sélectionner le niveau!');
        }
        this.update_levelFunction()
      
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


  render() {
    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />
                <View style={{marginEnd: 50, marginTop: -10}}>
                  <Text style={Styles.headerTxt}>Niveau</Text>
                  <Text style={Styles.headerTxt1}>d'anglais</Text>
                </View>
              </View>

              <View style={{marginTop: 50}}>
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>Sélectionner les niveaux de coachings que vous souhaitez donner :</Text>
                </View>
                <View style={Styles.radiobtnMainView}>
                  {/* <RadioButton.Group
                    onValueChange={(value) => this.setState({value})}
                    value={this.state.value}>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="first" />
                      <View style={{flexDirection:'column'}}>
                      <Text style={Styles.radiobtnText1}>Coaching niveau débutant</Text>
                      <Text style={Styles.radiobtnText1}>(notions de français obligatoire)</Text>
                      </View>
                    </View>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="second" />
                      <Text style={Styles.radiobtnText}>Coaching niveau intermédiaire</Text>
                    </View>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="third" />
                      <Text style={Styles.radiobtnText}>Coaching niveau avancé</Text>
                    </View>                 
                  </RadioButton.Group> */}
                {
                  this.state.levelsData.map((singleMap,key)=>{   
                                       
                    return(
                      <View style={{margin:10,marginTop:20}}>
                             {
                                               singleMap.isSelected ? 
                                               <TouchableOpacity 
                                               onPress={()=>{
                                                let oldState = [...this.state.levelsData];
                                                oldState[key].isSelected = !oldState[key].isSelected;
                                                this.setState({ levelsData: oldState });
                                              }}
                                               style={{flexDirection:'row',alignItems:'center'}}>
                                                   <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                                   <Text style={{color:"lightgreen"}}>{singleMap.level_fr}</Text>
                                               </TouchableOpacity>

                                               :
                                               <TouchableOpacity 
                                               onPress={()=>{
                                                let oldState = [...this.state.levelsData];
                                                oldState[key].isSelected = !oldState[key].isSelected;
                                                this.setState({ levelsData: oldState });
                                              }} 
                                               style={{flexDirection:'row',alignItems:'center'}}>
                                                   <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                                   <Text style={{color:"gray"}}>{singleMap.level_fr}</Text>
                                               </TouchableOpacity>
                                           }

                      </View>
                    )
                  })
                }

                         </View> 
                

                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.props.navigation.navigate('home');
                    // }}
                    onPress={()=>{this.validateFunction()}}
                    >
                    <Text style={Styles.continueBtnTxt}>Continuer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>









          <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert1(!this.state.Alert_Visibility1);
            }}>
            <View
              style={{
                backgroundColor: 'rgba(85,65,225,0.900)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '80%',
                  height: 221,
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
                    <Image
                      source={require("../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: 10,
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.alertValue}
                  </Text>
                </View>                 
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'center',
                    alignSelf:'center',
                    margin: 5,
                  }}>
                  <TouchableOpacity                 
                    onPress={() => {                      
                      this.Hide_Custom_Alert1();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 20,
                   
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 50,
                        marginEnd: 50,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                          OK
                    </Text>
                  </TouchableOpacity>                
                </View>
              </View>
            </View>
          </Modal> 












        </ImageBackground>
      </View>
    );
  }
}
