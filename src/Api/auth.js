import Axios from 'axios';
import {commonHeader, endPoints} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';

const CommonURL = `https://www.spyk.fr/api_teacher//`


export async function createUser(body = {}) {
  try {
    const createUserRegister = await Axios.post(
      'https://www.spyk.fr/api_teacher/registration_manual',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (createUserRegister.status) {
      console.log('getting response here-------', createUserRegister.data);
      return {result: true, response: createUserRegister.data};
    } else {
      console.log('getting error here----------', createUserRegister.data);
      return {result: false, error: createUserRegister.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function loginUser(body ={}) {
  try {      
    const loginUserResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/login_manual',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (loginUserResponse.status) {
      return {result: true, response: loginUserResponse.data};
    } else {
      return {result: false, response: loginUserResponse.data};
    }
  } catch (err) {
    let error = new Error();
    const {data, status} = err.response;
    error.response = err.response;
    if (status == 400 && data.error === 'invalid_grant') {
      error.message = 'Invalid Credentials';
    } else {
      error.message = 'Request Failed';
    }
    throw error;
  }
}


export async function getCountryList() {


  try {
    const getCountryListResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/country_list`,      
      {
        headers: {...commonHeader}     
      },
    );
    if (getCountryListResponse.status) {
      // console.log("getting response on the function--------",getCountryListResponse.data)
      return {result: true, response: getCountryListResponse.data};
    } else {
      return {result: false, error: getCountryListResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function get_all_levels() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  try {
    const get_all_levelsResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/get_all_levels`,      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}     
      },
    );
    if (get_all_levelsResponse.status) {
      // console.log("getting response on the function--------",get_all_levelsResponse.data)
      return {result: true, response: get_all_levelsResponse.data};
    } else {
      return {result: false, error: get_all_levelsResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function update_level(body = {}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  try {
    const update_level_Response = await Axios.post(
      'https://www.spyk.fr/api_teacher/update_level',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}  
      },
    );
    if (update_level_Response.status) {
      console.log('getting response here-------', update_level_Response.data);
      return {result: true, response: update_level_Response.data};
    } else {
      console.log('getting error here----------', update_level_Response.data);
      return {result: false, error: update_level_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function ForgotPassword1(body = {}) {
  try {
    const forgotpassword_req_1_Response = await Axios.post(
      'https://www.spyk.fr/api_teacher/forgotpassword_req_1',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_1_Response.status) {
      console.log('getting response here-------', forgotpassword_req_1_Response.data);
      return {result: true, response: forgotpassword_req_1_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_1_Response.data);
      return {result: false, error: forgotpassword_req_1_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function ForgotPassword2(body = {}) {
  try {
    const forgotpassword_req_2_Response = await Axios.post(
      'https://www.spyk.fr/api_teacher/forgotpassword_req_2',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (forgotpassword_req_2_Response.status) {
      console.log('getting response here-------', forgotpassword_req_2_Response.data);
      return {result: true, response: forgotpassword_req_2_Response.data};
    } else {
      console.log('getting error here----------', forgotpassword_req_2_Response.data);
      return {result: false, error: forgotpassword_req_2_Response.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function SetNewPassword(body = {}) {
  try {
    const setNewPasswordResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/setpassword',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (setNewPasswordResponse.status) {
      console.log('getting response here-------', setNewPasswordResponse.data);
      return {result: true, response: setNewPasswordResponse.data};
    } else {
      console.log('getting error here----------', setNewPasswordResponse.data);
      return {result: false, error: setNewPasswordResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function SocialAuth(body = {}) { 
  try {
    const socialAuthResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/social_media_auth',
      body,
      {
        headers: {...commonHeader},
      },
    );
    if (socialAuthResponse.status) {
      console.log('getting response here-------', socialAuthResponse.data);
      return {result: true, response: socialAuthResponse.data};
    } else {
      console.log('getting error here----------', socialAuthResponse.data);
      return {result: false, error: socialAuthResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function add_update_bank_info(body = {}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  console.log("getting token value here or not===============",token)
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

console.log("getting token and user id here ?????????????????",TokenValue,UserId)



  try {
    const add_update_bank_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/add_update_bank_info',      
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}   
      },
    );
    if (add_update_bank_infoResponse.status) {
      console.log('getting response here-------', add_update_bank_infoResponse.data);
      return {result: true, response: add_update_bank_infoResponse.data};
    } else {
      console.log('getting error here----------', add_update_bank_infoResponse.data);
      return {result: false, error: add_update_bank_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function add_update_academic_info(body = {}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {
    const add_update_academic_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/add_update_academic_info',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`}   
      },
    );
    if (add_update_academic_infoResponse.status) {
      console.log('getting response here-------', add_update_academic_infoResponse.data);
      return {result: true, response: add_update_academic_infoResponse.data};
    } else {
      console.log('getting error here----------', add_update_academic_infoResponse.data);
      return {result: false, error: add_update_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}








export async function level_academic_info() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log('getting ion level acedemic welcom page==========', UserId);
  // console.log('getting ion level acedemic welcom page==========', TokenValue);

  try {
    const level_academic_infoResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/level_academic_info`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (level_academic_infoResponse.status) {
      // console.log("getting response on the function--------",level_academic_infoResponse.data)
      return {result: true, response: level_academic_infoResponse.data};
    } else {
      return {result: false, error: level_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}