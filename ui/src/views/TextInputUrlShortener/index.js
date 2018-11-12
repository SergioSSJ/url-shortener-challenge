import React, { Component } from "react";
import { TextField, Button, Input, Typography } from "@material-ui/core";
import validUrl from "valid-url";
import "./index.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    backgroundColor: "#133c7a"
  }
});

export class TextInputUrlShortener extends Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.state = {
      url: "",
      isValid: false
    };
  }

  handleChange = e => {
    const url = e.target.value;
    const isValid = validUrl.isUri(url);

    this.setState(state => {
      return {
        ...state,
        url: url,
        isValid: isValid
      };
    });
  };
  handleClick = () => {
    this.props.createShortUrl(this.state.url);
    this.textInput.value = "";

    this.setState(state => {
      return {
        url: "",
        isValid: false
      };
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="shortener">
        <div className="shortener-title">
          <Typography color="inherit" variant="h3">
            SHORTENER
          </Typography>
          <Typography color="inherit" varinat="p">
            The shortest way to short!.
          </Typography>
        </div>

        <div className="text-input">
          <div>
            <TextField
              style={{ backgroundColor: "white", width: "90%" }}
              onChange={this.handleChange}
              inputRef={e => (this.textInput = e)}
              variant="outlined"
              placeholder="http://"
            />
          </div>
          <div>
            <Button
              className={classes.button}
              style={{ marginTop: "20px", color: "white" }}
              variant="contained"
              disabled={!this.state.isValid}
              onClick={this.handleClick}
            >
              Short!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

TextInputUrlShortener.propTypes = {
  classes: PropTypes.object.isRequired,
  createShortUrl:PropTypes.object.isRequired
};

//export default TextInputUrlShortener;
export default withStyles(styles)(TextInputUrlShortener);
