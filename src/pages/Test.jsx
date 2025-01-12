import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // import useParams
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  FormControl,
  Paper,
  Box,
  Container,
  LinearProgress,
  Card,
  CardContent,
  useTheme,
  createTheme,
  ThemeProvider,
  Alert,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
}));

const StyledRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.primary.main,
  },
}));

const Test = () => {
  const { code } = useParams(); // Capture code from URL
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");
      const code = localStorage.getItem("code"); // Get the code from localStorage
      try {
        const response = await axios.get(
          `https://jokicbt1.vercel.app/api/questions/${code}`, // Use the code in the URL
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Gagal memuat soal. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [code]); // Re-fetch when the code changes

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleExit = () => {
    const confirmExit = window.confirm(
      "Apakah Anda yakin ingin keluar dari tes? Jawaban Anda belum tersimpan."
    );
    if (confirmExit) {
      navigate("/dashboard");
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id"); // Assuming userId is stored in localStorage

    // Prepare the answers in the required format
    const answersPayload = Object.entries(answers).map(
      ([questionId, userAnswer]) => ({
        questionId: questionId,
        userAnswer: userAnswer,
      })
    );

    const payload = {
      userId: userId, // User ID
      answers: answersPayload,
    };

    try {
      setSubmitting(true);

      // Send the request to the backend
      const response = await axios.post(
        "https://jokicbt1.vercel.app/api/results/submit-answer",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response data
      const { totalScore } = response.data.result;
      navigate("/result", { state: { score: totalScore } });
    } catch (error) {
      console.error(
        "Error submitting answers:",
        error.response?.data || error.message
      );
      setError("Terjadi kesalahan saat mengirim jawaban.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={80} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            color="error"
            onClick={handleExit}
            sx={{
              backgroundColor: "rgba(255,0,0,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <StyledPaper elevation={3}>
          <Box sx={{ mb: 3 }}>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              color="primary"
            />
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mt: 1, textAlign: "center", display: "block" }}
            >
              {`Soal ${currentQuestionIndex + 1} dari ${questions.length}`}
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {`${currentQuestionIndex + 1}. ${currentQuestion.question}`}
              </Typography>
            </CardContent>
          </Card>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleAnswerChange(currentQuestion.id, e.target.value)
              }
            >
              {["A", "B", "C", "D"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<StyledRadio />}
                  label={currentQuestion[`option${option}`]}
                  sx={{
                    backgroundColor:
                      answers[currentQuestion.id] === option
                        ? "rgba(63, 81, 181, 0.1)"
                        : "transparent",
                    borderRadius: 2,
                    mb: 1,
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(63, 81, 181, 0.05)",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button
              startIcon={<ArrowBackIosIcon />}
              variant="outlined"
              color="primary"
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              disabled={currentQuestionIndex === 0}
            >
              Sebelumnya
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                endIcon={<ArrowForwardIosIcon />}
                variant="contained"
                color="primary"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                disabled={!answers[currentQuestion.id]}
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                startIcon={<CheckCircleOutlineIcon />}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={submitting || !answers[currentQuestion.id]}
              >
                {submitting ? "Mengirim..." : "Selesai"}
              </Button>
            )}
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Test;
