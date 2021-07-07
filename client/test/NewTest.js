import React, { useState, useEffect } from 'react';
import auth from './../auth/auth-helper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { create } from './api-test.js';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none',
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%',
  },
  submit: {
    margin: theme.spacing(2),
  },
  filename: {
    verticalAlign: 'super',
  },
}));

export default function NewTest(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    text1: '',
    text2: '',
    error: '',
    user: {},
  });
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    setValues({ ...values, user: auth.isAuthenticated().user });
  }, []);

  const clickTest = async () => {
    if (values.text1) await createTest('text1');
    if (values.text2) await createTest('text2');
    if (values.text3) await createTest('text3');
  };

  const createTest = async (name) => {
    let testData = new FormData();
    testData.append('text', values[name]);
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      testData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        return data;
      } else {
        setValues({ ...values, [name]: '' });
        props.addUpdate(data);
        console.log(data);
        return data;
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Write something ..."
            multiline
            rows="3"
            value={values.text1}
            onChange={handleChange('text1')}
            className={classes.textField}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Write something ..."
            multiline
            rows="3"
            value={values.text2}
            onChange={handleChange('text2')}
            className={classes.textField}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Write something ..."
            multiline
            rows="3"
            value={values.text3}
            onChange={handleChange('text3')}
            className={classes.textField}
            margin="normal"
          />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={(values.text1 === '') & (values.text2 === '')}
            onClick={clickTest}
            className={classes.submit}
          >
            Test
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

NewTest.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};
