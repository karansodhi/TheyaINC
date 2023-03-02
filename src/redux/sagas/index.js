import { all, takeEvery } from "redux-saga/effects";
import { login } from "./LoginSaga";

import { 
   registerPrimaryPublicKey,
  registerSecondary,
  getQuestion,
} from "./SetupKeysSaga";

import {
  LOGIN_USER,
  REGISTER_PRIMARY_PUBLICK_KEY,
  REGISTER_SECONDARY,
  GET_QUESTION,
} from "../actions/ActionTypes";

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([takeEvery(LOGIN_USER, login)]);
  yield all([
    takeEvery(REGISTER_PRIMARY_PUBLICK_KEY, registerPrimaryPublicKey),
    takeEvery(REGISTER_SECONDARY, registerSecondary),
    takeEvery(GET_QUESTION, getQuestion),
  ]);
}
