import React, { useEffect, useState } from "react";
import "./Home.css";
import Sidebar from "./Sidebar";
import FileUpload from "./FileUpload";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getFiles } from "../actions/userAction";
import { loadUser } from "../actions/authAction";
function Home({ auth, loadUser, getFiles }) {
  useEffect(() => {
    loadUser();
    getFiles();
  }, []);

  useEffect(() => {}, []);
  if (!auth.isAuthenticated && !auth.loading) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="home">
      <div className="home_body">
        {/* {Sidebar} */}
        <Sidebar />
        {/* File upload section */}
        <FileUpload />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, getFiles })(Home);
