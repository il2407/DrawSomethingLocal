import React from "react";
import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { GithubPicker } from "react-color";
import "./styles.css";
import { useClickAway } from "../components/useClickAway";
import io from "socket.io-client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { colors, defaultProps } from "../utils/DrawingUtils";
import Stopwatch from "../components/StopWatch";

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);
const pointSum = 0;

const width = `${Math.ceil(colors.length / 2) * 32}px`;

export default function Drawing() {
  let navigate = useNavigate();

  const canvasRef = React.createRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [showColor, setShowColor] = useState(false);
  const [saveData, setSaveData] = useState("a");
  const [pointSum, setPointSum] = useState(localStorage.getItem("pointSum"));
  const word = localStorage.getItem("word");
  const points = parseInt(localStorage.getItem("points"));

  const getImg = () =>
    canvasRef.current.canvasContainer.children[1].toDataURL();

  const paletteRef = useClickAway(() => {
    setShowColor(false);
  });

  const handleClear = () => {
    canvasRef.current.clear();
    setSaveData("a");
  };

  const handleCanvasChange = () => {
    const saveData = getImg();
    setSaveData(saveData);
    sendMessage();
  };

  const handleOnClick = () => {
    sendMessage();
    window.sessionStorage.removeItem("player1");
    setSaveData("");
  };

  const handleTextChange = (event) => {
    console.log(word);
    if (word === event.target.value) {
      sessionStorage.setItem("player1", true);
      var score = localStorage.getItem("pointsSum");
      var score1 = parseInt(score);
      var scoreSum = score1 + points;
      localStorage.setItem("pointsSum", scoreSum);

      console.log("poinstsum:" + localStorage.getItem("pointsSum"));
      console.log("poinsts:" + points);
      console.log("poinstsumstate2:" + scoreSum);

      alert("correct!!!");

      navigate("/WordChosing");
    }
  };

  const props = {
    ...defaultProps,
    className: classNames("canvas"),
    onChange: handleCanvasChange,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
  };

  const sendMessage = () => {
    socket.emit("send_draw", { draw: saveData });
  };

  useEffect(() => {
    socket.on("receive_draw", (data) => {
      setSaveData(data.draw);
    });
  }, [socket]);

  useEffect(() => {
    setPointSum(localStorage.getItem("pointsSum"));
  }, []);

  return (
    <div>
      {saveData ? (
        <div className="App">
          {sessionStorage.getItem("player1") ? (
            <>
              {" "}
              <h1>Draw the word!</h1>
              <CanvasDraw {...props} />
              <div className="button-container">
                <div ref={paletteRef} className="picker-container">
                  <button
                    className="palette"
                    onClick={() => {
                      setShowColor((s) => !s);
                    }}
                  >
                    <span role="img" aria-label="">
                      🎨
                    </span>{" "}
                    color
                  </button>
                  {showColor && (
                    <div className="picker-popper">
                      <GithubPicker
                        triangle={"hide"}
                        color={brushColor}
                        colors={colors}
                        width={width}
                        onChangeComplete={(c) => setBrushColor(c.hex)}
                      />
                    </div>
                  )}
                </div>
                <button
                  className="undo"
                  onClick={() => {
                    canvasRef.current.undo();
                  }}
                >
                  <span role="img" aria-label="">
                    ↩️
                  </span>{" "}
                  undo
                </button>
                <button className="clear" onClick={handleClear}>
                  <span className="non-hover" role="img" aria-label="">
                    💣
                  </span>{" "}
                  <span className="hover" role="img" aria-label="">
                    🧨
                  </span>{" "}
                  clear
                </button>
                <button className="clear" onClick={handleOnClick}>
                  Finish
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>Guess the word!</h1>
              <img src={saveData} alt="" />
              <input
                type="text"
                placeholder="Guess the word"
                onChange={handleTextChange}
              />
            </>
          )}
        </div>
      ) : (
        <h1>Waiting View</h1>
      )}
    </div>
  );
}
