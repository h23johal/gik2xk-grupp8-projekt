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
        Shipping <strong>$49</strong> or shop for over <strong>$500</strong> and
        get <strong>free shipping</strong>!
      </Typography>
    </Box>
  );
};

export default ShippingNotice;
