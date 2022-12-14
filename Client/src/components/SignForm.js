import {
  FormGroup,
  FormControl,
  Fab,
  InputLabel,
  Input,
  FormHelperText,
  Grid,
} from "@mui/material";
import { Form } from "react-bootstrap";

function SignForm(props) {
  const login = props.login;

  return (
    <Grid width={200} right={40}>
      <Form onSubmit={(e) => props.submitFunc(e)}>
        {/* email */}
        <FormGroup controlId="formBasicEmail">
          <FormControl onChange={(e) => props.firstFunc(e.target.value)}>
            <InputLabel htmlFor="my-input">{props.firstText}</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </FormGroup>
        <br></br>
        {/* password */}
        <FormGroup controlId="formBasicPassword">
          <FormControl onChange={(e) => props.secondFunc(e.target.value)}>
            <InputLabel htmlFor="my-input">{props.secondText}</InputLabel>
            <Input
              type={props.secondText}
              id="my-input"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text"></FormHelperText>
          </FormControl>
        </FormGroup>
        <br></br>
        {!login ? (
          <FormGroup controlId="formBasicRole">
            <FormControl onChange={(e) => props.thirdFunc(e.target.value)}>
              <InputLabel htmlFor="my-input">{props.thirdText}</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text"></FormHelperText>
            </FormControl>
          </FormGroup>
        ) : (
          <br></br>
        )}
        {/* Login button */}
        <Fab
          size="large"
          color="success"
          variant="primary"
          type="submit"
          onSubmit={(e) => props.submitFunc(e)}
          sx={{ textTransform: "none" }}
        >
          {props.buttonText}{" "}
        </Fab>
      </Form>
    </Grid>
  );
}

export default SignForm;
