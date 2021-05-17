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


 async componentDidMount(){

  setTimeout(() => {
        
    this.props.navigation.replace('welcome') 
  }, 3000);
    // this.listener = EventRegister.addEventListener('myCustomEvent', (data) => {
    //     console.log("Splash Data _________________________",data)

    //     console.log("Splash Data 2_________________________",data.secondBetweenTwoDate)

    //     console.log("Checking inside rendering++++++++++++++++++++++")     
    //     this.props.navigation.navigate('notification', {  
    //       transaction_id: data.transaction_id,
    //       teacher_id:data.teacher_id,
    //       reservation_request_id: data.reservation_request_id,
    //       student_name: data.student_name,
    //       secondBetweenTwoDate:data.secondBetweenTwoDate,
    //       course_date:data.course_date,
    //       course_time:data.course_time,
    //       student_level:data.student_level,
    //     })        
    //     })

  }

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
            width: 120,
            height: 160,            
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
           Application mobile SPYK,
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
                 Join us!                                  
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
                  Gagnez de l'argent en parlant anglais,                   
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
                   Où vous voulez, quand vous voulez !             
                  </Text>
                  </View>
            </View>

        </ImageBackground>
      </View>
    );
  }
}
