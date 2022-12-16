import NaviButton from "./NaviButton";
import { Box } from "@mui/material";

function EndGameBox(props) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>Your Score is : {props.score}</Box>
      <Box sx={{ flexGrow: 1 }}> {`The Game took ${props.time} seconds`}</Box>
      <br></br>
      <NaviButton name="New Game" path=""></NaviButton>
    </>
  );
}

export default EndGameBox;