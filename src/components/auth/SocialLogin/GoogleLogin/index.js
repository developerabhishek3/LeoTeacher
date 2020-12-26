// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   ImageBackground,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
//   Dimensions,
//   Alert,
//   Modal
// } from 'react-native';
// import Styles from './indexCss';
// import bgImg from '../../../../assets/bgImages/3.png';
// import logo from '../../../../assets/icon/96.png';
// import DatePicker from 'react-native-datepicker';
// import facebook from '../../../../assets/icon/fb.png';
// import {TextInput} from 'react-native-gesture-handler';
// import downArrow from '../../../../assets/icon/downArrow.png';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import {SocialAuth,getCountryList} from '../../../../Api/auth'; 

// const SCREEN_HEIGHT = Dimensions.get('window').height; 
// const SCREEN_WIDTH = Dimensions.get('window').width;

// export default class index extends Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       date: new Date(),
//       instagram_username: '',
//       first_name: '',
//       last_name: '',
//       email: '',
//       password: '',
//       telephone_no: '',
//       birth_date:  new Date(),
//       address: '',
//       postcode: '',
//       city: '',
//       country: '',
//       profile_url:"",
//       fcm_token:'',
//       confirm_password:"",
//       device_token:'',
//       countryData: [],
//       Model_Visibility: false,
//       Alert_Visibility: false,  
//       checked1:false,      
//     };
//   }




// componentDidMount = async () => {
//   this.fetchCountryData()
// }

//   fetchCountryData = async () => {
//     const GetCountryListResponse = await getCountryList();
//     if (GetCountryListResponse.result == true) {
//       var countryData = GetCountryListResponse.response.country_list;
//       console.log("getting country data----------",countryData)
//     }
//     this.setState({countryData});
//     // console.log("getting country response----------------",countryData.country_list)
//   };

  
//   UserRegistrationFunction = async () => {
//     this.setState({spinner: true});
//     const {      
//       first_name,
//       last_name,
//       email,         
//       birth_date,
//       phone,     
//       profile_url,      
//       fcm_token,  
//     } = this.state;
//     const createUserResponse = await SocialAuth({      
//       first_name,
//       last_name,
//       email,         
//       birth_date,
//       phone,
//       profile_url,
//       reg_type:"facebook",
//       fcm_token         
//     });
//     if (createUserResponse.result == true) {
//       console.log('getting resu333333333lt here --------', createUserResponse.response);
//       console.log(
//         'getting result222222 here --------',
//         createUserResponse.response.message,
//       );    
//       if(createUserResponse.response.status == true){
//         console.log("getting inide5555555 response ---",createUserResponse.response.message)
//         Alert.alert("Message",createUserResponse.response.message)
//         // this.props.navigation.navigate('aftersignupwelcome',{email:email})
//       }
//       else{
//         Alert.alert("Message",createUserResponse.response.message)
//       }
//     } else {
//       this.myAlert('Error', createUserResponse.error);
//       console.log('getting error here-------------');
//     }
//     return;
//   };

//   myAlert = (title = '', message = '') => {
//     Alert.alert(title, message);
//   };






//   validateUser = () => {
//     const {      
//       first_name,
//       last_name,
//       email,
//       birth_date,
//       telephone_no,            
//     } = this.state;
//      if (first_name.length === 0) {
//       this.myAlert('Message', 'Please enter your first name');
//     } else if (last_name.length === 0) {
//       this.myAlert('Message', 'Please enter your last name');
//     }
//     else if (birth_date.length === 0) {
//       this.myAlert('Message', 'Please enter your birth date');
//     }   
//      else if (telephone_no.length === 0) {
//       this.myAlert('Message', 'Please enter your telephone no');
//     } 
//     else if (email.length === 0) {
//       this.myAlert('Message', 'Please enter your email');
//     }     
  
//     else {
//       // if(password != confirm_password){
//       //   this.myAlert("Message","Password and Confirm Password are not matched")
//       // }
//       const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if (!email.match(mailformat)) {
//         this.myAlert('Message', 'Invalid email');
//         return false;
//       }  

//       this.UserRegistrationFunction();
//     }
//   };






//   Show_Custom_AlertForTime(visible) {
//     this.setState({Model_Visibility: visible});
//   }

//   Hide_Custom_AlertForTime() {
//     this.setState({Model_Visibility: false});
//   }

