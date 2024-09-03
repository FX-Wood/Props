import React, { Component } from "react";
import Chip from "@material-ui/core/Chip";
import Props from "./Props";
import axios from "axios";
import "./MyPropsShort.css";

class MyPropsShort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: [],
      selectedProps: [],
      num: 5,
      filter: "all",
    };
    this.changeNum = this.changeNum.bind(this);
    this.filterProps = this.filterProps.bind(this);
  }
  componentDidMount() {
    console.log("MyProps componentDidMount, getting props");
    // get props with users and profiles
    axios.get(`api/user/${this.props.user._id}/props`).then((res) => {
      console.log(res);
      console.log("datadataprops", res.data.data);
      this.setState({
        props: res.data.data,
        selectedProps: [],
      });
    });
  }
  changeNum(n) {
    this.setState({
      num: n,
    });
  }
  filterProps(singleProps) {
    switch (this.state.filter) {
      case "sent":
        return this.props.user._id === singleProps.from._id;

      case "received":
        return this.props.user._id === singleProps.to._id;

      default:
        return true;
    }
  }

  render() {
    let num = this.state.num;
    let MyPropsList = this.state.props
      .slice(0, num) // grab only the last few
      .filter(this.filterProps) // apply a filter, if any
      .map((singleProps, i) => (
        <Props user={this.props.user} singleProps={singleProps} key={i} />
      ));
    return (
      <div className="MyProps">
        <div className="MyPropsTextBox">
          <Chip
            label="last 5"
            variant={this.state.num === 5 ? null : "outlined"}
            onClick={() => this.changeNum(5)}
          />
          <Chip
            label="last 10"
            variant={this.state.num === 10 ? null : "outlined"}
            onClick={() => this.changeNum(10)}
          />
          <Chip
            label="Sent"
            variant={this.state.filter === "sent" ? null : "outlined"}
            onClick={() => this.setState({ filter: "sent" })}
          />
          <Chip
            label="Received"
            variant={this.state.filter === "received" ? null : "outlined"}
            onClick={() => this.setState({ filter: "received" })}
          />
          <Chip
            label="All"
            variant={this.state.filter === "all" ? null : "outlined"}
            onClick={() => this.setState({ filter: "all" })}
          />
          <h2 className="MyPropsText">Recent Props</h2>
          {MyPropsList}
        </div>
      </div>
    );
  }
}

export default MyPropsShort;
