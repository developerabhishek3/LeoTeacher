import React, { Component } from 'react'
import { View,Text, ImageBackground,Image,TouchableOpacity,ScrollView, StatusBar,Alert,BackHandler } from 'react-native'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/3.png'
import logo from '../../../assets/icon/96.png'
import facebook from '../../../assets/icon/fb.png'
import { TextInput } from 'react-native-gesture-handler'
import { loginUser } from '../../../Api/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';

export default class index extends Component {


    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          fcm_token: '',      
          token: '',    
          userLoggedInData: {},    
          username: '',
          userDetais: [],
          showPassword: true,  
        };
        this.toggleSwitch = this.toggleSwitch.bind(this);
      }



      toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
      }


      userLoginFunction = async () => {
        // console.log("getting inside the function uuid --------",this.state.fcm_token)
        const {
          email,
          password,
          fcm_token
        } = this.state;
        const loginUserResponse = await loginUser({
          email,
          password,
          fcm_token
        });
        if (loginUserResponse.result === true) {
          console.log("getting result here --------", loginUserResponse.response)
    

            // await AsyncStorage.setItem("userLoggedIn", "true");
            // await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));
    
            // await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
            // await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));
    

        
          if (loginUserResponse.response.status === true) {           
              console.log("getting response >>>>>>>>>>>>>>>>",loginUserResponse.response)
            await AsyncStorage.setItem("userLoggedIn", "true");
            await AsyncStorage.setItem("userLoggedInData", JSON.stringify(loginUserResponse.response));
    
            await AsyncStorage.setItem("token", JSON.stringify(loginUserResponse.response.token));
            await AsyncStorage.setItem("user_id", JSON.stringify(loginUserResponse.response.user_id));
            if(loginUserResponse.response.is_academic_info == false){
              this.props.navigation.navigate("question")
            }
            else if(loginUserResponse.response.is_bank_info == false){
              this.props.navigation.navigate("bankdetails")
            } 
            else if(loginUserResponse.response.is_level_info == false){
              this.props.navigation.navigate("levelchoice")
            }
            else{
              this.props.navigation.navigate("home")
              // Alert.alert("Message",loginUserResponse.response.is_academic_info == true)
            }
           
          }
          else {
            Alert.alert("Message", loginUserResponse.response.message)
          }
        } else {
          this.myAlert('Error', loginUserResponse.error);
          console.log('getting error here-------------');
        }
        return;
      };
    
      myAlert = (title = '', message = '') => {
        Alert.alert(title, message);
      };
    
      validateUser = () => {
        const { email, password } = this.state;
    
        if (email.length === 0) {
          this.myAlert('Message', 'Veuillez entrer votre adresse électronique!');
        } else if (password.length === 0) {
          this.myAlert('Message', 'Veuillez entrer votre mot de passe!');
        } else {
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!email.match(mailformat)) {
            this.myAlert('Message', 'Adresse email invalide');
            return false;
          }
          this.userLoginFunction();
        }
      };
    

    async  componentDidMount(){
        

        const FCMtoken = await AsyncStorage.getItem('fcmToken');
        console.log("getting token --------", FCMtoken)
        this.setState({ fcm_token: FCMtoken })
        BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
      }


      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
      }
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          console.log("getting inside the if conditin--------------")
          return true;
        } else {
          console.log("getting inside the else conditin---------------")
          Alert.alert(
            'Exit App',
            'Do you want to Exit..', [{
              text: 'Cancel',
              style: 'cancel'
            }, {
              text: 'Exit',
              onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
          })
          return true;
        }
      }
    





    render() {
        return (
            <View style={Styles.container}>
                <StatusBar hidden />
                <ImageBackground
                    source={bgImg}
                    resizeMethod="resize"
                    resizeMode="stretch"
                    style={Styles.bgImgStyle}                    
                >
                   <ScrollView>
                    <View style={{borderWidth:0,marginBottom:20,marginTop:20}}>

                      <View style={Styles.headerView}>
                      <Image source={logo} style={Styles.headerLogo} />
                      <Text style={Styles.headerTxt}>Se connecter</Text>
                      </View>


                    <View style={Styles.subHeader}>
                    <Text style={Styles.txtStyle1}>Entrez vos identifiants de connexion pour continuer ou inscrivez-vous</Text>
                    {/* <Text style={Styles.txtStyle1}>pour continuer.</Text> */}
                    </View>

                    <View style={Styles.textInputView}>  


                    <View>
                        <TextInput                           
                          style={Styles.textInputField}
                          onChangeText={(email) => this.setState({ email })}
                          placeholder="Adresse email"
                        />
                    </View>

                    
{/* 
                    <View>
                        <TextInput 
                           style={Styles.textInputField}
                           secureTextEntry={true}
                           onChangeText={(password) => this.setState({ password })}
                          placeholder="Mot de passe"
                        />
                    </View> */}


                    <View style={{flexDirection:'row', borderWidth: 1,
                          borderColor: '#DDDDDD',
                          borderRadius: 10,
                          justifyContent:'space-between',
                          margin: 10,
                      }}>
                      <TextInput 
                        // secureTextEntry={this.state.password.length > 0 ? true : false }
                        secureTextEntry={this.state.showPassword && this.state.password.length > 0 ? true:false}
                        // style={{fontFamily: this.state.password ? 'OpenSans-Regular' : 'OpenSans-Italic',  borderColor: '#DDDDDD',color:"gray",borderWidth:1,borderRadius:10,margin:10,paddingStart:10}}
                        placeholder="Mot de passe"
                        
                        style={{paddingStart:15,fontFamily: this.state.password ? 'OpenSans-Regular' : 'OpenSans-Regular', borderWidth:0,width:"85%",color:"gray"}}
                        value={this.state.password}     
                        onChangeText={(password) => this.setState({ password })}           
                      />
                      <TouchableOpacity  
                        onPress={this.toggleSwitch}            
                        value={!this.state.showPassword}>
                          {
                            this.state.showPassword == true ?
                            <Image source={require("../../../assets/icon/invisible-1.png")} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                            :
                            <Image source={require("../../../assets/icon/eyeopen-1.png")} style={{width: 30, height: 30,marginTop:10,margin:6}} />
                          }                      
                      </TouchableOpacity>
                    </View>





                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("forgotpassword")}}>
                    <Text style={Styles.forgotPwd}>Mot de passe oublié?</Text>
                    </TouchableOpacity>


                    </View> 

                    <View style={Styles.continueBtn}>
                        <TouchableOpacity
                           onPress={() => this.validateUser()}
                        // onPress={()=>{this.props.navigation.navigate('login')}}
                        >
                        <Text style={Styles.continueBtnTxt}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>  

                  {/* <View style={{flexDirection:'row',margin:0,alignSelf:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("facebooklogin")}}>
                    <Image source={facebook} style={Styles.socialLogo} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("googlelogin")}}>
                    <Image source={require("../../../assets/icon/google.png")} style={Styles.socialLogo} />
                    </TouchableOpacity>
                  </View> */}

                    <View  style={{flexDirection:'row',margin:3,alignSelf:'center',marginTop:30}}>
                    <Text style={Styles.txtStyle2}>Nouvel Utilisateur ?</Text>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate("singup")}}>
                      <Text style={Styles.txtStyle3}> S'inscrire</Text>
                      </TouchableOpacity>
                    </View>




                    </View>
                    </ScrollView>                
                    </ImageBackground>

            </View>
        )
    }
}
