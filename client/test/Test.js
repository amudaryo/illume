import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { remove } from './api-test.js';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Test(props) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();

  const deleteTest = () => {
    remove(
      {
        testId: props.test._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        z;
        console.log(data.error);
      } else {
        props.onRemove(props.test);
      }
    });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          props.test.createdBy._id === auth.isAuthenticated().user._id && (
            <IconButton onClick={deleteTest}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Typography variant="h6" className={classes.text}>
            {props.test.text}
          </Typography>
        }
        subheader={
          new Date(props.test.created).toDateString() +
          ' at ' +
          new Date(props.test.created).toLocaleTimeString()
        }
        className={classes.cardHeader}
      />
    </Card>
  );
}

Test.propTypes = {
  test: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