//   Show_Custom_Alert(visible) {
//     if (this.state.country != 'Country') {
//       this.setState({Alert_Visibility: visible});
//     } else {
//       Alert.alert('Warning', 'Please select your your country');
//     }
//   }

//   Hide_Custom_Alert() {
//     this.setState({Alert_Visibility: false});
//   }







//   render() {
//     return (
//       <View style={Styles.container}>
//         <StatusBar hidden />
//         <ImageBackground
//           source={bgImg}
//           resizeMethod="resize"
//           resizeMode="stretch"
//           style={Styles.bgImgStyle}>
//              <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={130} extraScrollHeight={130} showsVerticalScrollIndicator={false}>
//           <ScrollView>
//             <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
//               <View style={Styles.headerView}>
//                 <Image source={logo} style={Styles.headerLogo} />
//                 <Text style={Styles.headerTxt}>S'inscrire</Text>
//               </View>

//               <View style={Styles.subHeader}>
//                 <Text style={Styles.txtStyle1}>Vous devez créer un compte</Text>
//                 <Text style={Styles.txtStyle1}>pour continuer.</Text>
//               </View>

//               <View style={Styles.textInputView}>
//                 <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Nom"
//                     onChangeText={(first_name) => this.setState({first_name})}
//               />
//                 </View>

//                 <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Prénom"
//                     onChangeText={(last_name) => this.setState({last_name})}
//                   />
//                 </View>

//                 <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Email"
//                     onChangeText={(email) => this.setState({email})}
//                   />
//                 </View>

//                 <View   style={Styles.textInputField}>
//                   {/* <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Date de naissance"
//                     onChangeText={(birth_date) => this.setState({birth_date})}
//                   /> */}
                  
//                       <DatePicker
//                         style={{width: SCREEN_WIDTH*0.70,}}
//                         date={this.state.birth_date}
//                         placeholder="Date of Birth"                    
//                         format="YYYY-MM-DD"                   
//                         maxDate="2060-06-01"
//                           confirmBtnText="Confirm"
//                           cancelBtnText="Cancel"
//                           // iconSource={calenderIcon}
                          
//                           customStyles={{
//                             dateIcon: {
//                               left: -25,
//                               height:24,width:24
//                             },
//                             dateInput: {
//                               marginLeft: -60,
//                               borderColor: 'red',
//                               borderWidth: 0,
//                               marginRight: 90,
//                             },          
//                           }}
//                           onDateChange={(birth_date) => {
//                             this.setState({birth_date});
//                           }}
//                         />
//                 </View>
             




// {/* code for implementing country */}



//                 {/* <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Pays"
//                     onChangeText={(country) => this.setState({country})}
//                   />



//                   <TouchableOpacity
//                     onPress={() => this.Show_Custom_AlertForTime()}>
//                     <View
//                       style={{
//                         borderRadius: 10,
//                         marginTop: 13,
//                         flexDirection: 'row',
//                         flexWrap: 'wrap',
//                         justifyContent: 'space-between',
//                         borderColor: '#DDDDDD',
//                         borderWidth: 1,
//                         width: '95%',
//                         alignSelf:'center',
//                         height: 45,
//                       }}>
//                           {
//                             this.state.country == '' ?
//                             <Text
//                               style={{
//                                 color: 'gray',
//                                 paddingStart: 20,
//                                 padding:5,
//                                 fontWeight:'600',
//                                 fontSize: 15,
//                                 marginTop:6
                                                              

//                               }}>                        
//                             Pays
//                             </Text>
//                               :  <Text
//                               style={{
//                                 color: 'gray',
//                                 paddingStart: 10,
//                                 fontWeight:'600',
//                                 fontSize: 16,
//                                 padding:5,
//                                 marginTop:6
                               
                               
      
//                               }}>                            
//                                 {this.state.country}
//                             </Text>
//                           }
//                       <Image
//                         source={downArrow}
//                         style={{
//                           width: 18,
//                           height: 18,
//                           margin: 3,
//                           marginEnd:5,
//                           alignSelf: 'flex-end',
//                           justifyContent: 'flex-end',
//                         }}
//                       />
//                     </View>
//                   </TouchableOpacity>
//                 </View> */}

//                 <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     keyboardType="phone-pad"
//                     placeholder="  Numéro de téléphone"
//                     onChangeText={(telephone_no) => this.setState({telephone_no})}
//                   />
//                 </View>
                              
              

