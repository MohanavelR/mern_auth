import { createContext, useEffect, useState } from "react";
import { checkAuth, getUser } from "../services/useAuth";

 export const AppContaxt = createContext()
 export const AppContextProvider = (props) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const [isLoggedIn,setIsLoggedIn]=useState(false)
        const [userData,setUserData]=useState(false)
        /* Check user is Authendicate */
        async function getUserAuth(){
               const auth = await checkAuth()
               if(auth.is_success){
                   getUserInformation()
               }
        }
        
        const value = {
          backendUrl,
          isLoggedIn,setIsLoggedIn,
          userData,setUserData,
          getUserInformation,
          getUserAuth
        }
        
        /* Get UserInformation in Api */
         async function getUserInformation(){
              const user = await getUser()
              user.is_success ? setUserData(user.user):setUserData(false)
              user.is_success ? setIsLoggedIn(true):setIsLoggedIn(false)
        }
    
    useEffect(()=>{
      getUserAuth()
    },[])
  return (
    <AppContaxt.Provider value={value}>
        {props.children}
    </AppContaxt.Provider>
  )
}
 


