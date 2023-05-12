import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Icon from './Icon.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles.js';
import Input from './Input.js';


const Auth = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }
    const googleSuccess = (res) => {
        const user = jwt_decode(res?.credential);
        const result = {
            email: user?.email,
            familyName: user?.family_name,
            givenName: user?.given_name,
            googleId: user?.sub,
            imageUrl: user?.picture,
            name: user?.name
        }
        const token = res?.credential;
        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
    const googleFailure = (err) => {
        console.error(err.details);
        console.log("Google sign in was unsuccessfull");
    }
    const handleShowPassword = () => { setShowPassword((prevShowPassword) => !prevShowPassword) };
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup ? (
                                    <>
                                        <Input name='firstName' lable="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name='lastName' lable="Last Name" handleChange={handleChange} half />
                                    </>
                                ) : null
                            }
                            <Input name='email' lable="Email Address" handleChange={handleChange} type="email" />
                            <Input name='password' lable="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" lable="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />}
                        </Grid>

                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        <GoogleOAuthProvider clientId="457497632209-q8d9tppns0l0t6unfcfpe6qul3ph5sjv.apps.googleusercontent.com">
                            <GoogleLogin
                                clientId="457497632209-q8d9tppns0l0t6unfcfpe6qul3ph5sjv.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                        GOOGLE SIGN IN
                                    </Button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                // useOneTap
                                cookiePolicy='single_host_origin'
                            />
                        </GoogleOAuthProvider>
                        <Grid container justifyContent='flex-end' >
                            <Grid item>
                                <Button onClick={switchMode} >
                                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Auth;