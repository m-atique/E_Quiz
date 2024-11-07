'use client'
import {useState,useEffect,useContext,createContext} from 'react'
import axios from 'axios'



const SubjectContext = createContext()

//==========creating custom hook for coureses
export const useSubjects = ()=> useContext(SubjectContext)







export const SubjectProvider =({children})=>{
    const [subjects,setSubjects] = useState([])


    //================data fetxhing 

    const getSubjects = async()=>{
        try {
           
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/subjects`)
           
            if (response.data.length>0) {
                setSubjects(response.data);
              } else {
                console.error("Unexpected response status:", response.status);
              }
        } catch (error) {
            console.log("coureses Data error>>>>>>>>>>>",error)
        }
       
    }


    const addSubjects = (newSubject)=>{
        setSubjects((prevSubjects)=>[...prevSubjects,newSubject])
    }


    useEffect(()=>{getSubjects()},[])


    return (
        <SubjectContext.Provider value ={{subjects,addSubjects}}>
            {children}
        </SubjectContext.Provider >
    )
}

