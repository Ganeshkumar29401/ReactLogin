import { useNavigate } from 'react-router-dom';
import classes from './BlogList.module.css';

const BlogList = props => {
    const navi = useNavigate();
    return (<li onClick={()=> navi(`/blogs/${props.id}`, {replace:false})}>
        <div className={classes.main}>
            <h2>{props.title}</h2>
            <p>by {props.author}</p>
        </div>
    </li>);
};

export default BlogList;