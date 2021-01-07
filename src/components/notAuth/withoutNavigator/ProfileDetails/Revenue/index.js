import React, {Component,Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  BackHandler
} from 'react-native';

import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import cross from '../../../../../assets/icon/26.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import DatePicker from 'react-native-datepicker';

import {teacher_revenue,teacher_revenue_filter,demand_amount} from '../../../../../Api/afterAuth'


import { CheckBox, Overlay, Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import calenderIcon from '../../../../../assets/icon/10.png'



export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      TeacherRevenue:[],
      totalAmount:0,
      isBodyLoaded: false,
      isSpinner: true,
      from_date: new Date(),
      to_date: new Date(),
      date: new Date(),
      filteredData:[],
      filterKay:false,
      totalFilterAmount:0,

      checked1:false,
      isdemandButtonEnable:false,
      transaction_ids:[],
      TotalCheckAmount:0,
      to_bank_or_paypal_account:"",
      data1:[
        {
          "id":"1",
          "value":"vers man compte bancaire"
        },
        {
          "id":"2",
          "value":"vers man compte paypal"
        }
      ]
    };
  }



  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    this.props.navigation.navigate('profile2');
  }







  componentDidMount = async () => {
    setInterval(() => {
        this.amountAfterCheck() 
    }, 1000);
   
  this.fetchteacher_revenueData()
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








  fetchteacher_revenueData() {
    this.setState({ spinner: true }, async () => {
    const teacher_revenueResponse = await teacher_revenue();
    if (teacher_revenueResponse.result == true) {

      var TeacherRevenue = teacher_revenueResponse.response.revenue_list;
      var totalAmount = teacher_revenueResponse.response.total_amount
      console.log("getting teacher_revenueResponse data----------",teacher_revenueResponse)
      
      var newTeacherRevenue = TeacherRevenue.map(i => ({...i, isSelected: false}));

      this.setState({ isBodyLoaded: true,isSpinner: false,TeacherRevenue:newTeacherRevenue,totalAmount});
    }
   
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Quelque chose a mal tourné !", [
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
  })
    // console.log("getting country response----------------",countryData.country_list)
  };





  demand_amountdata = async () => {
    // this.setState({ spinner: true }, async () => {
    // console.log("getting inside the function level id " + this.state.level_id)

    const {TeacherRevenue,to_bank_or_paypal_account} = this.state;

    let transaction_ids = [];
    let amount = 0 ;
    TeacherRevenue.map( i => {
      
      if(i.isSelected) {       
        transaction_ids.push(i.reservation_no);
        amount += parseInt(i.amount)        
      }
    });
 

   

    const demand_amountdataResponse = await demand_amount({
      amount,
      transaction_ids:transaction_ids,
      to_bank_or_paypal_account:"to my Paypal account"
    });
    console.log("getting ampint and ids>>>>>>>>>>>>>>> ??????????????????? >>>>>>>>>>>>>>>>>>",amount,        transaction_ids)
    if (demand_amountdataResponse.result == true) {
     console.log("getting after filter response====================",demand_amountdataResponse.response)
     Alert.alert("Message",demand_amountdataResponse.response.message)
     this.props.navigation.navigate("profile2")
     this.Hide_Custom_Alert1()
    // var filteredData = demand_amountdataResponse.response.revenue_list;
    // var totalFilterAmount = demand_amountdataResponse.response.total_amount
    // this.setState({isBodyLoaded:true,isSpinner:false,filteredData,filterKay:true,totalFilterAmount})
      
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Quelque chose a mal tourné !", [
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




  Getteacher_revenue_filterdata = async () => {
    // this.setState({ spinner: true }, async () => {
    // console.log("getting inside the function level id " + this.state.level_id)

    const {from_date,to_date} = this.state;
    const teacher_revenue_filterdataResponse = await teacher_revenue_filter({
      from_date,
    to_date,
    });
    if (teacher_revenue_filterdataResponse.result == true) {
     console.log("getting after filter response====================",teacher_revenue_filterdataResponse.response)
    var filteredData = teacher_revenue_filterdataResponse.response.revenue_list;
    var totalFilterAmount = teacher_revenue_filterdataResponse.response.total_amount
    this.setState({isBodyLoaded:true,isSpinner:false,filteredData,filterKay:true,totalFilterAmount})
      
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Quelque chose a mal tourné !", [
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


validate(){
  // console.log("inside the validate function")
  const {from_date,to_date} = this.state;
  if(!from_date.length){
    Alert.alert("Message","Veuillez choisir la date de début!")
  }
  else if(!to_date.length) {
    Alert.alert("Message","Veuillez sélectionner À ce jour!")
  }
  else if(from_date === to_date) {
    Alert.alert("Message","De date et à date ne peuvent pas être les mêmes!")
  }
  else if(from_date > to_date){
    Alert.alert("Message","La date From doit être inférieure à la date To.!")
  }

  else{
  
    this.Getteacher_revenue_filterdata()
  }
}


prevData(){
  this.setState({filterKay:false})
}




amountAfterCheck () {
  let amount = 0 ;
  this.state.TeacherRevenue.map( i => {
    if(i.isSelected) {     
      amount += parseInt(i.amount)        
    }
    setTimeout(() => {
      this.setState({TotalCheckAmount:amount})
      
    }, 100);

    
  });

}









  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Mes revenus</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>

        <View style={Styles.subhaderView}>
          <View style={{flexDirection: 'column'}}>
          <Text style={Styles.subheadingTxt}>Tiré De</Text>
          
            
              <DatePicker
              style={{width: SCREEN_WIDTH*0.40,borderWidth:0}}
              date={this.state.from_date}
              placeholder="Date of Birth"                    
              format="DD-MM-YYYY"                   
              // maxDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={calenderIcon}
                
                customStyles={{
                  dateIcon: {
                    left:-10,
                    height:24,width:24
                  },
                  dateInput: {
                    marginLeft: 0,
                    borderColor: 'red',
                    borderWidth: 0,
                    marginRight: 0,
                  },          
                }}
                onDateChange={(from_date) => {
                  this.setState({from_date});
                }}
              />
          <View style={{borderColor: 'gray', borderWidth: 1, width: 130,marginStart:10}} />
            
          </View>



          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt}>Vers</Text>
          

            <DatePicker
              style={{width: SCREEN_WIDTH*0.40,borderWidth:0}}
              date={this.state.to_date}
              placeholder="Date of Birth"                    
              format="DD-MM-YYYY"                   
              // maxDate={this.state.date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
               iconSource={calenderIcon}                
                customStyles={{
                  dateIcon: {
                    left:-10,
                    height:24,width:24
                  },
                  dateInput: {
                    marginLeft: 0,
                    borderColor: 'red',
                    borderWidth: 0,
                    marginRight: 0,
                  },          
                }}
                onDateChange={(to_date) => {
                  this.setState({to_date});
                }}
              />
                <View style={{borderColor: 'gray', borderWidth: 1, width: 130}} />
          </View>

          <TouchableOpacity onPress={()=>{this.validate()}} style={{margin:10,backgroundColor:"#FF1493",justifyContent:'center',alignItems:'center',height:30,marginTop:24}}>            
            <Text style={{fontSize:14,fontWeight:'700',color:"#FFFFFF",marginStart:15,marginEnd:15,margin:0}}>Go</Text>
            </TouchableOpacity>


        </View>
        <Spinner visible={this.state.isSpinner}/>

        <View style={Styles.mainContainer}>
          {
            this.state.isBodyLoaded == true ?

            <Fragment>
              {
                this.state.filterKay == false ?

              <ScrollView>
                 {
                    this.state.TeacherRevenue.length > 0 ?
                    <Fragment>    
              
                {
                  this.state.TeacherRevenue.map((singleTeacherRevenue,key)=>{
                    return(
                      <Fragment>
                        

                <View style={Styles.contentContainer}>
                    <View style={Styles.contentContainerView}>
                      <View style={Styles.insidecontentContainer}>
                        <Text style={Styles.mainHeader}>
                          Numéro de réservation : {singleTeacherRevenue.reservation_no}
                        </Text>
                        <Text style={Styles.subHeader}>
                          Nom du client : {singleTeacherRevenue.student_name}
                        </Text>
                        <Text style={Styles.subHeader}>Niveau : Débutant</Text>
                        <Text style={Styles.subHeader}>
                          Date de reservation : {singleTeacherRevenue.course_date}  {singleTeacherRevenue.course_time}
                        </Text>
                      </View>
                      <View style={{flexDirection:"column"}}>
                      <View style={Styles.currenyStylesView}>
                        <Text style={Styles.currencyTxtStyle}>{singleTeacherRevenue.amount} {singleTeacherRevenue.currency_symbol}</Text>
                      </View>
                      <View>
                        {
                          singleTeacherRevenue.isSelected ? 
                          
                          <TouchableOpacity 
                          onPress={()=>{
                          let oldState = [...this.state.TeacherRevenue];
                              oldState[key].isSelected = !oldState[key].isSelected;
                              let filterT = oldState.filter(i => i.isSelected);
                              this.setState({ TeacherRevenue: oldState,isdemandButtonEnable: filterT.length > 0 });
                            }}
                              style={{flexDirection:'row',alignItems:'center'}}>
                                <Image
                              source={require('../../../../../assets/icon/9.png')}
                              style={{
                                width: 24,
                                height: 24,
                                borderWidth: 0,marginTop:10                       
                              }}
                        />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity 
                          onPress={()=>{
                            let oldState = [...this.state.TeacherRevenue];
                            oldState[key].isSelected = !oldState[key].isSelected;
                            let filterT = oldState.filter(i => i.isSelected);

                            this.setState({ TeacherRevenue: oldState,isdemandButtonEnable: filterT.length > 0 });
                              }}
                                style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image
                                source={require('../../../../../assets/icon/4.png')}
                                style={{
                                  width: 24,
                                  height: 24,
                                  borderWidth: 0,  marginTop:10                   
                                }}
                          />
                          </TouchableOpacity>

                      }


                      </View>

                      </View>                      
                    </View>                            
                  </View>

                    
                      </Fragment>
                    )
                  })
                }
                 
                    </Fragment>
                    
                    :<View style={{alignItems:'center',justifyContent:'center',marginTop:160}}>
                    <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}>No itetm found!</Text>
                  </View>
                  }


                  <View style={Styles.btnView}>
                    <View>
                      <TouchableOpacity
                        style={Styles.continueBtn1}
                        onPress={() => {
                          this.Show_Custom_Alert();
                        }}>
                        <Text style={Styles.continueBtnTxt1}>
                          Grin total : {this.state.totalAmount}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {
                      this.state.isdemandButtonEnable == true ?

                      <View>
                      <TouchableOpacity
                        style={Styles.continueBtn}
                        onPress={() => {
                          this.Show_Custom_Alert();
                        }}
                        // onPress={()=>{this.demand_amountdata()}}
                        
                        
                        >
                        <Text style={Styles.continueBtnTxt}>Domainder reglement</Text>
                      </TouchableOpacity>
                    </View>

                       :

                      <View>
                      <TouchableOpacity
                        style={Styles.continueBtn2}
                        // onPress={() => {
                        //   this.Show_Custom_Alert();
                        // }}
                        >
                        <Text style={Styles.continueBtnTxt1}>Domainder reglement</Text>
                      </TouchableOpacity>
                    </View>
                    } 
                    {/* <View>
                      <TouchableOpacity
                        style={Styles.continueBtn}
                        onPress={() => {
                          this.Show_Custom_Alert();
                        }}>
                        <Text style={Styles.continueBtnTxt}>Domainder reglement</Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>

                </ScrollView>
                    :
                    <ScrollView>
                    {
                      this.state.filteredData.length > 0 ?
                      <View style={{borderWidth:0,borderColor:'red'}}>

                      <TouchableOpacity onPress={()=>{this.prevData()}}>
                            <Image source={require("../../../../../assets/icon/17.png")} style={{width:30,height:30,alignSelf:'flex-end',margin:4,marginEnd:10}} />
                      </TouchableOpacity>

                      <Fragment>                
                  {
                    this.state.filteredData.map((singlefilteredTeacherRevenue)=>{
                      return(
                        <Fragment>

                  <View style={Styles.contentContainer}>
                      <View style={Styles.contentContainerView}>
                        <View style={Styles.insidecontentContainer}>
                          <Text style={Styles.mainHeader}>
                            Numéro de réservation : {singlefilteredTeacherRevenue.reservation_no}
                          </Text>
                          <Text style={Styles.subHeader}>
                            Nom du client : {singlefilteredTeacherRevenue.student_name}
                          </Text>
                          <Text style={Styles.subHeader}>Niveau : Débutant</Text>
                          <Text style={Styles.subHeader}>
                            Date de reservation : {singlefilteredTeacherRevenue.course_date}  {singlefilteredTeacherRevenue.course_time}
                          </Text>
                        </View>
                        <View style={Styles.currenyStylesView}>
                          <Text style={Styles.currencyTxtStyle}>{singlefilteredTeacherRevenue.amount}</Text>
                        </View>
                      </View>
                    </View>
                        </Fragment>
                      )
                    })
                  }
                      </Fragment>
                      </View>
                      :<View style={{alignItems:'center',justifyContent:'center',marginTop:160}}>
                      <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}>No itetm found!</Text>
                    </View>
                    }


                  <View style={Styles.btnView}>
                      <View>
                        <TouchableOpacity
                          style={Styles.continueBtn1}
                          onPress={() => {
                            this.Show_Custom_Alert();
                          }}>
                          <Text style={Styles.continueBtnTxt1}>
                            Grin total : {this.state.totalFilterAmount}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View>
                        <TouchableOpacity
                          style={Styles.continueBtn}
                          onPress={() => {
                            this.Show_Custom_Alert();
                          }}>
                          <Text style={Styles.continueBtnTxt}>Domainder reglement</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  </ScrollView>
                  }



              </Fragment>
            :
                <View style={{alignItems:'center',justifyContent:'center',marginTop:160}}>
                  <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}>Loading...</Text>
                </View>
          }
          



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
                  height: 330,
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
                      source={cross}
                      style={{height: 80, width: 80, margin: 10}}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: '700',
                      margin: 10,
                      marginTop: -10,
                      color: '#000000',
                      textAlign: 'center',
                    }}>
                   Demander le paiement
                  </Text>
                </View>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                 Saisissez le montant que vous voulez
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                 demander pour le paiement. Ce montant
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  vous sera payé par virement bancaire à la
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                 fin de chaque mois.
                </Text>



                  <View style={{borderColor:"gray",borderWidth:1,margin:3,borderRadius:5}}> 
                      <Text style={{fontSize:20,fontWeight:'700',margin:3,marginStart:20,marginEnd:20}}>{this.state.TotalCheckAmount}</Text>
                  </View>
                    <View>
                      {
                        this.state.data1.map((singleMap)=>{
                          return(
                            <View>
                                 {
                                         this.state.to_bank_or_paypal_account == singleMap.value ? 
                                        <TouchableOpacity   
                                        onPress={()=>{this.setState({to_bank_or_paypal_account:singleMap.value})}}                                                                                                
                                            style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={require("../../../../../assets/icon/9.png")} style={{height:20,width:20,margin:3}} />
                                            <Text style={{color:"#FF1493"}}>{singleMap.value}</Text>
                                        </TouchableOpacity>
                                        :     
                                        <TouchableOpacity          
                                          onPress={()=>{this.setState({to_bank_or_paypal_account:singleMap.value})}}                              
                                            style={{flexDirection:'row',alignItems:'center'}}>
                                            <Image source={require("../../../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
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
                    borderRadius: 6,
                    justifyContent: 'space-around',
                    margin: 5,
                  }}>
                  
                  <TouchableOpacity
                    // onPress={() => this.Hide_Custom_Alert1()}
                    onPress={()=>{this.demand_amountdata()}}
                    style={{
                      backgroundColor: '#FF1493',
                      justifyContent: 'center',
                      margin: 10,
                      height: 35,
                      borderRadius: 6,
                    }}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 13,
                        marginStart: 20,
                        marginEnd: 20,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      Demander
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

// 26.
//    
// 90.00 €
// vers mon compte bancaire
// vers mon compte Paypal
// 