import Axios from 'axios';
import {commonHeader, endPoints, commonHeaderById} from '@constants';
import AsyncStorage from '@react-native-community/async-storage';







export async function ChangePassword(body ={}) {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)

  console.log("getting token and id --------------",TokenValue,UserId)
  try {      
    const ChangePasswordResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/change_password',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
      },
    );
    if (ChangePasswordResponse.status) {
      return {result: true, response: ChangePasswordResponse.data};
    } else {
      return {result: false, response: ChangePasswordResponse.data};
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




//ADD CHATTING TEXT APi calling here--------

export async function add_single_chatFunction(body ={}) {

const token = await AsyncStorage.getItem('token');
const user_id = await AsyncStorage.getItem('user_id');

const TokenValue = JSON.parse(token);
const UserId = JSON.parse(user_id)
try {      
  const add_single_chatResponse = await Axios.post(
    'https://www.spyk.fr/api_teacher/add_single_chat',
    body,
    {
      headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
    },
  );
  if (add_single_chatResponse.status) {
    return {result: true, response: add_single_chatResponse.data};
  } else {
    return {result: false, response: add_single_chatResponse.data};
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


// GET CHATTING APi calling here------------
export async function get_single_chatFunction(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {      
    const get_single_chatResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/get_single_chat',
      body,
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
      },
    );
    if (get_single_chatResponse.status) {
      return {result: true, response: get_single_chatResponse.data};
    } else {
      return {result: false, response: get_single_chatResponse.data};
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
  



// GET CHATTING USER LIST API calling here----------------
  export async function get_chat_usersFunction() {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)


    console.log("getting token value here---------------",TokenValue)
    try {      
      const get_chat_usersResponse = await Axios.get(
        'https://www.spyk.fr/api_teacher/chat_users',       
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
        },
      );
      if (get_chat_usersResponse.status) {
        return {result: true, response: get_chat_usersResponse.data};
      } else {
        return {result: false, response: get_chat_usersResponse.data};
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

//  UPDATE STUDENT LEVEL APi calling here------------------------

    export async function update_levelFunction(body ={}) {

      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      
      const TokenValue = JSON.parse(token);
      const UserId = JSON.parse(user_id)
      try {      
        const update_levelResponse = await Axios.post(
          'https://www.spyk.fr/api_teacher/update_level',
          body,
          {
            headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
          },
        );
        if (update_levelResponse.status) {
          return {result: true, response: update_levelResponse.data};
        } else {
          return {result: false, response: update_levelResponse.data};
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
  


// GET ALL STUDENT MASTER LEVEL'S API 

      
    export async function get_all_levelsFunction() {

      const token = await AsyncStorage.getItem('token');
      const user_id = await AsyncStorage.getItem('user_id');
      
      const TokenValue = JSON.parse(token);
      const UserId = JSON.parse(user_id)
      try {      
        const get_all_levelsResponse = await Axios.get(
          'https://www.spyk.fr/api_teacher/get_all_levels',          
          {
            headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}  
          },
        );
        if (get_all_levelsResponse.status) {
          console.log("getting inside the true ?????????????????????")
          return {result: true, response: get_all_levelsResponse.data};
        } else {
          console.log("getting inside the false ?????????????????????")
          return {result: false, response: get_all_levelsResponse.data};
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
  






// GET WAITING TIME APi calling here---------------


      // export async function get_waiting_timeFunction() {

      //   const token = await AsyncStorage.getItem('token');
      //   const user_id = await AsyncStorage.getItem('user_id');
        
      //   const TokenValue = JSON.parse(token);
      //   const UserId = JSON.parse(user_id)
        
      //   console.log("getting token and user id here inside the function-----------",UserId)
       
      //   try {
      //     const get_waiting_timeRresponse = await Axios.get(
      //       'https://www.spyk.fr/api_teacher/my_profile',      
      //       {
      //         headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      //       },
      //     );
      //     if (get_waiting_timeRresponse.status) {
      //       // console.log("getting response on the function--------",get_waiting_timeRresponse.data)
      //       return {result: true, response: get_waiting_timeRresponse.data};
      //     } else {
      //       // console.log("getting error on the function--------",get_waiting_timeRresponse.data)
      //       return {result: false, error: get_waiting_timeRresponse.data};
      //     }
      //   } catch (error) {
      //     return {result: false, error};
      //   }
      // }
      





    // SUPPORT API calling 


      export async function supportFunction() {

        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id');
        
        const TokenValue = JSON.parse(token);
        const UserId = JSON.parse(user_id)
        
        console.log("getting token and user id here inside the function-----------",UserId)
       
        try {
          const supportRresponse = await Axios.get(
            'https://www.spyk.fr/api_teacher/support',      
            {
              headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
            },
          );
          if (supportRresponse.status) {
            // console.log("getting response on the function--------",supportRresponse.data)
            return {result: true, response: supportRresponse.data};
          } else {
            // console.log("getting error on the function--------",supportRresponse.data)
            return {result: false, error: supportRresponse.data};
          }
        } catch (error) {
          return {result: false, error};
        }
      }
      



//  GET QUESTIONAIRE  API ...........





      export async function get_questionaireFunction() {

        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id');
        
        const TokenValue = JSON.parse(token);
        const UserId = JSON.parse(user_id)
        
        console.log("getting token and user id here inside the function-----------",UserId)
        console.log("getting token and user id here inside the function-----------",TokenValue)
       
        try {
          const get_questionaireResponse = await Axios.get(
            'https://www.spyk.fr/api_teacher/get_questionaire',      
            {
              headers: {...commonHeader,}   
            },
          );
          if (get_questionaireResponse.status) {
            // console.log("getting response on the function--------",get_questionaireResponse.data)
            return {result: true, response: get_questionaireResponse.data};
          } else {
            // console.log("getting error on the function--------",get_questionaireResponse.data)
            return {result: false, error: get_questionaireResponse.data};
          }
        } catch (error) {
          return {result: false, error};
        }
      }
      

//  POST QUESTIONAIRE TEST API ............. 


      export async function post_questionaireFunction(body ={}) {

        const token = await AsyncStorage.getItem('token');
        const user_id = await AsyncStorage.getItem('user_id');
        
        const TokenValue = JSON.parse(token);
        const UserId = JSON.parse(user_id)
        try {      
          const post_questionaireResponse = await Axios.post(
            'https://www.spyk.fr/api_teacher/post_questionaire',
            body,
            {
              headers: {...commonHeader, 'user-id' : `${UserId}`}  
            },
          );
          if (post_questionaireResponse.status) {
            return {result: true, response: post_questionaireResponse.data};
          } else {
            return {result: false, response: post_questionaireResponse.data};
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




//logout api call here--------

export async function LogoutFunction() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
 
  try {
    const logoutResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/my_profile',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (logoutResponse.status) {
      // console.log("getting response on the function--------",logoutResponse.data)
      return {result: true, response: logoutResponse.data};
    } else {
      // console.log("getting error on the function--------",logoutResponse.data)
      return {result: false, error: logoutResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}










// getting user profile.........

export async function StudentProfile() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId,TokenValue)
 
  try {
    const StudentProfileResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/my_profile',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (StudentProfileResponse.status) {
      // console.log("getting response on the function--------",StudentProfileResponse.data)
      return {result: true, response: StudentProfileResponse.data};
    } else {
      // console.log("getting error on the function--------",StudentProfileResponse.data)
      return {result: false, error: StudentProfileResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}





export async function get_academic_info() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId,TokenValue)
 
  try {
    const get_academic_infoResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/get_academic_info',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (get_academic_infoResponse.status) {
      // console.log("getting response on the function--------",get_academic_infoResponse.data)
      return {result: true, response: get_academic_infoResponse.data};
    } else {
      // console.log("getting error on the function--------",get_academic_infoResponse.data)
      return {result: false, error: get_academic_infoResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}








// export async function loginToken() {

 
//   // const token = await AsyncStorage.getItem('token');
//   const user_id = await AsyncStorage.getItem('user_id');

//   const UserId = JSON.parse(user_id)
  
//   console.log("getting token and user id here inside the function-----------",UserId)
 
//   try {
//     const loginTokenResponse = await Axios.get(
//       'https://www.thelyfe.fr/api/login_token',      
//       {
//         headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
//       },
//     );
//     if (loginTokenResponse.status) {
//       // console.log("getting response on the function--------",loginTokenResponse.data)
//       return {result: true, response: loginTokenResponse.data};
//     } else {
//       // console.log("getting error on the function--------",loginTokenResponse.data)
//       return {result: false, error: loginTokenResponse.data};
//     }
//   } catch (error) {
//     return {result: false, error};
//   }
// }



// forgot password API 1
      
export async function forgotPasswordReq1Function(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {      
    const forgotPasswordReq1Response = await Axios.post(
      'https://www.spyk.fr/api_teacher/forgotpassword_req_1',
      body,
      {
        headers: {...commonHeader, }  
      },
    );
    if (forgotPasswordReq1Response.status) {
      return {result: true, response: forgotPasswordReq1Response.data};
    } else {
      return {result: false, response: forgotPasswordReq1Response.data};
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
// forgot password API 2

export async function forgotPasswordReq2Function(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  try {      
    const forgotPasswordReq2Response = await Axios.post(
      'https://www.spyk.fr/api_teacher/forgotpassword_req_2',
      body,
      {
        headers: {...commonHeader, }  
      },
    );
    if (forgotPasswordReq2Response.status) {
      return {result: true, response: forgotPasswordReq2Response.data};
    } else {
      return {result: false, response: forgotPasswordReq2Response.data};
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

// forgot password 3

  export async function forgotPasswordReq3Function(body ={}) {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
    try {      
      const forgotPasswordReq3Response = await Axios.post(
        'https://www.spyk.fr/api_teacher/setpassword',
        body,
        {
          headers: {...commonHeader, }  
        },
      );
      if (forgotPasswordReq3Response.status) {
        return {result: true, response: forgotPasswordReq3Response.data};
      } else {
        return {result: false, response: forgotPasswordReq3Response.data};
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
  


// GET WAITING TIME 






export async function get_waiting_timeFunction() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
 
  try {
    const get_waiting_timeResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/get_waiting_time',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (get_waiting_timeResponse.status) {
      // console.log("getting response on the function--------",get_waiting_timeResponse.data)
      return {result: true, response: get_waiting_timeResponse.data};
    } else {
      // console.log("getting error on the function--------",get_waiting_timeResponse.data)
      return {result: false, error: get_waiting_timeResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



// GET TOGGLE ON HOME


export async function online_offline_status() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
 
  try {
    const online_offline_statusResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/online_offline_status',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (online_offline_statusResponse.status) {
      // console.log("getting response on the function--------",online_offline_statusResponse.data)
      return {result: true, response: online_offline_statusResponse.data};
    } else {
      // console.log("getting error on the function--------",online_offline_statusResponse.data)
      return {result: false, error: online_offline_statusResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


// UPDATE HOME TOGGLE........


export async function online_offlineFunction(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const online_offlineResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/online_offline',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (online_offlineResponse.status) {
      return {result: true, response: online_offlineResponse.data};
    } else {
      return {result: false, response: online_offlineResponse.data};
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







  
// GET current_reservation


export async function current_reservation() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
 
  try {
    const current_reservationResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/current_reservation',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (current_reservationResponse.status) {
      // console.log("getting response on the function--------",current_reservationResponse.data)
      return {result: true, response: current_reservationResponse.data};
    } else {
      // console.log("getting error on the function--------",current_reservationResponse.data)
      return {result: false, error: current_reservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




// GET current_reservation


export async function history_reservation() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
 
  try {
    const history_reservationResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/history_reservation',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (history_reservationResponse.status) {
      // console.log("getting response on the function--------",history_reservationResponse.data)
      return {result: true, response: history_reservationResponse.data};
    } else {
      // console.log("getting error on the function--------",history_reservationResponse.data)
      return {result: false, error: history_reservationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




// # : CANCEL RESERVATION REQUEST

export async function cancel_reservation(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const cancel_reservationResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/cancel_reservation',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (cancel_reservationResponse.status) {
      return {result: true, response: cancel_reservationResponse.data};
    } else {
      return {result: false, response: cancel_reservationResponse.data};
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

// # : STUDENT INFO & BOOK RESERVATION

export async function student_info_and_book_reservation(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const student_info_and_book_reservationResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/student_info_and_book_reservation',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (student_info_and_book_reservationResponse.status) {
      return {result: true, response: student_info_and_book_reservationResponse.data};
    } else {
      return {result: false, response: student_info_and_book_reservationResponse.data};
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







  
export async function student_rating_info(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const student_rating_infoResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/student_rating_info',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (student_rating_infoResponse.status) {
      return {result: true, response: student_rating_infoResponse.data};
    } else {
      return {result: false, response: student_rating_infoResponse.data};
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



    
export async function rating_to_student(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  console.log("getting token and user id here inside the function-----------",UserId)
  console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const rating_to_studentResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/rating_to_student',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (rating_to_studentResponse.status) {
      return {result: true, response: rating_to_studentResponse.data};
    } else {
      return {result: false, response: rating_to_studentResponse.data};
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








// GET SINGLE USER CHAT..........
  
    
export async function get_single_chat(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  // console.log("getting token and user id here inside the function-----------",UserId)
  // console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const get_single_chatResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/get_single_chat',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (get_single_chatResponse.status) {
      return {result: true, response: get_single_chatResponse.data};
    } else {
      return {result: false, response: get_single_chatResponse.data};
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


// ADD SINGLE CHAT USER..........

  export async function add_single_chat(body ={}) {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
    
    console.log("getting token and user id here inside the function-----------",UserId)
    console.log("getting token and user id here inside the function-----------",TokenValue)
    try {      
      const add_single_chatResponse = await Axios.post(
        'https://www.spyk.fr/api_teacher/add_single_chat',
        body,
        {
                 headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
        },
      );
      if (add_single_chatResponse.status) {
        return {result: true, response: add_single_chatResponse.data};
      } else {
        return {result: false, response: add_single_chatResponse.data};
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








    // GET teacher_revenue


export async function teacher_revenue() {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  // console.log("getting token and user id here inside the function-----------",UserId)
  // console.log("getting token and user id here inside the function-----------",TokenValue)
 
  try {
    const teacher_revenueResponse = await Axios.get(
      'https://www.spyk.fr/api_teacher/teacher_revenue',      
      {
        headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (teacher_revenueResponse.status) {
      // console.log("getting response on the function--------",teacher_revenueResponse.data)
      return {result: true, response: teacher_revenueResponse.data};
    } else {
      // console.log("getting error on the function--------",teacher_revenueResponse.data)
      return {result: false, error: teacher_revenueResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



// teacher_revenue_filter API

export async function teacher_revenue_filter(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  // console.log("getting token and user id here inside the function-----------",UserId)
  // console.log("getting token and user id here inside the function-----------",TokenValue)
  try {      
    const teacher_revenue_filterResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/teacher_revenue_filter',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (teacher_revenue_filterResponse.status) {
      return {result: true, response: teacher_revenue_filterResponse.data};
    } else {
      return {result: false, response: teacher_revenue_filterResponse.data};
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


  // # : NOTIFICATION SETTING (GET CURRENT STATUS)

  export async function setting_notification_status() {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
    
    // console.log("getting token and user id here inside the function-----------",UserId)
    // console.log("getting token and user id here inside the function-----------",TokenValue)
   
    try {
      const setting_notification_statusResponse = await Axios.get(
        'https://www.spyk.fr/api_teacher/setting_notification_status',      
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
        },
      );
      if (setting_notification_statusResponse.status) {
        // console.log("getting response on the function--------",setting_notification_statusResponse.data)
        return {result: true, response: setting_notification_statusResponse.data};
      } else {
        // console.log("getting error on the function--------",setting_notification_statusResponse.data)
        return {result: false, error: setting_notification_statusResponse.data};
      }
    } catch (error) {
      return {result: false, error};
    }
  }
  
  
// NOTIFICATION SETTING TOGGLE (UPDATE)

export async function setting_notification_update(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const setting_notification_updateResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/setting_notification_update',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (setting_notification_updateResponse.status) {
      return {result: true, response: setting_notification_updateResponse.data};
    } else {
      return {result: false, response: setting_notification_updateResponse.data};
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




  
export async function delete_account(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const delete_accountResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/delete_account',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (delete_accountResponse.status) {
      return {result: true, response: delete_accountResponse.data};
    } else {
      return {result: false, response: delete_accountResponse.data};
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




  
  
export async function demand_amount(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const demand_amountResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/demand_amount',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (demand_amountResponse.status) {
      return {result: true, response: demand_amountResponse.data};
    } else {
      return {result: false, response: demand_amountResponse.data};
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



    
  
export async function reservation_request_accept_reject(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const reservation_request_accept_rejectResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/reservation_request_accept_reject',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (reservation_request_accept_rejectResponse.status) {
      return {result: true, response: reservation_request_accept_rejectResponse.data};
    } else {
      return {result: false, response: reservation_request_accept_rejectResponse.data};
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



    
export async function set_availability(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const set_availabilityResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/set_availability',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (set_availabilityResponse.status) {
      return {result: true, response: set_availabilityResponse.data};
    } else {
      return {result: false, response: set_availabilityResponse.data};
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



   

  // # : NOTIFICATION SETTING (GET CURRENT STATUS)

  export async function home_count_data() {

    const token = await AsyncStorage.getItem('token');
    const user_id = await AsyncStorage.getItem('user_id');
    
    const TokenValue = JSON.parse(token);
    const UserId = JSON.parse(user_id)
    
    // console.log("getting token and user id here inside the function-----------",UserId)
    // console.log("getting token and user id here inside the function-----------",TokenValue)
   
    try {
      const home_count_dataResponse = await Axios.get(
        'https://www.spyk.fr/api_teacher/home_count_data',      
        {
          headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
        },
      );
      if (home_count_dataResponse.status) {
        // console.log("getting response on the function--------",home_count_dataResponse.data)
        return {result: true, response: home_count_dataResponse.data};
      } else {
        // console.log("getting error on the function--------",home_count_dataResponse.data)
        return {result: false, error: home_count_dataResponse.data};
      }
    } catch (error) {
      return {result: false, error};
    }
  }
  





  
    
export async function bussiness_monthly(body ={}) {

  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');
  
  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id)
  
  try {      
    const bussiness_monthlyResponse = await Axios.post(
      'https://www.spyk.fr/api_teacher/bussiness_monthly',
      body,
      {
               headers: {...commonHeader, 'user-id' : `${UserId}`, 'token' :`${TokenValue}`}   
      },
    );
    if (bussiness_monthlyResponse.status) {
      return {result: true, response: bussiness_monthlyResponse.data};
    } else {
      return {result: false, response: bussiness_monthlyResponse.data};
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




  
export async function notification_count() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const notification_countResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/notification_count`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (notification_countResponse.status) {
      // console.log("getting response on the function--------",notification_countResponse.data)
      return {result: true, response: notification_countResponse.data};
    } else {
      return {result: false, error: notification_countResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}


export async function my_notification() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const my_notificationResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/my_notification`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (my_notificationResponse.status) {
      // console.log("getting response on the function--------",my_notificationResponse.data)
      return {result: true, response: my_notificationResponse.data};
    } else {
      return {result: false, error: my_notificationResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function demand_amount_complete() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const demand_amount_completeResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/demand_amount_complete`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (demand_amount_completeResponse.status) {
      // console.log("getting response on the function--------",demand_amount_completeResponse.data)
      return {result: true, response: demand_amount_completeResponse.data};
    } else {
      return {result: false, error: demand_amount_completeResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}




export async function demand_amount_pending() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const demand_amount_pendingResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/demand_amount_pending`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (demand_amount_pendingResponse.status) {
      // console.log("getting response on the function--------",demand_amount_pendingResponse.data)
      return {result: true, response: demand_amount_pendingResponse.data};
    } else {
      return {result: false, error: demand_amount_pendingResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}



export async function my_rate_review() {
  const token = await AsyncStorage.getItem('token');
  const user_id = await AsyncStorage.getItem('user_id');

  const TokenValue = JSON.parse(token);
  const UserId = JSON.parse(user_id);

  // console.log(
  //   'ghetting incomplete transactoin tokena dn ujserId =========',
  //   TokenValue,
  //   UserId,
  // );

  try {
    const my_rate_reviewResponse = await Axios.get(
      `https://www.spyk.fr/api_teacher/my_rate_review`,
      {
        headers: {
          ...commonHeader,
          'user-id': `${UserId}`,
          token: `${TokenValue}`,
        },
      },
    );
    if (my_rate_reviewResponse.status) {
      // console.log("getting response on the function--------",my_rate_reviewResponse.data)
      return {result: true, response: my_rate_reviewResponse.data};
    } else {
      return {result: false, error: my_rate_reviewResponse.data};
    }
  } catch (error) {
    return {result: false, error};
  }
}