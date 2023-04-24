import React, { createContext, useState } from 'react'

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();
export const LoginContext = createContext("");

const ContextProvider = ({ children }) => {

    const [useradd, setUseradd] = useState("");
    const [update, setUpdate] = useState("");
    const [deletedata, setDLtdata] = useState("");

    const [logindata,setLoginData] = useState("");


    return (
        <>
        <LoginContext.Provider value={{logindata,setLoginData}}>
            <addData.Provider value={{ useradd, setUseradd }}>
                 <updateData.Provider value={{ update, setUpdate }}>
                    <dltdata.Provider value={{deletedata, setDLtdata}}>
                        {children}
                     </dltdata.Provider>
                </updateData.Provider> 
            </addData.Provider>
            </LoginContext.Provider>
        </>
    )
}

export default ContextProvider

