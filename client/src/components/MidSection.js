import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '80%',
    backgroundColor: 'rgba(14, 14, 25, 0.95) !important',
    height: '20rem',
  }
}));

const MidSection = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.wrapper} elevation={1}>
    </Paper>
  );
}

export default MidSection;