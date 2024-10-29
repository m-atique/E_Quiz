import React from 'react';

// CSS styles for print layout
const printStyles = `
  @media print {
    @page {
      size: A4; /* Set the paper size to A4 */
      margin: 20mm; /* Set margins for printing */
    }
    body {
      margin: 0; /* Remove default margins */
      padding: 0; /* Remove default padding */
    }
    .print-hidden {
      display: none; /* Hide elements with this class in print */
    }
  }
`;

const Paper = ({ course, subject, medium, totalQuizzes, totalMarks, instruction, handlePrint }) => {
  return (
    <div>
      <style>{printStyles}</style>
      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-8 relative print:p-0 print:shadow-none">
       
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Paper Preview</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-bold text-blue-700">Subject: {subject ? subject.label : "N/A"}</h3>
          <div className="flex justify-between mt-1">
            <h3 className="text-lg font-semibold">Course: {course ? course.label : "N/A"}</h3>
            <h3 className="text-lg font-semibold">Medium: {medium ? medium.label : "N/A"}</h3>
          </div>
          <div className="flex justify-between mt-1">
            <h3 className="text-lg font-semibold">Total Quizzes: {totalQuizzes}</h3>
            <h3 className="text-lg font-semibold">Total Marks: {totalMarks}</h3>
          </div>
        </div>
        <p className="text-gray-700 mb-6">{instruction}</p>
        <div className="space-y-6">
          {[...Array(totalQuizzes)].map((_, idx) => (
            <div key={idx} className="border-b pb-4 mb-4">
              <p className="font-medium">Question {idx + 1}</p>
              <div className="grid grid-cols-2 gap-4 ml-4">
                <label className="flex items-center">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  Option A
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  Option B
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  Option C
                </label>
                <label className="flex items-center">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  Option D
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Paper;
