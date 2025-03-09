import React, { useEffect, useReducer, useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

const BASE_URL = "https://json-placeholder.mock.beeceptor.com/companies";

const initialState = {
  filter: "all",
  sort: "asc",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const fetchCompanyDetails = async (companyId) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/${companyId}`);
      const data = await response.json();
      setSelectedCompany(data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    if (state.filter === "all") return true;
    const marketCap = company.marketCap || 0;
    const [min, max] = state.filter.split("-").map(Number);
    return marketCap >= min && marketCap <= max;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) =>
    state.sort === "asc" ? a.marketCap - b.marketCap : b.marketCap - a.marketCap
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Filter Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Filter by Market Capitalization</InputLabel>
            <Select
              value={state.filter}
              onChange={(e) =>
                dispatch({ type: "SET_FILTER", payload: e.target.value })
              }
              displayEmpty
              sx={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="0-500000000">0 - 500M</MenuItem>
              <MenuItem value="500000000-1000000000">500M - 1B</MenuItem>
              <MenuItem value="1000000000-5000000000">1B - 5B</MenuItem>
              <MenuItem value="5000000000-10000000000">5B - 10B</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Sorting Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Sort by Market Capitalization</InputLabel>
            <Select
              value={state.sort}
              onChange={(e) =>
                dispatch({ type: "SET_SORT", payload: e.target.value })
              }
              displayEmpty
              sx={{ backgroundColor: "transparent" }}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Display Companies */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {sortedCompanies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <Card
              sx={{ p: 2, textAlign: "center", cursor: "pointer" }}
              onClick={() => fetchCompanyDetails(company.id)}
            >
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                <Typography variant="body2">
                  Industry: {company.industry}
                </Typography>
                <Typography variant="h6" color="primary">
                  Market Cap: {company.marketCap.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Company Details Modal */}
      <Dialog
        open={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Company Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : selectedCompany ? (
            <>
              <Typography variant="h5">{selectedCompany.name}</Typography>
              <img
                src={selectedCompany.logo}
                alt="Company Logo"
                style={{ width: "100px", height: "100px", margin: "10px 0" }}
              />
              <Typography variant="body1">
                CEO: {selectedCompany.ceoName}
              </Typography>
              <Typography variant="body1">
                Industry: {selectedCompany.industry}
              </Typography>
              <Typography variant="body1">
                Location: {selectedCompany.address}, {selectedCompany.zip},{" "}
                {selectedCompany.country}
              </Typography>
              <Typography variant="body1">
                Employees: {selectedCompany.employeeCount}
              </Typography>
              <Typography variant="h6" color="primary">
                Market Cap: {selectedCompany.marketCap.toLocaleString()}
              </Typography>
              <Typography variant="body1">
                Website:{" "}
                <a
                  href={`https://${selectedCompany.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedCompany.domain}
                </a>
              </Typography>
            </>
          ) : (
            <Typography variant="body2">No details available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedCompany(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyManagement;
