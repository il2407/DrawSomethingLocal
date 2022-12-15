import { Card } from "@mui/material";
import { getAll } from "../utils/EndGame";
import { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_API_KEY;

function Customer(props) {
  const [highScore, setHighScore] = useState(0);
  const [bestTime, setBestTime] = useState(0);

  const updateHighScore = async () => {
    //Get the score and time
    const { data } = await getAll(BASE_URL + "/sessions");
    setHighScore(data.sessions[0].score);
    setBestTime(data.sessions[0].time);
  };

  useEffect(() => {
    updateHighScore();
  }, []);

  return (
    <>
      <Card>
        <>Best Score is : {highScore}</>
        <br></br>
        <>Best time is :{bestTime} Seconds </>
      </Card>
      <br></br>
    </>
  );
}

export default Customer;
