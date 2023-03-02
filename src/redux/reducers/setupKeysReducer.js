import {
  GET_QUESTION,
  REGISTER_PRIMARY_PUBLICK_KEY,
  REGISTER_SECONDARY,
  SAVE_QUESTION_ANSWER,
  CLEAR_QUESTION,
  SAVE_SECOND_QUESTION_ANSWER,
  SAVE_THIRD_QUESTION_ANSWER,
  SAVE_FIRST_QUESTION_ANSWER,
  EDIT_QUESTION_ANSWER,
  CLEAR_EDIT_QUESTION_ANSWER,
} from "../actions/ActionTypes";
const initialState = {
  allQuestion: [],
  saveQA: [],
  saveFQA: {},
  saveSQA: {},
  saveTQA: {},
  isEditQuestion: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PRIMARY_PUBLICK_KEY:
      return { ...state };
    case REGISTER_SECONDARY:
      return { ...state };
    case GET_QUESTION:
      return { ...state, allQuestion: action.questionList };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        saveQA: [...state.saveQA, action.QA],
      };
    case SAVE_FIRST_QUESTION_ANSWER:
      return {
        ...state,
        saveFQA: action.QA,
      };
    case SAVE_SECOND_QUESTION_ANSWER:
      return {
        ...state,
        saveSQA: action.QA,
      };
    case SAVE_THIRD_QUESTION_ANSWER:
      return {
        ...state,
        saveTQA: action.QA,
      };
    case EDIT_QUESTION_ANSWER:
      return {
        ...state,
        isEditQuestion: true,
      };
    case CLEAR_EDIT_QUESTION_ANSWER:
      return {
        ...state,
        isEditQuestion: false,
      };
    case CLEAR_QUESTION:
      return {
        ...state,
        saveQA: [],
        saveFQA: {},
        saveSQA: {},
        saveTQA: {},
      };
    default:
      return state;
  }
};

export default reducer;
