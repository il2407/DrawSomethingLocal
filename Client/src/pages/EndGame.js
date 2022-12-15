import { Box } from "@mui/material";
import NaviButton from "../components/NaviButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_KEY;

export function EndGame() {
  const [score, setScore] = useLocalStorage("pointsSum", 0);
  const [time, setTime] = useLocalStorage("time", 0);
  var endTime = performance.now();

  const createSession = async () => {
    //generate uuid and pull username
    const { data } = await axios.post(
      BASE_URL + "/sessions/createsession/",
      {
        score: score,
        time: time,
      },
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
  };

  useEffect(() => {
    setTime(parseInt((endTime - time) / 1000));
    createSession();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>Your Score is : {score}</Box>
      <Box sx={{ flexGrow: 1 }}> {`The Game took ${time} seconds`}</Box>

      <NaviButton name="New Game" path=""></NaviButton>
    </>
  );
}
