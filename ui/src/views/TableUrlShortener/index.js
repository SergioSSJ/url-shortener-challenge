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
  },
  linkButton: {
    backgroundColor: "green"
  },
  deleteButton: {
    backgroundColor: "red"
  }
});

const goToUrl = url => {
  try {
    window.open(url, "_blank");
  } catch (e) {
    console.error(e);
  }
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
            <CustomTableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.urlItems.map(row => {
            return (
              <TableRow className={classes.row} key={row.hash}>
                <CustomTableCell component="th" scope="row" >
                  <div className="short">
                    <LinkIcon />
                    <div  className="short-child icon-text">
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
                    <div className="icon-text">{formatDate(row.date)}</div>
                  </div>
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  -
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  <div className="buttons">
                    <Button
                      className={classes.linkButton}
                      variant="contained"
                      onClick={() => {
                        goToUrl(row.url);
                      }}
                    >
                      <GoIcon />
                    </Button>
                    <Button
                      className={classes.deleteButton}
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
  deleteUrl: PropTypes.func.isRequired
};

export default withStyles(styles)(TableUrlShortener);
