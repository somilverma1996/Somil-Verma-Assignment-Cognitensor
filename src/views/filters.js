import React, { Component } from "react";
import {
    TextField,
    Button,
    CardContent,
    Card,
    Typography,
    Grid
} from "@material-ui/core"
// import Datetime from "react-datetime";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import filterStyle from './filterStyle'
import './style.css'

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: { age: "", designation: "", month: "" },
            errors: {},
            date: ""
        }
    }

    componentDidMount = () => {
        this.props.fetchValues(this.state.fields)
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        }, () => {
            this.props.fetchValues(this.state.fields)
        })
    }
    resetForm = () => {
        this.setState({
            fields: { age: "", designation: "", month: "" },
            date: ""
        }, () => {
            this.props.fetchValues(this.state.fields)
        })
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Filters
                        </Typography>
                        </CardContent>
                        <form style={{ textAlign: "center" }}>
                            <TextField
                                fullWidth
                                name="age"
                                placeholder="Age Filter"
                                onChange={this.handleChange}
                                value={this.state.fields.age || ""}
                            />
                            <br />
                            <FormControl fullWidth id="selectDesignation">
                                <InputLabel id="demo-simple-select-label">User Designation Filter</InputLabel>
                                <Select
                                    style={{ width: "100%" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="designation"
                                    onChange={this.handleChange}
                                    value={this.state.fields.designation || ""}
                                >
                                    <MenuItem value={""}>Select</MenuItem>
                                    <MenuItem value={"manager"}>Manager</MenuItem>
                                    <MenuItem value={"lead"}>Lead</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <TextField
                                label="Joining Month Filter"
                                fullWidth
                                type="month"
                                name="month"
                                onChange={this.handleChange}
                                value={this.state.fields.month || ""}
                            />
                            <br />
                            <br />

                            <Button onClick={this.resetForm}>Reset</Button>
                        </form>

                    </Card>
                </Grid>
            </div>
        )
    }
}

export default (withStyles(filterStyle)(Filters))