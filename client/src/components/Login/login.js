import React, {useState} from 'react';
import {Button, Paper, Grid, Typography, Container} from '@mui/material';
import Input from './input';
import {Link} from 'react-router-dom';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Typography variant="h5">{isSignup ? 'SIGNUP' : 'LOGIN'}</Typography>
                <form>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="FIRST NAME" handleChange={handleChange} autoFocus
                                           half/>
                                    <Input name="lastName" label="LAST NAME" handleChange={handleChange} autoFocus
                                           half/>

                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                            type="password"/>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? "SIGNUP" : "LOGIN"}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? LOG IN" : "Don't have an account? SIGN UP"}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to='/forgotpassword'>
                                FORGOT PASSWORD?
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Login;
