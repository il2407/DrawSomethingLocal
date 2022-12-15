import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
// Custom component that gets:
// Name of the Button
// Path to navigate to
// Type of the button

function NaviButton(props) {
  let navigate = useNavigate();
  const [currPath, setCurrPath] = useState(`/${props.path}`);

  const handleOnClick = () => {
    if (props.name === "New Game") {
      localStorage.setItem("time", performance.now());
      navigate(currPath);
    } else {
      localStorage.setItem("word", props.name);
      localStorage.setItem("points", props.points);
      navigate(currPath);
    }
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
