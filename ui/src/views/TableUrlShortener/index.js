import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LinkIcon from "@material-ui/icons/Link";
import GoIcon from "@material-ui/icons/Redo";
import DeleteIcon from "@material-ui/icons/Delete";
import { formatDate } from "./util";
import "./index.css";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.default,
    color: theme.palette.common.Gray
  },
  body: {
    fontSize: 14,
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 700,
    marginTop: "0px"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const goToUrl = url => {
  window.open(url, "_blank");
};

const TableUrlShortener = props => {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Short</CustomTableCell>
            <CustomTableCell>Link</CustomTableCell>
            <CustomTableCell>Date</CustomTableCell>
            <CustomTableCell>Visits</CustomTableCell>
            <CustomTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.urlItems.map(row => {
            return (
              <TableRow className={classes.row} key={row.hash}>
                <CustomTableCell component="th" scope="row" style={{ width: "100px" }}>
                  <div className="short">
                    <LinkIcon />
                    <div style={{ marginLeft: "10px" }} className="short-child">
                      {row.shorten}
                    </div>
                  </div>
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {row.url}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  <div className="date">
                    <AccessTimeIcon />
                    <div style={{ marginLeft: "10px" }}>{formatDate(row.date)}</div>
                  </div>
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  -
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  <div className="buttons">
                    <Button
                      style={{ backgroundColor: "green" }}
                      variant="contained"
                      onClick={() => {
                        goToUrl(row.url);
                      }}
                    >
                      <GoIcon />
                    </Button>
                    <Button
                      style={{ backgroundColor: "red" }}
                      variant="contained"
                      onClick={() => {
                        props.deleteUrl(row.hash);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

TableUrlShortener.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteUrl:PropTypes.func.isRequired
};

export default withStyles(styles)(TableUrlShortener);
