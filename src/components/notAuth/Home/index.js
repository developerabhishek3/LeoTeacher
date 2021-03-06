import React, { Component } from 'react'
import { View,Text,ScrollView, StatusBar,Image,TouchableOpacity,Modal,Dimensions,TextInput,BackHandler,Alert,Switch,ImageBackground} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import { ECharts } from "react-native-echarts-wrapper";
import logo from '../../../assets/icon/96.png'
import Styles from './indexCss'
import {RadioButton} from 'react-native-paper';

import watch from '../../../assets/icon/22.png'
import Spinner from 'react-native-loading-spinner-overlay';
import {online_offline_status,online_offlineFunction,home_count_data,bussiness_monthly} from '../../../Api/afterAuth'

import { VictoryBar,VictoryChart } from "victory-native";


let email_global
let switch_global
let push_global
let switch_global2


export default class index extends Component {

  constructor(props){
    super(props)
    this.state={
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,


       //check switch value

       switchValue:false,
       isBodyLoaded: false,
       isSpinner: true,
       isSwitchOn: false,
       MySettingDate:[],
       total_coaching_given:0,
       remuneration_total:0,
       SwitchOnValueHolder: false,
       SwitchOnValueHolder2:false,
     
       BusinessMonthlyData:[],
       
       email_notification:1,
       data1:[
         {
            "id":"1",
            "value":"COURS RÉSERVÉS"
         },
         {
          "id":"",
          "value":"COURS INSTANTANÉS"
         }
       ],
       chooseOption:false,
       isCourseInstant:false,
       online_offline:1,
       bussiness_data: {
        "Jan": 0,
        "Fév": 0,
        "Mars": 0,
        "Avril": 0,
        "Mai": 0,
        "Juin": 0,
        "Juillet": 0,
        "Aug": 2,
        "Sept": 0,
        "Oct": 0,
        "Nov": 0,
        "Dec": 1
        },

       newgData:[
      { x: "JAN", y: 9 },
      { x: "FEB", y:  10},
      { x: "MAR", y:  30},
      { x: "APRIL", y:  17},
      { x: "MAY", y:  33},
      { x: "JUNE", y:  6},
      { x: "JULY", y:  3},
      { x: "JULY", y:  43},
      { x: "JULY", y:  33},
      { x: "JULY", y:  63},
      { x: "JULY", y:  81},
      { x: "JULY", y:  3}
    ]


    
    }

  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('choosetime')
  }

