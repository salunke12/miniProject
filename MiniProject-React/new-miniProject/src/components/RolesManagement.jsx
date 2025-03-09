import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import useRoleStore from "../store/useRoleStore"; // Import Zustand store

const BASE_URL = "https://json-placeholder.mock.beeceptor.com";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userRole, setUserRole } = useRoleStore(); // Get role from Zustand

  // Fetch all roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/roles`);
        if (!response.ok) throw new Error("Failed to fetch roles");
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Role-based filtering function
  const hasPermission = (action) => {
    if (userRole === "admin") return true; // Admin has all permissions
    if (userRole === "editor" && action === "edit") return true;
    if (userRole === "viewer" && action === "view") return true;
    return false;
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">Error: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Role-Based Access Management
      </Typography>

      <Typography variant="h6">
        Your Role: <strong>{userRole}</strong>
      </Typography>

      {/* Dropdown to change role */}
      <select
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        style={{ marginBottom: "1rem", padding: "8px", fontSize: "16px" }}
      >
        <option value="guest">Guest</option>
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>

      <List>
        {roles.map((role) => (
          <ListItem key={role.id} divider>
            <ListItemText primary={role.name} secondary={role.description} />
          </ListItem>
        ))}
      </List>

      {/* Role-based actions */}
      {hasPermission("edit") && (
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Edit Content
        </Button>
      )}
      {hasPermission("view") && (
        <Button variant="contained" color="secondary">
          View Content
        </Button>
      )}
    </Container>
  );
};

export default RoleManagement;
