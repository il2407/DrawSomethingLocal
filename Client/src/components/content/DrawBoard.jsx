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

// Custom component that gets:
// Name of the Button
// Path to navigate to
// Type of the button

function DrawBoard() {
  const [showColor, setShowColor] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [saveData, setSaveData] = useState("a");

  const BASE_URL = process.env.REACT_APP_API_KEY;
  const socket = io.connect(BASE_URL);

  const width = `${Math.ceil(colors.length / 2) * 32}px`;
  const canvasRef = React.createRef(null);

  const getImg = () =>
    canvasRef.current.canvasContainer.children[1].toDataURL();

  const paletteRef = useClickAway(() => {
    setShowColor(false);
  });

  const handleOnClick = () => {
    sendMessage();
    window.sessionStorage.removeItem("player1");
    props.setActive(sessionStorage.getItem("player1"));
    setSaveData("");
  };
  const handleClear = () => {
    canvasRef.current.clear();
    setSaveData("a");
  };

  const sendMessage = () => {
    socket.emit("send_draw", { draw: saveData });
  };

  const handleCanvasChange = () => {
    const saveData = getImg();
    setSaveData(saveData);
    sendMessage();
  };

  const props = {
    ...defaultProps,
    className: classNames("canvas"),
    onChange: handleCanvasChange,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
  };
  return (
    <>
      {" "}
      <h1>Draw the word!</h1>
      <CanvasDraw {...props} />
      <div className="Button-container">
        <div ref={paletteRef} className="picker-container">
          <Button
            className="palette"
            onClick={() => {
              setShowColor((s) => !s);
            }}
          >
            <span role="img" aria-label="">
              🎨
            </span>{" "}
            color
          </Button>
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
        <Button
          className="undo"
          onClick={() => {
            canvasRef.current.undo();
          }}
        >
          <span role="img" aria-label="">
            ↩️
          </span>{" "}
          undo
        </Button>
        <Button className="clear" onClick={handleClear}>
          <span className="non-hover" role="img" aria-label="">
            💣
          </span>{" "}
          <span className="hover" role="img" aria-label="">
            🧨
          </span>{" "}
          clear
        </Button>
        <Button className="clear" onClick={handleOnClick}>
          Send
        </Button>
      </div>
    </>
  );
}

export default DrawBoard;
