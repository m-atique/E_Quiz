'use client'
import React from 'react'
import Tilt from "react-parallax-tilt";


const Card = (props)=>{
return(
    <Tilt className='w-[30%] h-[45%] bg-qwhite bg-opacity-25 border border-qwhite rounded-md flex flex-col items-center justify-between p-5 ' >

  < props.icon size={50} color='white' />
  <h1 className='text-2xl font-sans  ' style={{textShadow:'2px 2px 2px black'}}>{props.info}</h1>
 
  </Tilt>
)
}

export default Card