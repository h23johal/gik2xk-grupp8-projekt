import React from "react";
import { Box, Typography } from "@mui/material";

const ShippingNotice = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        textAlign: "center",
        mb: 3,
      }}
    >
      <Typography variant="body1">
        Frakt <strong>49 kr</strong> eller handla för över <strong>500 kr</strong> och få <strong>fri frakt</strong>!
      </Typography>
    </Box>
  );
};

export default ShippingNotice;