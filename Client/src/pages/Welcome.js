import WelcomeBox from "../components/content/WelcomeBox";
import { useEffect } from "react";
import { Box } from "@mui/material";
import "./style.css";

export function Welcome() {
  useEffect(() => {
    sessionStorage.setItem("player1", true);
  }, []);

  return (
    <Box className="boxWrap">
      <WelcomeBox />
    </Box>
  );
}