//                 {/* <View>
//                   <TextInput
//                     style={Styles.textInputField}
//                     placeholder="  Confirmation de mot de passe"
//                   />
//                 </View> */}
//               </View>
//               <View style={Styles.continueBtn}>
//                 <TouchableOpacity
//                   // onPress={() => {
//                   //   this.props.navigation.navigate('question');
//                   // }}
//                   onPress={()=>{this.validateUser()}}
//                   >
//                   <Text style={Styles.continueBtnTxt}>S'inscrire</Text>
//                 </TouchableOpacity>
//               </View>

//               <View
//                 style={{flexDirection: 'row', margin: 3, alignSelf: 'center'}}>
//                 <Text style={Styles.txtStyle2}>Déjà utilisateur ?</Text>
//                 <TouchableOpacity                  
//                   onPress={() => {
//                     this.props.navigation.navigate('login');
//                   }}
//                   >
//                   <Text style={Styles.txtStyle3}>Se connecter </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//           </KeyboardAwareScrollView>






//           <Modal
//               visible={this.state.Model_Visibility}
//               animationType={'fade'}
//               transparent={true}
//               onRequestClose={() => {
//                 this.Show_Custom_AlertForTime(!this.state.Model_Visibility);
//               }}>
//               <View
//                 style={{
//                   // backgroundColor: 'rgba(0,0,0,0.5)',
//                   backfaceVisibility: 'hidden',
//                   flex: 1,
//                   right: 20,
//                   left: 10,

//                   // left: Dimensions.get('window').width*1.60,
//                   top: 350,
//                   bottom: 20,
//                 }}>
//                 <View
//                   style={{
//                     width: '80%',
//                     height: SCREEN_HEIGHT /2.6,
//                     backgroundColor: '#FFFFFF',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     alignSelf:'center',
//                     margin: 10,

//                   }}>
//                   <ScrollView
//                     style={{
//                       flex: 2,
//                       width: '100%',
//                       borderColor: 'red',
//                       borderWidth: 0,
//                     }}
//                     showsVerticalScrollIndicator={false}>
//                     {this.state.countryData.map((singleCountry, index) => {
//                       return (
//                         <View key={index} style={{justifyContent: 'center'}}>
//                           <TouchableOpacity
//                             onPress={() => {
//                               this.setState(
//                                 {country: `${singleCountry.country_name}`},
//                                 () => this.Hide_Custom_AlertForTime(),
//                               );
//                             }}>
//                             <View
//                               style={{
//                                 height: 30,

//                                 // borderColor: '#b48484',
//                                 // borderWidth: 0,
//                                 alignSelf: 'center',
//                                 justifyContent: 'center',
//                                 shadowOffset: {width: 0, height: 1},
//                                 shadowOpacity: 0.5,
//                                 shadowRadius: 1,
//                                 elevation: 1,
//                                 margin: 5,
//                               }}>
//                               <Text
//                                 style={{
//                                   fontWeight: '600',
//                                   color: '#000000',
//                                   fontSize: 14,                                  
//                                   textAlign: 'center',
//                                 }}>{`${singleCountry.country_name}`}</Text>
//                             </View>
//                           </TouchableOpacity>
//                         </View>
//                       );
//                     })}
//                   </ScrollView>
//                 </View>
//               </View>
//             </Modal>








//         </ImageBackground>
//       </View>
//     );
//   }
// }














// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/

// Import React in our code
import React, {useState, useEffect} from 'react';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '225031830913-0rncv6enrktmpu0i1vki8k1lvdkrsgpm.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet',);
        console.log('User has not signed in yet',error);
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info",error);
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null); 
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <Text style={styles.titleText}>
            Example of Google Sign In in React Native
          </Text> */}
          <View style={styles.container}>
            {userInfo !== null ? (
              <>
                <Image
                  source={{uri: userInfo.user.photo}}
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>
                  Name: {userInfo.user.name}
                </Text>
                <Text style={styles.text}>
                  Email: {userInfo.user.email}
                </Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={_signOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </>
            ) : (
              <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
            )}
          </View>
          {/* <Text style={styles.footerHeading}>
            Google SignIn in React Native
          </Text>
          <Text style={styles.footerText}>
            www.aboutreact.com
          </Text> */}
        </View>
      </SafeAreaView>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});