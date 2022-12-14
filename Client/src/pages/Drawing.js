import React from "react";
import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { GithubPicker } from "react-color";
// import "./styles.css";
import { useClickAway } from "../components/useClickAway";
import io from "socket.io-client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);

const defaultProps = {
  loadTimeOffset: 5,
  lazyRadius: 0,
  brushRadius: 2,
  catenaryColor: "#0a0302",
  gridColor: "rgba(150,150,150,0.17)",
  hideGrid: true,
  canvasWidth: 400,
  canvasHeight: 400,
  disabled: false,
  imgSrc: "",
  saveData: "",
  immediateLoading: false,
  hideInterface: false,
};

const colors = [
  "#B80000",
  "#DB3E00",
  "#FCCB00",
  "#008B02",
  "#006B76",
  "#1273DE",
  "#004DCF",
  "#5300EB",
  "#000000",
  "#EB9694",
  "#FAD0C3",
  "#FEF3BD",
  "#C1E1C5",
  "#BEDADC",
  "#C4DEF6",
  "#BED3F3",
  "#D4C4FB",
  "#CCCCCC",
];

const width = `${Math.ceil(colors.length / 2) * 32}px`;

export default function Drawing() {
  let navigate = useNavigate();

  const canvasRef = React.createRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [showColor, setShowColor] = useState(false);
  const [saveData, setSaveData] = useState("a");
  const [active, setActive] = useState(sessionStorage.getItem("player1"));
  const [waiting, setWaiting] = useState(false);
  const word = localStorage.getItem("word");

  // console.log("active:" + active);

  const getImg = () =>
    canvasRef.current.canvasContainer.children[1].toDataURL();

  const paletteRef = useClickAway(() => {
    setShowColor(false);
  });

  const handleClear = () => {
    canvasRef.current.clear();
    setSaveData("");
  };

  const handleCanvasChange = () => {
    const saveData = getImg();
    setSaveData(saveData);
    sendMessage();
  };

  const handleOnClick = () => {
    sendMessage();
    sessionStorage.setItem("player1", false);
    setActive(sessionStorage.getItem("player1"));
    setSaveData("");
  };

  const handleTextChange = (event) => {
    console.log(word);
    console.log(event.target.value);
    if (word === event.target.value) {
      alert("correct!!!");
      navigate("/WordChosing");
      sessionStorage.setItem("player1", true);
      setActive(sessionStorage.getItem("player1"));
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
      console.log(data.draw);
      console.log(saveData);
      setSaveData(data.draw);
      console.log("ACTIVE USE EFFECT" + active);
      setActive(sessionStorage.getItem("player1"));
    });
  }, [socket]);

  return (
    <div>
      {saveData ? (
        <div className="App">
          {active ? (
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
        <>waiting</>
      )}
    </div>
  );
}
