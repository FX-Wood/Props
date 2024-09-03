import React, { Component } from 'react';
import { PieChart, Pie, Legend } from 'recharts';
import axios from axios;
class PieChart extends Component {
    constructor(props) {
        super(props)
        this.props = [],
        this.deps = [],
        this.data = {}

    }
    componentDidMount() {
        axios.all([
            axios.get('/api/seed/props'),
            axios.get('api/deps')
        ]).then(
            setState({
                props: this.props,
                deps: this.deps
            })
        )
    }
    propsSentOverDepartment() {
        // get dep members ids
        // search all props to see if they have one of the ids in 'from' path
        // get count of each member's props sent
        // do this for each dep
        // profit

    }
    render() {
        return (
            <PieChart >
                <Pie />
            </PieChart>

        )
    }
}