import React, { Component } from "react";
import Filters from "./filters"
import dataJson from "./data.json";
import { Card, Typography } from "@material-ui/core"
import withStyles from '@material-ui/core/styles/withStyles';
import filterStyle from './filterStyle'

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);


class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterData: {}
        }
    }
    fillValues = (data) => {
        this.setState({
            filterData: data
        })
    }
    render() {
        const { classes } = this.props;
        let xData = ["Sales", "IT", "Accounts"], yData = [];
        xData.forEach(ele => {
            let d = dataJson.userData.filter(x => x.division == ele)
            d = (this.state.filterData.age !== "") ? d.filter(x => x.age == this.state.filterData.age) : d
            d = (this.state.filterData.designation !== "") ? d.filter(x => x.type == this.state.filterData.designation) : d
            d = (this.state.filterData.month !== "") ? d.filter(x => x.joiningMonth == this.state.filterData.month.split('-')[1]) : d
            yData.push(d.length)
        });
        let data = [
            {
                type: 'bar',      // all "bar" chart attributes: #bar
                x: xData,     // more about "x": #bar-x
                y: yData,     // #bar-y
                name: 'bar chart example', // #bar-name
                width: [.2,.2,.2],
                bargap: [0,0,0],
            }
        ];
        let layout = {  
            barmode: 'stack',                   // all "layout" attributes: #layout
            title: 'Employee Count by Department',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: 'Department'         // more about "layout.xaxis.title": #layout-xaxis-title
            },
            annotations: [            // all "annotation" attributes: #layout-annotations
                {
                    text: 'No. of employees',    // #layout-annotations-text
                    x: 0,                         // #layout-annotations-x
                    xref: 'paper',                // #layout-annotations-xref
                    y: 0,                         // #layout-annotations-y
                    yref: 'paper'                 // #layout-annotations-yref
                }
            ]
        };
        let config = {
            showLink: false,
            displayModeBar: false
        };
        return (
            <div className={classes.containerDiv}>
                <Card className={classes.root} variant="outlined">
                    <Typography className={classes.title} color="textSecondary">
                        Chart
                        </Typography>
                    <PlotlyComponent
                        className="whatever"
                        data={data}
                        layout={layout}
                        config={config}
                    />
                </Card>
                <br />
                <Filters fetchValues={this.fillValues} />
            </div>
        )
    }
}

export default (withStyles(filterStyle)(Chart))