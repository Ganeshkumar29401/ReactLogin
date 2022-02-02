import { useState, Fragment, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/auth";
import Blogs from "./pages/Blogs";
import Header from "./components/Navigation/Header";
import AddBlog from "./pages/AddBlog";
import SingleBlog from "./pages/SingleBlog";

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

  return (
    <Fragment>
      <Header heading="Trending Blog" onAction={openAuthForm} />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:blogid" element={<SingleBlog />} />
        <Route path="/addblogs" element={<AddBlog />} />
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
