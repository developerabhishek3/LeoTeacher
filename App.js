import React from 'react';
import {AppRegistry, Alert, View,SafeAreaView} from 'react-native';
import firebase from 'react-native-firebase';

import Appcontainer from './src/router/index';



import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import { topLevelNavigate, setTopLevelNav } from './navigationService';

import moment from 'moment'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      push_val: '',
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

  async componentDidMount() {
      this.checkPermission();
      
        // this.createNotificationListeners();  
      
      
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






  // async createNotificationListeners() {
  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const UserId = JSON.parse(user_id)
  //   this.notificationListener = firebase.notifications().onNotification((notification) => {
  //     console.log("getting notification value here-------------",notification)
  //     if(notification._data.reciever_id == UserId ){
  //       const { title, body } = notification;
  //       // this.showAlert(title, body);
  //       Alert.alert(title, body)
  //     }    
  //     });      
  //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  //     console.log("getting notification open value here-------------",notificationOpen.notification)
  //     if(notificationOpen._data.reciever_id == UserId ){
  //       const { title, body } = notificationOpen.notification;
  //       Alert.alert(title, body)
  //       // this.showAlert(title, body);
  //     }        
  //     });
      
  //     const notificationOpen = await firebase.notifications().getInitialNotification();
  //     if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     Alert.alert(title, body)
  //       // this.showAlert(title, body);
  //     }
      
  //     this.messageListener = firebase.messaging().onMessage((message) => {
  //     console.log(JSON.stringify(message));
  //     });
  // }




  









  async createNotificationListeners() {
    console.log("getting inside the notifcation function - - - - - - -")
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)

    this.notificationListener = firebase.notifications().onNotification((notification) => {

      // .displayNotification(localNotification)
      // if(notification._data.reciever_id == UserId ){

        // const { title, body } = notification;


       
        // firebase.notifications().removeDeliveredNotification(notification.notificationId);      

        console.log("getting cosole veleu   1    ++++++++++++",notification)

        var notificationData = notification.data.extra_param

        if(notificationData != null && notificationData != undefined && notificationData != "") { 

            
          var newData = JSON.parse(notificationData)

          var student_name =  newData.student_name;
          var transaction_id = newData.transaction_id;
          var reservation_request_id = newData.reservation_request_id;
          var course_date = newData.course_date;
          var course_time = newData.course_time;
          var student_level =  newData.course_time;
      
          var request_start = new Date(newData.request_start)
          var request_end = new Date(newData.request_end)



          // var realEndTime =    new Date(request_end.setHours(request_end.getHours() - 1))

          var secondBetweenTwoDate = parseInt((request_end.getTime() - request_start.getTime()) / 1000);

            // const objchatscreens= {
            //       transaction_id: newData.transaction_id,
            //       teacher_id:newData.teacher_id,
            //       reservation_request_id: newData.reservation_request_id,
            //       student_name: newData.student_name,
            //       secondBetweenTwoDate:180,
            //       course_date:newData.course_date,
            //       course_time:newData.course_time,
            //       student_level:newData.student_level,

            //       }
            //   EventRegister.emit('myCustomEvent', objchatscreens)
                      topLevelNavigate('notification', {
                        student_name:student_name,
                        teacher_id:newData.teacher_id,
                        transaction_id:transaction_id,
                        reservation_request_id:reservation_request_id,
                        course_date:course_date,
                        course_time:course_time,
                        student_level:student_level,
                        request_end:request_end,
                        secondBetweenTwoDate:secondBetweenTwoDate
                      });
            }

            else {
              console.log("in the 1st case......",notification)
              const { title, body } = notification;        
              this.showAlert(title, body);
            }
    

        // this.setState({newData,secondBetweenTwoDate,transaction_id,reservation_request_id})

        // this.Show_Custom_Alert()    
        // this.showAlert(title, body);
      // }    
      });      

     


      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {


          console.log("getting inside the on notifcation open method- -  - - - - -")

        // firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId);


        // return false;

        console.log("getting cosole veleu 2   ++++++++++++",notificationOpen)
     
      // if(notificationOpen._data.reciever_id == UserId){             
        var notificationData = notificationOpen.notification.data.extra_param;
        if(notificationData != null && notificationData != undefined && notificationData != "") {
          var newData = JSON.parse(notificationData)

          var student_name =  newData.student_name;
          var transaction_id = newData.transaction_id;
          var reservation_request_id = newData.reservation_request_id;
          var course_date = newData.course_date;
          var course_time = newData.course_time;
          var student_level =  newData.course_time;
      
          var request_start = new Date(newData.request_start)
          var request_end = new Date(newData.request_end)



          // var realEndTime =    new Date(request_end.setHours(request_end.getHours() - 1))

          var secondBetweenTwoDate = parseInt((request_end.getTime() - request_start.getTime()) / 1000);
  
          // this.Show_Custom_Alert()
          console.log("inside the notification data funciton - - - - -")
          topLevelNavigate('notification', {
            student_name:student_name,
            teacher_id:newData.teacher_id,
            transaction_id:transaction_id,
            reservation_request_id:reservation_request_id,
            course_date:course_date,
            course_time:course_time,
            student_level:student_level,
            request_end:request_end,
            secondBetweenTwoDate:180
          });
  
          // const objchatscreens= {
          //   transaction_id: newData.transaction_id,
          //   teacher_id:newData.teacher_id,
          //   reservation_request_id: newData.reservation_request_id,
          //   student_name: newData.student_name,
          //   secondBetweenTwoDate:180,
          //   course_date:newData.course_date,
          //   course_time:newData.course_time,
          //   student_level:newData.student_level,
  
          //   }
          //   EventRegister.emit('myCustomEvent', objchatscreens)
        }
        else {
              const { title, body } = notificationOpen.notification;        
               this.showAlert(title, body);
        }

        // const { title, body } = notificationOpen.notification;        
        // this.showAlert(title, body);
      // }        
      });
      
     const notificationOpen = await firebase.notifications().getInitialNotification();
      // firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId);
      if (notificationOpen) {
  
      // console.log("getting when app in background_______________",notificationOpen.notification)
    
      // console.log("getting when app in background_______________",notificationOpen.notification.data.extra_param)
        
        var notificationData = notificationOpen.notification.data.extra_param;   
        var newData = JSON.parse(notificationData)

        var student_name =  newData.student_name;
        var transaction_id = newData.transaction_id;
        var reservation_request_id = newData.reservation_request_id;
        var course_date = newData.course_date;
        var course_time = newData.course_time;
        var student_level =  newData.course_time;
    
        var request_end = moment(newData.request_end)

        var currentTime = moment(new Date())

        var ActualCurentTime = request_end.diff(currentTime, 'seconds')
        // console.log("Current mimutes value----",) 

        var secondBetweenTwoDate = ActualCurentTime*60
               

        // var secondBetweenTwoDate = parseInt((realEndTime.getTime() - new Date().getTime()) / 1000);
        if(notificationData != null && notificationData != undefined && notificationData != "") {         
          console.log("inside the notification data funciton - - - - -")
          topLevelNavigate('notification', {
            student_name:student_name,
            teacher_id:newData.teacher_id,
            transaction_id:transaction_id,
            reservation_request_id:reservation_request_id,
            course_date:course_date,
            course_time:course_time,
            student_level:student_level,
            request_end:request_end,
            secondBetweenTwoDate:ActualCurentTime
          });
          // await AsyncStorage.setItem("notification", "true");      
          // await AsyncStorage.setItem("notificationData",notificationData)
          // console.log("getting one value here - -  - - - -")
         }
         else{         
          console.log("inside the notification data funciton else - - - - -")  
            const { title, body } = notificationOpen.notification;        
            this.showAlert(title, body);
         }

      
            
            }      
      // this.Show_Custom_Alert()
      this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
      });


  }















  showAlert = (title, message) => {
    Alert.alert(
    title,
    message,
    [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
    );
  }
  
  //3
 
  render() {
      return (
        <SafeAreaView style={{ flex:1}}>
          <Appcontainer ref={(r) => setTopLevelNav(r)} />
        </SafeAreaView>
      )
  }
}