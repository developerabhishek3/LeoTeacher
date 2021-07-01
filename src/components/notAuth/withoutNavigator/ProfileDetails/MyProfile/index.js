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
import AsyncStorage from '@react-native-community/async-storage';
import {StudentProfile,get_academic_info} from '../../../../../Api/afterAuth'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import RNFetchBlob from 'rn-fetch-blob'

import ImagePicker from 'react-native-image-picker';

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







  uploadWholeData(){

    this.setState({ isSpinner: true }, async () => { 
  
      console.log("getting inside the upload image function - -  -")
  
      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
    
      const TokenValue = JSON.parse(token);
      const UserId = JSON.parse(user_id);
    

      const URL = `https://www.spyk.fr/api_teacher/update_profile_photo`
    
    
      let headers = {
        'Content-Type': 'multipart/form-data',
        'x-api-key':'leo@2020',
        'user-id': `${UserId}`,
        token: `${TokenValue}`,
        };
      
        RNFetchBlob.fetch("post",URL,headers,[      
          { name: 'profile_pic', filename: 'photo.jpg', type: 'image/png', data: this.state.filePath},                 
          ]).then((resp) => {        
            this.setState({
              isSpinner:false
            }); 
        console.log("response:::::::" + JSON.stringify(resp.text()));
        // Alert.alert("Message","Mise à jour du profil réussie!")
       
        let alertValue = "Mise à jour du profil réussie"
        // this.setState({alertValue})
        // this.Show_Custom_Alert()
        this.props.navigation.navigate("home")
        if(resp.json().error === "false"){
        this.setState({
          isSpinner:false
        });
    
        }else if(resp.json().error=== "true"){
        // alert(resp.json().errorMessage)
        this.setState({
          isSpinner:false
        });  
        this.showalerts(resp.json().errorMessage)        
        }
        }).catch((err) => {
        this.setState({
          isSpinner:false
        });
        console.log("response::::err:::" + err);
        });    
     })
    }






  chooseFile = () => {
    var options = {
      title: 'Choisir une photo',     
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };    
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response.data;
        let path = response.uri
          this.setState({ filePath: source,path:path},()=>{
            this.uploadWholeData()
          })       
      }
    });
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
    const { profileData,isBodyLoaded,isSpinner } = this.state;

   let  profileImg  = this.props.navigation.getParam("profileImg")

   
   var newdate = this.state.birth_date.split("-").reverse().join("/");
   console.log("getting birthdate==========",newdate)

    console.log("getting inside the render method ?????????????? profile URL",this.state.profile_url)

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
          <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("home");
        }}>
          <Image source={logo} style={Styles.headertxtInputImg1} />
          </TouchableOpacity>
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
              <View>
              <Image  source={require("../../../../../assets/icon/avatar.png")} style={Styles.peopleStyle} />
            </View>
            :
      
            <Image   source={{
              uri: `https://www.spyk.fr/${this.state.profile_url}`,
            }}  style={Styles.peopleStyle} />    
            }


          <TouchableOpacity onPress={this.chooseFile.bind(this)} style={{height:30,width:30,alignSelf:'center'}}>
                  <Image source={require('../../../../../assets/icon/27.png')} style={{height:30,width:30,margin:-15,alignSelf:'center'}} />
          </TouchableOpacity>






          </View>          
          <ScrollView style={{marginTop:4,marginBottom:15}}>
            

          <View style={{flex:2,borderWidth:0,width:'99%',alignSelf:'center',marginTop:6,marginBottom:15}}>


            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Nom</Text>

    <Text style={Styles.nameHeadingTxt}>{profileData.first_name} </Text>

            </View>

            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Numéro de téléphone</Text>

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


        
            <Text style={Styles.nameHeadingTxt}>{newdate}</Text>
          
             

            </View>
            </View>





            <View style={Styles.maincontentContaine}>
            <View style={Styles.nameStyleView}>
              <Text style={Styles.nameHeading}>Adresse  </Text>
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