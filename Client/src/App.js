import { Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { WordChoosing } from "./pages/WordChoosing";
import Drawing from "./pages/Drawing/Drawing";
import Header from "./components/header/header";
import MainAnimation from "./components/background/MainAnimation";

import { EndGame } from "./pages/EndGame";
import { AppWrap } from "./AppStyle";

export default function App() {
  return (
    <AppWrap>
      <>
        <Header />
        <MainAnimation />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/WordChoosing" element={<WordChoosing />} />
          <Route path="/Drawing" element={<Drawing />} />
          <Route path="/end-game" element={<EndGame />} />
        </Routes>{" "}
      </>
    </AppWrap>
  );
}
