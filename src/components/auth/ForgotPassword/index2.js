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
  Modal,
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {TextInput} from 'react-native-gesture-handler';


import {forgotPasswordReq2Function} from '../../../Api/afterAuth'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      vcode:"",
      password: '',
      fcm_token: '',


      token: '',

      userLoggedInData: {},

      username: '',
      Model_Visibility1: false,
      Alert_Visibility1: false,
      alertValue:"",
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




  userForgotPasswordRe2Function = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
      email, 
      vcode,    
    } = this.state;
    const forgotpasswordResponse = await forgotPasswordReq2Function({
      email,   
      vcode,  
    });
    if (forgotpasswordResponse.result === true) {
      console.log("getting result here --------", forgotpasswordResponse.response)


      // if(forgotpasswordResponse.response.status == true){
      //   this.props.navigation.navigate("Home")
      // }
      // else{
      //   Alert.alert("Message",forgotpasswordResponse.response.message)
      // }
      if (forgotpasswordResponse.response.status === true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",forgotpasswordResponse.response)      
          this.props.navigation.navigate("forgotpasswordreq3",{email:email})
      }
      else {
        // Alert.alert("Message", forgotpasswordResponse.response.message)
        let alertValue = forgotpasswordResponse.response.message;
        this.setState({alertValue})
        this.Show_Custom_Alert1()
      }
    } else {
      this.myAlert('Error', forgotpasswordResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    let alertValue;
    const { email,vcode  } = this.state;

    if (email.length === 0) {
      alertValue = "Veuillez entrer votre adresse électronique!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
      // this.myAlert('Message', 'Veuillez entrer votre adresse électronique');
    }
    else if(vcode.length === 0){
      alertValue = "Veuillez entrer votre code!"
      this.setState({alertValue})
      this.Show_Custom_Alert1()
            // this.myAlert("Message","Veuillez entrer votre code")

    } else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        alertValue = "Email-Id invalide"
        this.setState({alertValue})
        this.Show_Custom_Alert1()
        // this.myAlert('Message', 'Email-Id invalide');
        return false;
      }
      this.userForgotPasswordRe2Function();
    }
  };


  componentDidMount(){
   let email =  this.props.navigation.getParam("email")
   this.setState({email:email})
    console.log("getting email inside did mount-----------",email)

    
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
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />

                <View >
                <Text style={Styles.headerTxt}>Mot de passe </Text>
                <Text style={Styles.headerTxt1}>oublié</Text>
                </View>
              </View>

              <View style={Styles.subHeader}>
                <Text style={Styles.txtStyle1}>Entrez votre adresse électronique, nous</Text>
                <Text style={Styles.txtStyle1}>vous enverrons un lien pour réinitialiser</Text>
                <Text style={Styles.txtStyle1}>votre mot de passe.</Text>
              </View>

              <View style={Styles.textInputView}>
                <View>
                  <TextInput
                    style={Styles.textInputField}                    
                    editable={false}
                    placeholder=" Eamil"
                    placeholderTextColor="gray"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" Code"
                    placeholderTextColor="gray"
                    onChangeText={(vcode) => this.setState({ vcode })}
              />
                </View>

              </View>
              <View style={Styles.continueBtn}>
                <TouchableOpacity
                  // onPress={() => {
                  //   this.props.navigation.navigate('home');
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
                      fontSize: 13,
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
