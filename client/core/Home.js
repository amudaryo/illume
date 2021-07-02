import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import mandala from "./../assets/images/mandala.svg";
import auth from "./../auth/auth-helper";
import Feed from "../test/Feed";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 300,
    backgroundSize: "contain",
  },
}));

export default function Home({ history }) {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div>
      {!defaultPage && (
        <Card className={classes.card}>
          <Typography variant='h6' align='center' className={classes.title}>
            Welcome to Illume
          </Typography>
          <CardMedia
            className={classes.media}
            image={mandala}
            title='Mandala'
          />

          <CardContent>
            <Typography variant='body1' component='p'>
              This web-app helps you to focus on your positive experiences on a
              day to day basis.
            </Typography>
            <Typography variant='body1' component='p'>
              If you are new, sign-up to register an account, if you are coming
              back, please sign-in.
            </Typography>
          </CardContent>
        </Card>
      )}
      {defaultPage && <Feed />}
      {/* <Card className={classes.card}>
        <Typography variant='h6' align='center' className={classes.title}>
          Welcome to Illume
        </Typography>
        <CardMedia className={classes.media} image={mandala} title='Mandala' />

        <CardContent>
          <Typography variant='body1' component='p'>
            This web-app helps you to focus on your positive experiences on a
            day to day basis.
          </Typography>
          <Typography variant='body1' component='p'>
            If you are new, sign-up to register an account, if you are coming
            back, please sign-in.
          </Typography>
        </CardContent>
      </Card> */}
    </div>
  );
}
