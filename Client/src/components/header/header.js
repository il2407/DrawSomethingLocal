import React from "react";
import NaviButton from "../content/NaviButton";
import Box from "@mui/material/Box";
import { HeaderWrap } from "./headerStyles";
import "../content/style.css";

function Header() {
  return (
    <HeaderWrap>
      <Box className="boxWrap">
        <h1>Draw Something 🖌🖌</h1>
        <span role="img" aria-label=""></span>{" "}
        <NaviButton name="Home Screen" path=""></NaviButton>
      </Box>
    </HeaderWrap>
  );
}
export default Header;
