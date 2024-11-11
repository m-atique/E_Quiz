'use client'
import {useState,useEffect,useContext,createContext} from 'react'
import axios from 'axios'



const CourseContext = createContext()

//==========creating custom hook for coureses
export const useCourses = ()=> useContext(CourseContext)







export const CourseProvider =({children})=>{
    const [courses,setCourses] = useState([])


    //================data fetxhing 

    const getCourses = async()=>{
        try {
           
            const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/courses`)
           
            if (response.data.length>0) {
                setCourses(response.data);
              } else {
                console.error("Unexpected response status:", response.status);
              }
        } catch (error) {
            console.log("coureses Data error>>>>>>>>>>>",error)
        }
       
    }


    const addCourses = (newCourse)=>{
        setCourses((prevCourses)=>[...prevCourses,newCourse])
    }


    useEffect(()=>{getCourses()},[])


    return (
        <CourseContext.Provider value ={{courses,addCourses}}>
            {children}
        </CourseContext.Provider >
    )
}

