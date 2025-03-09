import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from "@mui/material";

const BASE_URL = "https://json-placeholder.mock.beeceptor.com";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initially, show all users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`);
      const data = await response.json();
      setSelectedUser(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" mb={3}>
        User Management
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              sx={{ textAlign: "center", cursor: "pointer", p: 2 }}
              onClick={() => fetchUserDetails(user.id)}
            >
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* User Details Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser ? (
            <>
              <Typography variant="h6">{selectedUser.name}</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Phone: {selectedUser.phone}</Typography>
              <Typography>Website: {selectedUser.website}</Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
