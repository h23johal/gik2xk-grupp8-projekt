import { Box, Typography, Paper } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// Lista med butikens egenskaper: ikon, titel och beskrivning
const features = [
  {
    icon: <SecurityIcon fontSize="large" color="primary" />,
    title: "Trygg E-handel",
    description: "Säkra betalningar och krypterad hantering av dina uppgifter.",
  },
  {
    icon: <LocalShippingIcon fontSize="large" color="primary" />,
    title: "Fri Frakt",
    description: "Vi bjuder på frakten vid alla beställningar över 500 kr.",
  },
  {
    icon: <SupportAgentIcon fontSize="large" color="primary" />,
    title: "Kundservice 24/7",
    description: "Chatta med oss när som helst – vi är alltid här för dig.",
  },
];

function StoreInfo() {
  return (
    // Yttre container, centrerad och responsiv layout
    <Box
      sx={{
        width: "100%",
        minHeight: "100%", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
      }}
    >
      {/* Inre container med flexlayout för korten */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          maxWidth: 1200,
        }}
      >
        {/* Gå igenom varje objekt och rendera som kort */}
        {features.map((item, i) => (
          <Paper
            key={i}
            elevation={3}
            sx={{
              p: 4,
              flex: "1 1 250px",
              maxWidth: 300,
              textAlign: "center",
              borderRadius: 4,
              background: "white",
            }}
          >
            {/* Ikon */}
            <Box sx={{ mb: 2 }}>{item.icon}</Box>
            
            {/* Titel */}
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              {item.title}
            </Typography>
            
            {/* Beskrivning */}
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default StoreInfo;
