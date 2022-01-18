import classes from "./SignIn.module.css";
import logoImg from "../assests/signIn.jpg";
import useInput from "../hooks/use-input";
import Modal from "./UI/Modal";
const SignIn = (props) => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    isInvalid: emailHasError,
    Changehandler: emailChangeHandler,
    BlurHandler: emailBlurHandler,
    resetHandler: emailResetHandler,
  } = useInput((val) => val.trim().includes("@"));

  const {
    value: enteredPass,
    isValid: passIsValid,
    isInvalid: passHasError,
    Changehandler: passChangeHandler,
    BlurHandler: passBlurHandler,
    resetHandler: passResetHandler,
  } = useInput((val) => val.trim().length > 7);

  let formIsValid = false;

  if (emailIsValid && passIsValid) {
    formIsValid = true;
  }
  const emailClass = emailHasError
    ? `${classes.inputControl} ${classes.invalid}`
    : `${classes.inputControl}`;
  const passClass = passHasError
    ? `${classes.inputControl} ${classes.invalid}`
    : `${classes.inputControl}`;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (emailHasError && passHasError) {
      return;
    }
    console.log(enteredEmail, enteredPass);
    emailResetHandler();
    passResetHandler();
    props.onCancel();
  };

  return (
    <Modal onCancel ={props.onCancel}>
      <div className={classes.image}>
        <img src={logoImg} alt="img" />
        <hr />
      </div>
      <form className={classes.form}>
        <div className={emailClass}>
          <label htmlFor="email">Email</label>
          <input
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="email"
            id="email"
          />
          {emailHasError && (
            <p className={classes.errorText}>Enter a valid email</p>
          )}
        </div>
        <div className={passClass}>
          <label htmlFor="pass">Password</label>
          <input
            value={enteredPass}
            onChange={passChangeHandler}
            onBlur={passBlurHandler}
            type="password"
            id="pass"
          />
          {passHasError && (
            <p className={classes.errorText}>
              Password must contain 8 characters
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button onClick={formSubmitHandler} disabled={!formIsValid}>
            SignIn
          </button>
        </div>
        <div className={classes.switchSignup}>
          <p>
            Don't have an account ?
            <span
              onClick={() => {
                props.onSwitch("SignUp");
              }}
            >
              SignUp
            </span>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default SignIn;
