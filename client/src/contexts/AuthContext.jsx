import {  createContext, useContext, useState } from "react"

const  userContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthContext = ({children}) => {

    const [user,setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

  return (
    <userContext.Provider value={{user,login,logout}}>
        {children}
    </userContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(userContext)

export default AuthContext