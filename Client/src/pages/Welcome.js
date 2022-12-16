import WelcomeBox from "../components/content/WelcomeBox";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { ContentWrap } from "../components/content/contentStyles";

export function Welcome() {
  useEffect(() => {
    sessionStorage.setItem("player1", true);
    localStorage.setItem("pointsSum", 0);
  }, []);

  return (
    <Box>
      <WelcomeBox />
    </Box>
  );
}
