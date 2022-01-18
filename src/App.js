import { Fragment, useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
function App() {
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const findWhichComponentIsSet = useCallback((nameOfComponent) => {
    console.log("callback callibg");
    if (nameOfComponent === "SignIn") {
      setIsSignInClicked(true);
      setIsFormShown(true);
      setIsSignUpClicked(false);
    }
    if (nameOfComponent === "SignUp") {
      setIsSignUpClicked(true);
      setIsSignInClicked(false);
      setIsFormShown(true);
    }
  },[]);

  const closeForm = () => {
    setIsFormShown(false);
  };

  useEffect(() => {
    const timer = setTimeout(()=>findWhichComponentIsSet("SignIn"), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [findWhichComponentIsSet]);

  return (
    <Fragment>
      <Header heading="Trending Blog" onSet={findWhichComponentIsSet} />
      <section>
        {isSignInClicked && isFormShown && (
          <SignIn onCancel={closeForm} onSwitch={findWhichComponentIsSet} />
        )}
        {isSignUpClicked && isFormShown && (
          <SignUp onCancel={closeForm} onSwitch={findWhichComponentIsSet} />
        )}
      </section>
    </Fragment>
  );
}

export default App;
