import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
  BackHandler
} from 'react-native';
import Styles from './indexCss';
import bgImg from '../../../assets/bgImages/3.png';
import logo from '../../../assets/icon/96.png';
import facebook from '../../../assets/icon/fb.png';
import {RadioButton} from 'react-native-paper';

import {add_update_academic_info} from '../../../Api/auth'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'first',
      value: 'second',
      value: 'third',
      value: 'fourth',
      value: 'fifth',
      value: 'angleG',
      value: 'angleP',
      value: 'lesD',


      value:"Oui",       
      value:"Non",
      value:"Oui1",       
      value:"Non1" ,
      data1:[
        {"id": "1",
        "value":"TEFL"
          },
          {"id": "2",
          "value":"TESOL"
          },
          {"id": "3",
          "value":"Master"
          },
          {"id": "4",
          "value":"Bachelor"
          },
          {"id": "5",
          "value":"Autre"
          },            
      ],
      data2:[
        {"id": "1",
        "value":"anglais général"
          },
          {"id": "2",
          "value":"anglais professionnel"
          },
          {"id": "3",
          "value":"les deux"
          },                   
      ],
      data3:[
        {"id": "1",
        "value":"Oui"
          },
          {"id": "2",
          "value":"Non"
          },                           
      ],
      data4:[
        {"id": "1",
        "value":"Oui"
          },
          {"id": "2",
          "value":"Non"
          },                           
      ],    
      


      q_1_ans:"",
      q_2_ans:"",
      q_3_ans:"",
      q_4_ans:"",
      q_5_ans:"",
      q_6_ans:"",
    };
  }






  add_update_academic_infoFunction = async () => {
    // console.log("getting inside the function uuid --------",this.state.fcm_token)
    const {
      q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
      q_6_ans,
    } = this.state;
    const add_update_academic_infoResponse = await add_update_academic_info({
      q_1_ans:"bfdf",
      q_2_ans:"bfsd",
      q_3_ans:"bsdfb",
      q_4_ans:"sdf",
      q_5_ans:"fvbfs",
      q_6_ans:"dfd", 
    });
    if (add_update_academic_infoResponse.result == true) {
      console.log("getting result here --------", add_update_academic_infoResponse.response)
     
      if (add_update_academic_infoResponse.response.status === true) {           
          console.log("getting response >>>>>>>>>>>>>>>>",add_update_academic_infoResponse.response)      
          this.props.navigation.navigate("bankdetails")
          // Alert.alert("Message", add_update_academic_infoResponse.response.message)
      }
      else {
        Alert.alert("Message", add_update_academic_infoResponse.response.message)
      }
    } else {
      this.myAlert('Error', add_update_academic_infoResponse.error);
      console.log('getting error here-------------');
    }
    return;
  };

  myAlert = (title = '', message = '') => {
    Alert.alert(title, message);
  };

  validateUser = () => {
    const {  q_1_ans,
      q_2_ans,
      q_3_ans,
      q_4_ans,
      q_5_ans,
      q_6_ans, } = this.state;

    if (q_1_ans.length === 0) {
      this.myAlert('Message', 'Veuillez sélectionner votre réponse!');
    } 
    else if (q_2_ans.length === 0) {
        this.myAlert('Message', 'Veuillez sélectionner votre réponse!');
    }
    else if (q_3_ans.length === 0) {
        this.myAlert('Message', 'Veuillez entrer votre réponse!');
    } 
    else if (q_4_ans.length === 0) {
      this.myAlert('Message', 'Veuillez entrer votre réponse!');
  } 
  else if (q_5_ans.length === 0) {
    this.myAlert('Message', 'Veuillez sélectionner votre réponse!');
  } 
  else if (q_6_ans.length === 0) {
    this.myAlert('Message', 'Veuillez sélectionner votre réponse!');
  } 
    else {
    //   const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //   if (!email.match(mailformat)) {
    //     this.myAlert('Message', 'Invalid Email-Id');
    //     return false;
    //   }
      this.add_update_academic_infoFunction();
    }
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



  render() {
    return (
      <View style={Styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={bgImg}
          resizeMethod="resize"
          resizeMode="stretch"
          style={Styles.bgImgStyle}>
          <ScrollView>
            <View style={{borderWidth: 0, marginBottom: 20, marginTop: 20}}>
              <View style={Styles.headerView}>
                <Image source={logo} style={Styles.headerLogo} />
                <View style={{marginEnd: 50, marginTop: -10}}>
                  <Text style={Styles.headerTxt}>Ajouter plus</Text>
                  <Text style={Styles.headerTxt1}>d'infos</Text>
                </View>
              </View>

              <View style={{marginTop: 30}}>
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>Diplôme</Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                  {
                    this.state.data1.map((singleMAp,key)=>{
                      return(
                        <View>
                           
                                  {
                                      this.state.q_1_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_1_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"lightgreen"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_1_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View>

                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                    Vos compétences linguistiques :
                  </Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                  {
                    this.state.data2.map((singleMAp,key)=>{
                      return(
                        <View>
                           
                                  {
                                      this.state.q_2_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_2_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"lightgreen"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_2_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center',margin:10}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:3}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View>

                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                    Devenez coach d'anglais SPYK aujourd'hui et gagnez un revenu
                    depuis chez vous avec des horaires que vous choisissez !
                  </Text>
                </View>


                <View style={{borderWidth:1,borderColor:'#DDDDDD',flexWrap:'wrap',width:'90%',borderRadius:10,alignSelf:'center',margin:10,flexDirection:'column'}}>
                
                    <View style={{flexDirection:'column',}}>
                      <Text style={{flexDirection:'column',flexWrap:'wrap',alignSelf:'flex-start',margin:10}}>Pourquoi voulez-vous devenir un coach d'anglais sur l'application SPYK ?</Text>
                     <TextInput 
                     style={Styles.textInputField}
                     numberOfLines={3}
                     onChangeText={(q_3_ans)=>this.setState({q_3_ans })}
                     />
                    </View>


                </View>



                <View style={{borderWidth:1,borderColor:'#DDDDDD',flexWrap:'wrap',width:'90%',borderRadius:10,alignSelf:'center',margin:10,flexDirection:'column'}}>
                
                    <View style={{flexDirection:'column',}}>
                      <Text style={{flexDirection:'column',flexWrap:'wrap',alignSelf:'flex-start',margin:10}}>Qu'est-ce qui fait de vous un bon candidat au poste de coach d'anglais ?</Text>
                    <TextInput 
                    numberOfLines={3}
                    onChangeText={(q_4_ans)=>this.setState({q_4_ans })}
                    style={Styles.textInputField}
                    />
                    </View>


                </View>




                        
                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                  Avez-vous déjà enseigné l'anglais ?
                  </Text>
                </View>


                <View style={Styles.radiobtnMainView}>
                {
                    this.state.data3.map((singleMAp,key)=>{
                      return(
                        <View>
                           
                                  {
                                      this.state.q_5_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:7,marginStart:10,marginEnd:10}} />
                                          <Text style={{color:"lightgreen"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_5_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:7,marginStart:10,marginEnd:10}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View>






                <View style={Styles.subHeader}>
                  <Text style={Styles.txtStyle1}>
                  Quel est votre niveau de français ?
                  </Text>
                </View>

                <View style={Styles.radiobtnMainView}>
                {
                    this.state.data4.map((singleMAp,key)=>{
                      return(
                        <View>
                           
                                  {
                                      this.state.q_6_ans == singleMAp.value ? 
                                      <TouchableOpacity  onPress={()=>{this.setState({q_6_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/8.png")} style={{height:20,width:20,margin:7,marginStart:10,marginEnd:10}} />
                                          <Text style={{color:"lightgreen"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
  
                                      :
                                      <TouchableOpacity onPress={()=>{this.setState({q_6_ans:singleMAp.value})}} style={{flexDirection:'row',alignItems:'center'}}>
                                          <Image source={require("../../../assets/icon/4.png")} style={{height:20,width:20,margin:7,marginStart:10,marginEnd:10}} />
                                          <Text style={{color:"gray"}}>{singleMAp.value}</Text>
                                      </TouchableOpacity>
                                  }
                                 
                        </View>
                      )
                    })
                  }
                </View>






                <View style={Styles.continueBtn}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   this.props.navigation.navigate('levelchoice');
                    // }}
                    onPress={()=>{this.validateUser()}}
                    >
                    <Text style={Styles.continueBtnTxt}>Valider</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
