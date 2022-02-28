import { useEffect, useContext, useState, Fragment } from "react";
import { BlogContext } from "../../store/blog-context";
import classes from "./BlogDetails.module.css";
import Loader from "../UI/Loader";

const BlogDetails = (props) => {
  const {BlogId} = props;
  const [data, setData] = useState({});
  const { setIsShown, isShown,deleteListArr } = useContext(BlogContext);
  useEffect(() => {
    setIsShown(true);
    try {
      const domain = process.env.REACT_APP_PROTOCAL;
      const url = process.env.REACT_APP_BACKEND;
      const call = async () => {
        const req = await fetch(`${domain}://${url}/blogs/${BlogId}.json`);

        if (!req.ok) {
          throw new Error("Something went wrong! please try again later");
        }
        const res = await req.json();
        setData(res);
        setIsShown(false);
      };
      call();
      
    } catch (error) {
      console.log(error.message);
    }
  }, [BlogId, setIsShown]);
  const deleteBlogHandler = () => {
    deleteListArr(BlogId);
  };
  return (  
    <Fragment>
      {isShown && <Loader />}
      {!isShown && (
        <div className={classes.wrapper}>
          <div className={classes.box}>
            <div className={classes.main_content}>
              <p>{data.des}</p>
              <span>by {data.author}</span>
            </div>
            <div className={classes.actions}>
              <button type="button" onClick={deleteBlogHandler}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BlogDetails;
