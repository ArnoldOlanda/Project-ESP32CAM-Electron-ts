import { initialState } from "@/interfaces";
import { createContext, useReducer } from "react";
import storeReducer, { getInitialValue } from "./StoreReducer";
interface Icontext{
    store:initialState;
    dispatch: (action:object) => void | null;
}

const initialStore= {
    user:   getInitialValue("user", ''),
    id: getInitialValue("id",''),
    actualHost: getInitialValue("actualHost", ''),
    cameras: getInitialValue("cameras", []),
    token: getInitialValue("token", ''),
    users: getInitialValue("users", []),
    type: getInitialValue("type", false),
}
const initialContext = {
    store: initialStore,
    dispatch: (action:object) => {},
}




const StoreContext = createContext<Icontext>(initialContext);

const StoreProvider = ({ children }:any) =>{
    const [store,dispatch] = useReducer(storeReducer, initialStore);

    const dispatchFunction = ( action:object ) => {
        dispatch( action )
    }


    return(
        <StoreContext.Provider value={{
            dispatch: dispatchFunction,
            store,
        }}>
            { children }
        </StoreContext.Provider>
    )
}

export {StoreContext}
export default StoreProvider;
