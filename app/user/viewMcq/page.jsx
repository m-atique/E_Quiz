'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DataTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
var count = 1;

  useEffect(() => {
    getQuestions()
    
   }, []);

   async function getQuestions() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank`)
    // Set data and stop the loading state
    console.log("------------", response)
    setData(response.data);
    setLoading(false);
   }

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }
  
async function deleteQuestion(id) {
    console.log("-----------", id)
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank/${id}`)
    // Set data and stop the loading state
    console.log("------------", response)
    //setData(response.data);
   // setLoading(false);
console.log("deleted.............")
}
  return (
    <div style={{ padding: '20px' }}>
      <h2> MCQs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={styles.tableHeader}>Sr #</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Course ID</th>
            <th style={styles.tableHeader}>Subject</th>
            <th style={styles.tableHeader}>Questions</th>
            <th style={styles.tableHeader}>Option A</th>
            <th style={styles.tableHeader}>Option B</th>
            <th style={styles.tableHeader}>Option C</th>
            <th style={styles.tableHeader}>Option D</th>
            <th style={styles.tableHeader}>Correct Answer</th>
            <th style={styles.tableHeader}>Added By</th>
            <th style={styles.tableHeader}><span className=''> Action</span></th>
            
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{`${count++}`}</td>
              <td style={styles.tableCell}>{item.date.split(" ")[0].split("-").reverse().join("-")}</td>
              <td style={styles.tableCell}>{item.courses}</td>
              <td style={styles.tableCell}>{item.subject_name}</td>
              <td style={styles.tableCell}>{item.question}</td>
              <td style={styles.tableCell}>{item.optA}</td>
              <td style={styles.tableCell}>{item.optB}</td>
              <td style={styles.tableCell}>{item.optC}</td>
              <td style={styles.tableCell}>{item.optD}</td>
              <td style={styles.tableCell}>{item.answer}</td>
              <td style={styles.tableCell}>{item.addedBy}</td>
              <td style={styles.tableCell}><span className='text-red-500  text-sm hover:cursor-pointer' onClick={()=>deleteQuestion(item.id)}> Delete</span> </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline CSS for table styling
const styles = {
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
};

export default DataTable;