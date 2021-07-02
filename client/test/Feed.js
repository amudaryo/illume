import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import auth from './../auth/auth-helper';
import TestList from './TestList';
import { listByUser } from './api-test.js';
import NewTest from './NewTest';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: '1em',
  },
  media: {
    minHeight: 330,
  },
}));
export default function Feed() {
  const classes = useStyles();
  const [tests, setTests] = useState([]);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByUser(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTests(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const addTest = (test) => {
    const updatedTests = [...tests];
    updatedTests.unshift(test);
    setTests(updatedTests);
  };
  const removeTest = (test) => {
    const updatedTests = [...tests];
    const index = updatedTests.indexOf(test);
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Feed
      </Typography>
      <Divider />
      <NewTest addUpdate={addTest} />
      <Divider />
      <TestList removeUpdate={removeTest} tests={tests} />
    </Card>
  );
}
