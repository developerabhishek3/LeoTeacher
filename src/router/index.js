import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Auth component...
import Login from '../components/auth/Login/';
import Splash from '../components/auth/Splash/';

import Signup from '../components/auth/Signup';

import Splash2 from '../components/auth/Splash2';
import ForgotPassword from '../components/auth/ForgotPassword'
import Welcome from '../components/auth/Welcome';
import Question from '../components/auth/Question';
import LevelChoice from '../components/auth/LevelChoice';


import FacebookLogin from '../components/auth/SocialLogin/FacebookLogin'
import GoogleLogin from '../components/auth/SocialLogin/GoogleLogin';




import forgotpasswordReq2 from '../components/auth/ForgotPassword/index2';
import forgotpasswordReq3 from '../components/auth/ForgotPassword/setPassword';
// Not Auth Component....
import Home from '../components/notAuth/Home';
import Profile from '../components/notAuth/Profile';
import Reservation from '../components/notAuth/Reservation';
import Chat from '../components/notAuth/Chat';

import Profile2 from '../components/notAuth/Profile/index2';



import ChooseTime from '../components/notAuth/withoutNavigator/ChooseTime';
import ClientInfo from '../components/notAuth/withoutNavigator/ClientInfo';
import Chat2 from '../components/notAuth/withoutNavigator/Chat2';

import Support from '../components/notAuth/withoutNavigator/ProfileDetails/Support';
import MyProfile from '../components/notAuth/withoutNavigator/ProfileDetails/MyProfile';
import Revenue from '../components/notAuth/withoutNavigator/ProfileDetails/Revenue';

import Parameter from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter';


import ChangePassword from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword'

import EditProfile from '../components/notAuth/withoutNavigator/ProfileDetails/MyProfile/editProfile';


import HistoryReservation from '../components/notAuth/Reservation/History'

import BankDetails from '../components/auth/BankDetails'


import Notification from "../components/notification/index"


import notificationData from '../components/notAuth/withoutNavigator/ProfileDetails/Notifications';

import demandAmount from '../components/notAuth/withoutNavigator/ProfileDetails/DemandAmount/index'
import demandAmountPending from '../components/notAuth/withoutNavigator/ProfileDetails/DemandAmount/index2'



import FirstCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/FirstChceck';
import SecondCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/SecondCheck';
import ThirdCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/ThirdCheck';
import FourthCheck from '../components/notAuth/withoutNavigator/ProfileDetails/Parameter/ChangePassword/FourthCheck';




const AppNavigator = createStackNavigator(
  {
    splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: false,
      },
    },
    splash2: {
      screen: Splash2,
      navigationOptions: {
        headerShown: false,
      },
    },
    welcome: {
      screen: Welcome,
      navigationOptions: {
        headerShown: false,
      },
    },
    notification: {
      screen: Notification,
      navigationOptions: {
        headerShown: false,
      },
    },

    forgotpasswordreq2: {
      screen: forgotpasswordReq2,
      navigationOptions: {
        headerShown: false,
      },
    },
    forgotpasswordreq3: {
      screen: forgotpasswordReq3,
      navigationOptions: {
        headerShown: false,
      },
    },
    login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },

    facebooklogin: {
      screen: FacebookLogin,
      navigationOptions: {
        headerShown: false,
      },
    },  

    bankdetails: {
      screen: BankDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    notification: {
      screen: Notification,
      navigationOptions: {
        headerShown: false,
      },
    },
    notificationdata: {
      screen: notificationData,
      navigationOptions: {
        headerShown: false,
      },
    },


    googlelogin: {
      screen: GoogleLogin,
      navigationOptions: {
        headerShown: false,
      },
    },

    demandamount:{
      screen:demandAmount,
      navigationOptions:{
        headerShown:false,
      }
    },
    demandamountpending:{
      screen:demandAmountPending,
      navigationOptions:{
        headerShown:false,
      }
    },
    singup:{
        screen:Signup,
        navigationOptions: {
          headerShown: false,
        },
    },  
    forgotpassword:{
      screen:ForgotPassword,
      navigationOptions: {
        headerShown: false,
      },
      },   
    question:{
      screen:Question,
      navigationOptions: {
        headerShown: false,
      },
    },
    levelchoice:{
      screen:LevelChoice,
      navigationOptions: {
        headerShown: false,
      },
    },


    firstcheck: {
      screen: FirstCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    secondcheck: {
      screen: SecondCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    thirdcheck: {
      screen: ThirdCheck,
      navigationOptions: {
        headerShown: false,
      },
    },
    fourthcheck: {
      screen: FourthCheck,
      navigationOptions: {
        headerShown: false,
      },
    },


    home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    reservation: {
      screen: Reservation,
      navigationOptions: {
        headerShown: false,
      },
    },
    chat: {
      screen: Chat,
      navigationOptions: {
        headerShown: false,
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        headerShown: false,
      },
    },
    
    choosetime: {
      screen: ChooseTime,
      navigationOptions: {
        headerShown: false,
      },
    },

    clientinfo: {
      screen: ClientInfo,
      navigationOptions: {
        headerShown: false,
      },
    },

    chat2: {
      screen: Chat2,
      navigationOptions: {
        headerShown: false,
      },
    },

    support:{
      screen:Support,
      navigationOptions: {
        headerShown: false,
      },
    },

    profile2: {
      screen: Profile2,
      navigationOptions: {
        headerShown: false,
      },
    },
  
    myprofile: {
      screen: MyProfile,
      navigationOptions: {
        headerShown: false,
      },
    },  
    revenue: {
      screen: Revenue,
      navigationOptions: {
        headerShown: false,
      },
    },

    parameter:{
      screen:Parameter,
      navigationOptions: {
        headerShown: false,
      },
    },

    changepassword:{
      screen:ChangePassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    editprofile:{
      screen:EditProfile,
      navigationOptions: {
        headerShown: false,
      },
    },



    historyreservation:{
      screen:HistoryReservation,
      navigationOptions: {
        headerShown: false,
      },
    },
  
  },
  {
    unmountInactiveRoutes: true,
    initialRouteName: 'splash2',
  },
);

export default createAppContainer(AppNavigator);
