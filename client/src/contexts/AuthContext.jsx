import { useContext } from "react"
import { createContext, useState } from "react"

const userContext = createContext()

const AuthContext = ({children}) => {

    const [user,setUser] = useState([])
    console.log(user);
    

  return (
    <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext) 
export default AuthContext