import useInput from "../../hooks/use-input";
import classes from "./BlogForm.module.css";
import { useNavigate } from "react-router-dom";
const BlogForm = (props) => {
  let formIsValid = false;
  const navigate = useNavigate();
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
    titleResetHandler();
    authorResetHandler();
    desResetHandler();
    const BLOG_URI = `${process.env.REACT_APP_PROTOCAL}://${process.env.REACT_APP_BACKEND}/blogs.json`;
    try {
      const bodyData = {
        title: enteredTitle,
        des: enteredDes,
        author: enteredAuthor,
      };
      const requestPayload = {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      };
      const response = await (await fetch(BLOG_URI, requestPayload)).json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate("/blogs", { replace: false });
  };
  return (
    <form className={classes.formWrapper}>
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
  );
};

export default BlogForm;
