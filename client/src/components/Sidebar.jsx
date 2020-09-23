import React, { useState } from "react";
import "./Sidebar.css";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { searchFile } from "../actions/userAction";
import { Avatar } from "@material-ui/core";
import SidebarFiles from "./SidebarFiles";
const Sidebar = ({ searchFile, auth: { user }, user: { files } }) => {
  const [search, setSearch] = useState("");

  //onchange handler
  const onChange = (e) => {
    searchFile(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="ml-3">
          Welcome <strong>{user && user.name}</strong>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input
            placeholder="Search for files"
            type="text"
            name="search"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="sidebar_files">
        <h5 className="text-center mt-3 mb-2">Your Files</h5>
        {files && files.length === 0 && (
          <h5 className="text-center mt-3">No files found</h5>
        )}
        {files &&
          files.map((item, index) => <SidebarFiles key={index} item={item} />)}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { searchFile })(Sidebar);
