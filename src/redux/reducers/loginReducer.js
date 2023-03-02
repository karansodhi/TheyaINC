import { LOGIN_USER } from "../actions/ActionTypes";
const initialState = {
  userDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
