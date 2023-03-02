import { REGISTER_USER } from "../actions/ActionTypes";
const initialState = {
  userDetails: {
    isSignedIn: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
