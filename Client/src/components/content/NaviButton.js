import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { useState } from "react";
import {
  getGameData,
  createGameData,
  updateGameData,
} from "../../utils/gameDataRequest";

function NaviButton(props) {
  let navigate = useNavigate();
  const [currPath, setCurrPath] = useState(`/${props.path}`);
  const BASE_URL = process.env.REACT_APP_API_KEY;

  const postData = async () => {
    console.log("postData");
    await createGameData(
      BASE_URL + "/game-data/createGameData",
      "",
      Date.now(),
      0,
      0
    );
  };

  const updateData = async (time, score) => {
    console.log("updateData");
    if (props.name === "New Game") {
      await updateGameData(
        BASE_URL + "/game-data/gameData",
        props.name,
        props.points,
        time,
        score
      );
    } else {
      await updateGameData(
        BASE_URL + "/game-data/gameData",
        props.name,
        props.points
      );
    }
  };

  const newDataManage = async () => {
    const { data } = await getGameData(BASE_URL + "/game-data");
    if (data.count === 0) postData();
    else updateData(Date.now(), 0);
  };

  const joinGameManage = async () => {
    window.sessionStorage.removeItem("player1");
  };

  const handleOnClick = () => {
    if (props.name === "Home Screen") navigate(currPath);
    if (props.name === "New Game") newDataManage();
    else if (props.name === "Join Game") joinGameManage();
    else updateData();
    navigate(currPath);
  };

  return (
    <>
      <Fab
        color="success"
        variant="extended"
        onClick={handleOnClick}
        sx={{ textTransform: "none" }}
      >
        {props.name}{" "}
      </Fab>
      <br></br>
    </>
  );
}

export default NaviButton;
