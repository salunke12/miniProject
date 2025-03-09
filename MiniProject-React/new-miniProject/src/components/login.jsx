import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const onSubmit = async (data) => {
    setErrorMessage("");

    // 🔥 Simulating manual credential check
    if (data.email !== "michael" || data.password !== "success-password") {
      setErrorMessage("Invalid username or password. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://json-placeholder.mock.beeceptor.com/login",
        {
          username: data.email, // API expects "username" instead of "email"
          password: data.password,
        }
      );

      // 🔥 Verify the response has a valid token (manual check)
      if (!response.data.token) {
        setErrorMessage("Unexpected response. Please try again.");
        return;
      }

      // ✅ Store token and redirect
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Login</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
