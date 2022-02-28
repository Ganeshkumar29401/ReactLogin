import React from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useContext } from "react";
import { BlogContext } from "../../store/blog-context";
const Header = (props) => {
  const {isLoggedIn,logout} = useContext(BlogContext);
  return (
    <header className={classes.header}>
      <Link to="/blogs" className={classes.heading}>{props.heading}</Link>
      {isLoggedIn && <div className={classes.navigation}>
        <NavLink className={({isActive}) => (isActive ? classes.active : "")} to='/blogs'>
          Blogs
        </NavLink>
        <NavLink className={({isActive}) => (isActive ? classes.active : "")} to='/addblogs'>
          Add Blogs
        </NavLink>
      </div>}
      <div className={classes.actions}>
        {!isLoggedIn && <button type="button" onClick={() => props.onAction("SignIn")}>
          Sign in
        </button>}
        {!isLoggedIn && <button type="button" onClick={() => props.onAction("SignUp")}>
          Sign up
        </button>}
        {isLoggedIn && <button type="button" onClick={logout}>
          Log out
        </button>}
      </div>
    </header>
  );
};

export default React.memo(Header);
