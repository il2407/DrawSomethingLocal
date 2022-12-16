import NaviButton from "./NaviButton";
import randomWordByLength from "../../utils/WordGenerator";
import Box from "@mui/material/Box";


// Custom component that gets:
// Data of the names of the buttons in the list
// field of the exact data that you want to be on the button
// Modal which is a boolean argument to set if it's a modal button or not
// Path of the button to navigate to
// ModalData of the names of the modal buttons in the list
// Subject for the headline of the list

function WordList(props) {


  const easyWord = randomWordByLength (3);
  const mediumWord = randomWordByLength(4);
  const hardWord = randomWordByLength(5);

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
