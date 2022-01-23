import React from "react";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <header className={classes.header}>
      <h2>{props.heading}</h2>
      <div className={classes.actions}>
        <button type="button" onClick={() => props.onAction('SignIn')}>
          Log in
        </button>
        <button type="button" onClick={() => props.onAction('SignUp')}>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default React.memo(Header);
