import React, { Component } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import axios from "axios";
class PropsPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProps: [],
      deps: [],
      data: {},
    };
    this.propsSentByDepartment = this.propsSentByDepartment.bind(this);
  }
  componentDidMount() {
    axios.all([axios.get("/api/seed/props"), axios.get("api/deps")]).then(
      axios.spread((allProps, deps) => {
        console.log("here is the res", allProps.data.data, deps.data.data);
        this.setState({
          allProps: allProps.data.data,
          deps: deps.data.data,
        });
      }),
    );
  }
  propsSentByDepartment() {
    let deps = this.state.deps;
    let allProps = this.state.allProps;
    let data = [];
    // for each dep:
    deps.forEach((dep) => {
      // initialize a name and a counter
      let name = dep.name;
      let count = 0;

      // get dep members ids
      let DepUserIDs = dep.members.map((user) => user._id);
      // search all props to see if they have one of the ids in 'from' path
      allProps.forEach((singleProps) => {
        console.log(singleProps.from._id);
        if (DepUserIDs.includes(singleProps.from._id)) {
          count++;
        }
        // or do nothing
      });
      // push the data object into the data array
      console.log({ name, value: count });
      data.push({ name, value: count });
    });
    // store the data array in state
    this.setState({ data: data });
  }
  render() {
    return (
      <>
        <button className="PieChartButton" onClick={this.propsSentByDepartment}>
          See props sent by each department
        </button>
        <PieChart className="ThePieChart" width={300} height={300}>
          <Pie data={this.state.data} />
          <Tooltip />
        </PieChart>
      </>
    );
  }
}

export default PropsPieChart;
