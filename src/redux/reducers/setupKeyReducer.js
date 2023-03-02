import {
  REGISTER_PRIMARY_PUBLICK_KEY,
  REGISTER_PRIMARY_PUBLICK_KEY_FAILED,
} from "../actions/ActionTypes";
const initialState = {
  allQuestion: [],
  keyFailed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PRIMARY_PUBLICK_KEY:
      return { ...state };
    case REGISTER_PRIMARY_PUBLICK_KEY_FAILED:
      return { ...state, keyFailed: true };
    default:
      return state;
  }
};

export default reducer;
