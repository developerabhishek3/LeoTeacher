import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  Dimensions
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

import FastImage from 'react-native-fast-image';



// sleceted route image.....
import SelectedReservation from '../assets/BottomIcon/5.png'
import SelectedHome from '../assets/BottomIcon/1.png'
import SelectedChat from '../assets/../assets/icon/10.png'
import SelectedProfie from '../assets/BottomIcon/8.png'


// unselected route image.....

import UnSelectedReservation from '../assets/BottomIcon/3.png'
import UnSelectedHome from '../assets/BottomIcon/7.png'
import UnSelectedChat from '../assets/../assets/icon/10-1.png'
import UnSelectedProfie from '../assets/BottomIcon/4.png'
import AntDesign from 'react-native-vector-icons/AntDesign';


AntDesign.loadFont();


class BottomNavigator extends Component{
    
    render(){
        let {currentRoute} = this.props;
        // console.log("current route name-",currentRoute)
        return(
            <View keyboardShouldPersistTaps="always">
                
                <View style={styles.TabNavigatorView}>

                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'home') {
                      this.props.navigation.navigate('home', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                    {currentRoute == 'home' ? (
                   <Image source={SelectedHome} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedHome} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'home' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Accueil</Text>
                  ) : (
                    <Text style={{color:'gray',margin:0,textAlign:'center'}}>Accueil</Text>
                  )}                 
                </TouchableOpacity>

                <TouchableOpacity
                  style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'reservation') {
                      this.props.navigation.navigate('reservation', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'reservation' ? (
                    <Image source={SelectedReservation} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedReservation} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'reservation' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Réservation</Text>
                  ) : (
                    <Text style={{color:'gray',margin:0,textAlign:'center'}}>Réservation</Text>
                  )}                 
                </TouchableOpacity>

            
                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'choosetime') {
                      this.props.navigation.navigate('choosetime', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                  {currentRoute == 'choosetime' ? (
                    <Image source={SelectedChat} style={styles.routesImageView} />
                  ) : (
                    <Image source={UnSelectedChat} style={styles.routesImageView} />
                  )}  
                  {currentRoute == 'choosetime' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Disponibilités</Text>
                    ) : (
                      <Text style={{color:'gray',margin:0,textAlign:'center'}}>Disponibilités</Text>
                  )}                 
                </TouchableOpacity>

                <TouchableOpacity
                   style={{width: '25%',borderWidth:0}}
                  onPress={() => {
                    if (currentRoute != 'profile2') {
                      this.props.navigation.navigate('profile2', {
                        proceedView: undefined,
                      });
                    }
                  }}>
                   {currentRoute == 'profile2' ? (
                     <Image source={SelectedProfie} style={styles.routesImageView} />
                    ) : (
                      <Image source={UnSelectedProfie} style={styles.routesImageView} />
                  )}
                  {currentRoute == 'profile2' ? (
                    <Text style={{color:'#b41565',margin:0,fontWeight:'700',textAlign:'center'}}>Profil</Text>
                    ) : (
                      <Text style={{color:'gray',margin:0,textAlign:'center'}}>Profil</Text>
                  )}                 
                </TouchableOpacity>
                           
                </View>
            </View>
        )
    }
}


export default BottomNavigator;

const styles = StyleSheet.create({
    TabNavigatorView: {
      backgroundColor: '#FFFFFF',
      height: 65,
      borderColor: '#EFEFEF',
      borderWidth: 1,
      width: '103%',
      alignSelf:'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom:-3,
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30
    },
    routesImageView: {
      alignSelf: 'center',
      height: 22,
      width: 22
    },
    routeTextView: {
      textAlign: 'center',
      fontSize: 12,  
      color: '#696969',
      paddingTop: 5,
    },
    selectedRouteTextView: {
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '700',
      color: '#793422',
      paddingTop: 5,
    },
    routesImageView1:{
      height:70,
      width:30,
      alignSelf:'center',
      borderColor:'red',
      borderWidth:0,
      marginBottom:30
    },
  });