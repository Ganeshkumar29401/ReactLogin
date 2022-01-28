import classes from "./Blog.module.css";
import BlogList from "./BlogList";
const DummyData = [
  {
    id: "b1",
    title: "Conditional Rendering",
    description: "Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like if or the conditional operator to create elements representing the current state, and let React update the UI to match them.",
    author: "Ganeshkumar M",
  },
  {
    id: "b2",
    title: "Why JSX?",
    description: "React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.",
    author: "User123",
  },
  {
    id: "b3",
    title: "How to use a custom hook",
    description:
      "When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section.Let’s assign a key to our list items inside numbers.map() and fix the missing key issue.",
    author: "Harley",
  },
];
const Blog = (props) => {
  return (
    <ul className={classes.lists}>
      {DummyData.map((ele) => (
        <BlogList
          key={ele.id}
          title={ele.title}
          description={ele.description}
          author={ele.author}
        />
      ))}
    </ul>
  );
};

export default Blog;
