import { Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { WordChoosing } from "./pages/WordChoosing";
import Drawing from "./pages/Drawing";
import Header from "./components/header/header";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { EndGame } from "./pages/EndGame";
import { AppWrap } from "./AppStyle";

export default function App() {
  return (
    <AppWrap>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/WordChoosing" element={<WordChoosing />} />
        <Route path="/Drawing" element={<Drawing />} />
        <Route path="/end-game" element={<EndGame />} />
      </Routes>{" "}
    </AppWrap>
  );
}
