import {
  GET_FILES,
  GET_FILES_ERROR,
  CLEAR_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILES_ERROR,
  SEARCH_FILE,
  SEARCH_FILE_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  files: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILE:
      return {
        ...state,
        loading: false,
        files: action.payload,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        files: [...state.files, action.payload],
      };
    case GET_FILES:
      return {
        ...state,
        files: action.payload,
        loading: false,
      };
    case UPLOAD_FILES_ERROR:
    case SEARCH_FILE_ERROR:
    case GET_FILES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
