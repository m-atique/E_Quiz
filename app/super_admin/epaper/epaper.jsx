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

const Paper = ({ course, subject, medium, totalQuizzes, data, totalMarks, instruction,time,scroll = 'overflow-scroll' }) => {
  
  return (
    <div>
      <style>{printStyles}</style>
      <div className="w-full">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Paper Preview</h2> */}
        <div className="border-b pb-4 mb-4">
          <div className='flex flex-col items-center justify-center'>
            <div className="bg-[url('/logo.png')] w-20 h-20 bg-cover mb-6"></div>
            <h3 className="text-lg font-semibold  capitalize text-center border-b-2 border-dotted border-spacing-16 border-black mb-5">NHMP Training College Sheikhupura</h3>
          <h3 className="text-lg font-semibold text-center "> {course ? course.label : "N/A"}</h3>
          <h6 className="text-xl font-bold w-fit text-center bg-slate-200  border rounded-lg px-3 py-1  text-black mb-10">{subject ? subject.label : "N/A"}</h6>
          </div>
          
          <div className="flex justify-between mt-1">
            {/* <h3 className="text-lg font-semibold  ">Course: {course ? course.label : "N/A"}</h3>
          <h3 className="text-lg font-semibold  ">Subject:{subject ? subject.label : "N/A"}</h3> */}
          </div>
          <div className="flex justify-between mt-1">
            <h3 className="text-lg font-semibold">Total Quizzes: {totalQuizzes}</h3>
            <h3 className="text-lg font-semibold">Total Time: {`${ time.hrs} hrs ${time.min} min`}</h3>
            <h3 className="text-lg font-semibold">Total Marks: {totalMarks}</h3>
          </div>
        </div>
        <div className="text-gray-700 mb-6 text-sm border border-black rounded-md p-2">
        {instruction.split(".").map(item=>(
          <p className="text-gray-700 mb-1  rounded-md p-2 block">{item}.</p>
        ))}
         </div>
        {/* ${scroll} */}
        
       
        <div className={`space-y-6`}> 
          { data && data.map((item, idx) => (
            <div key={idx} className="border-b pb-4 mb-4 ">
              <p className="font-medium bg-slate-100 p-1 w-fit rounded-md ">Q{idx + 1}:-   <span className='pl-2'>{item.question}</span></p>
              <div className="grid grid-cols-2 gap-4 ml-20 p-2">
                <label className="flex items-center text-sm">
                  <input type="text" name={`q${idx}`} className="mr-2 w-0  " />
                 <span className='border p-1 rounded-full w-5 h-5 flex items-center justify-center border-black  font-extrabold  '>A</span> <span className='ml-2'>{item.optA}</span>
                </label>
                <label className="flex items-center text-sm">
                  <input type="text" name={`q${idx}`} className="mr-2 w-0  " />
                  <span className='border p-1 rounded-full w-5 h-5 flex items-center justify-center border-black  font-extrabold  '>B</span> <span className='ml-2'>{item.optB}</span>
                </label>
                <label className="flex items-center text-sm">
                  <input type="text" name={`q${idx}`} className="mr-2 w-0  " />
                  <span className='border p-1 rounded-full w-5 h-5 flex items-center justify-center border-black  font-extrabold  '>C</span> <span className='ml-2'> {item.optC}</span>
                </label>
                <label className="flex items-center text-sm ">
                  <input type="text" name={`q${idx}`} className="mr-2 w-0  " />
                  <span className='border p-1 rounded-full w-5 h-5 flex items-center justify-center border-black  font-extrabold  '>D</span> <span className='ml-2 '>{item.optD}</span>
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
export const printReport = ({ course, subject, medium, totalQuizzes,data, totalMarks, instruction,time }) => {
  // Render the component to a static string



  const printContent = ReactDOMServer.renderToString(
    <Paper course={course} subject={subject} medium={medium} totalQuizzes={totalQuizzes} data={data} totalMarks={totalMarks} instruction={instruction} time={time.totalTime} scroll='' />
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
