import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Paper,
  Box,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './shared/components/FormElements/Input';
import useStyles from './auth-material-styles';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from './shared/util/validators';
import { useForm } from './shared/hooks/form-hook';
import { useHttpClient } from './shared/hooks/http-hook';
import { AuthContext } from './shared/context/auth-context';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Zekiye Cakiral
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Auth = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {  sendRequest,  } = useHttpClient();
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false,
          },
          lastName: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        console.log('login ol id bu', responseData.userId,responseData.token);
        auth.login(responseData.userId, responseData.token);
          // history.push('/');
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          JSON.stringify({
            firstName: formState.inputs.firstName.value,
            lastName: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
        //  history.push('/');
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <Grid container component='main' className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={authSubmitHandler}
            >
              {!isLoginMode && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      id='firstName'
                      element='input'
                      required
                      fullWidth
                      type='text'
                      label='First Name'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText='Please enter a valid first name!'
                      onInput={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      id='lastName'
                      element='input'
                      required
                      fullWidth
                      type='text'
                      label='Last Name'
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText='Please enter a valid last name!'
                      onInput={inputHandler}
                    />
                  </Grid>
                </Grid>
              )}
              <Input
                id='email'
                element='input'
                required
                fullWidth
                type='text'
                label='Email Address'
                validators={[VALIDATOR_EMAIL()]}
                errorText='Please enter a valid email!'
                onInput={inputHandler}
              />
              <Input
                id='password'
                element='password'
                required
                fullWidth
                type='password'
                label='Password'
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText='Please enter a valid password!'
                onInput={inputHandler}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href='#' variant='body2' onClick={switchModeHandler}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Auth;
