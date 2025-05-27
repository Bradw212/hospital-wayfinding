import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });
  const [importing, setImporting] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: false },
    { field: "name", headerName: "Name", flex: 1, editable: true },
    { field: "floor", headerName: "Floor", width: 90, editable: true, type: "number" },
    { field: "zone", headerName: "Zone", width: 120, editable: true },
    { field: "category", headerName: "Category", width: 150, editable: true },
    {
      field: "qrCode",
      headerName: "QR Code",
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <a href={`/${params.value}`} target="_blank" rel="noopener noreferrer">
            View
          </a>
        ) : (
          "—"
        ),
      sortable: false,
      filterable: false,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
      sortable: false,
      filterable: false,
      editable: false,
    },
  ];

  // Fetch locations from API
  const fetchLocations = async () => {
    const res = await axios.get("/api/locations");
    setLocations(res.data);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Add a blank row for quick-add
  const handleAdd = () => {
    setLocations((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        name: "",
        floor: 1,
        zone: "",
        category: "",
        isNew: true,
      },
    ]);
  };

  // Handle cell edits (for both new and existing rows)
  const handleRowEditCommit = async (id, updated) => {
    let row = locations.find((l) => l.id === id);
    if (!row) return;
    try {
      if (row.isNew) {
        // New row: POST
        await axios.post("/api/locations", updated);
        setSnackbar({ open: true, msg: "Location added!", severity: "success" });
      } else {
        // Existing row: PUT
        await axios.put(`/api/locations/${id}`, updated);
        setSnackbar({ open: true, msg: "Location updated!", severity: "success" });
      }
      fetchLocations();
    } catch (err) {
      setSnackbar({ open: true, msg: err.response?.data?.error || "Error", severity: "error" });
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this location?")) return;
    try {
      await axios.delete(`/api/locations/${id}`);
      setSnackbar({ open: true, msg: "Location deleted.", severity: "success" });
      fetchLocations();
    } catch (err) {
      setSnackbar({ open: true, msg: err.response?.data?.error || "Error", severity: "error" });
    }
  };

  // Handle bulk import
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("/api/locations/bulk-import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({ open: true, msg: "Bulk import successful!", severity: "success" });
      fetchLocations();
    } catch (err) {
      setSnackbar({ open: true, msg: err.response?.data?.error || "Import failed", severity: "error" });
    }
    setImporting(false);
    e.target.value = ""; // reset input
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Locations Management
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleAdd}>Add Location</Button>
        <Button variant="contained" component="label" disabled={importing}>
          Bulk Import (CSV)
          <input type="file" accept=".csv" hidden onChange={handleImport} />
        </Button>
      </Stack>
      <Paper>
        <DataGrid
          rows={locations}
          columns={columns}
          autoHeight
          pageSize={15}
          rowsPerPageOptions={[15, 50, 100]}
          editMode="row"
          processRowUpdate={async (updatedRow, oldRow) => {
            await handleRowEditCommit(updatedRow.id, updatedRow);
            return updatedRow;
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}