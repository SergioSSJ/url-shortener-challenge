import React, { Component } from "react";
import { Input, Button } from "@material-ui/core";
import validUrl from "valid-url";

export class TextInputUrlShortener extends Component {
  constructor() {
    super();
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
  handleClick=()=>{
      console.log('handle click')
      this.props.createShortUrl(this.state.url)
  }

  render() {
    return (
      <div>
        Shortener The shortest way to short
        <div>
          <Input onChange={this.handleChange} />

          <Button disabled={!this.state.isValid} onClick={this.handleClick}>Create</Button>
        </div>
      </div>
    );
  }
}

export default TextInputUrlShortener;
