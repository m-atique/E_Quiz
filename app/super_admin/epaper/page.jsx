'use client'
import React, { useState } from 'react';
import Select from 'react-select';
import Paper,{ printReport } from './epaper'


const Equiz = () => {
    const [course, setCourse] = useState(null);
    const [subject, setSubject] = useState(null);
    const [medium, setMedium] = useState(null);
    const [easy, setEasy] = useState(0);
    const [mediumQuiz, setMediumQuiz] = useState(0);
    const [hard, setHard] = useState(0);
    const [marks, setMarks] = useState(0);
    const [instruction, setInstruction] = useState('Please read the questions carefully and complete within the time.');
    const [totalQuizzes, setTotalQuizzes] = useState(0);
    const [totalMarks, setTotalMarks] = useState(0);

    // Course, Subject, and Medium Options for Select
    const courseOptions = [
        { value: 'cs101', label: 'Computer Science 101' },
        { value: 'math101', label: 'Mathematics 101' },
        { value: 'eng101', label: 'English 101' },
    ];

    const subjectOptions = [
        { value: 'dataStructures', label: 'Data Structures' },
        { value: 'calculus', label: 'Calculus' },
        { value: 'literature', label: 'Literature' },
    ];

    const mediumOptions = [
        { value: 'english', label: 'English' },
        { value: 'urdu', label: 'Urdu' },
    ];

    // Calculate total quizzes and marks
    const calculateTotals = () => {
        const totalQuizCount = easy + mediumQuiz + hard;
        setTotalQuizzes(totalQuizCount);
        setTotalMarks(totalQuizCount * marks);
    };

    const handleMarksChange = (e) => {
        const markValue = parseInt(e.target.value, 10) || 0;
        setMarks(markValue);
        calculateTotals();
    };

    const handleClearForm = () => {
        setCourse(null);
        setSubject(null);
        setMedium(null);
        setEasy(0);
        setMediumQuiz(0);
        setHard(0);
        setMarks(0);
        setTotalQuizzes(0);
        setTotalMarks(0);
        setInstruction('');
    };

    const handleSaveForm = () => {
        console.log({
            course,
            subject,
            medium,
            easy,
            mediumQuiz,
            hard,
            marks,
            totalQuizzes,
            totalMarks,
            instruction,
        });
    };

 

    return (
        <div className="p-12 bg-gray-100 min-h-screen">
            <div className="flex gap-12 max-w-7xl mx-auto">
                {/* Form Section */}
                <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-8">
                    <h1 className="text-2xl font-semibold text-center text-blue-700 mb-8">Quiz Selection </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Course</label>
                            <Select
                                options={courseOptions}
                                value={course}
                                onChange={setCourse}
                                placeholder="Select Course"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Subject</label>
                            <Select
                                options={subjectOptions}
                                value={subject}
                                onChange={setSubject}
                                placeholder="Select Subject"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Medium</label>
                            <Select
                                options={mediumOptions}
                                value={medium}
                                onChange={setMedium}
                                placeholder="Select Medium"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Easy Quizzes</label>
                            <input
                                type="number"
                                min="0"
                                value={easy}
                                onChange={(e) => setEasy(parseInt(e.target.value, 10) || 0)}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Medium Quizzes</label>
                            <input
                                type="number"
                                min="0"
                                value={mediumQuiz}
                                onChange={(e) => setMediumQuiz(parseInt(e.target.value, 10) || 0)}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Hard Quizzes</label>
                            <input
                                type="number"
                                min="0"
                                value={hard}
                                onChange={(e) => setHard(parseInt(e.target.value, 10) || 0)}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 items-end">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Marks per Quiz</label>
                            <input
                                type="number"
                                min="0"
                                value={marks}
                                onChange={handleMarksChange}
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Total Quizzes</label>
                            <input
                                type="number"
                                readOnly
                                value={totalQuizzes}
                                className="w-full p-3 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Total Marks</label>
                            <input
                                type="number"
                                readOnly
                                value={totalMarks}
                                className="w-full p-3 border rounded-md bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-gray-700 font-medium mb-1">Instructions</label>
                        <textarea
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}
                            placeholder="Enter any specific instructions for the quiz"
                            className="w-full p-3 border rounded-md"
                            rows="4"
                        />
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleClearForm}
                            className="w-1/2 py-2 px-4 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-200"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleSaveForm}
                            className="w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Generate & Save
                        </button>
                    </div>
                </div>
                {/* Quiz Preview Section */}
                <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-8 relative print:p-0 print:shadow-none">
                <div>

                <button
          onClick={() =>printReport( {course,
            subject,
            medium,
            easy,
            mediumQuiz,
            hard,
            marks,
            totalQuizzes,
            totalMarks,
            instruction})}
          className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 print:hidden z-50"
          >
          Print
        </button>
          </div>

                <Paper course ={course} subject ={subject} medium ={medium} totalQuizzes ={totalQuizzes} totalMarks={totalMarks} instruction ={instruction}  />
                </div>
            </div>
        </div>
    );
};

export default Equiz;
