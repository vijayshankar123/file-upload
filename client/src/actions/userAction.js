import {
  GET_FILES,
  GET_FILES_ERROR,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_ERROR,
  CLEAR_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILES_ERROR,
  SEARCH_FILE_ERROR,
  SEARCH_FILE,
} from "./types";

import { setAlert } from "./alertAction";
import axios from "axios";

//upload file
export const uploadFile = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      console.log("from action");
      const res = await axios.post("/api/file/create", formData, config);
      dispatch({
        type: UPLOAD_FILE,
        payload: res.data,
      });
      dispatch(setAlert("Successfully uploaded File", "success"));
    } catch (err) {
      dispatch({
        type: UPLOAD_FILES_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//get all files by a specific user
export const getFiles = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/files/all");
      dispatch({
        type: GET_FILES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FILES_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//download file
export const downloadFile = (key) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/get/file?key=${key}`);
      dispatch({
        type: DOWNLOAD_FILE,
      });
    } catch (err) {
      dispatch({
        type: DOWNLOAD_FILE_ERROR,
        payload: err.response.data.msg,
      });
    }
  };
};

//search for a file
export const searchFile = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/file?search=${data}`);
      dispatch({ type: SEARCH_FILE, payload: res.data });
    } catch (err) {
      dispatch({ typeL: SEARCH_FILE_ERROR, payload: err.response.data.msg });
    }
  };
};

//clear error
export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
