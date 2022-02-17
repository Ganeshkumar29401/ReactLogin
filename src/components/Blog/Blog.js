import { useEffect, useContext } from "react";
import classes from "./Blog.module.css";
import BlogList from "./BlogList";
import { BlogContext } from "../../store/blog-context";
import Loader from "../UI/Loader";
import EmptyBlog from "./EmptyBlog";
const Blog = (props) => {
  const {isShown,fetchListData,listArr} = useContext(BlogContext);
  useEffect(() => {
    fetchListData();
  },[]);
  return (
    <ul className={classes.lists}>
      {isShown && <Loader />}
      {listArr.length===0 && !isShown && <EmptyBlog/>}
      {!isShown &&
        listArr.map((ele) => (
            <BlogList
              key={ele.id}
              id={ele.id}
              title={ele.title}
              description={ele.description}
              author={ele.author}
            />
          ))}
    </ul>
  );
};

export default Blog;
