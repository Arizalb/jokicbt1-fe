import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Swal from "sweetalert2";
import theme from "../theme";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();

  const mulaiUjian = () => {
    Swal.fire({
      title: "Peringatan!",
      text: "Ujian hanya dapat dikerjakan 1 kali. Fokuslah saat mengerjakannya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Mulai Ujian",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/access-token");
      }
    });
  };
  const username = localStorage.getItem("username") || "Peserta";
  const result = () => {
    navigate("/result");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper elevation={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  {username[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Selamat Datang, {username}!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Siap untuk memulai ujian hari ini?
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayCircleOutlineIcon />}
                onClick={mulaiUjian}
                size="large"
              >
                Mulai Ujian
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
            <StyledCard elevation={3}>
              <CardActionArea sx={{ p: 2 }}>
                <CardContent>
                  <SchoolIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Mata Pelajaran
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lihat daftar mata pelajaran yang akan diujikan
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard elevation={3}>
              <CardActionArea sx={{ p: 2 }} onClick={result}>
                <CardContent>
                  <AssessmentIcon
                    color="primary"
                    sx={{ fontSize: 50, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Riwayat Nilai
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pantau perkembangan nilai ujian Anda
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledCard elevation={3}>
              <CardActionArea sx={{ p: 2 }}>
                <CardContent>
                  <AssessmentIcon
                    color="primary"
                    sx={{ fontSize: 50, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Jadwal Ujian
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lihat jadwal ujian mendatang
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
