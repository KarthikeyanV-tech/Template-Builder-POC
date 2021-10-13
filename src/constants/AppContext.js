import React from 'react';

const AppContext = React.createContext({
    access_token: "",
    theme: "dark"
});
export default AppContext;