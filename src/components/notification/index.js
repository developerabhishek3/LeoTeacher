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




import AsyncStorage from '@react-native-community/async-storage';
import { ImageBackground } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay';


import { reservation_request_accept_reject } from "../../Api/afterAuth";
import CountDown from 'react-native-countdown-component';



import * as RNLocalize from "react-native-localize"

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
      teacher_id:0,
      student_name:"",
      secondBetweenTwoDate:0,
      course_date:"",
      course_time:"",
      student_level:""


    };
  }


  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }

  Hide_Custom_Alert() {
    console.log("inside hidfe ==============")
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("home")
  }

  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate("home")
  }

  async componentDidMount() {

    await AsyncStorage.setItem('notification','false')
    let keys = ['notificationData'];
    AsyncStorage.multiRemove(keys)



    let transaction_id = this.props.navigation.getParam("transaction_id")
    let teacher_id= this.props.navigation.getParam("teacher_id")
    let  reservation_request_id =this.props.navigation.getParam("reservation_request_id")
    let  student_name = this.props.navigation.getParam("student_name")
    let secondBetweenTwoDate = this.props.navigation.getParam("secondBetweenTwoDate")
    let course_date = this.props.navigation.getParam("course_date")
    let course_time = this.props.navigation.getParam("course_time")
    let student_level = this.props.navigation.getParam("student_level")



    this.setState({
      transaction_id,teacher_id,reservation_request_id,student_name,student_level,course_date,course_time,secondBetweenTwoDate
    })


    console.log("getting all values--------","transaction id"+transaction_id, "teacher id"+teacher_id,"reservation_request_id"+reservation_request_id,"student_name"+student_name,"secondBetweenTwoDate"+secondBetweenTwoDate,"course_date"+course_date,"course_time"+course_time,"student_level"+student_level)



    this.Show_Custom_Alert()
    console.log("Finding device time zone +??????????????????",RNLocalize.getTimeZone());
//add this line
  }

  

  fetchreservation_request_Accept = async () => {
    // this.setState({ spinner: true }, async () => {
    console.log("getting inside the function of acceprt+++++++++++++++++ " + this.state.transaction_id,              this.state.reservation_request_id)

    const {transaction_id,reservation_request_id,} = this.state;
    const reservation_requestAcceptResponse = await reservation_request_accept_reject({
      transaction_id,
      reservation_request_id,
    accept_reject:"1"
    });
    if (reservation_requestAcceptResponse.result == true) {
     console.log("getting after filter response====================",reservation_requestAcceptResponse.response)
    var filteredData = reservation_requestAcceptResponse.response.revenue_list;
    var totalFilterAmount = reservation_requestAcceptResponse.response.total_amount
    this.setState({isBodyLoaded:true,isSpinner:false,filteredData,filterKay:true,totalFilterAmount})
    Alert.alert("Message",reservation_requestAcceptResponse.response.message)
    this.Hide_Custom_Alert()
      
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Something went wrong!", [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ])
        }, 200)
      })
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});
  // })
  };









  
  fetchreservation_request_Reject = async () => {
    // this.setState({ spinner: true }, async () => {
    console.log("getting inside the function of REJECt+++++++++++++++++ " + this.state.transaction_id,              this.state.reservation_request_id)

    const {transaction_id,reservation_request_id,} = this.state;
    const reservation_requestREjectResponse = await reservation_request_accept_reject({
    transaction_id,
    reservation_request_id,
    accept_reject:"0"
    });
    if (reservation_requestREjectResponse.result == true) {
     console.log("getting after filter response====================",reservation_requestREjectResponse.response)
    var filteredData = reservation_requestREjectResponse.response.revenue_list;
    var totalFilterAmount = reservation_requestREjectResponse.response.total_amount
    this.setState({isBodyLoaded:true,isSpinner:false,filteredData,filterKay:true,totalFilterAmount})
    Alert.alert("Message",reservation_requestREjectResponse.response.message)
    this.Hide_Custom_Alert()
      
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Something went wrong!", [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ])
        }, 200)
      })
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});
  // })
  };


  render() {

    const {newData} = this.state;   
    console.log("inside render ==============",this.state.secondBetweenTwoDate)

      return (
        <SafeAreaView style={{ flex:1}}>        
          <View>            
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
                   {/* {newData.course_date} {newData.course_time} */}
                   {this.state.course_date}  {this.state.course_time}
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
                  {this.state.student_name}  
                  </Text>
                </View>


                 












              <View style={{justifyContent:'center',alignItems:'center'}}>
                   <ImageBackground
                   source={require("../../assets/icon/timer.png")}
                    // source={require("./src/assets/icon/timer.png")}
                    style={{justifyContent:'center',alignItems:'center',height:210,width:210}}
                   >  
                   <View style={{marginTop:30}}>
                   <CountDown
                   size={8}
                   until={this.state.secondBetweenTwoDate}
                  // until={10}
                   onFinish={() => this.setState({secondBetweenTwoDate:0,isButtonEnable:false})}
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


        

          </View>
        </SafeAreaView>
      )
  }
}