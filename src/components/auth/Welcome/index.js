import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/1.png';
import logo from '../../../assets/icon/96.png';

import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';

import {level_academic_info} from '../../../Api/auth'


export default class index extends Component {




constructor(props){
  super(props);

  this.state = {
    isLoading: true,
    isSpinner:true,
    LevelInfo:true,
    AcademicInfo:true,
    BankInfo:true
  }
}



fetchlevel_academic_infoData = async () => {
  const level_academic_infoResponse = await level_academic_info();
  if (level_academic_infoResponse.result == true) {

      var AcademicInfo  = level_academic_infoResponse.response.is_academic_info;
      var LevelInfo = level_academic_infoResponse.response.is_level_info;  
      var BankInfo = level_academic_infoResponse.response.is_bank_info;
      this.setState({LevelInfo,AcademicInfo,BankInfo}, () => {
        this.checkScreenStatus();
      });
      console.log("::::::::::::::::::::::::::::::::::::",LevelInfo,AcademicInfo)      
  }  
};



async componentDidMount(){

  this.fetchlevel_academic_infoData()

      // setTimeout(() => {          
      // }, 900);

}




async checkScreenStatus () {

  console.log("getting level info=========",this.state.AcademicInfo,this.state.LevelInfo,this.state.BankInfo)

  try{
    const userLoggedIn = await AsyncStorage.getItem('userLoggedIn') || 'false';

    if(this.state.AcademicInfo == false){
      this.props.navigation.navigate('question');     
    }   
    else if(this.state.BankInfo == false){
      this.props.navigation.navigate('bankdetails');     
    }
    else if(this.state.LevelInfo == false){
      this.props.navigation.navigate('levelchoice');     
    }
    else if(userLoggedIn == 'true'){                
        this.props.navigation.navigate('home');                                        
    }    
    setTimeout(()=>{
      this.setState({ isLoading: false,isSpinner:false });
    },100);

  }catch(error){
  }   
}


  render() {
    const { 
      isLoading
    } = this.state;

    return (    
      <Fragment>
            <Spinner visible={this.state.isSpinner} />
  {  !isLoading && 
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={Styles.headerTxt}> Devenez coach </Text>
                  <Text style={Styles.headerTxt}> d'anglais SPYK</Text>
                </View>
                <Image source={logo} style={Styles.headerLogo} />
              </View>

            <View style={{width:"96%",borderWidth:0,alignSelf:"center"}}>

              <Text style={Styles.txtStyle}>
                Comment devenir coach d'anglais SPYK ?{' '}
              </Text>
              <Text style={Styles.txtStyle1}>C'est très simple.</Text>

              <Text style={Styles.txtStyle2}>
                Connectez - vous et remplissez votre profil.
              </Text>
              <Text style={Styles.txtStyle2}>
                Vous recevrez un email dans un délai de 48h{' '}
              </Text>
              <Text style={Styles.txtStyle2}>
                pour vous confirmer que votre profil a été retenu{' '}
              </Text>
              <Text style={Styles.txtStyle2}>
                par notre équipe de recrutement pour passer un{' '}
              </Text>
              <Text style={Styles.txtStyle2}>
                entretien oral. Votre profil sera activé après avoir
              </Text>
              <Text style={Styles.txtStyle2}>réussi l'entretien oral.</Text>

              <View style={{marginTop: 30, marginBottom: 30}}>
                <Text style={Styles.txtStyle2}>
                  {' '}
                  Il sera alors visible par les utilisateurs cherchant{' '}
                </Text>
                <Text style={Styles.txtStyle2}>
                  à avoir un coaching d'anglais et vous pourrez
                </Text>

                <Text style={Styles.txtStyle2}>
                  commencer à donner votre premier coaching.
                </Text>
              </View>

              <View style={{marginTop: 30, marginBottom: 30}}>
                <Text style={Styles.txtStyle3}>
                  Comment se passe un coaching avec un client?
                </Text>
                <Text style={Styles.txtStyle2}>
                Rien à préparer, vous n'avez qu'à renseigner votre disponibilité sur l'appli ou vous mettre en mode "en ligne" et démarrer une conversation téléphonique en anglais !
                </Text>                
              </View>

              </View>
           
              <View style={Styles.continueBtn}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('login');
                  }}>
                  <Text style={Styles.continueBtnTxt}>Continuer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
                }
      </Fragment>

    );
  }
}
