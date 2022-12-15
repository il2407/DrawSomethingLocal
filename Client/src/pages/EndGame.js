import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { getAll, createSession, updateSession } from "../utils/EndGameRequest";
import EndGameBox from "../components/content/EndGameBox";

const BASE_URL = process.env.REACT_APP_API_KEY;

export function EndGame() {
  const [score, setScore] = useLocalStorage("pointsSum", 0);
  const [time, setTime] = useLocalStorage("time", 0);
  var totalTime = parseInt((performance.now() - time) / 1000);

  const postData = async () => {
    await createSession(BASE_URL + "/sessions/createsession", score, totalTime);
  };

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
    const { data } = await getAll(BASE_URL + "/sessions");
    //If doesnt exist yet create a new one
    if (data.count === 0) postData();
    //If there is a session already check if the current score is better then the high score
    else {
      if (data.sessions[0].score < score) {
        putData(data.sessions[0].score, score, totalTime);
        console.log("updated : higer score");
      } else {
        if (data.sessions[0].score === score) {
          console.log("before:" + data.sessions[0].time, score, totalTime);

          if (data.sessions[0].time > totalTime) {
            putData(data.sessions[0].score, score, totalTime);
            console.log("better time");
          } else console.log("worse time");
        } else console.log("lower score");
      }
    }
  };

  useEffect(() => {
    const updateData = async () => {
      await setTime(totalTime);
    };
    updateData();
    updateHighScore();
  }, []);

  return <EndGameBox score={score} time={time}></EndGameBox>;
}
