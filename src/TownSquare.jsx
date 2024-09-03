import React from "react";
import PropsFeed from "./PropsFeed";
import PropsPieChart from "./PropsPieChart";
import PropsAppBar from "./PropsAppBar";
import "./TownSquare.css";

const TownSquare = (props) => {
  return (
    <div className="townsquare">
      <div className="TownSquareNav">
        <PropsAppBar logout={props.logout} />
      </div>
      <div className="TownSquarePieChart">
        <PropsPieChart />
      </div>

      <div className="square">
        <PropsFeed />
      </div>
      <div className="data">
        <div className="company-data"></div>
        <div className="user-data"></div>
      </div>
    </div>
  );
};

export default TownSquare;
