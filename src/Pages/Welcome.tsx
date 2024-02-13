import logo from "../asets/logo-bg.png";
import LoginModal from "../components/LoginModal";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { authSliceActions } from "../store";
import { Button } from "@mui/material";

export default function WelcomePage() {
  const modalIsOpen = useAppSelector((state) => state.auth.isOpen);
  const isLoged = useAppSelector((state) => state.auth.isLoged);

  const dispacher = useAppDispatch();

  function handleOpenLoginForm() {
    dispacher(authSliceActions.toggleFormOn());
  }

  return (
    <div className="welcome">
      <img src={logo} alt="" />
      <div>
        <h1>Happening now.</h1>
        {isLoged && <h2>Welcome to BetterTwiiter</h2>}
        {!isLoged && (
          <>
            <h2>Join today.</h2>
            <Button
              className="sign-btn"
              onClick={handleOpenLoginForm}
              sx={{ color: "#17252A" }}
              size="medium"
              variant="contained"
            >
              Sign In
            </Button>
          </>
        )}
        <div className="credit">
          Image by{" "}
          <a href="https://www.freepik.com/free-vector/paper-style-white-monochrome-background_15185908.htm#query=website%20background&position=8&from_view=keyword&track=ais&uuid=74af20a4-1adc-4807-9fbb-d2863bebc115">
            Freepik
          </a>
        </div>
      </div>
      {modalIsOpen && <LoginModal />}
    </div>
  );
}
