import React, { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper sx={{ p: 6, minWidth: 320 }}>
        <Typography variant="h5" gutterBottom>Admin Login</Typography>
        <TextField
          margin="normal"
          label="Username"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleLogin}>Login</Button>
      </Paper>
    </Box>
  );
}