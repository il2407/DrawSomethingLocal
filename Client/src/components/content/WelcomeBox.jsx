import NaviButton from "./NaviButton";
import Typography from "@mui/material/Typography";
import BestScore from "./BestScore";
import Box from "@mui/material/Box";

function WelcomeBox() {

    return (

        <Box className= "boxWrap" >
          <Box>
          <h3 >Welcome View</h3>
          <br></br>
          </Box>
          <Box>
            <NaviButton  name="New Game" path="WordChoosing"></NaviButton>
            <NaviButton  name="Join Game" path="Drawing"></NaviButton>
            </Box>
            <br></br>
            <BestScore></BestScore>
        </Box>

        
      )}


    export default WelcomeBox

