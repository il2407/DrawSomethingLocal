import NaviButton from "../components/NaviButton";
import Typography from "@mui/material/Typography";
import BestScore from "../components/BestScore";
import { useEffect, useState } from "react";
import Stopwatch from "../components/StopWatch";

export function Welcome() {
  useEffect(() => {
    sessionStorage.setItem("player1", true);
    localStorage.setItem("pointsSum", 0);
    console.log(sessionStorage.getItem("player1"));
  }, []);

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "block",
        height: "100vh",
        position: "fixed",
        top: "30%",
        left: "45%",
      }}
    >
      <Typography variant="h4">Welcome View</Typography>
      <br></br>
      <div>
        {" "}
        <NaviButton name="New Game" path="WordChosing"></NaviButton>
        <BestScore></BestScore>
      </div>
    </div>
  );
}
