import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#222240',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 0rem',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    height: '3rem'
  },
  button: {
    height: '100%',
    padding: '2px 4px',
    marginLeft: '5rem !important',
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
});

const BottomNavBar = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.stickToBottom} elevation={3}>
        <Toolbar className={classes.appBar}>
          <Paper className={classes.root} elevation={4}>
            <InputBase className={classes.input} placeholder="Min Plats" />
          </Paper>
          <Button
            variant='contained'
            className={classes.button}
            color='white'
          >
            Search
          </Button>
        </Toolbar>
      </Paper>
    </div>
  );
}

export default BottomNavBar;