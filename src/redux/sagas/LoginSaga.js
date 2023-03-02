// import {put, takeLatest, all} from 'redux-saga/effects';
// import axios from 'axios';
// import ApiConfig from '../../config';

export function* login(action) {
  // try {
  //   const {nav, session_id, username} = action.body;
  //   // const {session_id, username} = action.body;
  //   var register = axios.create({
  //     baseURL: ApiConfig.BASE_URL,
  //     timeout: 10000,
  //     headers: {'Content-Type': 'application/json'},
  //   });
  //   yield put({type: SHOW_LOADER});
  //   const response = yield register
  //     .post(ApiConfig.DISPALY_NAME, {
  //       sessionId: session_id,
  //       displayName: username,
  //     })
  //     .then(res => res);
  //   if (response.status === 200) {
  //     yield put({type: REGISTER_USER_RESPONSE, json: response});
  //     yield put({type: SETUP_USERNAME, status: true});
  //     yield put({type: HIDE_LOADER});
  //     if (nav != 'editname') {
  //       nav.replace('Permission');
  //     }
  //     //
  //   }
  // } catch (error) {
  //   // update your UI to handle other errors
  //   console.log('Error in registerUser', error);
  //   yield put({type: REGISTER_USER_ERROR, json: error});
  //   yield put({type: HIDE_LOADER});
  // }
}
