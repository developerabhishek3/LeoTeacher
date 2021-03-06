import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png'

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';

import Stars from 'react-native-stars';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Spinner from 'react-native-loading-spinner-overlay';


import {history_reservation} from '../../../../Api/afterAuth'
import { Fragment } from 'react';


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      historyReservation:[],

      isBodyLoaded: false,
      isSpinner: true,
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
    this.props.navigation.navigate('clientinfo')
  }







  fetchhistory_reservationData = async () => {
    const history_reservationResponse = await history_reservation();
    if (history_reservationResponse.result == true) {
      console.log("getting levels data ------------------- ",history_reservationResponse.response)
      var historyReservation = history_reservationResponse.response.history_transaction
      this.setState({historyReservation,isBodyLoaded: true,isSpinner: false,});
    }
    // console.log("getting country response----------------",levelsData.country_list)
  };



  componentDidMount = async () => {
   
  
  this.fetchhistory_reservationData()
  
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










  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("home")}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner}/>
        <View style={Styles.subhaderView}>
         
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt1}>Historique</Text>
            <View
              style={{borderColor: '#FF1493', borderWidth: 1, width: 100}}
            />
          </View>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("reservation")}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt}>En cours </Text>
            <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
          </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.mainContainer}>

        {
          this.state.isBodyLoaded == true ?



         
          <ScrollView>

          {
            this.state.historyReservation.length > 0 ?

            <Fragment>





{
                this.state.historyReservation.map((singlehistoryMap)=>{
                    return(
                        <Fragment>

              <View style={Styles.contentView}>
              <View style={{flexDirection: 'row'}}>
                <Image 
                 source={{
                    uri: `https://www.spyk.fr/${singlehistoryMap.student_profile_url}`,
                  }} 
                style={Styles.peopleStyle} />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      margin: 2,
                      marginTop: 10,
                    }}>
                   {singlehistoryMap.student_name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image source={books} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>{singlehistoryMap.student_level_fr}</Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Image source={watch} style={Styles.bookStyle} />
                    <Text style={Styles.contentTextStyle}>
                   {singlehistoryMap.course_date}  {singlehistoryMap.course_time}
                    </Text>
                  </View>

                  <View style={{alignItems:'center',margin:3,marginStart:-25}}>
                                    <Stars
                                    // update={(rating)=>{this.setState({rating: rating})}}
                                      default={singlehistoryMap.rating}
                                      count={5}
                                      // half={true}
                                      starSize={30}
                                      fullStar={<Image source={require("../../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                                      emptyStar={<Image source={require("../../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                                      halfStar={<Image source={require("../../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                                    />
                                  </View>


                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Rating
                      type="custom"
                      ratingColor="#FF1493"
                      ratingBackgroundColor="#c8c7c8"
                      ratingCount={5}
                      imageSize={15}
                      startingValue={0}
                      fractions={1}
                      // onFinishRating={this.ratingCompleted}
                      style={{paddingVertical: 10}}
                    />
                   
                  </View> */}
                   {/* <View style={Styles.continueBtn}>
                      <TouchableOpacity onPress={()=>{this.Show_Custom_Alert()}}>
                      <Text style={Styles.continueBtnTxt}>Annuler</Text>
                      </TouchableOpacity>
                    </View> */}
                </View>
              </View>
            </View>
           </Fragment>
                    )
                })
            }




            </Fragment>


         
            :<View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>Record non trouvé</Text>
           </View>
          }




          </ScrollView>
            :<View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>chargement...</Text>
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
                    Annuler un coaching accepté
                  </Text>
                </View>  
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Etes-vous sûr de vouloir annuler le cours</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>prévu avec votre étudiant?</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}>Des pénalités peuvent s'appliquer.</Text>
                  <Text style={{margin:2,fontSize:12,fontWeight:'700',color:"gray",alignSelf:'center'}}> Voir CGV.</Text>
                  <Text style={{margin:2,fontSize:14,fontWeight:'700',color:"#FF1493",alignSelf:'center'}}>Termes et conditions</Text>




                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',                    
                    borderRadius: 6,
                    justifyContent:'space-around',
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.Hide_Custom_Alert()}
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
                        marginStart: 7,
                        marginEnd: 7,
                        fontWeight: '700',
                        textAlign: 'center',
                        fontFamily: 'Montserrat-Regular',
                      }}>
                    Annuler mon coaching
                    </Text>
                  </TouchableOpacity>
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
                    Retour
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        <BottomNavigator
          currentRoute={'reservation'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}


// Etes-vous sûr de vouloir annuler le cours prévu avec votre étudiant?
// 
//
// Termes et conditions
// 
// Retour