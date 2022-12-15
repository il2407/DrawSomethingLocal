import NaviButton from "./NaviButton";
import { List } from "@mui/material";
import { useState } from "react";
var randomWords = require("random-words");

// Custom component that gets:
// Data of the names of the buttons in the list
// field of the exact data that you want to be on the button
// Modal which is a boolean argument to set if it's a modal button or not
// Path of the button to navigate to
// ModalData of the names of the modal buttons in the list
// Subject for the headline of the list

function WordList(props) {
  const easyWord = randomWords({ exactly: 1, maxLength: 3 });
  const mediumWord = randomWords({ exactly: 1, maxLength: 4 });
  const hardWord = randomWords({ exactly: 1 });

  return (
    <List>
      <ul className="list-items">
        <h4>Choose Word </h4>
        <NaviButton name={easyWord} path="Drawing" points={1}></NaviButton>
        <NaviButton name={mediumWord} path="Drawing" points={3}></NaviButton>
        <NaviButton name={hardWord} path="Drawing" points={5}></NaviButton>
        <br></br>
        <NaviButton name="End Game" path="end-game"></NaviButton>
      </ul>
    </List>
  );
}

export default WordList;
