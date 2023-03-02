import { put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import ApiConfig from "../../config";
import {
  HIDE_LOADER,
  SHOW_LOADER,
  REGISTER_PRIMARY_PUBLICK_KEY,
  REGISTER_PRIMARY_PUBLICK_KEY_FAILED,
  REGISTER_SECONDARY,
  GET_QUESTION,
} from "../actions/ActionTypes";
import Toast from "react-native-toast-message";

export function* registerPrimaryPublicKey(action) {
  // console.log("registerPrimaryPublicKey action==> ", action.body);
  try {
    const { sessionToken, publicKey } = action.body;
    console.log("registerPrimaryPublicKey sessionId==> ", sessionToken);
    console.log("registerPrimaryPublicKey publicKey==> ", publicKey);

    var register = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
    yield put({ type: SHOW_LOADER });
    const response = yield register
      .post(ApiConfig.REGISTER_PRIMARY_PUBLICK_KEY, {
        public_key: publicKey,
        session_token: sessionToken,
      })
      .then((res) => res);
    if (response.status === 200) {
      yield put({ type: REGISTER_PRIMARY_PUBLICK_KEY, json: response });
      yield put({ type: HIDE_LOADER });
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "May be public key already exist for this user.",
    });
    console.log("Error in registerPrimaryPublicKey", error);
    yield put({ type: HIDE_LOADER });
  }
}

export function* registerSecondary(action) {
  console.log("registerSecondary action==> ", action.body);

  try {
    const { qrToken, sessionToken, secondaryPublicKey } = action.body;
    console.log("registerSecondary qrToken==> ", qrToken);
    console.log("registerSecondary sessionToken==> ", sessionToken);
    console.log("registerSecondary secondaryPublicKey==> ", secondaryPublicKey);

    var register = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
    yield put({ type: SHOW_LOADER });
    const response = yield register
      .post(ApiConfig.REGISTER_SECONDARY, {
        qr_token: qrToken,
        secondary_public_key: publicKey,
        session_token: sessionToken,
      })
      .then((res) => res);

    console.log("registerSecondary response==> ", response.status);

    if (response.status === 200) {
      yield put({ type: REGISTER_SECONDARY, json: response });
      yield put({ type: HIDE_LOADER });
    }
  } catch (error) {
    yield put({ type: REGISTER_PRIMARY_PUBLICK_KEY_FAILED });
    console.log("Error in registerSecondary", error);
    yield put({ type: HIDE_LOADER });
  }
}

export function* getQuestion(action) {
  console.log("getQuestion action==> ", action.body);

  try {
    const { sessionToken, userId } = action.body;
    // console.log("getQuestion sessionToken==> ", sessionToken);
    // console.log("getQuestion userId==> ", userId);

    var register = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
    yield put({ type: SHOW_LOADER });

    const URL = ApiConfig.GET_QUESTION + sessionToken + "&user_id=" + userId;
    const response = yield register.get(URL).then((res) => res);
    if (response.status === 200) {
      yield put({ type: GET_QUESTION, questionList: response?.data });
      yield put({ type: HIDE_LOADER });
    }
  } catch (error) {
    console.log("Error in getQuestion", error);
    yield put({ type: HIDE_LOADER });
  }
}
