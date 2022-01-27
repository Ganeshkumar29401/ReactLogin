import { Fragment, useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/auth";
import Blog from "./components/Blog/Blog";
import Header from "./components/Navigation/Header";
import BlogForm from "./components/Blog/BlogForm";
function App() {
  const [isFormShown, setIsFormShown] = useState(false);
  const [isLoginState, setIsLoginState] = useState(false);
  const openAuthForm = useCallback((action = "SignIn") => {
    action === "SignIn" ? setIsLoginState(true) : setIsLoginState(false);
    setIsFormShown(true);
  }, []);
  const closeAuthForm = () => {
    setIsFormShown(false);
  };

  const changeLoginStateHandler = () => {
    setIsLoginState((prevState) => !prevState);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => openAuthForm(), 3000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [openAuthForm]);

  return (
    <Fragment>
      <Header heading="Trending Blog" onAction={openAuthForm} />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/addblogs" element={<BlogForm />} />
      </Routes>
      <section>
        {isFormShown && (
          <Auth
            isLogin={isLoginState}
            onChangeLoginState={changeLoginStateHandler}
            onCancel={closeAuthForm}
          />
        )}
      </section>
    </Fragment>
  );
}

export default App;
