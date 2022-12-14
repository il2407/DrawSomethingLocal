import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { useEffect, useState } from "react";
// Custom component that gets:
// Name of the Button
// Path to navigate to
// Type of the button

function NaviButton({ name, path, points }) {
  let navigate = useNavigate();
  const [currPath, setCurrPath] = useState(`/${path}`);

  const handleOnClick = () => {
    localStorage.setItem("word", name);
    localStorage.setItem("points", points);
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
        {name}{" "}
      </Fab>
      <br></br>
    </>
  );
}

export default NaviButton;
