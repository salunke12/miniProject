import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, List, ListItem, ListItemText, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-toastify";
import CrudForm from "./CrudForm";

const API_URL = "https://json-placeholder.mock.beeceptor.com/users"; // Change accordingly

const CrudList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  const handleSave = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <Container>
      <CrudForm selectedUser={selectedUser} onSave={handleSave} />
      <List>
        {users.map((user) => (
          <ListItem key={user.id} divider>
            <ListItemText primary={user.name} secondary={user.email} />
            <Button onClick={() => setSelectedUser(user)}>
              <Edit color="primary" />
            </Button>
            <Button onClick={() => handleDelete(user.id)}>
              <Delete color="error" />
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CrudList;
