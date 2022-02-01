import React from "react";
import { useState } from "react";

export const BlogContext = React.createContext({
    isShown:false,
    setIsShown : ()=>{},
});


const ContextProvider=(props)=>{
    const [isShown, setIsShown] = useState(false);
    const initialValue = {
        isShown,
        setIsShown
    };
    return <BlogContext.Provider value={initialValue}>
        {props.children}
    </BlogContext.Provider>
};

export default ContextProvider;

