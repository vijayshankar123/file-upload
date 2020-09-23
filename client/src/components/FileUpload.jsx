import React, { useEffect, useState } from "react";
import "./FileUpload.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../actions/alertAction";
import { clearError, uploadFile } from "../actions/userAction";
import { logout } from "../actions/authAction";

const FileUpload = ({
  logout,
  clearError,
  uploadFile,
  setAlert,
  user: { error, files },
  auth,
}) => {
  const [form, setForm] = useState({
    selectText: "Select file",
    uploadText: "Upload File",
    file: "",
    formData: new FormData(),
  });
  const { uploadText, selectText, file, formData } = form;

  useEffect(() => {
    setForm({
      ...form,
      selectText: "Select File",
      uploadText: "Upload File",
      formData: new FormData(),
    });
    console.log(formData + " formdata");
    if (error) {
      setForm({
        ...form,
        selectText: "Select File",
        uploadText: "Upload File",
      });
      setAlert(error, "danger");
      clearError();
    }
  }, [error]);

  useEffect(() => {
    setForm({
      ...form,
      formData: new FormData(),
      selectText: "Select File",
      uploadText: "Upload File",
    });
  }, [files]);

  //handling file change
  const changeHandler = (e) => {
    var value = "";
    if (e.target.name == "file") {
      value = e.target.files[0];
    }
    formData.set(e.target.name, value);
    setForm({
      ...form,
      selectText: value.name,
      [e.target.name]: value,
      user: auth.user._id,
    });
  };

  //submitting form
  const onClick = (e) => {
    e.preventDefault();
    if (file == "") {
      return setAlert("Please add a pdf file", "danger");
    }
    //sending to backend
    uploadFile(formData);
    if (error) {
      setForm({
        ...form,
        selectText: "Select File",
        uploadText: "Upload File",
      });

      setAlert(error, "danger");
      clearError();
    } else {
      setForm({
        ...form,
        user: "",
        file: "",

        uploadText: "Uploading",
        formData: new FormData(),
      });
    }
  };

  //action on logging out
  const onLogout = () => {
    logout();
  };
  return (
    <div className="fileupload">
      <div className="logout_right">
        <Link to="/login" onClick={onLogout}>
          Logout
        </Link>
      </div>
      <form onSubmit={onClick}>
        <div className="form-group ">
          <label style={{ display: "block" }} className="text-muted">
            <h1>UPLOAD PDF FILE</h1>
          </label>
          <div className="upload_buttons">
            <label className="btn btn-primary mt-2 fileupload_button">
              {selectText}
              <input
                type="file"
                onChange={changeHandler}
                name="file"
                accept="application/pdf"
                required
                hidden
              />
            </label>
            <input
              type="submit"
              className="btn btn-secondary "
              value={uploadText}
            />
          </div>
          <small className="text-muted">{`(FILE SIZE < 1 mb)`}</small>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  logout,
  uploadFile,
  clearError,
  setAlert,
})(FileUpload);
