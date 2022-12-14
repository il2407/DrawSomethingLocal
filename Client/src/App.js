import { Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { WordChosing } from "./pages/WordChosing";
import Drawing from "./pages/Drawing";
import { Waiting } from "./pages/Waiting";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5, justifyContent: "center" }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/WordChosing" element={<WordChosing />} />
          <Route path="/Drawing" element={<Drawing />} />
          <Route path="/Waiting" element={<Waiting />} />
        </Routes>{" "}
      </Box>
    </Container>
  );
}
