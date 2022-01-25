import classes from './MainAction.module.css'; 
const MainAction = props => {
    return <section className={classes.main}>
        <div className={classes.actions}>
            <button>Add Blog</button>
            <button>Hide Blogs</button>
        </div>
        <ul className={classes.lists}>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
            <li>Something</li>
            <li>other</li>
        </ul>
    </section>
};

export default MainAction;