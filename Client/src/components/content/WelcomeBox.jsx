import NaviButton from "./NaviButton";
import Typography from "@mui/material/Typography";
import BestScore from "./BestScore";
import Box from "@mui/material/Box";

function WelcomeBox() {

    return (

        <Box className= "cont"
      
      >
          <h3 >Welcome View</h3>
          <br></br>
          <Box >
            <NaviButton  name="New Game" path="WordChoosing"></NaviButton>
            <BestScore></BestScore>
          </Box>
        </Box>
      )}


    export default WelcomeBox

