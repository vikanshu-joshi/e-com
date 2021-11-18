import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import Input from "../input";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as API from "../../config/apiConfig";

const initialState = {
  email: "",
  password: "",
};

const Login = (props) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [snackbar, setsnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const response = await API.loginUser({
      email: formData.email,
      password: formData.password,
    });
    if (response.status == 0) {
      setsnackbar({
        ...snackbar,
        open: true,
        message: response.error,
        severity: "error",
      });
    } else {
      localStorage.setItem("jwtToken", response.data.token);
      setsnackbar({
        ...snackbar,
        open: true,
        message: response.error,
        severity: "success",
      });
      navigate("/home");
    }
  };

  const hideSnackbar = () => {
    if (snackbar.open) {
      setsnackbar({ ...snackbar, open: false, message: "", severity: "info" });
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Paper elevation={3}>
        <Typography variant="h5">LOGIN</Typography>
        <form>
          <Grid container spacing={2}>
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
          </Grid>
          <Button
            onClick={handleLogin}
            fullWidth
            variant="contained"
            color="primary"
          >
            LOGIN
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button component={Link} to="/signup">
                Don't have an account? SIGN UP
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
};

export default Login;
