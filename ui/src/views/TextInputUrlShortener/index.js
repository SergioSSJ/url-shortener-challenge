import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import validUrl from "valid-url";

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
    return (
      <div>
        Shortener The shortest way to short
        <div>
          <Input onChange={this.handleChange} inputRef={e => (this.textInput = e)} />
          <Button disabled={!this.state.isValid} onClick={this.handleClick}>
            Create
          </Button>
        </div>
      </div>
    );
  }
}

export default TextInputUrlShortener;
