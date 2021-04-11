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
  Linking,
  StatusBar
} from 'react-native';
import BottomNavigator from '../../../../router/BottomNavigator';
import {Rating, AirbnbRating} from 'react-native-elements';
import Styles from './indexCss';
import logo from '../../../../assets/icon/96.png';
import back from '../../../../assets/icon/20.png';

import cross from '../../../../assets/icon/17.png';

import Spinner from 'react-native-loading-spinner-overlay';

import books from '../../../../assets/icon/12.png';
import watch from '../../../../assets/icon/14.png';
import People from '../../../../assets/icon/25.png';
import Chat from '../../../../assets/icon/11.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import Stars from 'react-native-stars';

import {student_info_and_book_reservation} from '../../../../Api/afterAuth';
import {Fragment} from 'react';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: [],
      isBodyLoaded: false,
      isSpinner: true,
    };
  }

  componentDidMount = async () => {
    this.Fetchstudent_info_and_book_reservation();

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

  Fetchstudent_info_and_book_reservation = async () => {
    let student_id = this.props.navigation.getParam('student_id');
    let reservation_id = this.props.navigation.getParam('reservation_id');
    console.log(
      'inside the cancel api calling getting reservation -------------------',
      reservation_id,
      student_id,
    );
    const student_info_and_book_reservationResponse = await student_info_and_book_reservation(
      {
        reservation_id,
        student_id,
      },
    );
    if (student_info_and_book_reservationResponse.result === true) {
      var studentInfo =
        student_info_and_book_reservationResponse.response.student_info;
      this.setState({studentInfo, isBodyLoaded: true, isSpinner: false});
    } else {
      console.log('getting error here-------------');
    }
    return;
  };

  render() {

    let historyFlag = this.props.navigation.getParam("historyFlag")
    let student_id = this.props.navigation.getParam('student_id');

    let course_time = this.props.navigation.getParam("course_time")
    let course_date = this.props.navigation.getParam("course_date")
    let student_profile_url = this.props.navigation.getParam("student_profile_url")
    let student_name =  this.props.navigation.getParam("student_name")

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        <View style={Styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Info Client</Text>
          <View style={{margin: 7, flexDirection: 'row', marginStart: 10}}>
            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('chat');
              }}>
              <Image source={Chat} style={Styles.headertxtInputImg2} />
            </TouchableOpacity> */}
            <Image source={logo} style={Styles.headertxtInputImg1} />
          </View>
        </View>

        <Spinner visible={this.state.isSpinner} />

        <View style={Styles.mainContainer}>
          {this.state.isBodyLoaded == true ? (
            <ScrollView>
              {this.state.studentInfo.length > 0 ? (
                <Fragment>
                  {this.state.studentInfo.map((singleInfo) => {
                    return (
                      <Fragment>
                        <View style={Styles.contentView}>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={People} style={Styles.peopleStyle} />
                            <View style={{flexDirection: 'column'}}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: '700',
                                  margin: 2,
                                  marginTop: 10,
                                }}>
                                {singleInfo.student_name}
                              </Text>
                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  source={books}
                                  style={Styles.bookStyle}
                                />
                                <Text style={Styles.contentTextStyle}>
                                  {singleInfo.student_level_fr}
                                </Text>
                              </View>

                              <View style={{flexDirection: 'row'}}>
                                <Image
                                  source={watch}
                                  style={Styles.bookStyle}
                                />
                                <Text style={Styles.contentTextStyle}>
                                  {singleInfo.course_date}{' '}
                                  {singleInfo.course_time}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  marginStart: 10,
                                }}>
                                {/* <Rating
                              type="custom"
                              ratingColor="#b41565"
                              ratingBackgroundColor="#c8c7c8"
                              ratingCount={5}
                            
                              imageSize={15}
                              startingValue={0}
                              fractions={1}
                              // onFinishRating={this.ratingCompleted}
                              style={{paddingVertical: 10}}
                            /> */}

                                <View style={{alignItems: 'center'}}>
                                  <Stars
                                    default={singleInfo.student_rating}
                                    count={5}
                                    half={true}
                                    starSize={20}
                                    fullStar={
                                      <Image
                                        source={require('../../../../assets/icon/111.png')}
                                        style={{
                                          height: 15,
                                          width: 15,
                                          margin: 3,
                                        }}
                                      />
                                    }
                                    emptyStar={
                                      <Image
                                        source={require('../../../../assets/icon/112.png')}
                                        style={{
                                          height: 15,
                                          width: 15,
                                          margin: 3,
                                        }}
                                      />
                                    }
                                    halfStar={
                                      <Image
                                        source={require('../../../../assets/icon/113.png')}
                                        style={{
                                          height: 15,
                                          width: 15,
                                          margin: 3,
                                        }}
                                      />
                                    }
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>

                        <View style={Styles.contentView2}>
                          <View style={Styles.contViewHeader}>
                            <Text style={Styles.contViewTxt1}>
                              Nombre de coachings suivis :
                            </Text>
                            <Text style={Styles.contentViewTxt2}>
                              {singleInfo.no_of_coaching_followed}
                            </Text>
                          </View>
                          <View style={Styles.contViewHeader}>
                            <Text style={Styles.contViewTxt1}>
                              Compétences :{' '}
                            </Text>
                            <Text style={Styles.contentViewTxt2}>
                              {singleInfo.skill}
                            </Text>
                          </View>
                          <View style={Styles.contViewHeader}>
                            <Text style={Styles.contViewTxt1}>
                              Profession :{' '}
                            </Text>
                            <Text style={Styles.contentViewTxt2}>
                              {singleInfo.profession}
                            </Text>
                          </View>
                          <View style={Styles.contViewHeader}>
                            <Text style={Styles.contViewTxt1}>Âge : </Text>
                            <Text style={Styles.contentViewTxt2}>
                              {singleInfo.age}
                            </Text>
                          </View>
                        </View>

                        <View style={Styles.contentView2}>
                          <Text style={Styles.thirdHeaderTxt}>À propos de</Text>

                          <Text style={Styles.thirdHeaderTxtContent}>
                            {singleInfo.about_us}
                          </Text>
                        </View>

                        {
                          historyFlag == true ?

                          <View style={Styles.continueBtn}>
                          <TouchableOpacity onPress={()=>{this.props.navigation.navigate("profile",{
                            student_id:student_id,
                            course_date:course_date,
                            course_time:course_time,
                            student_profile_url:student_profile_url,
                            student_name:student_name
                          })}}>
                            <Text style={Styles.continueBtnTxt}>                             
                            Evaluez le professeur
                            </Text>
                          </TouchableOpacity>
                        </View>

                          :

                          <View style={Styles.continueBtn}>
                          <TouchableOpacity style={{flexDirection:'row',margin:3}}
                              onPress={()=>{
                                Linking.openURL(`tel:${9999999999}`)
                              }}
                          >
                            <Image source={require("../../../../assets/icon/call.png")} style={{height:20,width:20,margin:6}} />
                            <Text style={Styles.continueBtnTxt}>                             
                              Appeler le tutor pour démarrer le coaching
                            </Text>
                          </TouchableOpacity>
                        </View>

                        }

                       
                      </Fragment>
                    );
                  })}
                </Fragment>
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      fontSize: 18,
                      fontWeight: '700',
                      marginTop: 160,
                    }}>
                   Record non trouvé
                  </Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  fontSize: 18,
                  fontWeight: '700',
                  marginTop: 160,
                }}>
                chargement...
              </Text>
            </View>
          )}
        </View>

        <BottomNavigator
          currentRoute={'reservation'}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

// 16.Info Client
// Hardley Smith
// Débutant
// 27.05.2020, 17h00 à 21h00
// Nombre de coachings suivis  :  2
// Compétences : Verbes, articles
//

// À propos de
// Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .
// Appeler le tutor pour démarrer le coaching
