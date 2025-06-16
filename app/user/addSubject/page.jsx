'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch subjects on load
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/subjects`);
      setSubjects(response.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName.trim()) {
      setError('Subject name is required.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/subjects`, {
        name: subjectName,
      });

      if (response.data.status === 0) {
        setSuccessMessage('Subject added successfully!');
        setSubjectName('');
        setError('');
        fetchSubjects(); // Refresh the list
      } else {
        setError('Subject already exists or failed to add.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-14 px-4">
      {/* Form Section */}
      <div className="bg-gray-100 p-6 rounded border border-blue-600 shadow-md w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-800">Add New Subject</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Subject Name:</label>
          <input
            type="text"
            name="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter subject name"
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm mb-2">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Subject List Section */}
      <div className="bg-white p-6 rounded border border-gray-300 shadow-md w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Added Subjects</h2>
        
        {subjects.length > 0 ? (
          <>
            <ul className="space-y-2 overflow-y-auto max-h-[300px] ">
              {subjects.map((subject, index) => (
                <li
                  key={subject.id}
                  className="p-2 bg-gray-100 rounded text-gray-700 shadow-sm flex"
                >
                  <span className="font-semibold">{index + 1}.</span>
                  <span className="ml-4">{subject.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Total Courses: <span className="font-bold">{subjects.length}</span>
            </p>
          </>
        ) : (
          <p className="text-gray-500">No subjects added yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
