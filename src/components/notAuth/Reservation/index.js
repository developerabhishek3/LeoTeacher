import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  BackHandler,
  Alert,
  RefreshControl,
  StatusBar
} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';

import cross from '../../../assets/icon/17.png';

import books from '../../../assets/icon/12.png';
import watch from '../../../assets/icon/14.png';
import People from '../../../assets/icon/25.png';

import Stars from 'react-native-stars';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import Spinner from 'react-native-loading-spinner-overlay';
import {current_reservation, cancel_reservation} from '../../../Api/afterAuth';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      Model_Visibility: false,
      Alert_Visibility: false,
      currentReservation: [],
      reservation_id: 0,
      isBodyLoaded: false,
      isSpinner: true,
      isCurrenetComponentRefreshing:false
    };
  }

  Show_Custom_Alert(reservation_id, visible) {
    this.setState({Alert_Visibility: visible, reservation_id});
    // console.log("getting reservation id here----------",reservation_id)
  }
  Hide_Custom_Alert() {
    this.setState({Alert_Visibility: false});
    this.Fetchcancel_reservation();
  }
  Hide_Custom_Alert1() {
    this.setState({Alert_Visibility: false});
    // this.props.navigation.navigate('clientinfo')
  }

  Fetchcancel_reservation = async () => {
    const {reservation_id} = this.state;
    console.log(
      'inside the cancel api calling getting reservation -------------------',
      reservation_id,
    );
    const cancel_reservationResponse = await cancel_reservation({
      reservation_id,
    });
    if (cancel_reservationResponse.result === true) {
      this.fetchcurrent_reservationData();
      console.log(
        'getting result here ----------------->>>>>>>>>>>>>>>>>>>-',
        cancel_reservationResponse.response,
      );
    } else {
      this.myAlert('Error', cancel_reservationResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  fetchcurrent_reservationData = async () => {
    const current_reservationResponse = await current_reservation();
    if (current_reservationResponse.result == true) {
      console.log("getting levels data ------------------- ",current_reservationResponse.response)
      var currentReservation =
        current_reservationResponse.response.current_transaction;
      this.setState({currentReservation,isBodyLoaded: true,isSpinner: false,isCurrenetComponentRefreshing:false});
    }
    // console.log("getting country response----------------",levelsData.country_list)
  };

  componentDidMount = async () => {
  setTimeout(() => {
    this.fetchcurrent_reservationData();
  }, 700);
 

    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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

  checkreservation_id() {
    this.Show_Custom_Alert();
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
          <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>
        <Spinner visible={this.state.isSpinner}/>
        <View style={Styles.subhaderView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('historyreservation');
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={Styles.subheadingTxt}>Historique</Text>
              <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt1}>En cours</Text>
            <View
              style={{borderColor: '#b41565', borderWidth: 1, width: 100}}
            />
          </View>
        </View>

        <View style={Styles.mainContainer}>
          {
            this.state.isBodyLoaded == true ?
            <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                          <RefreshControl refreshing={this.state.isCurrenetComponentRefreshing} onRefresh={()=>{  this.setState({ isCurrenetComponentRefreshing: true }); setTimeout(()=>{
                        this.fetchcurrent_reservationData();
                      },100)  }} />
                    }>
            {
             this.state.currentReservation.length > 0 ?
              <Fragment>
              {this.state.currentReservation.map((singleCurrentMap) => {
              return (
                <Fragment>
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('clientinfo',{
                    reservation_id:singleCurrentMap.reservation_id,
                    student_id:singleCurrentMap.student_id
                  })}}>
                    <View style={Styles.contentView}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{
                            uri: `https://www.spyk.fr/${singleCurrentMap.student_profile_url}`,
                          }}
                          style={Styles.peopleStyle}
                        />
                        <View style={{flexDirection: 'column'}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              margin: 2,
                              marginTop: 10,
                            }}>
                            {singleCurrentMap.student_name}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={books} style={Styles.bookStyle} />
                            <Text style={Styles.contentTextStyle}>
                              {singleCurrentMap.student_level_fr}
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Image source={watch} style={Styles.bookStyle} />
                            <Text style={Styles.contentTextStyle}>
                              {singleCurrentMap.course_date}{' '}
                              {singleCurrentMap.course_time}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                                <View style={{alignItems:'center',margin:6,marginStart:-25}}>
                                    <Stars
                                    // update={(rating)=>{this.setState({rating: rating})}}
                                      default={singleCurrentMap.rating}
                                      count={5}
                                      // half={true}
                                      starSize={30}
                                      fullStar={<Image source={require("../../../assets/icon/111.png")} style={{height:15,width:15,margin:3}} />}
                                      emptyStar={<Image source={require("../../../assets/icon/112.png")} style={{height:15,width:15,margin:3}} />}
                                      halfStar={<Image source={require("../../../assets/icon/113.png")} style={{height:15,width:15,margin:3}} />}
                                    />
                                  </View>
                            <View style={Styles.continueBtn}>
                              <TouchableOpacity
                                onPress={() => {
                                  let reservation_id =
                                    singleCurrentMap.reservation_id;
                                  console.log(
                                    'getting inside on Press============',
                                    reservation_id,
                                  );
                                  this.Show_Custom_Alert(reservation_id);
                                }}>
                                <Text style={Styles.continueBtnTxt}>
                                  Annuler
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Fragment>
              );
            })}

              </Fragment>
              :<View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={{textAlign:'center',textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>Record non trouvé!</Text>
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
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  Etes-vous sûr de vouloir annuler le cours
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  prévu avec votre étudiant?
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  Des pénalités peuvent s'appliquer.
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 12,
                    fontWeight: '700',
                    color: 'gray',
                    alignSelf: 'center',
                  }}>
                  {' '}
                  Voir CGV.
                </Text>
                <Text
                  style={{
                    margin: 2,
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#b41565',
                    alignSelf: 'center',
                  }}>
                  Termes et conditions
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
                    onPress={() => {
                      let reservation_id = this.state.reservation_id;
                      console.log(
                        'getting inside on Press============',
                        reservation_id,
                      );

                      this.Hide_Custom_Alert();
                    }}
                    style={{
                      backgroundColor: '#b41565',
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
                      backgroundColor: '#b41565',
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
