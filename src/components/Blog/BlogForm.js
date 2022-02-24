import { useContext, Fragment } from "react";
import useInput from "../../hooks/use-input";
import classes from "./BlogForm.module.css";
import { BlogContext } from "../../store/blog-context";
import Loader from "../UI/Loader";
const BlogForm = (props) => {
  const { isShown, addListArr } = useContext(BlogContext);
  let formIsValid = false;
  const {
    value: enteredTitle,
    isValid: titleIsValid,
    isInvalid: titleIsInvalid,
    BlurHandler: titleBlurHandler,
    Changehandler: titleChangeHandler,
    resetHandler: titleResetHandler,
  } = useInput((val) => val.trim().length !== 0);

  const {
    value: enteredAuthor,
    isValid: authorIsValid,
    isInvalid: authorIsInvalid,
    BlurHandler: authorBlurHandler,
    Changehandler: authorChangeHandler,
    resetHandler: authorResetHandler,
  } = useInput((val) => val.trim().length !== 0);

  const {
    value: enteredDes,
    isValid: desIsValid,
    isInvalid: desIsInvalid,
    BlurHandler: desBlurHandler,
    Changehandler: desChangeHandler,
    resetHandler: desResetHandler,
  } = useInput((val) => val.trim().length !== 0);

  if (titleIsValid && authorIsValid && desIsValid) {
    formIsValid = true;
  }

  const formClickHandler = async (event) => {
    event.preventDefault();
    if (!titleIsValid && !authorIsValid && !desIsValid) {
      return;
    }
    addListArr(
      {
        title: enteredTitle,
        des: enteredDes,
        author: enteredAuthor,
      }
    );
    titleResetHandler();
    authorResetHandler();
    desResetHandler();
  };
  return (
    <Fragment>
      {isShown && <Loader />}
      <form className={classes.formWrapper} autoComplete="off">
        <div className={classes.fields}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={enteredTitle}
            onBlur={titleBlurHandler}
            onChange={titleChangeHandler}
            id="title"
          />
          {titleIsInvalid && (
            <p className={classes.error_text}>Title can't be empty</p>
          )}
          <label htmlFor="author">Author</label>
          <input
            type="text"
            value={enteredAuthor}
            onChange={authorChangeHandler}
            onBlur={authorBlurHandler}
            id="author"
          />
          {authorIsInvalid && (
            <p className={classes.error_text}>Author can't be empty</p>
          )}
          <label htmlFor="des">Description</label>
          <textarea
            type="text"
            id="des"
            onChange={desChangeHandler}
            value={enteredDes}
            onBlur={desBlurHandler}
          />
          {desIsInvalid && (
            <p className={classes.error_text}>Description can't be empty</p>
          )}
        </div>
        <div className={classes.form_actions}>
          <button onClick={formClickHandler} disabled={!formIsValid}>
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              titleResetHandler();
              authorResetHandler();
              desResetHandler();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default BlogForm;
