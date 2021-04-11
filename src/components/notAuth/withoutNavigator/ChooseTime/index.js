import React, {Component,Fragment} from 'react';
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
  ImageBackground,
  Alert,BackHandler
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';
import rightIcon from '../../../../assets/icon/33.png';
import calenderIcon from '../../../../assets/icon/10.png';
import moment from 'moment';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import Styles from './indexCss';

import {RadioButton} from 'react-native-paper';

let today = '';


import {get_waiting_timeFunction,set_availability} from '../../../../Api/afterAuth';




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
      waitingTime:0,

      reserve_time:'',
      markedDates:'',
      markedDates_blue:'',
      day:'',
      date_slot:'',
      selectedStartDate: null,
      selectedEndDate: null,
      timeDuration:'',
      exacttime:'',
      date_slot:"",
      time_slot:"",
      exacttime_new:"",
      time_slot:[     
        {
          "id":"2",
          "value":"00:00-01:00"
        },
        {
          "id":"3",
          "value": "01:00-02:00",
        },
        {
          "id":"4",
          "value":"02:00-03:00",
        }, {
          "id":"5",
          "value":"03:00-04:00",
        },
        {
          "id":"6",
          "value":"04:00-:05:00"
        },
        {
          "id":"7",
          "value":"05:00-:06:00",
        },
        {
          "id":"8",
          "value":"06:00-07:00"
        },
        {
          "id":"9",
          "value": "07:00-08:00",
        },
        {
          "id":"10",
          "value": "08:00-09:00",
        },
        {
          "id":"11",
          "value": "09:00-10:00",
        },
        {
          "id":"12",
          "value": "10:00-11:00",
        },
        {
          "id":"13",
          "value":"11:00-12:00",
        },
        {
          "id":"14",
          "value": "12:00-13:00",
        },        
        {
          "id":"15",
          "value": "13:00-14:00",
        },        
        {
          "id":"16",
          "value": "14:00-15:00",
        },        
        {
          "id":"17",
          "value": "15:00-16:00",
        },        
        {
          "id":"18",
          "value": "16:00-17:00",
        },        
        {
          "id":"19",
          "value": "17:00-18:00",
        },        
        {
          "id":"20",
          "value":"18:00-19:00",
        },
        {
          "id":"21",
          "value": "19:00-20:00",
        },
        {
          "id":"22",
          "value":"20:00-21:00",
        },
        {
          "id":"23",
          "value": "21:00-22:00",
        },
        {
          "id":"24",
          "value":"22:00-23:00",
        },
        {
          "id":"25",
          "value":"23:00-00:00"
        },        
      ]
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










  componentDidMount = async () => {
    this.fetchget_waiting_timeFunction()

    // this.fetchTimeSlot()
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchget_waiting_timeFunction = async () => {
      const get_waiting_timeFunctionResponse = await get_waiting_timeFunction();
      if (get_waiting_timeFunctionResponse.result == true) {
        console.log("getting levels data ------------------- ",)
        var waitingTime = get_waiting_timeFunctionResponse.response.waiting_time
        console.log("getting get_waiting_timeFunctionResponse data----------",waitingTime)
      }
      this.setState({waitingTime});
      // console.log("getting country response----------------",levelsData.country_list)
    };
  






  
  
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
  
  
  
  
  
set_date = (day) => {

  const d = moment(day.dateString).format("YYYY-MM-DD")
this.setState({date_slot: d});
  // let color = 'rgba(255,100,120,10)'

  let color = "#b41565"


  if (this.state.markedDates[d]) {
    Alert.alert('Message', 'Veuillez choisir les dates!');
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


  
  
validateFunction() {
  const { amount_en,date_slot,time_slot,timeDuration } = this.state;

  let filters = this.state.time_slot.filter(i => i.isSelected);
 
 
   if(date_slot.length == 0){
    Alert.alert("Message","veuillez choisir une date! ")
  }
  if(filters && filters.length == 0) {
    return Alert.alert('Message',"veuillez choisir l'heure" );
  }
  else {   
    this.set_availabilityData()

  }
}





set_availabilityData = async () => {
  // console.log("getting inside the function level id " + this.state.level_id)

  const {
    time_slot,  
    date_slot   
  } = this.state;
 
  let timeslot = [];
  time_slot.map( i => {
   
    if(i.isSelected) {
      timeslot.push(i.value);
    }
  });
  console.log("checking time slot value ++++++++++++++++",timeslot)
  const set_availabilityResponse = await set_availability({
    date_slot,
    time_slot:timeslot
  });
 
  if (set_availabilityResponse.result == true) {
     if(set_availabilityResponse.response.status == true){
      console.log("getting seat availablivty response+++++++++++++++++",set_availabilityResponse.response) 
      Alert.alert("Message",set_availabilityResponse.response.message)
      this.props.navigation.navigate("home")
     }
     else{
      Alert.alert("Message",set_availabilityResponse.response.message)
     }
      
    // console.log("getting durationAmount data----------",durationAmount)
  }
  else{
    Alert.alert("Message",set_availabilityResponse.response.message)
  }
  // console.log("getting country response----------------",countryData.country_list)
};

// fetchTimeSlot(){
//    var newTimeSLot =   this.state.time_slot.map(i => ({...i, isSelected: false}))
//    this.setState({time_slot:newTimeSLot})
// }






  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#5541E1"
          hidden={false}
        />
        <View style={Styles.header}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Définir sa disponibilité</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.Show_Custom_Alert();
              }}>
              <Image source={rightIcon} style={Styles.headertxtInputImg2} />
            </TouchableOpacity>
            <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
        </View>

        <View style={Styles.mainContentView}>
          <ScrollView>
            <View style={Styles.subheaderView}>
              <Text style={Styles.subheaderTxt}>Choisissez une date</Text>
              <Image source={calenderIcon} style={Styles.headertxtInputImg1} />
            </View>          
                <Calendar
                  style={Styles.calenderStyle}
                  minDate={today}

                  onDayPress={(day) => this.set_date(day)}
                  onDateSelect={(date) => { console.log('selected Date', date) }}


                  markedDates={this.state.markedDates}

                  theme={{
                  backgroundColor: '#5495ED',
                  calendarBackground: '#5495ED',
                  textSectionTitleColor: '#000000',
                  textSectionTitleDisabledColor: '#000000',
                  dayTextColor: '#000000',
                  dotColor: 'red',
                  selectedDotColor: 'red',
                  // todayTextColor: '#000000',
                  todayTextColor: 'red',
                  arrowColor: '#000000',
                  indicatorColor: '#5541E1',
                  }}
                  />

            <View>
              <Text style={Styles.subheaderTxt}>
                Choisissez l'horaire du coaching
              </Text>

              <View style={Styles.txtMainView}>
                {/* <View style={{flexDirection: 'column'}}>
                  <Text style={Styles.txtHeaderView}>Durée de démarrage</Text>
                  <View style={Styles.SubTxtview}>
                    <Text style={Styles.timeTxtView}>14 H 30</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'column'}}>
                  <Text style={Styles.txtHeaderView}> La fin du temps</Text>
                  <View style={Styles.SubTxtview}>
                    <Text style={Styles.timeTxtView}>15 H 00</Text>
                  </View>
                </View> */}
            <ScrollView horizontal={true}>
                {
                  this.state.time_slot.map((singletimeslot,key)=>{
                    return(
                      <Fragment>
                        {
                          singletimeslot.isSelected ?

                          <TouchableOpacity 
                              onPress={()=>{
                              let oldState = [...this.state.time_slot];
                              oldState[key].isSelected = !oldState[key].isSelected;
                              this.setState({ time_slot: oldState });
                            }}
                           
                           >                           
                               <View style={{margin:6,borderColor:"#b41565",borderWidth:1,borderRadius:6,backgroundColor:"#b41565"}}>
                               <Text style={{margin:7,fontWeight:'700',color:"#FFFFFF",}}>{singletimeslot.value}</Text>
                               </View>
                               </TouchableOpacity>
                            :

                            <TouchableOpacity 
                            onPress={()=>{
                             let oldState = [...this.state.time_slot];
                             oldState[key].isSelected = !oldState[key].isSelected;
                             this.setState({ time_slot: oldState });
                           }}                             
                             >                           
                                 <View style={{margin:6,borderColor:'#b41565',borderWidth:1,borderRadius:6}}>
                                 <Text style={{margin:7,fontWeight:"700"}}>{singletimeslot.value}</Text>
                                 </View>
                                 </TouchableOpacity>

                        }
                       
                      </Fragment>
                    )
                  })
                }
             </ScrollView>



              </View>
            </View>

            <View style={Styles.continueBtn}>
              <TouchableOpacity
                onPress={()=>{this.validateFunction()}}
              >
                <Text style={Styles.continueBtnTxt}>+ Ajouter un créneau</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

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
                  backgroundColor: 'rgba(0,0,230,0.700)',
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
                    30 minutes, 27.05.2020, 17h00 à 21h00
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
                    Hardley Smith, Beginner
                  </Text>
                </View>








                  <View style={{margin:20,borderWidth:1,borderColor:"#FFFFFF",width:100,alignSelf:'center'}}>
                    <Text style={{alignSelf:'center',fontWeight:'700',color:"#FFFFFF"}}>
                      {this.state.waitingTime}
                    </Text>
                  </View>












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
                    onPress={() => {
                      this.Hide_Custom_Alert();
                    }}
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
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

// 13.Demande de coaching (request)
// Informations sur le coaching d'anglais
// 30 minutes, 27.05.2020, 17h00 à 21h00
//
//
// 00:37
//
// Décliner
