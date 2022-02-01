import { useNavigate } from "react-router-dom";
import classes from "./BlogList.module.css";

const BlogList = (props) => {
  const navi = useNavigate();
  return (
    <li
      className={classes.main}
      onClick={() => navi(`/blogs/${props.id}`, { replace: false })}
    >
      <div>
        <h2>{props.title}</h2>
      </div>
    </li>
  );
};

export default BlogList;
