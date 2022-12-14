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

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);

const width = `${Math.ceil(colors.length / 2) * 32}px`;

export default function Drawing() {
  let navigate = useNavigate();

  const canvasRef = React.createRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [showColor, setShowColor] = useState(false);
  const [saveData, setSaveData] = useState("a");
  const [pointSum, setPointSum] = useState();
  const word = localStorage.getItem("word");
  const points = localStorage.getItem("points");

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
      setPointSum(points + pointSum);
      sessionStorage.setItem("player1", true);
      localStorage.setItem("player1", pointSum);
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
