import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

function Overlay({ children, overlayContent }) {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Content (Fades when hovered) */}
      <Box
        sx={{
          transition: "opacity 0.3s ease-in-out",
          opacity: hovered ? 0.1 : 1, // Fades background on hover
        }}
      >
        {children} {/* Content inside <Overlay> */}
      </Box>

      {/* Overlay (Appears on hover) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          opacity: hovered ? 1 : 0, // Show overlay on hover
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 0.3s ease-in-out",
          pointerEvents: "none", // Prevents blocking interactions
        }}
      >
        {/* Custom Content Inside Overlay */}
        <Box sx={{ pointerEvents: "auto" }}>{overlayContent}</Box>
      </Box>
    </Box>
  );
}

export default Overlay;
