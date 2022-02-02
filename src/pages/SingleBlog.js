import BlogDetails from "../components/Blog/BlogDetails";
import { useParams } from "react-router-dom";
const SingleBlog = () => {
  const { blogid } = useParams();
  return <BlogDetails BlogId={blogid}/>;
};

export default SingleBlog;
