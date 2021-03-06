import { useEffect, useContext } from "react";
import classes from "./Blog.module.css";
import BlogList from "./BlogList";
import { BlogContext } from "../../store/blog-context";
import Loader from "../UI/Loader";
import EmptyBlog from "./EmptyBlog";
const Blog = (props) => {
  const { isShown, fetchListData, listArr, isLoggedIn } =
    useContext(BlogContext);
  useEffect(() => {
      fetchListData();
  }, []);
  return (
    <ul className={classes.lists}>
      {isShown&& <Loader />}
      {listArr.length === 0 && !isShown && isLoggedIn && <EmptyBlog />}
      {!isShown &&
        isLoggedIn &&
        listArr.length > 0 &&
        listArr.map((ele) => (
          <BlogList
            key={ele.blogId}
            blogParams = {ele.blogId}
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
