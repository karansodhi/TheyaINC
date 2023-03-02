import * as ActionTypes from "./ActionTypes";

export const loginUser = (body) => ({
  type: ActionTypes.LOGIN_USER,
  body,
});

export const registerUser = (body) => ({
  type: ActionTypes.REGISTER_USER,
  payload: body,
});

export const registerPrimaryPublicKey = (body) => ({
  type: ActionTypes.REGISTER_PRIMARY_PUBLICK_KEY,
  body,
});

export const registerPrimaryPublicKeyFailed = (body) => ({
  type: ActionTypes.REGISTER_PRIMARY_PUBLICK_KEY,
  body,
});

export const registerSecondary = (body) => ({
  type: ActionTypes.REGISTER_SECONDARY,
  body,
});

export const getQuestion = (body) => ({
  type: ActionTypes.GET_QUESTION,
  body,
});
