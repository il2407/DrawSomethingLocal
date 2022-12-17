import NaviButton from "./NaviButton";
import {randomWordByLength,randomWordByMinLength,randomWordByRange} from "../../utils/WordGenerator";
import Box from "@mui/material/Box";
import "./style.css";


function WordList(props) {


  const easyWord = randomWordByRange (3,4);
  const mediumWord = randomWordByLength(4);
  const hardWord = randomWordByMinLength(6);

  return (
    <Box  >
          <h3>Choose Word </h3>
          <Box className="boxWrap" >
          <NaviButton name={easyWord} path="Drawing" points={1}></NaviButton>
          <NaviButton name={mediumWord} path="Drawing" points={3}></NaviButton>
          <NaviButton name={hardWord} path="Drawing" points={5}></NaviButton>
          </Box>
          <br></br>
          <NaviButton name="End Game" path="end-game"></NaviButton>
    </Box>
  );
}

export default WordList;
