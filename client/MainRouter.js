import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    height: '100%',
  },
}));

const MainRouter = () => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm" className={classes.background}>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
        </Switch>
      </Container>
    </div>
  );
};

export default MainRouter;
