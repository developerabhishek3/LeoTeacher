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
  BackHandler,
  Alert,
  Switch,
  ImageBackground,
  RefreshControl,  
} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Stars from 'react-native-stars';
import {CheckBox, Overlay, Button} from 'react-native-elements';

import {ECharts} from 'react-native-echarts-wrapper';
import logo from '../../../assets/icon/96.png';
import Styles from './indexCss';
import {RadioButton} from 'react-native-paper';

import watch from '../../../assets/icon/22.png';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  online_offline_status,
  online_offlineFunction,
  home_count_data,
  bussiness_monthly,
  my_rate_review
} from '../../../Api/afterAuth';

import {VictoryBar, VictoryChart,VictoryTheme} from 'victory-native';

let email_global;
let switch_global;
let push_global;
let switch_global2;
import RNRestart from 'react-native-restart';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      isCurrenetComponentRefreshing:false,
      ratingCount:0,
      reviewCount:0,
      Model_Visibility1: false,
      Alert_Visibility1: false,
      //check switch value

      switchValue: false,
      isBodyLoaded: false,
      isSpinner: true,
      isSwitchOn: false,
      MySettingDate: [],
      total_coaching_given: 0,
      remuneration_total: 0,
      SwitchOnValueHolder: false,
      SwitchOnValueHolder2: false,


      // ComposeData : [{"x": "Jan", "y": 2}, {"x": "Mars", "y": 0}, {"x": "Mai", "y": 12}, {"x": "Juillet", "y": 0}, {"x": "Sept", "y": 7}, {"x": "Nov", "y": 10}],
      ComposeData:[],

    

      BusinessMonthlyData: [],

      email_notification: 1,
      data1: [
        {
          id: '1',
          value: 'COURS RÉSERVÉS',
        },
        {
          id: '',
          value: 'COURS INSTANTANÉS',
        },
      ],
      checked1: false,
      checked2: false,
      reserveCourseCheck:false,
      backHandlerTitle:"", 
      alertValue:"",
      online_offline: 1,
      bussiness_data: {
        Jan: 0,
        Fév: 0,
        Mars: 0,
        Avril: 0,
        Mai: 0,
        Juin: 0,
        Juillet: 0,
        Août: 2,
        Sept: 0,
        Oct: 0,
        Nov: 0,
        Dec: 1,
      },

      newgData: [
        {x: 'JAN', y: 9},
        {x: 'FEB', y: 10},
        {x: 'MAR', y: 30},
        {x: 'APRIL', y: 17},
        {x: 'MAY', y: 33},
        {x: 'JUNE', y: 6},
        {x: 'JULY', y: 3},
        {x: 'JULY', y: 43},
        {x: 'JULY', y: 33},
        {x: 'JULY', y: 63},
        {x: 'JULY', y: 81},
        {x: 'JULY', y: 3},
      ],
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false,checked1:false,checked2:false});
    this.props.navigation.navigate('choosetime');
  }

  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false,checked2:false,checked1:false});
  this.FetchForCourseInstant()
  }


  Show_Custom_Alert1(visible,) {
    this.setState({Alert_Visibility1: visible});
  }
  Hide_Custom_Alert2() {
    this.setState({Alert_Visibility1: false}); 
    // this.props.navigation.navigate("login")    
  }



  componentDidMount() {
    // setTimeout(() => {
      
    setTimeout(() => {
      this.FetchBusinessData();
      this.my_rate_reviewData()
      this.Getonline_offline_status();
    this.fetchHomeCountData();
    this.FetchForCourseInstant()
    }, 100);
    // setTimeout(() => {
    //   this.checkCourseInstant()
    // }, 100);
    // RNRestart.Restart();
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
      // console.log('getting inside the if conditin--------------');
      return true;
    } else {
      let backHandlerTitle = "Quitter Spyk"
      let alertValue = "Voulez-vous vraiment quitter l'application Spyk ?"
      this.setState({alertValue,backHandlerTitle})
      this.Show_Custom_Alert1()
      // console.log('getting inside the else conditin---------------');
      // Alert.alert(
      //   'Exit App',
      //   'Do you want to Exit..',
      //   [
      //     {
      //       text: 'Cancel',
      //       style: 'cancel',
      //     },
      //     {
      //       text: 'Exit',
      //       onPress: () => BackHandler.exitApp(),
      //     },
      //   ],
      //   {
      //     cancelable: false,
      //   },
      // );
      return true;
    }
  };

  FetchupdateSettings = async (value, email_global) => {
    const {
      // email_notification:email_global,
      online_offline,
    } = this.state;
    // console.log(
    //   'email confiramtion  and push confirmation -------------------',
    //   email_global,
    //   value,
    //   push_global,
    // );
    const online_offlineResponse = await online_offlineFunction({
      online_offline: email_global,
    });
    if (online_offlineResponse.result === true) {
      // console.log(
      //   'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
      //   online_offlineResponse.response,
      // );

      this.Getonline_offline_status();
    } else {
      Alert.alert('Error', online_offlineResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  Getonline_offline_status = () => {
    this.setState({isSpinner: true}, async () => {
      const online_offline_statusResponse = await online_offline_status();
      if (online_offline_statusResponse.result === true) {
        // console.log(
        //   'getting date here>>>>>>>>>>>>>>>>>>>>',
        //   online_offline_statusResponse.response,
        // );
        // var online_offline = parseInt(online_offline_statusResponse.response.online_offline)

        var online_offline =
          online_offline_statusResponse.response.online_offline;
        // console.log('I am here-------------------', online_offline);

        if (online_offline == 0) {
          this.setState({
            online_offline: 0,
            SwitchOnValueHolder: false,
          });
        } else if (online_offline == 1) {
          this.setState({online_offline: 1, SwitchOnValueHolder: true});
        }

        if (online_offline == 0) {
          this.setState({online_offline: 0, SwitchOnValueHolder2: false});
        } else if (online_offline == 1) {
          this.setState({online_offline: 1, SwitchOnValueHolder2: true});
        }
        this.setState({
          isBodyLoaded: true,
          isSpinner: false,
          isCurrenetComponentRefreshing: false,
          // online_offline: online_offline_statusResponse.response.online_offline,
          // email_notification:email_notification,
          online_offline: online_offline,
        });
      } else {
        this.setState({isBodyLoaded: false, isSpinner: false}, () => {
          Alert.alert('Message', 'Something Went Wrong Try Again!', [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.goBack();
              },
            },
          ]);
        });
      }
    });
  };

  checkSwitch = (value) => {


    if (value == true) {
      // console.log('inside true  11111>>>>>', value);
      this.setState({
        online_offline: 1,
        SwitchOnValueHolder: value,
      });
      (email_global = 1), (switch_global = value);
    } else if (value == false) {
      // console.log('inside false111111111 >>>>>', value);
      this.setState({
        online_offline: 0,
        SwitchOnValueHolder: value,
      });
      (email_global = 0), (switch_global = value);
      // console.log(
      //   'getting finally here---111111111111--------',
      //   switch_global,
      //   email_global,
      // );
    }
    this.FetchupdateSettings(value, email_global);
  };

  fetchHomeCountData = async () => {
    const home_count_dataResponse = await home_count_data();
    if (home_count_dataResponse.result === true) {
      var remuneration_total =
        home_count_dataResponse.response.remuneration_total;
      var total_coaching_given =
        home_count_dataResponse.response.total_coaching_given;

      this.setState({remuneration_total, total_coaching_given,isCurrenetComponentRefreshing:false,});
      // console.log(
      //   'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
      //   home_count_dataResponse.response,
      // );
    } else {
      // console.log('getting error here-------------');
    }
    return;
  };






  my_rate_reviewData = async () => {
    const my_rate_reviewDataResponse = await my_rate_review();
    if (my_rate_reviewDataResponse.result == true) {
      var ratingCount =  my_rate_reviewDataResponse.response.rating;
      var reviewCount =  my_rate_reviewDataResponse.response.review;
      console.log("response in the rating API-----------",my_rate_reviewDataResponse.response)
      this.setState({ratingCount,reviewCount});
      // console.log(
      //   'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
      //   my_rate_reviewDataResponse.response,
      // );
    } else {
      // console.log('getting error here-------------');
    }
    return;
  };














  FetchBusinessData = async () => {
    const bussiness_monthlyResponse = await bussiness_monthly({
      year: '2021',
    });
    if (bussiness_monthlyResponse.result === true) {
      var BusinessMonthlyData =
        bussiness_monthlyResponse.response.bussiness_data;
      console.log(
        'getting inside state velue---------------',
        BusinessMonthlyData,
      );
      let newArray = [];
      newArray.push(BusinessMonthlyData)

     
      newArray.map((singleMap)=>{
      
        let categoryKey1 = Object.keys(singleMap)[0]
        console.log("getting methd 1============",categoryKey1)
        let categoryKey2 = Object.keys(singleMap)[1]
        console.log("getting methd 2============",categoryKey2)
        let categoryKey3 = Object.keys(singleMap)[2]
        let categoryKey4 = Object.keys(singleMap)[3]
        let categoryKey5 = Object.keys(singleMap)[4]
        let categoryKey6 = Object.keys(singleMap)[5]
        let categoryKey7 = Object.keys(singleMap)[6]
        console.log("getting methd 7============",categoryKey7)
        let categoryKey8 = Object.keys(singleMap)[7]
        let categoryKey9 = Object.keys(singleMap)[8]
        let categoryKey10 = Object.keys(singleMap)[9]
        let categoryKey11 = Object.keys(singleMap)[10]
        let categoryKey12 = Object.keys(singleMap)[11]


       let categoryValue1  = Object.values(singleMap)[0]
      // let categoryValue1  = 0.3
        let categoryValue2  = Object.values(singleMap)[1]
        let categoryValue3  = Object.values(singleMap)[2]
        let categoryValue4  = Object.values(singleMap)[3]
        let categoryValue5 = Object.values(singleMap)[4]
        let categoryValue6  = Object.values(singleMap)[5]
        let categoryValue7 = Object.values(singleMap)[6]
        let categoryValue8  = Object.values(singleMap)[7]
        let categoryValue9  = Object.values(singleMap)[8]
        let categoryValue10  = Object.values(singleMap)[9]
        let categoryValue11  = Object.values(singleMap)[10]
        let categoryValue12  = Object.values(singleMap)[11]
        
        let newcategoryValue1 = 0.1
       
          // this.setState({
          //   categoryKey1,categoryKey2,categoryKey3,categoryKey4,categoryKey5,categoryKey6,
          //   categoryKey7,categoryKey8,categoryKey9,categoryKey10,categoryKey11,categoryKey12,    
          //   categoryValue1,categoryValue2,categoryValue3,categoryValue4,categoryValue5,categoryValue6,
          //   categoryValue7,categoryValue8,categoryValue9,categoryValue10,categoryValue11,categoryValue12
          // })
           
              const newgData  = [
                {x:categoryKey1,y:categoryValue1 ==  0 || null || undefined || ""  ? newcategoryValue1 : categoryValue1  },
                {x:categoryKey2,y:categoryValue2},
                {x:categoryKey3,y:categoryValue3},
                {x:categoryKey4,y:categoryValue4},
                {x:categoryKey5,y:categoryValue5},
                {x:categoryKey6,y:categoryValue6},
                {x:categoryKey7,y:categoryValue7},
                {x:categoryKey8,y:categoryValue8},
                {x:categoryKey9,y:categoryValue9},
                {x:categoryKey10,y:categoryValue10},
                {x:categoryKey11,y:categoryValue11},
                {x:categoryKey12,y:categoryValue12},
              ]
              // console.log("gettin new dataa  -  - - - -",newgData)
              this.setState({ComposeData:newgData})
  
        // console.log("getting abhi ot not categoryValue =========",categoryValue[0])
      })

     
    } else {
      Alert.alert('Error', bussiness_monthlyResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };

  FetchafterContinue = async () => {
    // console.log(
    //   'email confiramtion  and push confirmation -------------------',
    //   email_global,
    //   value,
    //   push_global,
    // );
    const online_offlineResponse = await online_offlineFunction({
      online_offline: '1',
    });
    if (online_offlineResponse.result === true) {
      // console.log(
      //   'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
      //   online_offlineResponse.response,
      // );

      this.Getonline_offline_status();
    } else {
      Alert.alert('Error', online_offlineResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };















  FetchForCourseInstant = async () => {
  
    const online_offlineResponse = await online_offlineFunction({
      online_offline: "1",
    });
    if (online_offlineResponse.result === true) {
   
      console.log("checking api response for course instant case-----------",online_offlineResponse.response)
      this.Getonline_offline_status();
      
    } else {
      Alert.alert('Error', online_offlineResponse.error);
      // console.log('getting error here-------------');
    }
    return;
  };



checkCourseInstant(){
  this.setState({checked2: !this.state.checked2,reserveCourseCheck:true,checked1:false})
}


checkReserveCourse(){
  this.setState({checked1:!this.state.checked1,reserveCourseCheck:false,checked2:false})
}





  render() {
  
      // console.log("inside render------------",this.state.SwitchOnValueHolder)
      const {ratingCount,reviewCount}  = this.state;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/> */}
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="#5541E1"
          hidden={false}
        />
        <Spinner visible={this.state.isSpinner} />
        <View style={Styles.header}>
          <Text style={Styles.headerTxt}></Text>
          <Text style={Styles.headerTxt}>Accueil </Text>
          <Image source={logo} style={Styles.headertxtInputImg} />
        </View>

        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchHomeCountData();
                      },100)  }} />
                    }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <ImageBackground
              resizeMode="cover"
              source={require('../../../assets/icon/green.png')}
              style={{
                alignSelf: 'center',
                width: SCREEN_WIDTH / 2.2,
                height: 80,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    margin: 1,
                    width: '60%',
                    textAlign: 'left',
                    marginTop: 15,
                  }}>
                  Rémunération totale
                </Text>
                <View
                  style={{
                    borderWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/icon/wallet.png')}
                    style={{height: 35, width: 35, margin: 4}}
                  />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '700',
                      marginStart: 3,
                    }}>
                    {this.state.remuneration_total}
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <ImageBackground
              resizeMode="cover"
              source={require('../../../assets/icon/skyblue.png')}
              style={{
                alignSelf: 'center',
                width: SCREEN_WIDTH / 2.2,
                height: 80,
                marginEnd: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    margin: 1,
                    width: '60%',
                    textAlign: 'left',
                    marginTop: 15,
                  }}>
                 Nombre de coachings donnés
                </Text>
                <View
                  style={{
                    borderWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/icon/books.png')}
                    style={{height: 35, width: 35, margin: 4}}
                  />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '700',
                      marginStart: 3,
                    }}>
                    {this.state.total_coaching_given}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>






                          <View style={{flexDirection: 'row',justifyContent:"center"}}>
                                    <Stars
                                    // update={(rating)=>{this.setState({rating: rating})}}
                                    disabled={true}
                                      default={this.state.ratingCount}
                                      count={5}
                                      half={true}
                                      starSize={30}
                                      fullStar={<Image source={require("../../../assets/icon/111.png")} style={{height:27,width:27,margin:3}} />}
                                      emptyStar={<Image source={require("../../../assets/icon/112.png")} style={{height:27,width:27,margin:3}} />}
                                      halfStar={<Image source={require("../../../assets/icon/113.png")} style={{height:27,width:27,margin:3}} />}
                                    />
                                    <Text style={{marginStart:10,color:"gray",fontSize:24,fontWeight:"600",margin: 3}}>{reviewCount} Avis </Text>
                                  </View>




          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
              {
                this.state.SwitchOnValueHolder == true ?


                <Text
                style={{
                  width: 280,
                  margin: 10,
                  color:"gray",
                  borderWidth: 0,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
               Vous êtes en ligne. Les membres peuvent réserver
                un coaching immédiat avec vous. 
              </Text>
                :
                <Text
                style={{
                  width: 280,
                  margin: 10,
                  color:"gray",
                  borderWidth: 0,
                  fontWeight: '700',
                  fontSize: 14,
                }}>
              Vous êtes en mode hors ligne. Les membres ne peuvent pas vous contacter pour un
              coaching immédiat.
              </Text>
              }
          

            {/* <Text style={{fontWeight:'600',fontSize:16,paddingStart:20}}>Email Notification</Text> */}
            <Switch
              trackColor={{true: '#b41565', false: 'grey'}}
              // thumbColor='#6FB8EF'

              onTintColor="#b41565"
              thumbColor="#fff"
              onValueChange={(value) => this.checkSwitch(value)}
              value={this.state.SwitchOnValueHolder}></Switch>
          </View>

       
          <ScrollView horizontal={true} >  
          <View style={{borderWidth:0}}>  


          <VictoryChart    
            width={560}
            theme={VictoryTheme.material}
            domainPadding={{ x: 20 }}
            //  theme={VictoryTheme.material}            
            // domainPadding={10}
            >             
            <VictoryBar
              //  barWidth={({ index }) => index * 2 + 8}
              style={{data: {fill: '#00bfff',margin:20 }}}   barRatio={10} barWidth={18}            
              data={this.state.ComposeData}           
              // date ={
              //   [{"x": "Jan", "y": 0}, {"x": "Fév", "y": 0}, {"x": "Mars", "y": 0}, {"x": "Avril", "y": 0}, {"x": "Mai", "y": 0}, {"x": "Juin", "y": 0}, {"x": "Juillet", "y": 0}, {"x": "Aug", "y": 0}, {"x": "Sept", "y": 0}, {"x": "Oct", "y": 0}, {"x": "Nov", "y": 0}, {"x": "Dec", "y": 0}]
              // }
            />         
          </VictoryChart>
          </View>
          </ScrollView>
         

          <View style={Styles.continueBtn}>
            <TouchableOpacity
              // onPress={() => {
              //   this.Show_Custom_Alert();
              // }}
              onPress={()=>{this.props.navigation.navigate('choosetime');}}
            >
              <Text style={Styles.continueBtnTxt}>
                Définissez votre disponibilité
              </Text>
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                height: SCREEN_HEIGHT / 2.7,
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
                    source={watch}
                    style={{height: 80, width: 80, margin: 10}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin: 10,
                    marginTop: -10,
                    color: '#000000',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Je suis disponible pour
                </Text>
              </View>
              <View style={Styles.radiobtnMainView}>
                {/* <RadioButton.Group
                    onValueChange={(value) => this.setState({value})}
                    value={this.state.value}>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="first" />
                      <Text style={Styles.radiobtnText}>COURS RÉSERVÉS</Text>
                    </View>
                    <View style={Styles.radioBtnView}>
                      <RadioButton value="second" />
                      <Text style={Styles.radiobtnText}>COURS INSTANTANÉS</Text>
                    </View>                   
                  </RadioButton.Group> */}
                {/* {this.state.data1.map((singleMap, key) => {
                  return (
                    <View style={{margin: 7, marginBottom: 10}}>
                      {this.state.checked == key ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({checked: key});
                          }}
                          //  onPress={()=>{
                          //    let oldState = [...this.state.data1];
                          //    oldState[key].isSelected = !oldState[key].isSelected;
                          //    this.setState({ data1: oldState });
                          //  }}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={require('../../../assets/icon/8.png')}
                            style={{height: 20, width: 20, margin: 3}}
                          />
                          <Text style={{color: 'green'}}>
                            {singleMap.value}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({checked: key});
                          }}
                          //  onPress={()=>{
                          //    let oldState = [...this.state.data1];
                          //    oldState[key].isSelected = !oldState[key].isSelected;
                          //    this.setState({ data1: oldState });
                          //  }}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={require('../../../assets/icon/4.png')}
                            style={{height: 20, width: 20, margin: 3}}
                          />
                          <Text style={{color: 'gray'}}>{singleMap.value}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })} */}








            <View
              style={{
                width: '94%',
                borderWidth: 1,
                borderColor:"#DDDDDD",
                borderRadius: 10,
                elevation: 0,
                shadowColor: '#FFFFFFF',
                shadowOffset: 3,
                shadowOpacity: 1,
                alignSelf: 'center',
                margin:3,              height: 40,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', margin: 3, marginStart: 10,alignItems:'center',justifyContent:'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent: 'center',
                  }}>                 
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginStart: 10,
                      marginEnd: 4,
                    }}>
                   COURS RÉSERVÉS
                  </Text>
                </View>
                <View style={{margin: 10,alignSelf:'flex-end'}}>
                  <CheckBox
                    checked={this.state.checked1}
                    onPress={() =>
                      // this.setState({checked1: !this.state.checked1,})
                      this.checkReserveCourse()
                    }

                    checkedIcon={
                      <Image
                        source={require('../../../assets/icon/9.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../assets/icon/4.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: '94%',
                borderWidth: 1,
                borderColor:"#DDDDDD",
                borderRadius: 10,
                elevation: 0,
                margin:3,
                shadowColor: '#FFFFFFF',
                shadowOffset: 3,
                shadowOpacity: 1,
                alignSelf: 'center',
       
                height: 40,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', margin: 3, marginStart: 10,alignItems:'center',justifyContent:'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent: 'center',
                  }}>                 
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginStart: 10,
                      marginEnd: 4,
                    }}>
                   COURS INSTANTANÉS
                  </Text>
                </View>
                <View style={{margin: 10,alignSelf:'flex-end'}}>
                  <CheckBox
                    checked={this.state.checked2}
                    onPress={() =>
                      // this.setState({checked2: !this.state.checked2,reserveCourseCheck:true})
                      this.checkCourseInstant()
                    }
                    checkedIcon={
                      <Image
                        source={require('../../../assets/icon/9.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={require('../../../assets/icon/4.png')}
                        style={{
                          width: 24,
                          height: 24,
                          borderWidth: 0,
                        }}
                      />
                    }
                  />
                </View>
              </View>
            </View>

              </View>
              {
                this.state.checked1 == true || this.state.checked2 == true ?

                <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 6,
                  textAlign: 'center',
                  margin: 5,
                }}>
                <TouchableOpacity
               onPress={() => {
                {
                  this.state.reserveCourseCheck == true ?

                  this.Hide_Custom_Alert1()

                  :

                  this.Hide_Custom_Alert()
                  
                }
                
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
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>

                :

                <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  borderRadius: 6,
                  textAlign: 'center',
                  margin: 5,
                }}>
                <TouchableOpacity                            
                  style={{
                    borderColor: '#b41565',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderWidth:1,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      color: '#b41565',
                      fontSize: 18,
                      marginStart: 20,
                      marginEnd: 20,
                      fontWeight: '700',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>




              }
             
            </View>
          </View>
        </Modal>





        
        <Modal
            visible={this.state.Alert_Visibility1}
            animationType={'fade'}
            transparent={true}
            onRequestClose={() => {
              this.Show_Custom_Alert1(!this.state.Alert_Visibility1);
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
                      source={require("../../../assets/icon/17.png")}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 6,                      
                      color: 'gray',
                      textAlign: 'center',                      
                    }}>
                     {/* Veuillez entrer votre nouveau mot de passe de confirmation */}
                     {this.state.backHandlerTitle}
                  </Text>



                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,    
                      marginTop:-6,                  
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
                    justifyContent:'space-around',
                    alignItems: 'center',                    
                    margin: 5,
                  }}>
                  <TouchableOpacity                 
                    onPress={() => {                      
                      this.Hide_Custom_Alert2();
                    }}
                    style={{
                      backgroundColor: '#b41565',
                      justifyContent: 'center',
                      margin: 20,                
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 20,
                        marginEnd: 20,
                        margin:9,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                         Annuler
                    </Text>
                  </TouchableOpacity>                



                  <TouchableOpacity                 
                    onPress={() => {                      
                      BackHandler.exitApp()
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
                        marginStart: 20,
                        marginEnd: 20,
                        margin:9,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                        Quitter Spyk
                    </Text>
                  </TouchableOpacity> 
                </View>
              </View>
            </View>
          </Modal> 



        <BottomNavigator
          currentRoute={'home'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

// import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
// import { ECharts } from "react-native-echarts-wrapper";

// export default class App extends Component {
//   option = {
//     xAxis: {
//       type: "category",
//       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//     },
//     yAxis: {
//       type: "value"
//     },
//     series: [
//       {
//         data: [3, 4, 6, 9, 13, 16, 20],
//         type: "line"
//       }
//     ]
//   };

//   render() {
//     return (
//       <View style={styles.chartContainer}>
//         <ECharts
//           option={this.option}
//           // backgroundColor="rgba(93, 169, 81, 0.3)"
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   chartContainer: {
//     flex: 1
//   }
// });
