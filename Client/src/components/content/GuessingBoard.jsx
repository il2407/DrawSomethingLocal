import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { GithubPicker } from "react-color";
import CanvasDraw from "react-canvas-draw";
import { useClickAway } from "../components/useClickAway";
import classNames from "classnames";
import { colors, defaultProps } from "../utils/DrawingUtils";
import Button from "@mui/material/Button";
import React from "react";
import io from "socket.io-client";
import Input from "@mui/material/Input";

const word = localStorage.getItem("word");
const points = parseInt(localStorage.getItem("points"));

function GuessingBoard() {
  const [saveData, setSaveData] = useState("a");

  const BASE_URL = process.env.REACT_APP_API_KEY;
  const socket = io.connect(BASE_URL);

  let navigate = useNavigate();

  const handleTextChange = (event) => {
    console.log(word);
    if (word === event.target.value) {
      sessionStorage.setItem("player1", true);
      var score = localStorage.getItem("pointsSum");
      var score1 = parseInt(score);
      var scoreSum = score1 + points;
      localStorage.setItem("pointsSum", scoreSum);

      alert("correct!!!");

      navigate("/WordChoosing");
    }
  };

  useEffect(() => {
    socket.on("receive_draw", (data) => {
      setSaveData(data.draw);
    });
  }, [socket]);

  return (
    <>
      <>
        <h1>Guess the word!</h1>
        <img src={saveData} alt="" />
        <Input
          type="text"
          placeholder="Guess the word"
          onChange={handleTextChange}
        />
      </>
    </>
  );
}

export default GuessingBoard;
