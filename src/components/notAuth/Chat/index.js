import React, {Component,Fragment} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity,BackHandler,Alert,StatusBar,TextInput,Dimensions} from 'react-native';
import BottomNavigator from '../../../router/BottomNavigator';
import Styles from './indexCss';
import logo from '../../../assets/icon/96.png';
import back from '../../../assets/icon/20.png';
import nextArrow from '../../../assets/icon/36.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {add_single_chat,get_single_chat} from '../../../Api/afterAuth';


import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class index extends Component {





  constructor(props) {
    super(props);
    this.state = {

      isSpinner: true,  
      isBodyLoaded: true,  
      to_id:0,
      from_id:0,
      ChatData:[],
      chat_msg:"",

    };
    this.myTextInput = React.createRef();
    this.myRef = React.createRef()
  }

  Getsingle_chat_data =  () => {
    this.setState({ spinner: true }, async () => {

    // console.log("getting inside the function level id " + this.state.level_id)

    let userId = this.props.navigation.getParam("Id")

    // console.log("getting getparam user id----------",userId)
    // console.log("getting our user id here---------",this.state.from_id)
    const {from_id,} = this.state;
    const single_chat_dataResponse = await get_single_chat({
      from_id,
      to_id:userId,
    });
    if (single_chat_dataResponse.result == true) {
      if(single_chat_dataResponse.response.status == true){
        var ChatData = single_chat_dataResponse.response.chat_history;
        // console.log("getting data on single chat--------",ChatData)
        // Alert.alert("Message","Message send sucessfully !")
        this.setState({ChatData,isBodyLoaded:true,isSpinner:false,}) 
        
      }
      else{
        this.setState({ isBodyLoaded: false,isSpinner: false },()=>{
          Alert.alert("Message","Quelque chose a mal tourné, essayez encore!",[ { text: "Ok",onPress:()=>{
              this.props.navigation.goBack();
          }}]);
      })
      }

      // this.props.navigation.navigate("chat2")

      // Alert.alert("Message",this.state.chat_msg)     
      // console.log("getting ChatData data----------",single_chat_dataResponse.response)
    }
    else {
      this.setState({ spinner: false }, () => {
        setTimeout(() => {
          Alert.alert("Message", "Quelque chose a mal tourné, essayez encore !!", [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ])
        }, 2)
      })
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});
  })
  };




  add_single_chatFunctionData = async () => {
    // console.log("getting inside the function level id " + this.state.level_id)
    let userId = this.props.navigation.getParam("Id")
    // console.log("getting getpram on add api-------",userId)
    // console.log("getting our user id here---------",this.state.from_id)
   
    const {from_id,chat_msg} = this.state;
    const add_single_chatFunctionResponse = await add_single_chat({
      from_id,
      to_id:userId,
      chat_msg
    });
    if (add_single_chatFunctionResponse.result == true) {
    
      this.Getsingle_chat_data() 
      this.setState({chat_msg:""})

      // console.log("getting ChatData data- inside ---------",add_single_chatFunctionResponse.response)
    }
    else{
      Alert.alert("Message","Erreur Réessayer!")
    }
    // this.setState({ChatData,isBodyLoaded:true,isSpinner:false});    
  };
  

  validateFunction(){
    if(this.state.chat_msg.length == 0){
      Alert.alert("Message","Veuillez ajouter un message!")
    }
    else{
      this.add_single_chatFunctionData()
    }
  }











  componentDidMount = async () => {

    // console.log("gettikgn usert is herere============",userId)
    
  
    const user_id = await AsyncStorage.getItem('user_id');
    const CurrentUserId = JSON.parse(user_id)    
      this.setState({from_id:CurrentUserId})   
      
      
      setInterval(() => {
        this.Getsingle_chat_data()
      }, 700);




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

    // console.log("getting inside the render method ---------------", this.state.ChatData)
 
    return (
      <Fragment>
      <View style={Styles.container}>
      <View style={Styles.header}> 
    <TouchableOpacity
        onPress={() => {
          this.props.navigation.goBack();
        }}>
      <Image source={back} style={Styles.headertxtInputImg} />
      </TouchableOpacity>
      <View style={{flexDirection: 'column', alignSelf: 'center'}}>
        <Text style={Styles.headerTxt}>Chat</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            alignSelf: 'center',
            color: '#FFFFFF',
          }}>
          Chat pendant la durée du coaching uniquement
        </Text>
      </View>
      <Image source={logo} style={Styles.headertxtInputImg1} />
    </View>
    
    <Spinner visible={this.state.isSpinner} />
    <View style={{margin:1,borderWidth:1,borderColor:"#DDDDDD",flex:2}}>
      {
        this.state.isBodyLoaded == true ?
        <Fragment>
         {
           this.state.ChatData.length > 0 ?         
         <ScrollView ref="scrollView"
         onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
        {
          this.state.ChatData.map((singleMap)=>{
            return(
              <Fragment>
                <View style={{margin:1,}}>
                  {
                    singleMap.left_right == `left` ?
                    <View style={{backgroundColor:'sky#5541E1',alignSelf:'flex-start',borderRadius:20,margin:4,flexDirection:'row'}}>
                      {/* <Image  source={{
              uri: `https://www.spyk.fr/${singleMap.to_profile_url}`,
            }}  style={{height:40,width:40,marginStart:-5,borderRadius:30,}} /> */}
                      <View style={{flexDirection:"column"}}>
                       <Text style={{borderRadius:6,color:"#000000",fontWeight:"600",marginStart:13,marginEnd:13,margin:1,fontSize:16}}>{singleMap.msg}</Text>
                       <Text style={{fontSize:9,marginStart:13,marginEnd:13,margin:1}}>{singleMap.chat_date}</Text>
                       </View>
                    </View>
                    :
                    <View style={{backgroundColor:'#FD5DA8',alignSelf:'flex-end',borderRadius:20,margin:4,flexDirection:'row'}}>
                        {/* <Image  source={{
              uri: `https://www.spyk.fr/${singleMap.to_profile_url}`,
            }}  style={{height:40,width:40,marginStart:-10,borderRadius:30,}} /> */}
                    <View style={{flexDirection:"column"}}>
                       <Text style={{borderRadius:6,color:"#000000",fontWeight:"600",marginStart:13,marginEnd:13,margin:1,fontSize:16}}>{singleMap.msg}</Text>
                       <Text style={{fontSize:9,marginStart:13,marginEnd:13,margin:1}}>{singleMap.chat_date}</Text>
                       </View>
                    </View>
                  }                
                </View>
              </Fragment>
            )
          })
        }
    </ScrollView>
    :<View style={{alignItems:'center',justifyContent:'center',marginTop:200}}>
    <Text style={{fontSize:18,fontWeight:'700',textAlign:'center'}}>Record non trouvé!</Text>
  </View>
}
        </Fragment>          
        :<View>
        <Text>chargement...</Text>
    </View>
      }        
    </View>
    <View style={Styles.bottomView}>
                <View style={{borderWidth:0,flexDirection:'row',}}>

                <TextInput
                  value={this.state.chat_msg}
                  onChangeText={(chat_msg) => this.setState({chat_msg})}
                style={{width:'80%',borderWidth:0,borderRadius:20,marginStart:10,}} placeholder="Enter message here" />
                <TouchableOpacity
                     onPress={()=>{this.validateFunction()}}
                >
                  {
                    this.state.chat_msg != "" ?
                    <Image source={nextArrow} style={{height:25,width:25,marginEnd:0,margin:6,alignSelf:'flex-end'}} />
                    :null
                  }
                
                </TouchableOpacity>
                </View>
                </View>      
  </View>
  </Fragment>
    );
  }
}

// 17.Chat
// Chat pendant la durée du coaching uniquement
// Salut
// 23-04-2019, 2:59 PM
// Lorem Ipsum dummy text.Lorem Ipsum
// Reçu, 23-04-2019, 2:59 PM
// Lorem Ipsum
// 23-04-2019, 2:59 PM
