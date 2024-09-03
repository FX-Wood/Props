import React, { Component } from "react";
import axios from "axios";

class ProfileLong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAndProfile: {},
    };
  }
  componentDidMount() {
    console.log(this.props.user);
    axios.get("/api/user/" + this.props.user._id + "/profile").then((res) => {
      console.log(res.data.data);
      this.setState({
        userAndProfile: res.data.data,
      });
    });
  }
  render() {
    let content;
    if ("profile" in this.state.userAndProfile) {
      content = (
        <>
          <p>Interests: {this.state.userAndProfile.profile.interests}</p>
          <p>Groups: {this.state.userAndProfile.profile.interests} </p>
        </>
      );
    } else {
      content = null;
    }
    return <div className="profile-long">{content}</div>;
  }
}

export default ProfileLong;
