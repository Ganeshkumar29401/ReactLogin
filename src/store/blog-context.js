import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BlogContext = React.createContext({
  isShown: false,
  setIsShown: () => {},
  blogId: "",
  setBlogId: () => {},
  listArr: [],
  setListArr: () => {},
  addListArr: (list) => {},
  deleteListArr: (id) => {},
  fetchListData: () => {},
  signUp: (email, pass) => {},
  login: () => {},
});

const ContextProvider = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [listArr, setListArr] = useState([]);
  const [blogId, setBlogId] = useState("");
  const navigate = useNavigate();
  const addBlog = async (listObj) => {
    setIsShown(true);
    const BLOG_URI = `${process.env.REACT_APP_PROTOCAL}://${process.env.REACT_APP_BACKEND}/blogs.json`;
    try {
      const bodyData = listObj;
      const requestPayload = {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      };
      const response = await (await fetch(BLOG_URI, requestPayload)).json();
      console.log(response);
      setIsShown(false);
    } catch (error) {
      console.log(error);
    }
    navigate("/blogs", { replace: false });
  };
  const removeList = async (id) => {
    console.log(listArr);
    setIsShown(true);
    const BLOG_URI = `${process.env.REACT_APP_PROTOCAL}://${process.env.REACT_APP_BACKEND}/blogs/${id}.json`;
    try {
      const requestPayload = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      };
      const response = await (await fetch(BLOG_URI, requestPayload)).json();
      console.log(response);
      setIsShown(false);
    } catch (error) {
      console.log(error);
    }
    navigate("/blogs", { replace: false });
  };
  const fetchListData = async () => {
    setIsShown(true);
    const domain = process.env.REACT_APP_PROTOCAL;
    const url = process.env.REACT_APP_BACKEND;
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
      setListArr(listArr);
      setIsShown(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUp = async (emailValue, passValue) => {
    console.log(process.env.REACT_APP_API_KEY);
    const requestBody = {
      email: emailValue,
      password: passValue,
      returnSecureToken: true,
    };
    const requestPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    try {
      const request = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
        requestPayload
      );
      if (!request.ok) {
        throw new Error("Something went wrong");
      }
      const data = await request.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async(emailValue,passValue) => {
    console.log(process.env.API_KEY)
    const requestBody = {
      email: emailValue,
      password: passValue,
      returnSecureToken: true,
    };
    const requestPayload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };
    try {
      const request = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        requestPayload
      );
      if (!request.ok) {
        throw new Error("Something went wrong");
      }
      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    navigate('/blogs', {replace:true});
  };
  const initialValue = {
    isShown,
    setIsShown,
    blogId,
    setBlogId,
    listArr,
    setListArr,
    addListArr: addBlog,
    deleteListArr: removeList,
    fetchListData,
    signUp,
    login,
  };
  return (
    <BlogContext.Provider value={initialValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default ContextProvider;
