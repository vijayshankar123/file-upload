import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { register, clearError } from "../../actions/authAction";
import { setAlert } from "../../actions/alertAction";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";

const Signup = ({ isAuthenticated, clearError, register, error, setAlert }) => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = signup;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
      clearError();
    }
    //eslint-disable-next-line
  }, [error]);
  const onChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      window.alert("passwords do not match each other !!!");
    } else {
      register({ name, email, password });
      if (error) {
        setAlert(error, "danger");
        clearError();
      }
      setSignup({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="containere">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <span>
          <Avatar />
        </span>
        Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register, clearError })(
  Signup
);
