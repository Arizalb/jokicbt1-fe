import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container style={{ marginTop: "20px", textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} CBT Application. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;
