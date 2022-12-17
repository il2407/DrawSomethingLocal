// import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import {
  getSession,
  createSession,
  updateSession,
} from "../utils/EndGameRequest";
import {
  getGameData,
  createGameData,
  updateGameData,
} from "../utils/gameDataUtils";
import EndGameBox from "../components/content/EndGameBox";

const BASE_URL = process.env.REACT_APP_API_KEY;

export function EndGame() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const putData = async (prevScore, newScore, newTime) => {
    console.log(prevScore, newScore, newTime);
    await updateSession(
      BASE_URL + "/sessions/" + parseInt(prevScore),
      parseInt(newScore),
      parseInt(newTime)
    );
  };

  const updateHighScore = async () => {
    //Get the score and time
    const { data } = await getSession(BASE_URL + "/sessions");
    const { data: curr } = await getGameData(BASE_URL + "/game-data");
    setScore(curr.gameDatas[0].score);
    setTime(parseInt((Date.now() - curr.gameDatas[0].time) / 1000));
    //If doesnt exist yet create a new one
    if (data.count === 0)
      await createSession(
        BASE_URL + "/sessions/createsession",
        curr.gameDatas[0].score,
        parseInt((Date.now() - curr.gameDatas[0].time) / 1000)
      );
    //If there is a session already check if the current score is better then the high score
    else {
      if (data.sessions[0].score < curr.gameDatas[0].score) {
        putData(
          data.sessions[0].score,
          curr.gameDatas[0].score,
          parseInt((Date.now() - curr.gameDatas[0].time) / 1000)
        );
        alert("New High Score");
      } else {
        if (data.sessions[0].score === curr.gameDatas[0].score) {
          if (
            data.sessions[0].time >
            parseInt((Date.now() - curr.gameDatas[0].time) / 1000)
          ) {
            putData(
              data.sessions[0].score,
              curr.gameDatas[0].score,
              parseInt((Date.now() - curr.gameDatas[0].time) / 1000)
            );
            alert("Same high score but better time , Horay!");
          } else alert("Same high score but worse time , Next Time!");
        } else console.log("lower score");
      }
    }
  };

  useEffect(() => {
    const updateData = async () => {
      await setTime(time);
    };
    updateData();
    updateHighScore();
  }, []);

  return <EndGameBox score={score} time={time}></EndGameBox>;
}
