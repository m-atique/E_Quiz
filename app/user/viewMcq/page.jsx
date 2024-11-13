'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const DataTable = () => {

  const { data: sessionData } = useSession();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //console.log("------------------",  sessionData.user.role)
var count =1, serial = 1;

  useEffect(() => {
    getQuestions()
    
   }, []);

   async function getQuestions() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank`)
    // Set data and stop the loading state
    //console.log("------------", response)
    setData(response.data);
    setLoading(false);
   }

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }
  
async function deleteQuestion(id) {
   // console.log("-----------", id)
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank/${id}`)
    // Set data and stop the loading state
    //console.log("------------", response)
    //setData(response.data);
   // setLoading(false);
alert("deleted.............")
}
  return (
    <div style={{ padding: '20px' }}>
      <h2> MCQs</h2>
      <div className='flex min-w-full overflow-x-scroll overflow-auto  p-2 '>

      
      <table className='min-w-[900px] bg-gray-50'>
        <thead >
          <tr className='bg-blue-900 text-white border-2 border-blue-900' >
            <th style={styles.tableHeader} className='w-28'>Sr #</th>
            <th style={styles.tableHeader} className='w-40'>Date</th>
            <th style={styles.tableHeader} className='w-80'>Course</th>
            
            <th style={styles.tableHeader} className='w-96'>Questions</th>
            <th style={styles.tableHeader} className='w-96'>Answers</th>
            <th style={styles.tableHeader} className='w-60'>Added By</th>
            <th style={styles.tableHeader} className='w-32'><span className=''> Action</span></th>
            
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td style={styles.tableCell} className='w-28 text-center'>{`${count++}`}</td>
              <td style={styles.tableCell} className='w-40'>{item.date.split(" ")[0].split("-").reverse().join("-")}</td>
              <td style={styles.tableCell} className='w-80'>
              <span> <b>Subject :</b></span> {item.subject_name} <span> <br/><br/></span>
              {item.courses.map((course, i) => (
    <React.Fragment key={i}>
      {`${serial++}`}.  {course}
      {i < item.courses.length - 1 && <br />}
    </React.Fragment>
  ))
  
  }
    {`${serial =1}`}            
              </td>
             
              <td style={styles.tableCell} className='w-96'>{item.question}</td>
              <td style={styles.tableCell} className='w-96'>
               <span className=' border-gray-300'> <b> A: </b> {item.optA} <br/></span>
               <span className=' border-gray-300'> <b> B: </b> {item.optB} <br/></span>
               <span className=' border-gray-300'> <b> C: </b> {item.optC} <br/></span>
               <span className=' border-gray-300'> <b> D: </b> {item.optD} </span>
               <br/><br/>
                <b>Correct Answer: </b>{item.answer}<br/>

              </td>
             
              
              <td style={styles.tableCell} className='w-60'>{item.addedBy}</td>
              <td style={styles.tableCell} className='w-32'><span className='text-red-500  text-sm hover:cursor-pointer' onClick={()=>deleteQuestion(item.id)}> Edit | Delete</span> </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

// Inline CSS for table styling
const styles = {

  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
};

export default DataTable;