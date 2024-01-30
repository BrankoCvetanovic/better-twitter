import { Button } from "@mui/material";
import logo from "../asets/logo1.png";

export default function Header() {
  console.log("Muda");
  return (
    <div className="header">
      <img src={logo} alt="" />
      <div className="actions">
        <Button sx={{ color: "#17252A" }} size="large" variant="text">
          Home
        </Button>
        <Button sx={{ color: "#17252A" }} size="large" variant="text">
          My Profile
        </Button>
      </div>
      <Button sx={{ color: "#17252A" }} size="medium" variant="contained">
        Sign In
      </Button>
    </div>
  );
}
