import { createContext, useContext, useState } from "react"
export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [login, setLogin] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [component, setComponent] = useState("")

    return (
        <GlobalContext.Provider value={{login, setLogin, openModal, setOpenModal, component, setComponent}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const UseGlobalContext = ()=>{
    const context = useContext(GlobalContext)
    return context
}