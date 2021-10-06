import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import axios from "axios";

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (event) => {
    setIsPending(true);
    event.preventDefault();
    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("Successfully logged in!");
        localStorage.setItem(
          "login",
          JSON.stringify({ login: true, token: response.data.token })
        );
        setLoginError(false);
        history.push("/home");
      } else {
        console.log("Something went wrong!");
        setIsPending(false);
        setLoginError(true);
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log("Wrong Credentials!");
        setIsPending(false);
        setLoginError(true);
      }
      console.log(err);
    }
  };

  return (
    <div>
      {" "}
      {isPending && (
        <Grid
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress style={{ color: "#F06795" }} />{" "}
        </Grid>
      )}
      {!isPending && (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#F06795" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {loginError && (
                  <Alert severity="error">Please Try Again!</Alert>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="error"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  color="error"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: "#F06795" }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}
