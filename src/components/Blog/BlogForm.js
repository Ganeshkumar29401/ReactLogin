import classes from "./BlogForm.module.css";
const BlogForm = (props) => {
  return (
    <div className={classes.form}>
    <div className={classes.formWrapper}>
      <div className={classes.fields}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
        <label htmlFor="author">Author</label>
        <input type="text" id="author" />
        <label htmlFor="des">Description</label>
        <textarea type="text" id="des" />
      </div>
      <div className={classes.form_actions}>
        <button type="button">Add</button>
        <button type="button">Cancel</button>
      </div>
    </div>
    </div>
  );
};

export default BlogForm;
