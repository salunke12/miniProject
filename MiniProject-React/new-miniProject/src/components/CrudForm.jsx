import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://json-placeholder.mock.beeceptor.com/users"; // Change accordingly

const CrudForm = ({ selectedUser, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedUser) reset(selectedUser);
  }, [selectedUser, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedUser) {
        // Update existing user
        await axios.put(`${API_URL}/${selectedUser.id}`, data);
        toast.success("User updated successfully!");
      } else {
        // Add new user
        await axios.post(API_URL, data);
        toast.success("User added successfully!");
      }
      reset();
      onSave();
    } catch (error) {
      toast.error("Error saving data!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: 2 }}>
        {selectedUser ? "Edit User" : "Add User"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {selectedUser ? "Update" : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default CrudForm;
