import { useState } from "react";
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
import { addUserToDatabase } from "../util/auth";
import { useRevalidator } from "react-router-dom";
import { getUserData } from "../util/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isSignIn, setIsSignIn] = useState(true);

  const dispach = useAppDispatch();

  const revalidator = useRevalidator();

  const navigate = useNavigate();

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
        const id = toast.loading("Please wait...");
        createUserWithEmailAndPassword(auth, emailValue, passValue)
          .then((useCredetial: any) => {
            const uId = useCredetial.user.uid;
            localStorage.setItem("userId", uId);
            dispach(authSliceActions.setUserName(nameValue));
            localStorage.setItem("username", nameValue);
            addUserToDatabase(
              uId,
              nameValue,
              emailValue,
              useCredetial.user.metadata.creationTime
            );
            toast.update(id, {
              render: "Your account has been created!",
              type: "success",
              isLoading: false,
            });
            revalidator.revalidate();
            setTimeout(() => {
              dispach(authSliceActions.toggleIsLogedOn());
              dispach(authSliceActions.toggleFormOff());
              navigate("/home");
            }, 1500);
          })
          .catch((error: any) => {
            console.log(error.message);
            let errorMess = "Something went wrong";
            if (error.message.includes("network")) {
              errorMess = "Sorry, connection failed.";
            }
            if (error.message.includes("invalid-email")) {
              errorMess = "Please enter a valid e-mail";
            }
            toast.update(id, {
              render: errorMess,
              type: "error",
              isLoading: false,
              autoClose: 4000,
            });
          });
      }
      return;
    }
    const id = toast.loading("Please wait...");
    signInWithEmailAndPassword(auth, emailValue, passValue)
      .then((useCredetial: any) => {
        const uId = useCredetial.user.uid;
        localStorage.setItem("userId", uId);
        getUserData(uId).then((response: any) => {
          dispach(authSliceActions.setUserName(response.username));
          localStorage.setItem("username", response.username);
        });

        toast.update(id, {
          render: "LOGIN SUCCESSFUL",
          type: "success",
          isLoading: false,
        });
        revalidator.revalidate();
        setTimeout(() => {
          dispach(authSliceActions.toggleIsLogedOn());
          dispach(authSliceActions.toggleFormOff());
          navigate("/home");
        }, 1100);
      })
      .catch((error: any) => {
        let errorMess = "Something went wrong";
        if (error.message.includes("network")) {
          errorMess = "Sorry, connection failed.";
        } else if (error.message.includes("invalid-credential")) {
          errorMess = "Wrong e-mail or password.";
        }
        toast.update(id, {
          render: errorMess,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer position="top-center" hideProgressBar />
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
}
