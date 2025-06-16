'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const DataTable = () => {
  const { data: sessionData } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [subjects, setSubjects] = useState([]);

  let count = 1;
  let serial = 1;

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank`);
    setData(response.data);
    const uniqueSubjects = ['All', ...new Set(response.data.map(item => item.subject_name))];
    setSubjects(uniqueSubjects);
    setLoading(false);
  }

  const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-96">
          <h2 className="text-xl font-semibold">Enter Reason for Deletion</h2>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter reason here..."
            className="w-full p-2 mt-2 border rounded-md"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(remarks)}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  async function deleteQuestion(id, remarks) {
    try {
      if (!remarks) return;

      const response = await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank/${id}`, {
        data: { remarks }
      });

      alert("Question deleted successfully!");
      setIsModalOpen(false);
      setRemarks('');
      setQuestionToDelete(null);
      getQuestions();
    } catch (error) {
      console.error('Error deleting question', error);
      alert('Failed to delete question');
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-2xl font-bold mb-4">MCQs</h2>

      {/* Subject Filter */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border p-2 rounded-md"
        >
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="flex min-w-full overflow-x-scroll overflow-auto p-2">
        <table className="min-w-[900px] bg-gray-50">
          <thead>
            <tr className="bg-blue-900 text-white border-2 border-blue-900">
              <th style={styles.tableHeader} className="w-24">Sr #</th>
              <th style={styles.tableHeader} className="w-40">Date</th>
              <th style={styles.tableHeader} className="w-80">Course</th>
              <th style={styles.tableHeader} className="w-96">Questions</th>
              <th style={styles.tableHeader} className="w-96">Answers</th>
              <th style={styles.tableHeader} className="w-60">Added By</th>
              <th style={styles.tableHeader} className="w-32">Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(item => selectedSubject === 'All' || item.subject_name === selectedSubject)
              .map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell} className="w-24 text-center">{`${count++}`}</td>
                  <td style={styles.tableCell} className="w-40">{item.date.split(" ")[0].split("-").reverse().join("-")}</td>
                  <td style={styles.tableCell} className="w-80">
                    <span><b>Subject:</b></span> {item.subject_name}
                    <br /><br />
                    {item.courses.map((course, i) => (
                      <React.Fragment key={i}>
                        {`${serial++}`}. {course}
                        {i < item.courses.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                    {serial = 1}
                  </td>
                  <td style={styles.tableCell} className="w-96">{item.question}</td>
                  <td style={styles.tableCell} className="w-96">
                    <span><b>Level:</b> {item.stage}<br /><br /></span>
                    <span><b>A:</b> {item.optA} <br /></span>
                    <span><b>B:</b> {item.optB} <br /></span>
                    <span><b>C:</b> {item.optC} <br /></span>
                    <span><b>D:</b> {item.optD} </span>
                    <br /><br />
                    <b>Correct Answer:</b> {item.answer.split("opt")[1]}<br />
                  </td>
                  <td style={styles.tableCell} className="w-60">{item.addedBy}</td>
                  <td style={styles.tableCell} className="w-32">
                    <span className="text-blue-900 text-sm hover:cursor-pointer">
                      Edit | 
                    </span>
                    <span
                      className="text-red-500 text-sm hover:cursor-pointer"
                      onClick={() => {
                        setQuestionToDelete(item.id);
                        setIsModalOpen(true);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Remarks */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(remarks) => deleteQuestion(questionToDelete, remarks)}
      />
    </div>
  );
};

// Inline CSS for table styling
const styles = {
  tableHeader: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
};

export default DataTable;