  componentDidMount(){
    this.FetchBusinessData()
        this.fetchHomeCountData()
    this.Getonline_offline_status()
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
      }


      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.handleBackButton(this.props.navigation));
      }
      handleBackButton = (nav) => {
        if (!nav.isFocused()) {
          console.log("getting inside the if conditin--------------")
          return true;
        } else {
          console.log("getting inside the else conditin---------------")
          Alert.alert(
            'Exit App',
            'Do you want to Exit..', [{
              text: 'Cancel',
              style: 'cancel'
            }, {
              text: 'Exit',
              onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
          })
          return true;
        }
      }
    












      FetchupdateSettings = async (value,email_global) => {   
  
        const {           
            // email_notification:email_global,     
            online_offline,
       } = this.state;
       console.log("email confiramtion  and push confirmation -------------------",email_global,value,push_global)
        const online_offlineResponse = await online_offlineFunction({               
          online_offline:email_global
        });
        if (online_offlineResponse.result === true) {
          console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",online_offlineResponse.response)
      
          this.Getonline_offline_status();        
        } else {
          this.myAlert('Error', online_offlineResponse.error);
          console.log('getting error here-------------');
        }
        return;
      };
      
      
      
      
      Getonline_offline_status =  () => {
        this.setState({ isSpinner: true }, async () => {
        const online_offline_statusResponse = await online_offline_status();
        if (online_offline_statusResponse.result === true) {        
        console.log("getting date here>>>>>>>>>>>>>>>>>>>>",online_offline_statusResponse.response)
        // var online_offline = parseInt(online_offline_statusResponse.response.online_offline)  
      
        var online_offline = online_offline_statusResponse.response.online_offline
        console.log("I am here-------------------",online_offline)
      
          if (online_offline == 0) {
          this.setState({      
          online_offline: 0,  SwitchOnValueHolder:false }); }
          else if(online_offline == 1){
            this.setState({ online_offline: 1, SwitchOnValueHolder:true })
          }
      
          if(online_offline == 0) {
            this.setState({online_offline : 0,SwitchOnValueHolder2:false})
          }
          else if(online_offline == 1){
            this.setState({ online_offline: 1, SwitchOnValueHolder2:true })
          }
          this.setState({
            isBodyLoaded: true,
            isSpinner: false,
            isCurrenetComponentRefreshing:false,
            // online_offline: online_offline_statusResponse.response.online_offline,      
            // email_notification:email_notification,
            online_offline:online_offline,        
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
      })     
      };
      
      
      
      checkSwitch  = (value) => {
        console.log("getting value inside the function--1111111111-------------",value)  // this.setState({email_notification:!this.state.email_notification})
      
          if (value == true) { 
            console.log("inside true  11111>>>>>", value)
            this.setState({
            online_offline:1,   
            SwitchOnValueHolder: value
            
            })
            email_global = 1,switch_global = value
            }
          
            else if (value == false) {
              console.log("inside false111111111 >>>>>", value)         
                this.setState({
                  online_offline:0, SwitchOnValueHolder: value
                  }) 
                  email_global = 0,switch_global = value     
            console.log("getting finally here---111111111111--------",switch_global,email_global)
            }      
          this.FetchupdateSettings(value,email_global)    
        };
      
      
        fetchHomeCountData = async () => {   
          const home_count_dataResponse = await home_count_data();
          if (home_count_dataResponse.result === true) {
            var remuneration_total = home_count_dataResponse.response.remuneration_total;
            var total_coaching_given = home_count_dataResponse.response.total_coaching_given

            this.setState({remuneration_total,total_coaching_given})
            console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",home_count_dataResponse.response)
               
          } else {           
            console.log('getting error here-------------');
          }
          return;
        };


        

        
      FetchBusinessData = async () => {   
  
     

        const bussiness_monthlyResponse = await bussiness_monthly({               
          year:"2021"
        });
        if (bussiness_monthlyResponse.result === true) {
          var BusinessMonthlyData =  bussiness_monthlyResponse.response.bussiness_data
          console.log("getting inside state velue---------------",BusinessMonthlyData)
          console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",bussiness_monthlyResponse.response)
      
       
        } else {
          this.myAlert('Error', bussiness_monthlyResponse.error);
          console.log('getting error here-------------');
        }
        return;
      };
        






      FetchafterContinue = async () => {     
       console.log("email confiramtion  and push confirmation -------------------",email_global,value,push_global)
        const online_offlineResponse = await online_offlineFunction({               
          online_offline:"1"
        });
        if (online_offlineResponse.result === true) {
          console.log("getting result here ----------------->>>>>>>>>>>>>>>>>>>-",online_offlineResponse.response)
      
          this.Getonline_offline_status();        
        } else {
          this.myAlert('Error', online_offlineResponse.error);
          console.log('getting error here-------------');
        }
        return;
      };














  render() {

    let gradphData = Object.keys(this.state.bussiness_data)

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <StatusBar barStyle={"light-content"} backgroundColor="blue" hidden={false} />
        <Spinner visible={this.state.isSpinner} />
          <View style={Styles.header} >
          <Text style={Styles.headerTxt}></Text>
          <Text style={Styles.headerTxt}>Accueil   </Text>
          <Image source={logo} style={Styles.headertxtInputImg} />
          </View>
          
          <ScrollView>


        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>

        <ImageBackground                  
                      resizeMode='cover' 
                      source={require("../../../assets/icon/green.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80}}                      
                    >


                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:1,width:"60%",textAlign:'left',marginTop:15}}>Rémunération totale</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/books.png")} style={{height:35,width:35,margin:4}} />
                           <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{this.state.remuneration_total}</Text>
                        </View>
                        </View>

                     

                    </ImageBackground>



                    <ImageBackground                  
                      resizeMode='cover' 
                      source={require("../../../assets/icon/skyblue.png")}
                      style={{alignSelf:'center',width:SCREEN_WIDTH/2.2,height:80,marginEnd:10}}                      
                    >


                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:"#FFFFFF",fontWeight:'700',margin:1,width:"60%",textAlign:'left',marginTop:15}}>Nombre de 
coaching donné</Text>
                        <View  style={{borderWidth:0,alignItems:"center",justifyContent:"center"}}>
                          <Image source={require("../../../assets/icon/books.png")} style={{height:35,width:35,margin:4}} />
                           <Text style={{color:"#FFFFFF",fontWeight:'700',marginStart:3}}>{this.state.total_coaching_given}</Text>
                        </View>
                        </View>

                     

                    </ImageBackground>

        </View>





          
          <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>

<Text style={{width:280,margin:10,borderWidth:0,fontWeight:'600',fontSize:14}} >Vous êtes hors ligne maintenant.
Mettez - vous en mode "en ligne" pour être  visible par 
les étudiants et être contacté pour un call in English.</Text>

{/* <Text style={{fontWeight:'600',fontSize:16,paddingStart:20}}>Email Notification</Text> */}
      <Switch

      trackColor={{ true: '#FF1493', false: 'grey' }}
      // thumbColor='#6FB8EF'

      onTintColor="#FF1493"
      thumbColor="#fff"
      onValueChange={(value) => this.checkSwitch(value)}                      
      value={this.state.SwitchOnValueHolder}
      ></Switch>

  
</View>


          <VictoryChart
  // theme={VictoryTheme.material}
  domainPadding={10}
>
  <VictoryBar
    style={{ data: { fill: "skyblue",width:10 } }}
    // data={this.state.newgData}

    
  
    
    data={[
      { x: "JAN", y: 2 },
      { x: "FEB", y:  10},
      { x: "MAR", y:  30},
      { x: "APRIL", y:  17},
      { x: "MAY", y:  33},
      { x: "JUNE", y:  6},
      { x: "JULY", y:  3},
      { x: "JULY", y:  43},
      { x: "JULY", y:  33},
      { x: "JULY", y:  63},
      { x: "JULY", y:  97},
      { x: "JULY", y:  3}
    ]}
  />
</VictoryChart>









          
          <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      this.Show_Custom_Alert()
                    }}
                    // onPress={()=>{this.props.navigation.navigate("levelchoice")}}
                    >
                    <Text style={Styles.continueBtnTxt}>Définissez votre disponibilité</Text>
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
                height: SCREEN_HEIGHT /2.7,
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
                 <Image source={watch} style={{height:80,width:80,margin:10}} />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    alignSelf: 'center',
                    fontWeight: '700',
                    margin:10,
                    marginTop:-10,
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
                  {
                    this.state.data1.map((singleMap,key)=>{
                      return(
                        <View style={{margin:7,marginBottom:10}}>
                          {
                             this.state.checked == key ? 
                             <TouchableOpacity 
                             onPress={()=>{this.setState({checked:key,})}}
                            //  onPress={()=>{
                            //    let oldState = [...this.state.data1];
                            //    oldState[key].isSelected = !oldState[key].isSelected;
                            //    this.setState({ data1: oldState });
                            //  }}
                           style={{flexDirection:'row',alignItems:'center'}}>
                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                          <Text style={{color:"green"}}>{singleMap.value}</Text>
                       </TouchableOpacity>
                       :
                       <TouchableOpacity 
                       onPress={()=>{this.setState({checked:key,})}}
                        //  onPress={()=>{
                        //    let oldState = [...this.state.data1];
                        //    oldState[key].isSelected = !oldState[key].isSelected;
                        //    this.setState({ data1: oldState });
                        //  }}
                         style={{flexDirection:'row',alignItems:'center'}}>
                         <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                         <Text style={{color:"gray"}}>{singleMap.value}</Text>
                         </TouchableOpacity>
                          }                               
                        </View>
                      )
                    })
                  }
                </View>           
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf:'center',
                  borderRadius:6,
                  textAlign: 'center',
                  margin: 5,                
                }}>
                <TouchableOpacity
                  onPress={() => this.Hide_Custom_Alert()}                 
                  style={{
                   
                    backgroundColor: '#FF1493',
                    justifyContent: 'center',
                    margin: 10,
                    marginStart: 25,
                    marginEnd: 25,
                    height: 35,
                    borderRadius:6,
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
            </View>
          </View>
        </Modal>










          <BottomNavigator
            currentRoute={'home'}
            navigation={this.props.navigation}
        />
      </View>
    )
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