// import React from 'react';
// import {SafeAreaView} from 'react-native';
// import Appcontainer from './src/router/index';
// class App extends React.Component {
//   render() {
//     return (
//       <SafeAreaView style={{ flex:1}}>
//         <Appcontainer />
//       </SafeAreaView>
//     );
//   }
// }
// export default App;

import React from 'react';
import {AppRegistry, Alert, SafeAreaView,View,Modal,ScrollView,Dimensions,Image,Text,TouchableOpacity,} from 'react-native';
import firebase from 'react-native-firebase';

import Appcontainer from './src/router/index';


import AsyncStorage from '@react-native-community/async-storage';
import { ImageBackground } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay';


import { reservation_request_accept_reject } from "./src/Api/afterAuth";
import CountDown from 'react-native-countdown-component';

// import messaging from '@react-native-firebase/messaging';

import * as RNLocalize from "react-native-localize";

import PushNotification from "react-native-push-notification"
import { EventRegister } from 'react-native-event-listeners'

import Notification from "./src/components/notification"



export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      push_val: '',
      Model_Visibility: false,
      Alert_Visibility: false,
      notificationData:[],
      request_end:"",
      newData:[],
      isBodyLoaded:false,
      isSpinner:true,
      seconds:0,
      secondBetweenTwoDate:0,
      isButtonEnable:true,
      //send in API
      transaction_id:0,
      reservation_request_id:0,

    };
  }


  // Show_Custom_Alert(visible) {
  //   this.setState({Alert_Visibility: visible});
  // }
  // Hide_Custom_Alert() {
  //   console.log("inside hidfe ==============")
  //   this.setState({Alert_Visibility: false});
  //   // this.props.navigation.navigate("home")

  // }

  // Hide_Custom_Alert1() {
  //   this.setState({Alert_Visibility: false});

  // }

  async componentDidMount() {


    
    this.checkPermission();
    this.createNotificationListeners(); //add this line













  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }


  //1
  async checkPermission() {  
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      this.createNotificationListeners();
    } else {
      this.requestPermission();
    }
  }





  async createNotificationListeners() {
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      
      if(notification._data.reciever_id == UserId ){

        // const { title, body } = notification;
        console.log("getting cosole veleu++++++++++++",notification)

        var notificationData = notification.data.extra_param
    
        var newData = JSON.parse(notificationData)    

        var transaction_id =  newData.transaction_id;
        var reservation_request_id = newData.reservation_request_id


        var request_end = new Date(newData.request_end)



        var realEndTime =    new Date(request_end.setHours(request_end.getHours() - 1))

        var secondBetweenTwoDate = parseInt((realEndTime.getTime() - new Date().getTime()) / 1000);

         const objchatscreens= {
              transaction_id: newData.transaction_id,
              teacher_id:newData.teacher_id,
              reservation_request_id: newData.reservation_request_id,
              student_name: newData.student_name,
              secondBetweenTwoDate:secondBetweenTwoDate,
              course_date:newData.course_date,
              course_time:newData.course_time,
              student_level:newData.student_level,

              }
          EventRegister.emit('myCustomEvent', objchatscreens)


      



        // this.setState({newData,secondBetweenTwoDate,transaction_id,reservation_request_id})

        // this.Show_Custom_Alert()    
        // this.showAlert(title, body);
      }    
      });      
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {

    
     
      if(notificationOpen._data.reciever_id == UserId){             
        var notificationData = notificationOpen.notification.data.extra_param;

        var newData = JSON.parse(notificationData)
        var transaction_id =  newData.transaction_id;
        var reservation_request_id = newData.reservation_request_id
  
        var request_end = new Date(newData.request_end)

        var realEndTime =    new Date(request_end.setHours(request_end.getHours() - 1))

      




        var request_start = new Date(newData.request_start)

        var secondBetweenTwoDate = parseInt((realEndTime.getTime() - new Date().getTime()) / 1000);

           


        // this.setState({newData,secondBetweenTwoDate,transaction_id,reservation_request_id})


        // this.Show_Custom_Alert()

        const objchatscreens= {
          transaction_id: newData.transaction_id,
          teacher_id:newData.teacher_id,
          reservation_request_id: newData.reservation_request_id,
          student_name: newData.student_name,
          secondBetweenTwoDate:secondBetweenTwoDate,
          course_date:newData.course_date,
          course_time:newData.course_time,
          student_level:newData.student_level,

          }
          EventRegister.emit('myCustomEvent', objchatscreens)




        // const { title, body } = notificationOpen.notification;
        
        // this.showAlert(title, body);
      }        
      });
      
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
  
      // console.log("getting when app in background_______________",notificationOpen.results)
    
      console.log("getting when app in background_______________",notificationOpen.notification.data.extra_param)
        
        var notificationData = notificationOpen.notification.data.extra_param;
        await AsyncStorage.setItem("notification", "true");      
        await AsyncStorage.setItem("notificationData",notificationData)




        console.log("checking i am here--------------",)
        
        return false;


        var newData = JSON.parse(notificationData)
        console.log("gettin body value here==============",JSON.stringify(newData.request_end))

        var request_end = new Date(newData.request_end)
        var request_start = new Date(newData.request_start)

        var secondBetweenTwoDate = parseInt((request_end.getTime() - new Date().getTime()) / 1000);

       

        var student_name = newData.student_name
        console.log("geeting student name here===============",student_name)


        // await AsyncStorage.setItem("notificationData", newData);
         var student_name1 = AsyncStorage.setItem('student_name',JSON.stringify(student_name))
        console.log("getting store item value===============",student_name1)







        // const objchatscreens= {
        //   transaction_id: newData.transaction_id,
        //   teacher_id:newData.teacher_id,
        //   reservation_request_id: newData.reservation_request_id,
        //   student_name: newData.student_name,
        //   secondBetweenTwoDate:secondBetweenTwoDate,
        //   course_date:newData.course_date,
        //   course_time:newData.course_time,
        //   student_level:newData.student_level,

        //   }

          const objchatscreens = {
            secondBetweenTwoDate:secondBetweenTwoDate
            }

            console.log("chefcking for data========",objchatscreens)
            // Alert.alert("MEssage",JSON.stringify(objchatscreens))
            
            EventRegister.emit('myCustomEvent', JSON.stringify(objchatscreens)) 

            
            

            
            }      


      // this.Show_Custom_Alert()
      this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
      });

  }
 



  // showAlert = (title, message) => {
  //   Alert.alert(
  //   title,
  //   message,
  //   [
  //   {text: 'OK', onPress: () => this.props.navigation.navigate("notification")},
  //   ],
  //   {cancelable: false},
  //   );
  // }
  
  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCM token$$$ ' + fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();      
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }
  
  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
      this.createNotificationListeners();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }





  render() {

    const {newData} = this.state;

      return (
        <SafeAreaView style={{ flex:1}}>
          <Appcontainer />
          {/* <View>            
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
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  width: '99%',
                  // backgroundColor: 'rgba(0,0,230,0.700)',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                  margin: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: 18,
                    alignSelf: 'center',
                    marginTop: 30,
                    margin: 10,
                  }}>
                  Demande de coaching (request)
                </Text>
                <View
                  style={{
                    marginTop: 27,
                    marginStart: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}>
                    Informations sur le coaching d'anglais
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                   {newData.course_date} {newData.course_time}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 27,
                    marginStart: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}>
                    Info Client
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '600',
                      alignSelf: 'center',
                    }}>
                  {newData.student_name}  
                  </Text>
                </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                   <ImageBackground
                    source={require("./src/assets/icon/timer.png")}
                    style={{justifyContent:'center',alignItems:'center',height:210,width:210}}
                   >  
                   <View style={{marginTop:30}}>
                   <CountDown
                   size={8}
                   until={this.state.secondBetweenTwoDate}
                  // until={10}
                  //  onFinish={() => this.setState({secondBetweenTwoDate:0,isButtonEnable:false})}
                   onFinish={() => this.Hide_Custom_Alert()}
                   digitStyle={{backgroundColor: '#FFF', borderWidth: 0, borderColor: '#b41565',}}
                   digitTxtStyle={{color: '#b41565'}}
                   timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                   separatorStyle={{color: '#b41565'}}
                   timeToShow={['H', 'M', 'S']}
                   timeLabels={{m: null, s: null}}
                   showSeparator
                 />
                 </View>
                   </ImageBackground>
              </View> 
                {
                  this.state.isButtonEnable == true ?
                  <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 30,
                    marginTop: 40,
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    // onPress={()=>{this.Hide_Custom_Alert1()}}
                    onPress={()=>{this.fetchreservation_request_Accept()}}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Accepter
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.Hide_Custom_Alert();
                    // }}
                    onPress={()=>{this.fetchreservation_request_Reject()}}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 10,
                      marginStart: 25,
                      marginEnd: 25,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 18,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Décliner
                    </Text>
                  </TouchableOpacity>
                </View>
                  :
                <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 30,
                  marginTop: 40,
                  marginBottom: 30,
                }}>
                <TouchableOpacity
                  onPress={()=>{this.Hide_Custom_Alert1()}}
                  style={{
                    borderColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    borderWidth:1,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Accepter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.Hide_Custom_Alert1();
                  }}
                  style={{
                    borderColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    borderWidth:1,
                    marginEnd: 25,
                    height: 35,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Décliner
                  </Text>
                </TouchableOpacity>
              </View>
                }
              </View>
            </View>
          </Modal>
        
          </View> */}
        </SafeAreaView>
      )
  }
}