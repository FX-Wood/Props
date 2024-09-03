import React from "react";

const DirectoryEntry = ({ user, goToProfile, giveProps }) => {
  return (
    <div className="DirectoryEntry">
      <button
        className="directoryprofilebutton"
        onClick={(e) => goToProfile(e, user)}
      >
        {" "}
        go to profile{" "}
      </button>
      <button
        className="directorypropsbutton"
        onClick={(e) => giveProps(e, user)}
      >
        {" "}
        give props{" "}
      </button>
      <img
        className="directoryentrypicture"
        src="https://via.placeholder.com/50"
        alt="small user avatar"
      />
      <span className="name"> {user.name} </span>
      <span className="department"> {user.dep} </span>
    </div>
  );
};

export default DirectoryEntry;
