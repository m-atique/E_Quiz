import React from 'react'

const UserHome = () => {
  return (
    <div className="flex gap-4 mt-6">
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow w-1/2">
      <p className="font-semibold text-lg">Total Added MCQs:</p>
      <p className="text-2xl">9</p>
    </div>
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow w-1/2">
      <p className="font-semibold text-lg">Total Deleted MCQs:</p>
      <p className="text-2xl">12</p>
    </div>
  </div>
  
  )
}

export default UserHome