import { Fragment, useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/auth";
import MainAction from "./components/Main/MainAction";
import Header from "./components/Navigation/Header";
function App() {
  const [isFormShown, setIsFormShown] = useState(false);
  const [isLoginState, setIsLoginState] = useState(false);
  const openAuthForm = (action= 'SignIn') => {
    action === "SignIn" ? setIsLoginState(true) : setIsLoginState(false);
    setIsFormShown(true);
  };
  const closeAuthForm = () => {
    setIsFormShown(false);
  };

  const changeLoginStateHandler = ()=>{
    setIsLoginState((prevState) => !prevState)
  }

  useEffect(() => {
    const timer = setTimeout(() => openAuthForm(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Fragment>
      <Header heading="Trending Blog" onAction={openAuthForm} />
      <MainAction />
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
