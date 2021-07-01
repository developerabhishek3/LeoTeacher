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

import Styles from './indexCss';
import BottomNavigator from '../../../../router/BottomNavigator';
import {teacher_availability,availability_times_delete} from '../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';


export default class index extends Component {

 constructor(props) {
     super(props)
     this.state={
         TimeSlots:[],
         isBodyLoaded: false,
         isSpinner: true,
     }
 }



  componentDidMount = async () => {

    this.fetchteacher_availability()
    
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
  fetchavailability_times_delete = async (nestedSingleArray,currentDate) => {    
    

    console.log("inside delete time slot API - - - - -  - - - - - -",nestedSingleArray,currentDate)    
        
    const availability_times_deleteResponse = await availability_times_delete({
      av_date:currentDate,
      av_time:nestedSingleArray
    });
    if (availability_times_deleteResponse.result == true) {     
      //  Alert.alert("Message",availability_times_deleteResponse.response.message) 
       this.fetchteacher_availability()
      
       
       console.log("getting timsslots inside API fcunction - - - - - -",availability_times_deleteResponse.response)
      //  var TimesSlot = availability_timesResponse.response.time_data     
    }         
  };


  fetchteacher_availability (){

    this.setState({ isSpinner: true }, async () => { 

      const teacher_availabilityResponse = await teacher_availability();
      if (teacher_availabilityResponse.result == true) {
        console.log("getting get academic detail data----------",teacher_availabilityResponse.response.availability)
        var TimeSlots = teacher_availabilityResponse.response.availability
        this.setState({TimeSlots,isBodyLoaded: true,isSpinner: false})
      }
     
      else{
        this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
          Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }  


     })
     
    // console.log("getting country response----------------",countryData.country_list)
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
          <Text style={Styles.headerTxt}>Mes disponibilités</Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("home");
        }}>
            <Image source={logo} style={Styles.headertxtInputImg} />
            </TouchableOpacity>
          </View>
        </View>




        <View style={{flexDirection: 'row',justifyContent: "space-between",width:"97%",margin:7}}>
          <TouchableOpacity  onPress={()=>{this.props.navigation.navigate("choosetime")}}>
              <Text style={{fontSize:13,margin:4,color:"gray",fontWeight:"700",marginStart:10}} >Nouvelles disponibilités</Text>
              <View style={{borderColor: 'gray', borderWidth: 1, width: SCREEN_WIDTH/2.3,marginStart:6,marginEnd:0}}  />
          </TouchableOpacity>

          <TouchableOpacity>
              <Text style={{fontSize:13,margin:4,marginEnd:10,color:"#b41565",fontWeight:"700"}}>Consulter mes disponibilités</Text>
              <View  style={{borderColor: '#b41565',borderWidth: 1, width: SCREEN_WIDTH/2.1,marginStart:4,marginEnd:-4}} />
          </TouchableOpacity>
          </View>






        <Spinner visible={this.state.isSpinner} />
        <View style={Styles.mainContentView}>


            { this.state.isBodyLoaded == true ?          
              <ScrollView>
                      {
                          this.state.TimeSlots.map((singleMap,index)=>{
                              let currentDate = singleMap.date_slot
                              var newdate = currentDate.split("-").reverse().join("/");
                              let timeslot = singleMap.time_slot
                              var nameArr = timeslot.split(',');
                              console.log("getting all splited time slotes - -  - - - -  -",nameArr)
                              return(
                                  <View style={{margin:10,borderWidth:0,borderWidth:0,flexDirection: 'row',justifyContent:'center',alignItems: 'center'}}>
                                      <View style={{borderWidth:0,width:"50%",}}>
                                          <Text style={{fontWeight: '700',fontSize:16,marginStart:10}} >{newdate}</Text>
                                      </View>

                                      <View style={{margin:15}}>
                                          {
                                              nameArr.map((nestedSingleArray)=>{
                                                  return(
                                                      <View style={{borderColor:"#000",borderWidth:1,alignSelf: 'flex-end',flexDirection: 'row',justifyContent: 'center',alignItems:"center",margin:4}}>
                                                          <Text style={{fontSize:12,margin:10,padding:9,margin:6}}>{nestedSingleArray}</Text>
                                                          <TouchableOpacity  onPress={()=>{this.fetchavailability_times_delete(nestedSingleArray,currentDate)}}>
                                                                <Image source={require("../../../../assets/icon/17.png")} style={{height:27,width:27,margin:3}} />
                                                          </TouchableOpacity>
                                                      </View>
                                                  )                                           
                                              })
                                          }
                                    </View>
                                  </View>
                              )
                          })
                      }

            </ScrollView>










          :<View>
            <Text></Text>
            </View>


        }

        </View>

        <BottomNavigator
          currentRoute={'choosetime'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
