import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BlogContext = React.createContext({
  isShown: false,
  setIsShown: () => {},
  isLoggedIn: false,
  setLogin: () => {},
  listArr: [],
  setListArr: () => {},
  addListArr: (list) => {},
  deleteListArr: (id) => {},
  fetchListData: () => {},
  signUp: (email, pass) => {},
  login: (email, pass) => {},
  logout:()=>{},
});

const ContextProvider = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [listArr, setListArr] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const addBlog = async (listObj) => {
    setIsShown(true);
    const domain = process.env.REACT_APP_PROTOCAL;
    const url = process.env.REACT_APP_BACKEND;
    const BLOG_URI = `${domain}://${url}/blogs.json/`;
    try {
      const bodyData = { id: userId, ...listObj };
      const requestPayload = {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" },
      };
      await (await fetch(BLOG_URI, requestPayload)).json();
      setIsShown(false);
    } catch (error) {
      console.log(error);
    }
    navigate("/blogs", { replace: false });
  };
  const removeList = async (id) => {
    setIsShown(true);
    const BLOG_URI = `${process.env.REACT_APP_PROTOCAL}://${process.env.REACT_APP_BACKEND}/blogs/${id}.json`;
    try {
      const requestPayload = {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      };
      await (await fetch(BLOG_URI, requestPayload)).json();
      navigate("/blogs", { replace: false });
      setIsShown(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchListData = async () => {
    setIsShown(true);
    const domain = process.env.REACT_APP_PROTOCAL;
    const url = process.env.REACT_APP_BACKEND;
    try {
      const request = await fetch(`${domain}://${url}/blogs.json/`);
      if (!request.ok) {
        setIsShown(false);
        throw new Error("something went wrong");
      }
      const data = await request.json();
      const listArr = [];
      for (const key in data) {
        listArr.push({
          blogId: key,
          id: data[key].id,
          title: data[key].title,
          description: data[key].des,
          author: data[key].author,
        });
      }
      const finalArr = listArr.filter(blog => blog.id === userId);
      setListArr(finalArr); 
      setIsShown(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUp = async (emailValue, passValue) => {
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
      await request.json();
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (emailValue, passValue) => {
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
    setIsShown(true);
    try {
      const request = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        requestPayload
      );
      if (!request.ok) {
        throw new Error("Something went wrong");
      }
      const responseObj = await request.json();
      setUserId(responseObj.localId);
      setIsLoggedIn(true);
      setIsShown(false);
    } catch (error) {
      console.log(error);
    }
    navigate("/blogs", { replace: true });
  };
  const logout = () => {
      setIsLoggedIn(false);
  };
  const initialValue = {
    isShown,
    setIsShown,
    isLoggedIn,
    setIsLoggedIn,
    listArr,
    setListArr,
    addListArr: addBlog,
    deleteListArr: removeList,
    fetchListData,
    signUp,
    login,
    logout,
  };
  return (
    <BlogContext.Provider value={initialValue}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default ContextProvider;
