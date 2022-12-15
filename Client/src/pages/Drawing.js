import React from "react";
import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { GithubPicker } from "react-color";
import "./drawingStyle.css";
import { useClickAway } from "../components/content/useClickAway";
import io from "socket.io-client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { colors, defaultProps } from "../utils/DrawingUtils";
import { ContentWrap } from "../components/content/contentStyles";

import { Button, Input, ButtonGroup, Box } from "@mui/material";

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);

const width = `${Math.ceil(colors.length / 2) * 32}px`;

export default function Drawing() {
  let navigate = useNavigate();

  const canvasRef = React.createRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [showColor, setShowColor] = useState(false);
  const [saveData, setSaveData] = useState("a");
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

      navigate("/WordChoosing");
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
    <ContentWrap>
      <Box className="boxWrap">
        {saveData ? (
          <Box className="boxWrap">
            {sessionStorage.getItem("player1") ? (
              <>
                <h1>Draw the word!</h1>
                <CanvasDraw {...props} />

                <div ref={paletteRef} className="picker-container">
                  <ButtonGroup
                    className="boxWrap"
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    color="success"
                  >
                    <Button
                      onClick={() => {
                        setShowColor((s) => !s);
                      }}
                    >
                      <span role="img" aria-label="">
                        🎨
                      </span>{" "}
                      color
                    </Button>

                    <Button
                      onClick={() => {
                        canvasRef.current.undo();
                      }}
                    >
                      <span role="img" aria-label="">
                        ↩️
                      </span>{" "}
                      undo
                    </Button>
                    <Button onClick={handleClear}>
                      <span role="img" aria-label="">
                        💣
                      </span>{" "}
                      clear
                    </Button>
                    <Button onClick={handleOnClick}>
                      <span role="img" aria-label="">
                        🚀
                      </span>{" "}
                      Send
                    </Button>
                  </ButtonGroup>
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
              </>
            ) : (
              <>
                <h1>Guess the word!</h1>
                <img src={saveData} alt="" />
                <Input
                  type="text"
                  placeholder="Guess the word"
                  onChange={handleTextChange}
                />
              </>
            )}
          </Box>
        ) : (
          <Box className="boxWrap">
            <br></br>
            <br></br>
            <br></br>
            <span class="toto">
              <span>==Wait for your friend to guess and draw!</span>{" "}
            </span>
          </Box>
        )}
      </Box>
    </ContentWrap>
  );
}
