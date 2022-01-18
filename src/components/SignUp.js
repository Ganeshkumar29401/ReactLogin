import useInput from "../hooks/use-input";
import logoImg from "../assests/signIn.jpg";
import classes from "./SignIn.module.css";
import Modal from "./UI/Modal";
const SignUp = (props) => {
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

  const {
    value: enteredRPass,
    isValid: rPassIsValid,
    isInvalid: rPassHasError,
    Changehandler: rPassChangeHandler,
    BlurHandler: rPassBlurHandler,
    resetHandler: rPassResetHandler,
  } = useInput((val) => val.trim() === enteredPass && val.trim() !== "");

  let formIsValid = false;

  if (emailIsValid && passIsValid && rPassIsValid) {
    formIsValid = true;
  }
  const emailClass = emailHasError
    ? `${classes.inputControl} ${classes.invalid}`
    : `${classes.inputControl}`;
  const passClass = passHasError
    ? `${classes.inputControl} ${classes.invalid}`
    : `${classes.inputControl}`;

  const rPassClass = rPassHasError
    ? `${classes.inputControl} ${classes.invalid}`
    : `${classes.inputControl}`;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (emailHasError && passHasError && rPassHasError) {
      return;
    }
    emailResetHandler();
    passResetHandler();
    rPassResetHandler();
    props.onSwitch('SignIn');
  };

  return (
    <Modal onCancel={props.onCancel}>
      <div className={classes.image}>
        <img src={logoImg} alt="img" />
        {/* <loginSvg /> */}
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
        <div className={rPassClass}>
          <label htmlFor="rPass">Reenter Password</label>
          <input
            value={enteredRPass}
            onChange={rPassChangeHandler}
            onBlur={rPassBlurHandler}
            type="password"
            id="rPass"
          />
          {rPassHasError && (
            <p className={classes.errorText}>
              Enter the same password as before
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button onClick={formSubmitHandler} disabled={!formIsValid}>
            SignUp
          </button>
        </div>
        <div className={classes.switchSignup}>
          <p>
            Go back
            <span
              onClick={() => {
                props.onSwitch("SignIn");
              }}
            >
              SignIn
            </span>
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
