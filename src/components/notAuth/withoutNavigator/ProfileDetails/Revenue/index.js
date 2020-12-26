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

import {teacher_revenue,teacher_revenue_filter} from '../../../../../Api/afterAuth'


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
      // console.log("getting teacher_revenueResponse data----------",teacher_revenueResponse)
      this.setState({ isBodyLoaded: true,isSpinner: false,TeacherRevenue,totalAmount});
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
  })
    // console.log("getting country response----------------",countryData.country_list)
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


validate(){
  console.log("inside the validate function")
  const {from_date,to_date} = this.state;
  if(!from_date.length){
    Alert.alert("Message","Please select From date!")
  }
  else if(!to_date.length) {
    Alert.alert("Message","Please select To date!")
  }
  else if(from_date === to_date) {
    Alert.alert("Message","From date and To date can't be same!")
  }
  else if(from_date > to_date){
    Alert.alert("Message","From date should be less than To date!")
  }

  else{
  
    this.Getteacher_revenue_filterdata()
  }
}


prevData(){
  this.setState({filterKay:false})
}






  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.header}>
          <Image source={back} style={Styles.headertxtInputImg} />
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

          <TouchableOpacity onPress={()=>{this.validate()}}>
            <Image source={require("../../../../../assets/icon/right1.png")}  style={{width:40,height:40,margin:10}} />
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
                  this.state.TeacherRevenue.map((singleTeacherRevenue)=>{
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
                      <View style={Styles.currenyStylesView}>
                        <Text style={Styles.currencyTxtStyle}>{singleTeacherRevenue.amount}</Text>
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
                
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderRadius: 6,
                    justifyContent: 'space-around',
                    margin: 5,
                  }}>
                  
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert1()}
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