import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }
  componentDidMount() {
    axios.get("/api/user/" + this.props.user._id).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  }

  render() {
    let photo = (
      <img src="https://via.placeholder.com/150" alt="user avatar large" />
    );
    if (this.props.user) {
      if (this.props.user.profile) {
        if (this.props.user.profile.photo) {
          photo = (
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={this.state.user.profile.photo}
              alt="user avatar large"
            />
          );
        }
      }
    }
    return (
      <div className="Profile">
        <div className="ProfilePicBox">
          <h2 className="ProfileNameText">{this.state.user.name}'s Profile</h2>
          {photo}
        </div>
        <div className="ProfileDetailsBox">
          <p>Name: {this.state.user.name}</p>
          <p>Email: {this.state.user.email}</p>
          <p>Community: {this.state.user.dep}</p>
        </div>
      </div>
    );
  }
}

export default UserProfile;
