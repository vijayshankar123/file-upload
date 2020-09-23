import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, clearError } from "../../actions/authAction";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertAction";
import { Avatar } from "@material-ui/core";

const Login = ({ isAuthenticated, clearError, login, error, setAlert }) => {
  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { password, email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="containere">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <span>
          <Avatar />
        </span>{" "}
        Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Log In" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/">Sign Up</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, login, clearError })(Login);
