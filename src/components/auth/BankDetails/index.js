import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  BackHandler,
  Modal
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {TextInput} from 'react-native-gesture-handler';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {add_update_bank_info} from '../../../Api/auth'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fcm_token: '',

      bank_name:"",
      bic_code:"",
      iban:"",
      paypal_email:"",

      Model_Visibility1: false,
      Alert_Visibility1: false,  
      alertValue:"",
      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
  }






  Show_Custom_Alert1(visible,) {
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility1: false}); 
    // this.props.navigation.navigate("login")    
  }

  add_update_bank_infoFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
        bank_name,
        bic_code,
        iban,
        paypal_email 
    } = this.state;
    const add_update_bank_infoResponse = await add_update_bank_info({
        bank_name,
        bic_code,
        iban,
        paypal_email  
    });
    if (add_update_bank_infoResponse.result == true) {
      console.log("getting result here --------", add_update_bank_infoResponse.response)
     
      if (add_update_bank_infoResponse.response.status === true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",add_update_bank_infoResponse.response)      
          this.props.navigation.navigate("levelchoice")
          // Alert.alert("Message", add_update_bank_infoResponse.response.message)
      }
      else {
        Alert.alert("Message", add_update_bank_infoResponse.response.message)
      }
    } else {
      this.myAlert('Error', add_update_bank_infoResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    let alertValue;
    const { bank_name,bic_code,iban,paypal_email  } = this.state;

    if (bank_name.length === 0) {
      alertValue = "Veuillez entrer le nom de votre banque!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
      // this.myAlert('Message', 'Veuillez entrer le nom de votre banque!');
    } 
    else if (bic_code.length === 0) {
      alertValue = "Veuillez entrer votre code BIC!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
        // this.myAlert('Message', 'Veuillez entrer votre code BIC!');
    }
    else if (iban.length === 0) {
      alertValue = "Veuillez entrer votre IBAN!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
        // this.myAlert('Message', 'Veuillez entrer votre IBAN!');
    } 
    else if(paypal_email.length === 0){
      alertValue = "Veuillez entrer votre email paypal!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
      // this.myAlert('Message', 'Veuillez entrer votre email paypal!');
    }
    else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!paypal_email.match(mailformat)) {
        alertValue = "Adresse email invalide!"
        this.setState({alertValue})
        this.Show_Custom_Alert1()
        // this.myAlert('Message', 'Adresse email invalide!');
        return false;
      }
      this.add_update_bank_infoFunction();
    }
  };





  componentDidMount(){

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



  render() {
    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
             <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={70} extraScrollHeight={70} showsVerticalScrollIndicator={false}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />

                <View style={{marginStart:30}}>
                <Text style={Styles.headerTxt}>Coordonnées</Text>
                <Text style={Styles.headerTxt1}>bancaires</Text> 

                </View>
              </View>
             
              <View style={Styles.subHeader}>
                <Text style={Styles.txtStyle1}>Veuillez entrer vos coordonnées bancaires ici</Text>
                {/* <Text style={Styles.txtStyle1}>vous enverrons un lien pour réinitialiser</Text>
                <Text style={Styles.txtStyle1}>votre mot de passe.</Text> */}
              </View>

              <View style={Styles.textInputView}>
                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="Nom de la banque"
                    placeholderTextColor="gray"
                    onChangeText={(bank_name) => this.setState({ bank_name })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="Code BIC"
                    placeholderTextColor="gray"
                    onChangeText={(bic_code) => this.setState({ bic_code })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="IBAN"
                    placeholderTextColor="gray"
                    onChangeText={(iban) => this.setState({ iban })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder="Email de votre compte Paypal"
                    placeholderTextColor="gray"
                    onChangeText={(paypal_email) => this.setState({ paypal_email })}
              />
                </View>

              </View>

              <View style={Styles.subHeader1}>
                <Text style={Styles.txtStyle2}>Vos coordonnées et votre profil seront envoyés au service administratif & RH de SPYK.
Après confirmation, votre compte coach d'anglais SPYK sera activé dans un délai de 48h si votre profil est retenu.</Text>
                {/* <Text style={Styles.txtStyle1}>vous enverrons un lien pour réinitialiser</Text>
                <Text style={Styles.txtStyle1}>votre mot de passe.</Text> */}
              </View>
              <View style={Styles.continueBtn}>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.props.navigation.navigate('levelchoice');
                  // }}
                  onPress={()=>{this.validateUser()}}
                  >
                  <Text style={Styles.continueBtnTxt}>Continuer</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{flexDirection: 'row', margin: 3, alignSelf: 'center'}}>
                <Text style={Styles.txtStyle2}>Déjà utilisateur ?</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('login');
                  }}>
                  <Text style={Styles.txtStyle3}>Se connecter </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </ScrollView>
          </KeyboardAwareScrollView>











          


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
