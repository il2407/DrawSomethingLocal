import React from "react";
import { HeaderWrap } from "./headerStyles";
import NaviButton from "../content/NaviButton";

function Header() {
  return (
    <HeaderWrap>
      <h1>Draw Something 🖌🖌🖌</h1>
      <NaviButton name="Home Screen" path=""></NaviButton>
      <span role="img" aria-label=""></span>{" "}
    </HeaderWrap>
  );
}
export default Header;
