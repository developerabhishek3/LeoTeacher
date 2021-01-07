import React, {Component} from 'react';
import {View, Text, Animated, Easing, Image, StatusBar,Dimensions,Alert, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';                

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import { EventRegister } from 'react-native-event-listeners'
 

export default class Splash extends Component {
  constructor() {
    super();
    //  this.RotateValueHolder = new Animated.Value(0);
  }

  // componentDidMount() {    
  //   this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
  //     console.log("Splash Data _________________________",data)
  //     console.log("Checking inside rendering++++++++++++++++++++++")     
  //     this.props.navigation.navigate('notification', {         
  //     })        
  //     })
  //     console.log("getting when app is coming outside------")

  //   setTimeout(() => {

  //     this.props.navigation.replace('welcome');

  //   }, 3000);
  // }

 async componentDidMount(){


    this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
        console.log("Splash Data _________________________",data)

        console.log("Splash Data 2_________________________",data.secondBetweenTwoDate)

        console.log("Checking inside rendering++++++++++++++++++++++")     
        this.props.navigation.navigate('notification', {  
          transaction_id: data.transaction_id,
          teacher_id:data.teacher_id,
          reservation_request_id: data.reservation_request_id,
          student_name: data.student_name,
          secondBetweenTwoDate:data.secondBetweenTwoDate,
          course_date:data.course_date,
          course_time:data.course_time,
          student_level:data.student_level,
        })        
        })

    const notification = await AsyncStorage.getItem('notification') || 'false';
    const notificationDataValue = await AsyncStorage.getItem("notificationData")
    

    // console.log("again checking i am here----------",notificationDataValue.student_name)
    // console.log("again checking i am here----------",JSON.parse(notificationDataValue.student_name))



    setTimeout(() => {
      if(notification == 'true'){        
        
  
    
        var newData = JSON.parse(notificationDataValue)
    
        var student_name =  newData.student_name;
        var transaction_id = newData.transaction_id;
        var reservation_request_id = newData.reservation_request_id;
        var course_date = newData.course_date;
        var course_time = newData.course_time;
        var student_level =  newData.course_time;
    
        var request_end = new Date(newData.request_end)
        var request_start = new Date(newData.request_start)
    
        var secondBetweenTwoDate = parseInt((request_end.getTime() - new Date().getTime()) / 1000);





        this.props.navigation.navigate('notification',{
          student_name:student_name,
          transaction_id:transaction_id,
          reservation_request_id:reservation_request_id,        
          course_date:course_date,
          course_time:course_time,
          student_level:student_level,
          secondBetweenTwoDate:secondBetweenTwoDate      
        });                                        
      }
      else{
        this.props.navigation.replace('welcome')
      }
      
    }, 3000);
  }



  // componentWillUnmount() {
  //   EventRegister.removeEventListener(this.listener)
  //   }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',          
        }}>
          <StatusBar hidden={true} />
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
            justifyContent:'center'
          }}
          source={require('../../../assets/Splash2.png')}
          // source={require('../../assets/splash.png')}
        >         
           <View style={{justifyContent:'center',marginTop:90}}> 

            <Image
          resizeMode="stretch"
          style={{
            width: 100,
            height: 120,            
            alignSelf:'center',
          }}
          source={require('../../../assets/icon/96.png')}
          // source={require('../../assets/splash.png')}
         /> 
         <View style={{marginTop:SCREEN_HEIGHT/7,}}>  
          <Text
           style= {{
              color:'#FFFFFF',
              textAlign:'center',
                fontSize:28,
                fontWeight:'700',               
                fontFamily:'Montserrat-Regular'
            }}
          >
            Application mobile LEO,
          </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            fontWeight:'700',
                            margin:3,                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >
                  Pratiquez votre anglais oral avec                                      
                  </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            margin:3,
                            fontWeight:'700',                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >                
                    un coach, où vous voulez,                    
                  </Text>
                  <Text
                      style= {{
                          color:'#FFFFFF',
                          textAlign:'center',
                            fontSize:18,
                            margin:3,
                            fontWeight:'700',                                
                            fontFamily:'Montserrat-Regular'
                        }}
                  >                
                    quand vous voulez !                   
                  </Text>
                  </View>
            </View>

        </ImageBackground>
      </View>
    );
  }
}
