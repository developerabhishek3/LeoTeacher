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
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {TextInput} from 'react-native-gesture-handler';


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


      token: '',

      userLoggedInData: {},

      username: '',

      userDetais: []
    };
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
          Alert.alert("Message", add_update_bank_infoResponse.response.message)
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
    const { bank_name,bic_code,iban,paypal_email  } = this.state;

    if (bank_name.length === 0) {
      this.myAlert('Message', 'Veuillez entrer le nom de votre banque!');
    } 
    else if (bic_code.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre code BIC!');
    }
    else if (iban.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre iban!');
    } 
    else if(paypal_email.length === 0){
      this.myAlert('Message', 'Veuillez entrer votre email paypal !');
    }
    else {
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!paypal_email.match(mailformat)) {
        this.myAlert('Message', 'Adresse email invalide');
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
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />

                <View >
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
                    placeholder=" Nom de la banque"
                    onChangeText={(bank_name) => this.setState({ bank_name })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" Code BIC"
                    onChangeText={(bic_code) => this.setState({ bic_code })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" IBAN"
                    onChangeText={(iban) => this.setState({ iban })}
              />
                </View>

                <View>
                  <TextInput
                    style={Styles.textInputField}
                    placeholder=" Email  de votre compte Paypal"
                    onChangeText={(paypal_email) => this.setState({ paypal_email })}
              />
                </View>

              </View>

              <View style={Styles.subHeader}>
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
        </ImageBackground>
      </View>
    );
  }
}
