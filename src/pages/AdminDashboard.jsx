import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 4, cursor: "pointer" }} onClick={() => navigate("/admin/locations")}>
            <Typography variant="h6">Locations Management</Typography>
            <Typography>Bulk edit locations, import, link pins & QR codes.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 4, cursor: "pointer" }} onClick={() => navigate("/admin/maps")}>
            <Typography variant="h6">Maps Management</Typography>
            <Typography>Upload floor maps, define walkable zones, assign pins.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}