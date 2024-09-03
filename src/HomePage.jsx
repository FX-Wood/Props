import React from "react";
import PropsFeed from "./PropsFeed";
import UserProfile from "./UserProfile";
import MyPropsShort from "./MyPropsShort";
import PropsAppBar from "./PropsAppBar";
import "./HomePage.css";

const HomePage = (props) => {
  return (
    <div className="homebox">
      <div className="HomePageNavDiv">
        <PropsAppBar logout={props.logout} />
      </div>
      <div className="homebox-left">
        <PropsFeed />
      </div>
      <div className="homebox-right">
        <div className="profile-short">
          <UserProfile user={props.user} />
        </div>
        <div className="props-short">
          <MyPropsShort user={props.user} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
