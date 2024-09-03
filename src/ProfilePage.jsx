import React from "react";
import ProfileLong from "./ProfileLong";
import UserProfile from "./UserProfile";
import PropsAppBar from "./PropsAppBar";
import MyPropsShort from "./MyPropsShort";
import "./ProfilePage.css";

const Profile = (props) => {
  return (
    <div className="profile-box">
      <div className="ProfilePageNavDiv">
        <PropsAppBar logout={props.logout} />
      </div>

      <section className="ProfilePageUserProfile">
        <UserProfile user={props.user} />
      </section>

      <section className="ProfilePageProfileLong">
        <ProfileLong user={props.user} />
      </section>
      <section className="ProfilePageMyPropsShort">
        <MyPropsShort user={props.user} />
      </section>
    </div>
  );
};

export default Profile;
