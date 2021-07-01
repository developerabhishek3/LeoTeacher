import React, { Component,Fragment} from 'react'
import { View,Text,ScrollView, ImageBackground,Image,TextInput,TouchableOpacity,BackHandler,Alert,Linking} from 'react-native'

import Styles from './index2Css'
import bgImg from '../../../../../assets/bgImages/1.png'
import logo from '../../../../../assets/icon/96.png';
import back from '../../../../../assets/icon/20.png';
import { Rating, AirbnbRating } from 'react-native-ratings';

import People from '../../../../../assets/icon/25.png';

import {demand_amount_pending} from '../../../../../Api/afterAuth'
import Spinner from 'react-native-loading-spinner-overlay';

import moment from 'moment'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {      
        demandPendingData:[],
        isSpinner:true,
        isBodyLoaded:false
    };
  }

  componentDidMount = async () => {
    this.fetchdemandPendingData()

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  
    fetchdemandPendingData = async () => {
      const GetSupportResponse = await demand_amount_pending();
      if (GetSupportResponse.result == true) {
        var demandPendingData = GetSupportResponse.response.data;
        console.log("getting demandPendingData data----------",demandPendingData)
      }
      this.setState({demandPendingData,isBodyLoaded: true,isSpinner: false});
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

    const {supportData} =  this.state;

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <View style={Styles.header}>
         <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
          <Image source={back} style={Styles.headertxtInputImg} />
          </TouchableOpacity>
          <Text style={Styles.headerTxt}>Coachings facturés</Text>
          <Text style={Styles.headerTxt}>    </Text>
        </View>
        <Spinner visible={this.state.isSpinner}/>

        <ImageBackground source={bgImg} resizeMode="stretch" style={{flex:2,borderWidth:0,width:'100%'}}>


        <View style={Styles.subhaderView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('demandamount');
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={Styles.subheadingTxt}>Payés</Text>
              <View style={{borderColor: 'gray', borderWidth: 1, width: 100}} />
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <Text style={Styles.subheadingTxt1}>En attente</Text>
            <View
              style={{borderColor: '#b41565', borderWidth: 1, width: 100}}
            />
          </View>
        </View>
       

      {
        this.state.isBodyLoaded == true ?

        <ScrollView>

            {
                this.state.demandPendingData.length > 0 ?
                <Fragment>                
                    {       
                this.state.demandPendingData.map((singleMap)=>{
                  let NewDate = moment(singleMap.request_date).format('DD/MM/YYYY') 
                    return(
                        <Fragment>
                            <View style={{borderWidth:1,borderColor:'#DDDDDD',width:'96%',alignSelf:'center',margin:7,borderRadius:7}}>
                            {/* <View style={{flexDirection:'row',margin:2}}> 
                            <Text style={{margin:3,fontWeight:'600',color:"gray"}}>Demande d'identification:</Text>
                            <Text style={{margin:3,fontWeight:'700',color:"#b41565"}}>#{singleMap.id}</Text>
                            </View> */}
                              
                                <View style={{flexDirection:'row',margin:2}}> 
                                <Text style={{margin:3,fontWeight:'600',color:"gray"}}>Montant :</Text>                    
                                <Text style={{margin:3,fontWeight:'700',color:"#b41565"}}>{singleMap.amount}</Text>
                                    <Image source={require("../../../../../assets/icon/euro-currency-symbol-1.png")} style={{height:12,width:12,margin:7}} />
                                 </View>
                              
                            <View style={{flexDirection:'row',margin:2}}> 
                              <Text style={{margin:3,fontWeight:'600',color:"gray"}}>Mode de paiement :</Text>
                              <Text style={{margin:3,fontWeight:'700',color:"#b41565"}}>{singleMap.to_bank_or_paypal_account}</Text>
                            </View>

                               
                            <View style={{flexDirection:'row',margin:2}}> 
                            <Text style={{margin:3,fontWeight:'600',color:"gray"}}>Date de la demande :</Text>
                            <Text style={{margin:3,fontWeight:'700',color:"#b41565"}}>{NewDate}</Text>
                            </View>

                            {/* <View style={{flexDirection:'row',margin:2}}> 
                            <Text style={{margin:3,fontWeight:'600',color:"gray"}}>Date de mise à jour :</Text>
                            <Text style={{margin:3,fontWeight:'700',color:"#b41565"}}>{singleMap.update_date}</Text>
                            </View> */}
    
                            </View>
                        </Fragment>
                    )
                })
            }
                </Fragment>
                
                :<View style={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{textAlign:'center',color:"gray",textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>Aucun paiement en attente</Text>
               </View>
            }

        </ScrollView>

        :
            <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign:'center',color:"gray",textAlignVertical:'center',fontSize:18,fontWeight:'700',marginTop:160}}>chargement</Text>
            </View>
          }
          
         


          
        </ImageBackground>          
      </View>
    )
  }
}
