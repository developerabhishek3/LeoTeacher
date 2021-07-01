import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {duration_amount_by_level,modified_reservation} from '../../../../Api/afterAuth';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from './indexCss';

import {RadioButton} from 'react-native-paper';

let today = '';



let newDaysObject4 = [];

import {reschedule_reservation} from '../../../../Api/afterAuth'



LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      alertValue:"",
      amount_en: 0,
      durationAmount: [],
      time_duration: '',
      level_id: 1,


      isSpinner: true,  
      isBodyLoaded: true,        
      reserve_time:'',
      markedDates:'',
      markedDates_blue:'',
      day:'',
      reserve_date:'',
      selectedStartDate: null,
      selectedEndDate: null,
      timeDuration:'',
      exacttime:'',
      date_slot:"",
      time_slot:"",
      exacttime_new:"",
      dateArray: [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
      ],
      dateArray2: [
        '00:00',    
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',

      ],
    };
    today = moment().format('YYYY-MM-DD');
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('Search');
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('reservation');
  }

   showTimeSlot = () => {
    let currentDate = new Date();
    let currentMinute = currentDate.getMinutes();
    if(currentMinute >= 30){ 
      currentDate.setMinutes(0)+currentDate.setMinutes(0);
      currentDate.setHours(currentDate.getHours() + 1);
    }
    else{
      currentDate.setMinutes(30);
    }
    let  i=1;
    let dateArray = [];
    while(i<=48){
        let pushDate = new Date(currentDate);
      dateArray.push(pushDate);
      currentDate.setMinutes(currentDate.getMinutes()+30);
      i++;
    }
    this.setState({dateArray});
    console.log("inside the time slot function  - -  - -",dateArray);
  }





  async componentDidMount() {
   
 
    setInterval(() => {   
      this.checkTimeDuration()      
    }, 1000);



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








reschedule_reservationFunction(){

  


  setTimeout(() => {
    this.setState({ isSpinner: true }, async () => { 
      let reservation_id = this.props.navigation.getParam("reservation_id")
      // console.log("gettin after contnue funtion =====================",this.state.reserve_date,          this.state.exacttime)
      let newReserveTime = this.state.reserve_time;
  
      let time_slot_new = `${newReserveTime}-${this.state.exacttime} `

      console.log("timeslot ===========",time_slot_new, newReserveTime, reservation_id,this.state.reserve_date)
          

      // return false;

      const reschedule_reservationResponse = await reschedule_reservation({
        reservation_id:reservation_id,
        course_date:this.state.reserve_date,
        course_time:time_slot_new
      });
      if (reschedule_reservationResponse.result === true) {
        if(reschedule_reservationResponse.response.status === true){
          console.log("getting response ------------------------",reschedule_reservationResponse.response)
          // this.paypalFunction()
          this.setState({ isSpinner: false })
          this.props.navigation.navigate('reservation', {         
          });              
        }
      else {
              Alert.alert("Message", reschedule_reservationResponse.response.message)
              this.setState({ isSpinner: false })
      }
        // console.log("getting result here --------", )     
          // await AsyncStorage.setItem("token", JSON.stringify(reschedule_reservationResponse.response.token));            
      } else {
        Alert.alert('Error', reschedule_reservationResponse.error);
        this.setState({ isSpinner: false })   // console.log('getting error here-------------');
      }
      return;
})

  }, 1000);

    
};






checkTimeDuration () {   
  let new_time = this.state.reserve_time  
  let course_duration = this.props.navigation.getParam("course_duration")
  // console.log("getting reserve time ===========",new_time) 

  // console.log("geting inside check time duration =========",this.state.timeDuration,           this.state.reserve_time)

  if(course_duration == `30 minutes`) {

    var exacttime = moment(new_time, 'HH:mm A')       
    .add(30, 'minutes')
    .format("HH:mm")
    setTimeout(() => {
      this.setState({exacttime})
    }, 700);
   

    // console.log("gett   1111111---------",exacttime)
   } 
   else{
    var exacttime = moment(new_time, 'HH:mm A')       
    .add(60, 'minutes')
    .format("HH:mm")
    setTimeout(() => {
      this.setState({exacttime})
    }, 700);

    // console.log("gett   22222222---------",exacttime)
   }
}









validateFunction() {
  const { amount_en,reserve_date,reserve_time,timeDuration } = this.state;
  // if(!timeDuration){
  //   let alertValue = "Veuillez choisir la durée!"
  //   this.setState({alertValue})
  //   this.Show_Custom_Alert()    
  //   // Alert.alert("Message","Veuillez choisir la durée!")
  //   // this.props.navigation.navigate("firstvalidationcheck")
  // }  
  if(!reserve_date){
    let alertValue = "Veuillez choisir la date!"
    this.setState({alertValue})
    this.Show_Custom_Alert()   
    // Alert.alert("Message","Veuillez choisir la date!")
    // this.props.navigation.navigate("secondvalidationcheck")
  }
  else if(!reserve_time){
    let alertValue = "Veuillez choisir l'heure!"
    this.setState({alertValue})
    this.Show_Custom_Alert() 
    // console.log("gettig here or not abhishek------------",reserve_time)
    // Alert.alert("Message","Veuillez choisir l'heure !")
    // this.props.navigation.navigate("thirdvalidationcheck")
  }
  else {   
    this.reschedule_reservationFunction()

  }
}











set_date = (day) => {

  const d = moment(day.dateString).format("YYYY-MM-DD")
this.setState({reserve_date: d});
  // let color = 'rgba(255,100,120,10)'

  let color = "#b41565"


  if (this.state.markedDates[d]) {
    Alert.alert('Message', 'Veuillez choisir les dates!');
    // this.props.navigation.navigate("secondvalidationcheck")
  } else{

    const markedDates_blue = {

      ...this.state.markedDates_blue,
      
      [d]: {
      ...this.state.markedDates_blue[d],
      selected:true,
      selectedColor: color,
      marked: true
      }
      }
      this.setState({ markedDates: markedDates_blue })
  }



  // console.log("selected marked date --------",markedDates_blue)
};











  render() {
    const {durationAmount, dateArray,dateArray2} = this.state;

    // console.log('getting day -- -', this.state.day);

    let reservation_id = this.props.navigation.getParam("reservation_id")
    let course_duration = this.props.navigation.getParam("course_duration")
  

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
          {/* <Spinner visible={this.state.isSpinner} 
        /> */}
        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Ma réservation</Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("home");
        }}>
            <Image source={logo} style={Styles.headertxtInputImg} />
            </TouchableOpacity>
          </View>
        </View>


        <View style={Styles.mainContentView}>          
          {/* {
            this.state.isBodyLoaded  == true ?             */}
            <ScrollView>


         
             

           
            

        

            <View style={Styles.subheaderView}>
              <Text style={Styles.subheaderTxt}>Choisissez une date</Text>
              <Image source={calenderIcon} style={Styles.headertxtInputImg1} />
            </View>

            <View
              style={{
                height: 380,
                borderWidth: 0,
                backgroundColor: '#B3AAFC',
                borderRadius: 10,
              }}>
            





                  <Calendar

                     style={Styles.calenderStyle}
                  minDate={today}

                  onDayPress={(day) => this.set_date(day)}
                  onDateSelect={(date) => { console.log('selected Date', date) }}


                  markedDates={this.state.markedDates}

                   theme={{
                  backgroundColor: '#B3AAFC',
                  calendarBackground: '#B3AAFC',
                  textSectionTitleColor: '#000000',
                  textSectionTitleDisabledColor: '#000000',
                  dayTextColor: '#000000',
                  dotColor: 'red',
                  selectedDotColor: 'red',
                  // todayTextColor: '#000000',
                  todayTextColor: 'red',
                  arrowColor: '#000000',
                  indicatorColor: 'blue',
                }}

                  />


                {
                    course_duration == `30 minutes`


                    ?




                    <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#B3AAFC',
                      marginTop: -10,
                      width: '96%',
                      alignSelf: 'center',
                    }}>
                    <ScrollView horizontal={true}>
                      {dateArray.map((singleTime, Index) => {
                        // console.log("getting time here--------------",singleTime)
                        return (
                          <View
                            style={{flexDirection: 'row', margin: 3, height: 30}}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({reserve_time: singleTime});
                              }}>
                              {this.state.reserve_time == singleTime ? (
                                <View
                                  style={{
                                    borderWidth: 0,
                                    backgroundColor: '#b41565',
                                    flexDirection: 'row',
                                    margin: 1,
                                    borderRadius: 7,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      margin: 4,
                                      color: '#FFFFFF',
                                      fontSize: 12,
                                      fontFamily: 'OpenSans-Bold',
                                      textAlign: 'center',
                                    }}>{singleTime}</Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    borderWidth: 1,
                                    borderColor: '#b41565',
                                    flexDirection: 'row',
                                    margin: 1,
                                    borderRadius: 7,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      margin: 4,
                                      color: '#FFFFFF',
                                      fontSize: 12,
                                      fontFamily: 'OpenSans-Bold',
                                      textAlign: 'center',
                                    }}>{singleTime}</Text>
                                </View>
                              )}
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>



                    :





              
                    <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#B3AAFC',
                      marginTop: -10,
                      width: '96%',
                      alignSelf: 'center',
                    }}>
                    <ScrollView horizontal={true}>
                      {dateArray2.map((singleTime, Index) => {
                        // console.log("getting time here--------------",singleTime)
                        return (
                          <View
                            style={{flexDirection: 'row', margin: 3, height: 30}}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({reserve_time: singleTime});
                              }}>
                              {this.state.reserve_time == singleTime ? (
                                <View
                                  style={{
                                    borderWidth: 0,
                                    backgroundColor: '#b41565',
                                    flexDirection: 'row',
                                    margin: 1,
                                    borderRadius: 7,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      margin: 4,
                                      color: '#FFFFFF',
                                      fontSize: 12,
                                      fontFamily: 'OpenSans-Bold',
                                      textAlign: 'center',
                                    }}>{singleTime}</Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    borderWidth: 1,
                                    borderColor: '#b41565',
                                    flexDirection: 'row',
                                    margin: 1,
                                    borderRadius: 7,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      margin: 4,
                                      color: '#FFFFFF',
                                      fontSize: 12,
                                      fontFamily: 'OpenSans-Bold',
                                      textAlign: 'center',
                                    }}>{singleTime}</Text>
                                </View>
                              )}
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
    
    
    
    
    





                }







            </View>

        
           
                  <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {                                    
                      this.validateFunction()
                    }}>
                    <Text style={Styles.continueBtnTxt}>Valider</Text>
                  </TouchableOpacity>
                  </View>


           



          </ScrollView> 
            {/* : null
          } */}









                  
          <Modal
            visible={this.state.Alert_Visibility}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Alert_Visibility);
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
                      source={require("../../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
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
                      this.Hide_Custom_Alert();
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






       
        </View>
      </View>
    );
  }
}

