import { useState, FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);

  function handleChangeIsLogin() {
    setIsLogin((prev) => !prev);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirm: data.get("password-confirm"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign in" : "Create new account"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 0.5 }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {!isLogin && (
              <TextField
                margin="dense"
                required
                fullWidth
                name="password-confirm"
                label="Confirm Password"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {isLogin ? "Sign in" : "Sing up"}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  <span onClick={handleChangeIsLogin}>
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : "Already a member? Sign In"}
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
