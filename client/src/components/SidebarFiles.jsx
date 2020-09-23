import React from "react";
import "./SidebarFiles.css";
import { connect } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";

const SidebarFiles = ({ auth, item }) => {
  return (
    <div className="SidebarFiles">
      <div className="sidebarFiles_info">
        <a
          target="_blank"
          href={`https://mighty-wildwood-08597.herokuapp.com/api/get/file?key=${item.file.key}`}
        >
          {item.filename}
        </a>
        {auth && auth.user && auth.user.role === "Admin" && (
          <small>{` (${item.user.name})`}</small>
        )}
      </div>
      <div>
        <a
          target="_blank"
          href={`https://mighty-wildwood-08597.herokuapp.com/api/get/file?key=${item.file.key}`}
        >
          <GetAppIcon />
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SidebarFiles);
