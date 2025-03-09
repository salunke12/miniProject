import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    companies: 0,
    roles: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, companiesRes, rolesRes] = await Promise.all([
          fetch("https://json-placeholder.mock.beeceptor.com/users"),
          fetch("https://json-placeholder.mock.beeceptor.com/companies"),
          fetch("https://json-placeholder.mock.beeceptor.com/roles"),
        ]);

        const users = await usersRes.json();
        const companies = await companiesRes.json();
        const roles = await rolesRes.json();

        setStats({
          users: users.length,
          companies: companies.length,
          roles: roles.length,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (stats.loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {[
          { title: "Total Users", value: stats.users },
          { title: "Total Companies", value: stats.companies },
          { title: "Total Roles", value: stats.roles },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ textAlign: "center", p: 2, height: "75%" }}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="h4" color="primary">
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* User Management Button */}
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "100%", fontSize: "1.2rem", py: 4 }}
            onClick={() => navigate("/user-management")}
          >
            User Management
          </Button>
        </Grid>

        {/* Company Management Button */}
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "100%", fontSize: "1.2rem", py: 4 }}
            onClick={() => navigate("/company-management")}
          >
            Company Management
          </Button>
        </Grid>

        {/* Role-Based Management Button */}
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "100%", fontSize: "1.2rem", py: 4 }}
            onClick={() => navigate("/role-management")}
          >
            Role-Based Management
          </Button>
        </Grid>

        {/* Blog Section Button */}
        <Grid item xs={12} sm={12} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "100%", fontSize: "1.2rem", py: 4 }}
            onClick={() => navigate("/blog")}
          >
            Blog
          </Button>
        </Grid>

        {/* Comments Management Button */}
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: "100%", fontSize: "1.2rem", py: 4 }}
            onClick={() => navigate("/comments-management")}
          >
            Comments Management
          </Button>
        </Grid>

        {/* NEW: CRUD Form Button */}
        <Grid item xs={12} sm={6} md={4} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              height: "100%",
              fontSize: "1.2rem",
              py: 4,
            }}
            onClick={() => navigate("/crud-form")}
          >
            CRUD Form
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
