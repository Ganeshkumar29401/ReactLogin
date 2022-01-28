import classes from './BlogList.module.css';

const BlogList = props => {
    return (<li>
        <div className={classes.main}>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
        <div className={classes.author}>
            <p>by {props.author}</p>
        </div>
    </li>);
};

export default BlogList;