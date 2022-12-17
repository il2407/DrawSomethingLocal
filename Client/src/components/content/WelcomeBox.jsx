import NaviButton from "./NaviButton";
import Typography from "@mui/material/Typography";
import BestScore from "./BestScore";
import Box from "@mui/material/Box";
import "./WelcomeBoxStyle.css";

function WelcomeBox() {

    return (

        <Box className= "boxWrap" >
          <h3 >Welcome View</h3>
          <br></br>
          
            <NaviButton  name="New Game" path="WordChoosing"></NaviButton>
            <NaviButton  name="Join Game" path="Drawing"></NaviButton>
            <BestScore></BestScore>
        </Box>

        
      )}


    export default WelcomeBox

