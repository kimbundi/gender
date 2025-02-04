import { createContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { helpCenters } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) =>{



     const navigate = useNavigate()
     const [isAdmin, setIsAdmin] = useState(true);
     const [allData, setAllData] = useState([]);
     
     //fetch all data

     const fetchAlldata = async()=>{
        setAllData(helpCenters)
     }

     useEffect(()=>{
        fetchAlldata()

     },[])


    const value = {
        navigate,isAdmin,setIsAdmin,allData

    }
    return(
        
        <AppContext.Provider  value={value}>
            {props.children}
        </AppContext.Provider>
        
    )
}