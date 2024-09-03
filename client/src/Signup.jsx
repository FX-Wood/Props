import React, { Component } from "react";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      message: "",
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleSubmit(e) {
    console.log("signing up...");
    e.preventDefault();
    axios
      .post("/auth/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log("res.data", res.data);
        if (res.data.type === "error") {
          console.log("error", res.data);
          this.setState({
            message: res.data.message,
          });
        } else {
          console.log("res.data", res.data);
          console.log("token", res.data.token);
          localStorage.setItem("jwtToken", res.data.token);
          this.props.showProfileForm();
          this.props.liftToken(res.data);
        }
      })
      .catch((err) => {
        console.log(err, err.response, err.status);
        console.log("catching error");
        let message;
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          message = `${err.response.status}: ${err.response.data.message || err}`;
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          message = "404: server not found";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          message = "Error" + err.message;
        }
        console.log(err);
        if (err.status === "429")
          message = `${err.response.status}: too many requests`;
        // this.setState({ message })
        this.props.liftMessage({ message });
      });
  }
  render() {
    console.log("rendering signup");
    return (
      <div className="Signup">
        <h3 className="SignupText">Hello! Create an account! </h3>
        <form className="SignupForm" onSubmit={this.handleSubmit}>
          <label className="SignupLabel">
            Full Name:
            <br />
            <input
              className="SignupInput SignupInput1"
              onChange={this.handleNameChange}
              value={this.state.name}
              type="text"
              name="name"
              placeholder="Enter your full name"
            />
          </label>
          <br />
          <label className="SignupLabel">
            Email:
            <br />
            <input
              className="SignupInput"
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </label>
          <br />
          <label className="SignupLabel">
            Password:
            <br />
            <input
              className="SignupInput"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Choose a password..."
            />
          </label>
          <br />
          <br />
          <input className="SignupButton" type="submit" value="Sign Up!" />
        </form>
      </div>
    );
  }
}
