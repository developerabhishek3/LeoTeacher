import React from 'react';
import {AppRegistry, Alert, View,SafeAreaView,Platform} from 'react-native';
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
    // console.log("getting inside the notifcation function - - - - - - -")
    const user_id = await AsyncStorage.getItem('user_id');
    const UserId = JSON.parse(user_id)

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const localNotification = new firebase.notifications.Notification({      
        show_in_foreground: true,

      })      
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('notificationchannel') // e.g. the id you chose above
        .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
        .android.setColor('#000000') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
         const { title, body } = notification;

      const { fcm_push_response, fcm_order_id } = notification._data
      console.log("notificatin_data:::::::::::::::::::::::",notification._data)
      // this.displayNotification(title, body, fcm_push_response, fcm_order_id);

        console.log("getting cosole veleu   1    ++++++++++++",notification)

        var notificationData = notification.data.extra_param

        if(notificationData != null && notificationData != undefined && notificationData != "") { 

            
          var newData = JSON.parse(notificationData)

          var student_name =  newData.student_name;          
          var transaction_id = newData.transaction_id;
          var reservation_request_id = newData.reservation_request_id;
          var course_date = newData.course_date;
          var course_time = newData.course_time;
          var student_level =  newData.student_level;
          var course_duration = newData.course_duration
          var waiting_time = newData.waiting_time;
      
          var request_start = new Date(newData.request_start)
          var request_end = new Date(newData.request_end)


          var secondBetweenTwoDate = parseInt((request_end.getTime() - request_start.getTime()) / 1000);
         
                      topLevelNavigate('notification', {
                        student_name:student_name,                        
                        course_duration:course_duration,
                        teacher_id:newData.teacher_id,
                        transaction_id:transaction_id,
                        reservation_request_id:reservation_request_id,
                        course_date:course_date,
                        course_time:course_time,
                        student_level:student_level,
                        request_end:request_end,
                        secondBetweenTwoDate:waiting_time
                      });
            }

            else {
              // console.log("in the 1st case......",notification)
              const { title, body } = notification;        
              this.showAlert(title, body);
            }
       
      });      

     


      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {


        // const localNotification = new firebase.notifications.Notification({      
        //   show_in_foreground: true,
  
        // })      
        //   .setNotificationId(notificationOpen.notification.notificationId)
        //   .setTitle(notificationOpen.notification.title)
        //   .setBody(notificationOpen.notification.body)
        //   .android.setChannelId('notificationchannel') // e.g. the id you chose above
        //   .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
        //   .android.setColor('#000000') // you can set a color here
        //   .android.setPriority(firebase.notifications.Android.Priority.High);
        //   firebase.notifications()
        //   .displayNotification(localNotification)
        //   .catch(err => console.error(err));
        //    const { title, body } = notification;
  
        // const { fcm_push_response, fcm_order_id } = notification._data
        // console.log("notificatin_data:::::::::::::::::::::::",notification._data)
        // this.displayNotification(title, body, fcm_push_response, fcm_order_id);



        //   console.log("getting inside the on notifcation open method- -  - - - - -")
        console.log("getting cosole veleu 2   ++++++++++++",notificationOpen)
     
      // if(notificationOpen._data.reciever_id == UserId){             
        var notificationData = notificationOpen.notification.data.extra_param;
        if(notificationData != null && notificationData != undefined && notificationData != "") {
          var newData = JSON.parse(notificationData)

          var student_name =  newData.student_name;
          var course_duration = newData.course_duration
          var transaction_id = newData.transaction_id;
          var reservation_request_id = newData.reservation_request_id;
          var course_date = newData.course_date;
          var course_time = newData.course_time;
          var student_level =  newData.student_level;
      
          var request_start = new Date(newData.request_start)
          // var request_end = new Date(newData.request_end)

          // var waiting_time = newData.waiting_time;



          var request_end = moment(newData.request_end)
          var currentTime = moment(new Date())
          var ActualCurentTime = request_end.diff(currentTime, 'seconds')  
          var secondBetweenTwoDate = ActualCurentTime
          // var realEndTime =    new Date(request_end.setHours(request_end.getHours() - 1))

          // var secondBetweenTwoDate = parseInt((request_end.getTime() - request_start.getTime()) / 1000);
  
          // this.Show_Custom_Alert()
          // console.log("inside the notification data funciton - - - - -")
          topLevelNavigate('notification', {
            student_name:student_name,
            course_duration:course_duration,
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
              const { title, body } = notificationOpen.notification;        
               this.showAlert(title, body);
        }
              
      });
      
     const notificationOpen = await firebase.notifications().getInitialNotification();
     

      // firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId);
      if (notificationOpen) {

      
        const localNotification = new firebase.notifications.Notification({      
          show_in_foreground: true,
  
        })      
        //   .setNotificationId(notificationOpen.notification.notificationId)
        //   .setTitle(notificationOpen.notification.title)
        //   .setBody(notificationOpen.notification.body)
        //   .android.setChannelId('notificationchannel') // e.g. the id you chose above
        //   .android.setSmallIcon('@mipmap/ic_launcher') // create this icon in Android Studio
        //   .android.setColor('#000000') // you can set a color here
        //   .android.setPriority(firebase.notifications.Android.Priority.High);
        //   firebase.notifications()
        //   .displayNotification(localNotification)
        //   .catch(err => console.error(err));
        //    const { title, body } = notification;
  
        // const { fcm_push_response, fcm_order_id } = notification._data
        // console.log("notificatin_data:::::::::::::::::::::::",notification._data)
        // this.displayNotification(title, body, fcm_push_response, fcm_order_id);







        console.log("on the background mode notification gettt - - -- - - -",notificationOpen.notification.data)
        var notificationData = notificationOpen.notification.data.extra_param;   
        var newData = JSON.parse(notificationData)

        var student_name =  newData.student_name;
        var course_duration = newData.course_duration;
        var transaction_id = newData.transaction_id;
        var reservation_request_id = newData.reservation_request_id;
        var course_date = newData.course_date;
        var course_time = newData.course_time;
        var student_level =  newData.student_level;
        var waiting_time = newData.waiting_time;

    
        var request_end = moment(newData.request_end)



        // console.log("getting request_end time  - -  - - - - -",request_end)

        var currentTime = moment(new Date())

        // console.log("Getting current time - - - "+currentTime)

        var ActualCurentTime = request_end.diff(currentTime, 'seconds')


        // console.log("Getting actual time value - -  -  - -",ActualCurentTime)
       
        var secondBetweenTwoDate = ActualCurentTime

        // console.log("second b/w 2 values - -  - - -  -",secondBetweenTwoDate)
               

        // var secondBetweenTwoDate = parseInt((realEndTime.getTime() - new Date().getTime()) / 1000);
        if(notificationData != null && notificationData != undefined && notificationData != "") {         
          // console.log("inside the notification data funciton - - - - -")
          topLevelNavigate('notification', {
            student_name:student_name,
            course_duration:course_duration,
            teacher_id:newData.teacher_id,
            transaction_id:transaction_id,
            reservation_request_id:reservation_request_id,
            course_date:course_date,
            course_time:course_time,
            student_level:student_level,
            request_end:request_end,
            secondBetweenTwoDate:secondBetweenTwoDate
          });
          // await AsyncStorage.setItem("notification", "true");      
          // await AsyncStorage.setItem("notificationData",notificationData)
          // console.log("getting one value here - -  - - - -")
         }
         else{         
          // console.log("inside the notification data funciton else - - - - -")  
            const { title, body } = notificationOpen.notification;        
            this.showAlert(title, body);
         }
            }      
      // this.Show_Custom_Alert()
      this.messageListener = firebase.messaging().onMessage((message) => {
        console.log("gettign on the message listenre - -  - - - - - -",message)


      //   if (Platform.OS === Constants.ANDROID) {
      //     const localNotification = new firebase.notifications.Notification()
      //         .setNotificationId(message.messageId)
      //         .setTitle(JSON.parse(message.data.custom_notification).title)
      //         .setBody(JSON.parse(message.data.custom_notification).body)
      //         .android.setChannelId('fetchh-channel') // e.g. the id you chose above
      //         .android.setSmallIcon('R.mipmap.ic_launcher') // create this icon in Android Studio
      //         .android.setPriority(firebase.notifications.Android.Priority.High);

      //     firebase.notifications()
      //         .displayNotification(localNotification)
      //         .catch(err => console.error(err));

      //     // if (JSON.parse(message.data.custom_notification).title === Constants.SECURITY_ALERT) {
      //     //     this.props.navigation.navigate('SignOut');
      //     // }
      // }

        // console.log("gettign on the message listenre 2nd - -  - - - - - -",message.data.data.payload)
      // console.log(JSON.stringify(message));
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