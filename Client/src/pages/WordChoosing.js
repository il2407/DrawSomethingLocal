import { Box } from "@mui/material";
import WordList from "../components/content/WordList";
import { ContentWrap } from "../components/content/contentStyles";

export function WordChoosing() {
  return (
    <ContentWrap>
      <Box>
        <WordList />
      </Box>
    </ContentWrap>
  );
}
