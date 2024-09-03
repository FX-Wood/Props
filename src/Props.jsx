import React from "react";
import Icon from "@material-ui/core/Icon";
import Chip from "@material-ui/core/Chip";

const Props = ({ singleProps, user }) => {
  if (!user) {
    return (
      <div className="singleProps global">
        <img src="http://via.placeholder.com/50" alt="avatar" />
        <span className="body"> {singleProps.body} </span>
      </div>
    );
  } else if (user._id === singleProps.from._id) {
    console.log(singleProps.to.profile);
    return (
      <div className="singleProps outgoing">
        <span className="body">{singleProps.body}</span>
        <div className="recipient">
          <Chip
            icon={<Icon className="icon">arrow_forward</Icon>}
            label={singleProps.to.name}
          />
        </div>
      </div>
    );
  } else if (user._id === singleProps.to._id) {
    return (
      <div className="singleProps incoming">
        <div className="sender">
          <Chip
            label={singleProps.from.name}
            icon={<Icon className="icon">arrow_back</Icon>}
          />
        </div>
        <span className="body">{singleProps.body}</span>
      </div>
    );
  }
  return (
    <div className="error">
      <span>There was an error</span>
    </div>
  );
};

export default Props;
