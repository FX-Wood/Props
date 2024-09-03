import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfileForm.css";

class ProfileForm extends Component {
  // props include 'user' from app.jsx
  constructor(props) {
    super(props);
    this.state = {
      deps: [],
      dep: "",
      groups: "",
      interests: "",
      photo: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    // add this user to department
    console.log("/api/deps/" + this.state.dep);
    axios.put("/api/deps/" + this.state.dep, {
      members: [this.props.user._id],
    });
    // make profile and add it to user
    console.log("/api/profile");
    axios
      .post("/api/profile", {
        interests: this.state.interests,
        groups: this.state.groups,
        photo: this.state.photo,
        user: this.props.user._id,
      })
      .then((res) => {
        console.log(res);
        this.props.hideProfileForm();
      });
  }

  componentDidMount() {
    axios.get("/api/deps").then((res) => {
      console.log("ProfileForm did mount", res);
      this.setState({
        deps: res.data.data,
      });
    });
  }

  render() {
    let options = this.state.deps.map((dep, i) => (
      <option value={dep._id} key={i}>
        {dep.name}
      </option>
    ));
    return (
      <div className="ProfileForm">
        <h3 className="MakeProfileText">Make A Profile</h3>
        <form className="ProfileFormBox" onSubmit={this.handleSubmit}>
          <label className="ProfileFormLabel">
            Photo URL:
            <input
              className="ProfileFormInput ProfileFormInput1"
              name="photo"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Enter a photo url here"
            />
          </label>
          <br />
          <label className="ProfileFormLabel">
            Community:
            <select
              className="ProfileFormInput ProfileFormInput2"
              name="dep"
              id="dep"
              onInput={this.handleInputChange}
            >
              <option value="" hidden="hidden">
                Choose your Community
              </option>
              {options}
            </select>
          </label>
          <br />
          <label className="ProfileFormLabel">
            Interests:
            <input
              className="ProfileFormInput ProfileFormInput3"
              name="interests"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Enter your interests here"
            />
          </label>
          <br />
          <label className="ProfileFormLabel">
            Groups:
            <input
              className="ProfileFormInput ProfileFormInput4"
              name="groups"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Enter your groups here"
            />
          </label>
          <br />
          <br />
          <input
            className="SUBMIT"
            onChange={this.handleInputChange}
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    );
  }
}

export default ProfileForm;
