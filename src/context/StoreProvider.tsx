import { createContext, useReducer } from "react";
import { IconContext } from "react-icons/lib";
import storeReducer, { getInitialValue } from "./StoreReducer";

export interface initialState{
    user?: string;
    actualHost?: string;
    cameras: object[];
    token?: string;
    users?: object[];
    type?: boolean;
}

interface Icontext{
    store:initialState;
    dispatch?: any;
}

const initialStore= {
    user:   getInitialValue("user", ''),
    actualHost: getInitialValue("actualHost", ''),
    cameras: getInitialValue("cameras", []),
    token: getInitialValue("token", ''),
    users: getInitialValue("users", []),
    type: getInitialValue("type", false),
}
const initialContext = {
    store: initialStore,
}

const StoreContext = createContext<Icontext>(initialContext);

const StoreProvider = ({children}:any) =>{
    const [store,dispatch] = useReducer(storeReducer, initialStore);

    return(
        <StoreContext.Provider value={{store,dispatch} }>
            {children}
        </StoreContext.Provider>
    )
}

export {StoreContext}
export default StoreProvider;