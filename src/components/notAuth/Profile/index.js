import React, { Component } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,Alert,BackHandler} from 'react-native'
import BottomNavigator from '../../../router/BottomNavigator'
import Styles from './indexCss'
import bgImg from '../../../assets/bgImages/6.png'
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../assets/icon/25.png';
import Stars from 'react-native-stars';
import {rating_to_student,student_rating_info} from '../../../Api/afterAuth'

export default class index extends Component {





  constructor(props){
    super(props)
    this.state={
      student_id:0,
      rating:0,
      comment:"",
      StudentRating:[]
    }
  }



  rating_to_studentFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {student_id,rating,comment} = this.state;
    console.log("getting rating before send--------",rating)
    const rating_to_studentResponse = await rating_to_student({
        student_id,
        rating,
        comment,
      });
    if (rating_to_studentResponse.result == true) {    
      this.props.navigation.navigate("profile2") 
      console.log("getting TeacherDetails data----------",rating_to_studentResponse.response)
    }
    // this.setState({TeacherDetails,isBodyLoaded:true,isSpinner:false});
    // console.log("getting country response----------------",countryData.country_list)
  };


  




 student_rating_infoFunction = async () => {
    // console.log("getting inside the function date_slot time_slot " + this.state.date_slot,this.state.time_slot)
    const {student_id,} = this.state;
    console.log("getting student_id before send--------",student_id)
    const student_rating_infoResponse = await student_rating_info({
        student_id:3,       
      });
    if (student_rating_infoResponse.result == true) {     
      // console.log("getting TeacherDetails data----------",student_rating_infoResponse.response)
      var StudentRating = student_rating_infoResponse.response.rating_info
    }
    this.setState({StudentRating,isBodyLoaded:true,isSpinner:false});
    // console.log("getting country response----------------",countryData.country_list)
  };









  componentDidMount = async () => {
   
  
  
  
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











  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
   
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}>
        <View style={Styles.header}>
          <Image source={back} style={Styles.headertxtInputImg} />
          <Text style={Styles.headerTxt}>Réservations</Text>
          <Image source={logo} style={Styles.headertxtInputImg1} />
        </View>

          <View style={{marginTop:-15}}> 
            <Image source={People} style={Styles.peopleStyle} />
            
          </View>
          <Text style={{fontSize:13,color:'gray',fontWeight:'700',alignSelf:'center'}}>Votre client</Text>
          <Text style={{alignSelf:'center',fontWeight:'700',fontSize:16,}}>Hardley Smith</Text>



          
          <ScrollView>



        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:30}}>

            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>Durée du coaching</Text>
              <Text style={{fontSize:16,fontWeight:'700'}}>30 min</Text>
            </View>


            <View style={{flexDirection:'column'}}>
              <Text style={{fontSize:14,fontWeight:'700',color:'gray'}}>Horaire du cours</Text>
              <Text style={{fontSize:16,fontWeight:'700'}}>14 H 00 - 14 H 30</Text>
            </View>

        </View>



          <View style={{margin:20}}>
            <Rating
                  type='custom'
                  ratingCount={5}
                  imageSize={24}
                  ratingColor='#FF1493'
                  ratingBackgroundColor='#c8c7c8'
                  // showRating
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
          </View>

{/* 
<View style={{alignItems:'center',margin:16}}>
                                    <Stars
                                    update={(rating)=>{this.setState({rating: rating})}}
                                      default={StudentRating.rating}
                                      count={5}
                                      // half={true}
                                      starSize={30}
                                      fullStar={<Image source={require("../../../assets/icon/111.png")} style={{height:27,width:27,margin:3}} />}
                                      emptyStar={<Image source={require("../../../assets/icon/112.png")} style={{height:27,width:27,margin:3}} />}
                                      halfStar={<Image source={require("../../../assets/icon/113.png")} style={{height:27,width:27,margin:3}} />}
                                    />
                                  </View> */}
         


        <View>
          <Text style={{fontSize:14,fontWeight:'700',color:'gray',alignSelf:'center',margin:1}}>Hardley</Text>
          <Text style={{fontSize:16,fontWeight:'700',color:'#000000',alignSelf:'center',margin:1}}>Comment s'est déroulée votre session ?</Text>
        </View>


          <View>
          <TextInput
            numberOfLines={4}
            placeholder="Commentaire supplémentaire"
            style={{textAlign:'left',textAlignVertical:'top',width:'90%',alignSelf:'center',margin:10,paddingVertical:6,backfaceVisibility:'hidden',backgroundColor:'#FFFFFF',elevation:1,borderRadius:7,}}
          />
          </View>



          <View style={Styles.continueBtn}>
              <TouchableOpacity
              
                onPress={()=>{this.props.navigation.navigate("profile2")}}
              >
                <Text style={Styles.continueBtnTxt}>                  
                  Soumettre
                </Text>
              </TouchableOpacity>
            </View>












          </ScrollView>




          
        </ImageBackground>
          <BottomNavigator
            currentRoute={'profile'}
            navigation={this.props.navigation}
        />
      </View>
    )
  }
}



// 21.Evaluez le client
// 
// Hardley Smith
// Durée du coaching
// 30 min
// Horaire du cours
// 14 H 00 - 14 H 30
// Hardley,
// Comment s'est déroulée votre session ?
// Commentaire supplémentaire
// Soumettre