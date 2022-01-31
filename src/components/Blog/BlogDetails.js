import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./BlogDetails.module.css";

const BlogDetails = (props) => {
  const [data, setData] = useState({});
  const { blogid } = useParams();
  console.log(blogid);
  useEffect(() => {
    const call = async () => {
      const req = await fetch(
        `https://react-practice-9dea2-default-rtdb.firebaseio.com/blogs/${blogid}.json`
      );
      const res = await req.json();
      setData(res);
    };
    call();
  }, [blogid]);
  return (
    <div className={classes.wrapper}>
      <div className={classes.main_content}>
        <p>{data.des}</p>
        <span>by {data.author}</span>
      </div>
    </div>
  );
};

export default BlogDetails;
