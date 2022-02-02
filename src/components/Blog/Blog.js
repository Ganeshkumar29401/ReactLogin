import { useEffect, useContext, useState } from "react";
import classes from "./Blog.module.css";
import BlogList from "./BlogList";
import { BlogContext } from "../../store/blog-context";
import Loader from "../UI/Loader";
const Blog = (props) => {
  const [blogList, setBlogList] = useState([]);
  const context = useContext(BlogContext);
  useEffect(() => {
    context.setIsShown(true);
    const domain = process.env.REACT_APP_PROTOCAL;
    const url = process.env.REACT_APP_BACKEND;
    const getData = async () => {
      try {
        const request = await fetch(`${domain}://${url}/blogs.json`);
        if (!request.ok) {
          throw new Error("something went wrong");
        }
        const data = await request.json();
        const listArr = [];

        for (const key in data) {
          listArr.push({
            id: key,
            title: data[key].title,
            description: data[key].des,
            author: data[key].author,
          });
        }
        setBlogList(listArr);
        context.setIsShown(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  },[]);
  return (
    <ul className={classes.lists}>
      {context.isShown && <Loader />}
      {!context.isShown &&
        blogList.map((ele) => (
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
