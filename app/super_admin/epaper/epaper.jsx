'use client'
import React from 'react';
// import ReactDom from 'react-dom/server';
import ReactDOMServer from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development';


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

const Paper = ({ course, subject, medium, totalQuizzes, totalMarks, instruction,scroll = 'overflow-scroll' }) => {
  
  return (
    <div>
      <style>{printStyles}</style>
      <div className="w-full">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Paper Preview</h2> */}
        <div className="border-b pb-4 mb-4">
          <h6 className="text-3xl font-bold w-full text-center mb-5 text-blue-700">{subject ? subject.label : "N/A"}</h6>
          <div className="flex justify-between mt-1">
            <h3 className="text-lg font-semibold">Course: {course ? course.label : "N/A"}</h3>
            <h3 className="text-lg font-semibold">Medium: {medium ? medium.label : "N/A"}</h3>
          </div>
          <div className="flex justify-between mt-1">
            <h3 className="text-lg font-semibold">Total Quizzes: {totalQuizzes}</h3>
            <h3 className="text-lg font-semibold">Total Marks: {totalMarks}</h3>
          </div>
        </div>
        <p className="text-gray-700 mb-6 text-xs border border-black rounded-md p-2">{instruction}</p>
        <div className={`space-y-6 h-96 ${scroll}`}>
          {[...Array(totalQuizzes)].map((_, idx) => (
            <div key={idx} className="border-b pb-4 mb-4 ">
              <p className="font-medium bg-slate-100 p-1 w-fit rounded-md ">Q{idx + 1}:-   <span className='pl-2'>  Which of the following is the brain of the computer?</span></p>
              <div className="grid grid-cols-2 gap-4 ml-20 p-2">
                <label className="flex items-center text-sm">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                 A <span>Central Processing Unit</span>
                </label>
                <label className="flex items-center text-sm">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  B <span>Memory</span>
                </label>
                <label className="flex items-center text-sm">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  C <span> Arithmetic and Logic unit</span>
                </label>
                <label className="flex items-center text-sm">
                  <input type="radio" name={`q${idx}`} className="mr-2" />
                  D <span>Control unit</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Paper
export const printReport = ({ course, subject, medium, totalQuizzes, totalMarks, instruction }) => {
  // Render the component to a static string

  console.log( "print--------------",course, subject, medium, totalQuizzes, totalMarks, instruction )
  const printContent = ReactDOMServer.renderToString(
    <Paper course={course} subject={subject} medium={medium} totalQuizzes={totalQuizzes} totalMarks={totalMarks} instruction={instruction} scroll='' />
  );

  // Open a new window and write the HTML string for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');

  if (!printWindow) {
    console.error("Failed to open print window.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Report</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>${printStyles}</style> <!-- Include print styles here -->
      </head>
      <body class="bg-white">
        ${printContent}
      </body>
    </html>
  `);

  // Trigger the print dialog once content is fully loaded
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
};
