import React from "react";
import { Container, Typography, Link, Box, ThemeProvider } from "@mui/material";
import theme from "../theme"; // Ensure to adjust the import path to where you saved your theme

const Footer = () => {
  const ownerName = "Your Name"; // Replace with the actual owner's name

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.typography.body2.color,
          padding: "20px 0",
          textAlign: "center",
          mt: "20px",
        }}
      >
        <Container>
          <Typography variant="h6">CBT Application</Typography>
          <Typography variant="body2" sx={{ margin: "10px 0" }}>
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
          <Typography variant="body2">
            Built by{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              {ownerName}
            </Link>
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
