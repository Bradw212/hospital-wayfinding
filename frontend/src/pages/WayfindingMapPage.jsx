import React from "react";
import { Box, Typography } from "@mui/material";

export default function WayfindingMapPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Hospital Wayfinding
      </Typography>
      {/* QR code input, origin/destination autocomplete, mobility selector, map & step-by-step directions */}
      <Typography>Coming soon: Scan QR, pick destination, and start navigating!</Typography>
    </Box>
  );
}
