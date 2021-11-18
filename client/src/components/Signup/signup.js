import "./signup.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as API from "../../config/apiConfig";
import { Button, Paper, Grid, Typography, Container } from "@mui/material";
import Input from "../input";
import { Link } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {};

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Typography variant="h5">SIGNUP</Typography>
        <form>
          <Grid container spacing={2}>
            <Input
              name="firstName"
              label="FIRST NAME"
              handleChange={handleChange}
              autoFocus
              half
            />
            <Input
              name="lastName"
              label="LAST NAME"
              handleChange={handleChange}
              autoFocus
              half
            />

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            <Input
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type="password"
            />
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary">
            SIGNUP
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to="/">
                Already have an account? LOG IN
              </Button>
            </Grid>
            <Grid item>
              <Button component={Link} to="/forgotpassword">
                FORGOT PASSWORD?
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
