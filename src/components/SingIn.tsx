import { useState, FC } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useInput from "../util/useInput";
import {
  isEmail,
  isEqualsToOtherValue,
  hasMinLength,
} from "../util/validation";
import { useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";
import { signUpUser } from "../util/auth";

const SignIn: FC<{ onSuccsess: (type: string) => void }> = ({ onSuccsess }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const dispach = useAppDispatch();

  const notify = (errorMessage: string) =>
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const {
    inputValue: nameValue,
    handleInputBlur: handleNameBlur,
    handleInputChange: handleNameChamge,
    hasError: nameError,
  } = useInput("", (value) => value !== "");

  const {
    inputValue: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChamge,
    hasError: emailError,
  } = useInput("", isEmail);

  const {
    inputValue: passValue,
    handleInputBlur: handlePassBlur,
    handleInputChange: handlePassChamge,
    hasError: passError,
  } = useInput("", hasMinLength);

  const {
    inputValue: confValue,
    handleInputBlur: handleConfBlur,
    handleInputChange: handleConfChamge,
    hasError: confError,
  } = useInput("", (value) => isEqualsToOtherValue(value, passValue));

  function handleChangeIsLogin() {
    setIsSignIn((prev) => !prev);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmail(emailValue) || !hasMinLength(passValue)) {
      return;
    }
    if (!isSignIn) {
      if (isEqualsToOtherValue(passValue, confValue)) {
        createUserWithEmailAndPassword(auth, emailValue, passValue)
          .then((useCredetial: any) => {
            const token = useCredetial.user.accessToken;
            const uId = useCredetial.user.uid;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", uId);
            signUpUser(uId, nameValue, emailValue);
            dispach(authSliceActions.toggleIsLogedOn());
            dispach(authSliceActions.toggleFormOff());
            onSuccsess("Sing Up");
          })
          .catch((error: any) => {
            if (error.message.includes("network")) {
              notify("Sorry, connection failed.");
            } else {
              notify("An error happend.");
            }
          });
      }
      return;
    }
    signInWithEmailAndPassword(auth, emailValue, passValue)
      .then((useCredetial: any) => {
        const token = useCredetial.user.accessToken;
        const uId = useCredetial.user.uid;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", uId);
        dispach(authSliceActions.toggleIsLogedOn());
        dispach(authSliceActions.toggleFormOff());
        onSuccsess("Log In");
      })
      .catch((error: any) => {
        if (error.message.includes("network")) {
          notify("Sorry, connection failed.");
        } else if (error.message.includes("invalid-credential")) {
          notify("Wrong e-mail or password.");
        } else {
          notify("An error happend.");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <ToastContainer position="bottom-center" autoClose={5000} />
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
          {isSignIn ? "Sign In" : "Create new account"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 0.5 }}
        >
          {!isSignIn && (
            <TextField
              margin="dense"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="full-name"
              autoFocus
              value={nameValue}
              onBlur={handleNameBlur}
              onChange={handleNameChamge}
              error={nameError}
              helperText={nameError && "Please enter your name."}
            />
          )}
          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailValue}
            onBlur={handleEmailBlur}
            onChange={handleEmailChamge}
            error={emailError}
            helperText={emailError && "Please enter a valid email."}
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
            value={passValue}
            onBlur={handlePassBlur}
            onChange={handlePassChamge}
            error={passError}
            helperText={
              passError && "Password must be at least 8 character long"
            }
          />
          {!isSignIn && (
            <TextField
              margin="dense"
              required
              fullWidth
              name="password-confirm"
              label="Confirm Password"
              type="password"
              id="password-confirm"
              autoComplete="current-password"
              value={confValue}
              onBlur={handleConfBlur}
              onChange={handleConfChamge}
              error={confError}
              helperText={confError && "Passwords does't match"}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <span onClick={handleChangeIsLogin}>
                  {isSignIn
                    ? "Don't have an account? Sign Up"
                    : "Already a member? Sign In"}
                </span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
