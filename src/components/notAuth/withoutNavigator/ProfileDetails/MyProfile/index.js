import React, { Component, Fragment } from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler,Alert,StatusBar,Dimensions} from 'react-native'

import Styles from './indexCss'
import bgImg from '../../../../../assets/bgImages/6.png'

import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import Edit from '../../../../../assets/icon/34.png';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import People from '../../../../../assets/icon/avatar.png';

import {StudentProfile,get_academic_info} from '../../../../../Api/afterAuth'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {

constructor(props){
  super(props)
  this.state={
    profileData:[],
    AcademicDetails:[],
      
    isBodyLoaded: false,
    isSpinner: true,
    profile_url:"",
    birth_date:"",
    q_1_ans:"",
    q_2_ans:"",
    q_3_ans:"",
    q_4_ans:"",
    q_5_ans:"", 
    q_6_ans:"",
    city:"",
    
    diploma:"",
    interest:"",
    aboutYouYourInterest:"",
    YourEnglishNeeds:"",
    languageSkills:"",
    frenchLevel:"",
    englishLevel:"",
    coach_type:"",
  }
}

componentDidMount = async () => {

  let  profileImg  = this.props.navigation.getParam("profileImg")
  console.log("HHHHHHHHHHHHHHHH+++++++++++++",profileImg)

  this.fetchStudentProfileData()
  this.fetchget_academic_info()

  BackHandler.addEventListener('hardwareBackPress', () =>
  this.handleBackButton(this.props.navigation),
);
}

  fetchStudentProfileData = async () => {
    const GetProfileDetails = await StudentProfile();
    if (GetProfileDetails.result == true) {
      var profileData = GetProfileDetails.response.my_profile;
      var profile_url  = GetProfileDetails.response.my_profile.profile_url;
      var birth_date = GetProfileDetails.response.my_profile.dob
      var city = GetProfileDetails.response.my_profile.city
      var coach_type = GetProfileDetails.response.my_profile.coach_type
      console.log("getting GetProfileDetails data----------",profileData)
      this.setState({ isBodyLoaded: true,isSpinner: false,profileData,city,profile_url,birth_date,coach_type});
    }
   
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }   
    // console.log("getting country response----------------",countryData.country_list)
  };


  fetchget_academic_info = async () => {
    const get_academic_infoResponse = await get_academic_info();
    if (get_academic_infoResponse.result == true) {
     var AcademicDetails = get_academic_infoResponse.response.academic_info;
     var diploma = get_academic_infoResponse.response.academic_info.q_1
     var languageSkills = get_academic_infoResponse.response.academic_info.q_2
     var frenchLevel = get_academic_infoResponse.response.academic_info.q_6
     var englishLevel = get_academic_infoResponse.response.academic_info.q_8

     var aboutYouYourInterest = get_academic_infoResponse.response.academic_info.q_4
     var YourEnglishNeeds = get_academic_infoResponse.response.academic_info.q_5;
    //  var languageSkills = get_academic_infoResponse.response.academic_info.q_5;

      console.log("getting get academic detail data----------",get_academic_infoResponse.response.academic_info)
      this.setState({frenchLevel,diploma,languageSkills,aboutYouYourInterest,YourEnglishNeeds,englishLevel})
    }
   
    else{
      this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
        Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
            this.props.navigation.goBack();
        }}]);
    })
    }   
    // console.log("getting country response----------------",countryData.country_list)
  };


  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
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
    const { profileData,isBodyLoaded,isSpinner } = this.state;

   let  profileImg  = this.props.navigation.getParam("profileImg")

    console.log("getting inside the render method ??????????????",this.state.birth_date)

    // const userMap = Object.assign(profileData)
    return (
      <View style={{flex:1,}}>
        <Spinner visible={this.state.isSpinner}/>
        <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#5541E1" translucent = {false}/>
        {/* {
          isBodyLoaded == true ?  */}
          <Fragment>



{/* <ImageBackground source={bgImg} resizeMode="cover" style={{flex:2,borderWidth:0,width:'100%'}}> */}
     
          <ImageBackground source={require("../../../../../assets/icon/bg1.png")} resizeMode="cover" style={{height:200,width:"100%",flexDirection:"row",justifyContent:"space-between"}}> 
<TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>        Mon profil</Text>
          <View style={{flexDirection:'row'}}>
          <Image source={logo} style={Styles.headertxtInputImg1} />
          <TouchableOpacity 
              onPress={()=>{this.props.navigation.navigate("editprofile",{profile_url:this.state.profile_url,birthDate:this.state.birth_date})}}
          >
           <Image source={Edit} style={Styles.headertxtInputImg2} />
          </TouchableOpacity>
          </View>

        </ImageBackground>

        {
          isBodyLoaded == true ? 
        <Fragment>

          <View style={{borderWidth:0,marginTop:-70}}> 
          {
            this.state.profile_url == "" ?

                        <Image source={People}  style={Styles.peopleStyle} />
            :
            <Image source={{
              uri: `https://www.spyk.fr/${profileData.profile_url}`,
            }}  style={Styles.peopleStyle} />
          }        
          </View>          
          <ScrollView style={{marginTop:4,marginBottom:15}}>
            

          <View style={{flex:2,borderWidth:0,width:'99%',alignSelf:'center',marginTop:6,marginBottom:15}}>


            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Nom</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.first_name} {profileData.last_name}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}> Numéro de téléphone</Text>

              <Text style={Styles.nameHeadingTxt}>{profileData.phone}</Text>

            </View>
            </View>




            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Email</Text>

              <Text style={Styles.nameHeadingTxt}>{profileData.email}</Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Date de naissance</Text>


        
            <Text style={Styles.nameHeadingTxt}>{this.state.birth_date}</Text>
          
             

            </View>
            </View>





            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Address </Text>
              <Text style={Styles.nameHeadingTxt}>{profileData.address} </Text>
            </View>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Code postal </Text>
              <Text style={Styles.nameHeadingTxt}>{profileData.postcode} </Text>
            </View>          
            </View>




            
         


           
           <View style={Styles.maincontentContaine}>
           

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Ville</Text>
              <Text style={Styles.nameHeadingTxt}>{this.state.city}</Text>        
              </View>



              <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Diplôme</Text>

            <Text style={Styles.nameHeadingTxt}>{this.state.diploma}</Text>

            </View>
            </View>

            <View style={Styles.maincontentContaine}>
               <View style={Styles.nameStyleView}>           
                <Text style={Styles.nameHeading}>Niveau de français</Text>
                <Text style={Styles.nameHeadingTxt}>{this.state.frenchLevel}</Text>
           </View> 


           <View style={Styles.nameStyleView}>           
                <Text style={Styles.nameHeading}>Type d'entraîneur</Text>
                <Text style={Styles.nameHeadingTxt}>{this.state.coach_type}</Text>  
                                              
           </View> 
           </View>


           <View style={Styles.maincontentContaine}>
           <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Compétences linguistiques</Text>
              <Text style={Styles.nameHeadingTxt}>{this.state.languageSkills}</Text>        
              </View>
         
           </View>

           
          {/* <View style={Styles.nameStyleView1}>                   
                    <Text style={Styles.nameHeading1}>Niveau d'anglais</Text>
                    <Text style={Styles.nameHeadingTxt}></Text>
          </View> */}









          </View>
          </ScrollView>  
          </Fragment>  
          
          :null}
        {/* </ImageBackground>       */}


            </Fragment>     
      </View>
    )
  }
}



// 23.Mon profil
// Nom
// John Smith
//
// 
// 
// 
// 
// 
// 
// 
//  :
// 
// 
// 
// 
// 
// Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century .