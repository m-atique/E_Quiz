import React from 'react'

export const SbMain = ({ children }) => {
  return (
    <main
  className="  p-0  m-0 bg-[url('/formbg.jpg')] bg-cover h-screen   font-semibold font-roboto "
  style={{ backgroundSize: "100% 100%" }}
>
 { children }   
</main>
  )
}
