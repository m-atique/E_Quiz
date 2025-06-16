'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/courses`);
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName.trim()) {
      setError('Course name is required.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/courses`, {
        name: courseName,
      });

      if (response.data.status === 0) {
        setSuccessMessage('Course added successfully!');
        setCourseName('');
        setError('');
        fetchCourses();
      } else {
        setError('Course already exists or failed to add.');
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
        <h2 className="text-xl font-bold text-center mb-4 text-blue-800">Add New Course</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Enter course name"
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

      {/* Course List Section */}
      <div className="bg-white p-6 rounded border border-gray-300 shadow-md w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Added Courses</h2>
        {courses.length > 0 ? (
          <>
            <div className="overflow-y-auto max-h-80 pr-2">
              <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li
                    key={course.id}
                    className="p-2 bg-gray-100 rounded text-gray-700 shadow-sm flex "
                  >
                    <span className="font-semibold"> {index + 1}.</span>
                    <span className='ml-4'>{course.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-right mt-3 text-gray-600">
              Total Courses: <span className="font-semibold">{courses.length}</span>
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-center">No courses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
