import { Box } from "@mui/material";
//wrapper för konsekvent höjd, centrering etc
const PageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        flexGrow: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>{children}</Box>
    </Box>
  );
};

export default PageWrapper;