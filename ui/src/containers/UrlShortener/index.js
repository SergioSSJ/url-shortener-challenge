import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import TableUrlShortener from "../../views/TableUrlShortener";
import TextInputUrlShortener from "../../views/TextInputUrlShortener";
import { createShortUrl, deleteUrl } from "../../state/actions-creators";

export class UrlShortenerContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <TextInputUrlShortener urlItems={this.props.urlItems} createShortUrl={this.props.createShortUrl} />
          </Grid>
          <Grid item xs={6}>
            <TableUrlShortener deleteUrl={this.props.deleteUrl} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    urlItems: state.urlItems
  };
};

const mapDispatchToProps = {
  createShortUrl: createShortUrl,
  deleteUrl: deleteUrl
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UrlShortenerContainer);
