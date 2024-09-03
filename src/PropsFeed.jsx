import React, { Component } from "react";
import axios from "axios";
import Props from "./Props";

class PropsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: [],
      page: 0,
    };
    this.nextPageHandler = this.nextPageHandler.bind(this);
    this.previousPageHandler = this.previousPageHandler.bind(this);
  }
  componentDidMount() {
    console.log("PropsFeed rendering correctly");
    // axios call to get all props submitted
    axios.get(`api/props`).then((res) => {
      this.setState({
        props: res.data.data,
      });
    });
  }
  // go to next page of props
  nextPageHandler(e) {
    this.setState((state) => {
      return { page: state.page + 1 };
    });
  }
  previousPageHandler(e) {
    this.setState((state) => {
      return { page: state.page - 1 };
    });
  }

  // function to update feed immediately
  render() {
    let pagenum = this.state.page;
    // console.log('here are the nums', pagenum * 12, pagenum + 1 *)
    let myPropsList = this.state.props
      .slice(pagenum * 12, (pagenum + 1) * 12)
      .map((singleProps, i) => (
        <Props singleProps={singleProps} user={null} key={i} />
      ));
    if (myPropsList.length === 0) {
      myPropsList = null;
    }
    return (
      <div>
        <p className="PropsFeedText">COMMUNITY PROPS</p>
        <ul>{myPropsList}</ul>

        <div className="PropsFeedButtonDiv">
          <button
            className="PropsFeedButton1"
            onClick={this.previousPageHandler}
          >
            Previous Page
          </button>
          <span>{"page: " + pagenum}</span>
          <button className="PropsFeedButton2" onClick={this.nextPageHandler}>
            {" "}
            Next Page{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default PropsFeed;
