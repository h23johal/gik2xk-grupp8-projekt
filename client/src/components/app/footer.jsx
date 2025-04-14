import { Box, Typography, TextField, Button } from "@mui/material";
// Footer komponent
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 10, 
        px: 10,
        background: "linear-gradient(to right, rgba(224, 145, 169, 0.2), rgba(94, 107, 174, 0.2))",
        backdropFilter: "blur(15px)",
        boxShadow: "0 4px 15px rgba(94, 107, 174, 0.1)",
        borderTop: "1px solid rgba(255,255,255,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 2, 
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 2,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <TextField
          type="email"
          placeholder="Subscribe to our newsletter"
          fullWidth
          required
          variant="outlined"
        />
        <Button type="submit" variant="contained" sx={{ px: 4 }}>
          Send
        </Button>
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        info@webbshop.se • 42 Blom Street, Stockholm
      </Typography>
      <Typography variant="caption" sx={{ color: "text.disabled" }}>
        © 2025 Webbshop AB. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
