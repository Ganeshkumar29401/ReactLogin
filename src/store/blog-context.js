import React from "react";
import { useState } from "react";

export const BlogContext = React.createContext({
    isShown:false,
    setIsShown : ()=>{},
    items : [],
    addItem : (obj)=>{},
    removeItem: (id)=>{},
});


const ContextProvider=(props)=>{
    const [isShown, setIsShown] = useState(false);
    const addItem = obj => {};
    const removeItem = id =>{};
    const initialValue = {
        isShown,
        setIsShown,
        addItem,
        removeItem,
    };
    return <BlogContext.Provider value={initialValue}>
        {props.children}
    </BlogContext.Provider>
};

export default ContextProvider;

