

export const BlogContext = React.createContext({
    items:[],
    addItems: ()=>{},
    removeItems : (id) => {},
});


const ContextProvider=()=>{
    return <BlogContext.Provider value={}>

    </BlogContext.Provider>
};

