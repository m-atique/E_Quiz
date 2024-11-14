"use client";
import React, { useState,useRef,useEffect } from "react";
import Select from "react-select";
import Paper, { printReport } from "./epaper";
import { useCourses } from "@/context_store/coursesContext";
import { useSubjects } from "@/context_store/subjectContext";
import axios from "axios";
import quiz from '../../../public/quiz.jpg'
import { formvalidator } from "../../../lib/handlers";

const Equiz = () => {
  const [course, setCourse] = useState(null);
  const [subject, setSubject] = useState(null);
  const [medium, setMedium] = useState(null);
  const [easy, setEasy] = useState(0);
  const [mediumQuiz, setMediumQuiz] = useState(0);
  const [hard, setHard] = useState(0);
  const [marks, setMarks] = useState(1);
  const [instruction, setInstruction] = useState(
    " Please read the questions carefully and complete within the time.\n Each question carries equal marks.\n Selecting more than one correct options results in cancelation of question"
  );
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [showPaper, setShowPaper] = useState('hidden');
  const [totalTime,setTotalTime] = useState({hrs:0,min:0})
  

const paperRef = useRef(null)
const courseRef = useRef(null)
const subjectRef = useRef(null)






  const coursesCatalog = useCourses();
  const subjectCatalog = useSubjects();

  // Course, Subject, and Medium Options for Select
  const courseOptions = coursesCatalog.courses.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const subjectOptions = subjectCatalog.subjects.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const mediumOptions = [
    { value: "english", label: "English" },
    { value: "urdu", label: "Urdu" },
  ];

  // Calculate total quizzes and marks
  // const calculateTotals = () => {
  //   const totalQuizCount = easy + mediumQuiz + hard;
  //   setTotalQuizzes(totalQuizCount);
  //   setTotalMarks(totalQuizCount * marks);
  // };

  // const handleMarksChange = (e) => {
  //   const markValue = parseInt(e.target.value, 10) || 0;
  //   setMarks(markValue);
  //   calculateTotals();
  // };

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
    setInstruction("");
    setTotalTime({hrs:0,min:0})
  };

  const handleSaveForm = async () => {
  //  formvalidator(courseRef,subjectRef)


try{
   
        const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizzes/random-questions`,
            {
                courseid: course.value,
                subjectid:  subject.value,
                medium:medium.value ,
                limits: {
                    easy: easy,
                    medium: mediumQuiz,
                    hard: hard
                }
            }

        )
    
        setQuizData(response.data); // Set quiz data first

        setShowPaper('block'); // Only show div after setting data
      } catch (error) {
        console.error("Error saving form:", error);
      }
  
      
  };

  useEffect(() => {
    const totalQuizCount = totalQuizzes;
    
    // Calculate initial rounded values
    let roundedEasy = Math.round(totalQuizCount * 50 / 100);
    let roundedMedium = Math.round(totalQuizCount * 30 / 100);
    let roundedHard = Math.round(totalQuizCount * 20 / 100);
  
    // Calculate total of rounded values and find discrepancy
    const totalAssigned = roundedEasy + roundedMedium + roundedHard;
    const discrepancy = totalQuizCount - totalAssigned;
  
    // Adjust one of the values based on the discrepancy
    if (discrepancy === -1) {
      roundedEasy -= 1; // Adjust if total is over by 1
    } else if (discrepancy === 1) {
      roundedEasy += 1; // Adjust if total is under by 1
    }
  
    // Update states with adjusted values
    setEasy(roundedEasy);
    setMediumQuiz(roundedMedium);
    setHard(roundedHard);
    
    // Set total marks
    setTotalMarks(totalQuizCount * marks);
    const hrs = Math.floor(totalQuizCount / 60);
    const min = totalQuizCount % 60;
  
    setTotalTime({ hrs, min });
    
  }, [marks, totalQuizzes]);
  

  return (
    <div className="p-12 bg-gray-100 min-h-screen  flex items-start justify-center">

      

     
      <div className="flex justify-center p-2  items-center max-w-7xl mx-auto flex-col">
      <div className={`w-full md:w-11/12 h-[120px] rounded-t-lg  border border-slate-400 border-b-0 flex items-center pl-10 bg-gradient-to-tl from-gray-500 to-zinc-100 drop-shadow-lg relative ${showPaper == 'block'?'hidden':'block'}`} >

<img src="/qzmaker2.png" alt="img"  width={274} className=" absolute right-0 -top-16"/>
      <h1 className=" font-[900] text-5xl font-marcellus text-transparent bg-gradient-to-tr from-blue-900  to-black bg-clip-text ">Quiz Maker</h1>
      </div>
      
        {/* Form Section */}
        
        <div className={`w-full md:w-11/12 bg-white border border-slate-400 border-t-0 shadow-xl rounded-b-lg p-8 ${showPaper == 'block'?'hidden':'block'}`}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
            <div>
              <label    className="block text-stone-900 font-medium mb-1">
                Course
              </label>
              <Select
                ref={courseRef}
                options={courseOptions}
                value={course}
                onChange={setCourse}
                placeholder="Select Course"
                className="w-full"
              />
            </div>
            <div>
              <label   className="block text-stone-900 font-medium mb-1">
                Subject
              </label>
              <Select
             ref={subjectRef}
                options={subjectOptions}
                value={subject}
                onChange={setSubject}
                placeholder="Select Subject"
                className="w-full border-slate-400"
              />
            </div>
            <div>
              <label className="block text-stone-900 font-medium mb-1">
                Medium
              </label>
              <Select
                options={mediumOptions}
                value={medium}
                onChange={setMedium}
                placeholder="Select Medium"
                className="w-full border-slate-400"
              />
            </div>
          </div>
          <div className=" mt-6  p-2">
          <h1 className=" font-marcellus font-extrabold text-xl text-center  before:content-[''] after:content-['']">Difficulty Level</h1>


           <div className="grid grid-cols-4 rounded-md  bg-slate-100 gap-4 mt-6 p-2">

           <div>
              <label className="block text-stone-900 font-medium mb-1 ">
                Total Quiz
              </label>
              <input
                type="number"
                min="0"
                onChange={(e) => setTotalQuizzes(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3 border border-slate-400 rounded-md relative"
              />
            </div>

            <div>
              <label className="block text-stone-900 font-medium mb-1 ">
                Easy
              </label>
              <input
                type="number"
                min="0"
                value={easy}
                onChange={(e) => setEasy(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3 border border-slate-400 rounded-md relative"
              />
            </div>

            <div>
              <label className="block text-stone-900 font-medium mb-1">
                Medium 
              </label>
              <input
                type="number"
                min="0"
                value={mediumQuiz}
                onChange={(e) =>
                  setMediumQuiz(parseInt(e.target.value, 10) || 0)
                }
                className="w-full p-3 border border-slate-400 rounded-md"
              />
            </div>

            <div>
              <label className="block text-stone-900 font-medium mb-1">
                Hard 
              </label>
              <input
                type="number"
                min="0"
                value={hard}
                onChange={(e) => setHard(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3  border-slate-400 border rounded-md"
              />
            </div>           
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 items-end p-2">

          <div>
              <label className="block text-stone-900 font-medium mb-1">
                Marks per Quiz
              </label>
              <input
                type="number"
                min="0"
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value, 10) || 0)}
                className="w-full p-3 border-slate-400 border rounded-md"
              />
            </div>
           <div className="has-tooltip">
              <label className="block text-stone-900 font-medium mb-1">
                Total Marks
              </label>
              <span class='tooltip rounded shadow-lg p-1 px-3 bg-gray-100 text-red-500 mt-14'>Read only</span>
              <input
                type="number"
                readOnly
                value={totalMarks}
                className="w-full p-3 border-slate-400 rounded-md font-extabold font-mukta text-blue-900 text-xl bg-gray-100  focus:outline-none"
              />
            </div>
            <div className="col-start-4" >
              <label className="block text-stone-900 font-medium mb-1">
                Total Time
              </label>
              <div className="flex flex-row gap-2 rounded-md bg-slate-100 items-center border p-1 px-2">
            
             
              <input
                type="number"
                value={totalTime.hrs}
                onChange={(e) => setTotalTime({...totalTime,hrs:parseInt(e.target.value, 10)})}
                className="w-full p-2 border  border-slate-400 rounded-md bg-white "
              /> hrs
           
              <input
                type="number"
                value={totalTime.min}
                 onChange={(e) => setTotalTime({...totalTime,min:parseInt(e.target.value, 10)})}
                className="w-full p-2 border  border-slate-400 rounded-md bg-white "
              /> min
           
            </div>
            </div>
            
          </div>
          <div className="mt-6">
            <label className="block text-stone-900 font-medium mb-1">
              Instructions
            </label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter any specific instructions for the quiz"
              className="w-full p-3 border rounded-md"
              rows="4"
            />
          </div>
          <div className="flex gap-4 mt-6  justify-end">
            <button
              onClick={handleClearForm}
              className="w-1/6 py-2 px-4 border border-gray-400 rounded-md text-stone-900 hover:bg-gray-200"
            >
              Clear
            </button>
            <button
              onClick={handleSaveForm}
              className="w-1/6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Generate & Save
            </button>
          </div>
        </div>
       

        {/* Quiz Preview Section */}
        <div className={`w-full md:w-11/2 bg-white shadow-xl rounded-lg p-8 relative print:p-0 print:shadow-none ${showPaper}`} >
          <div className="flex w-full justify-end gap-5" ref={paperRef} tabIndex={-1}>

          <button
              onClick={() =>setShowPaper('hidden')
              }
              className="w-1/6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 print:hidden z-50"
            >
              Back to Form
            </button>
            <button
            
              onClick={() =>{
              
                      printReport({
                          course,
                          subject,
                          medium,
                          easy,
                          mediumQuiz,
                          hard,
                          marks,
                          totalQuizzes,
                          data :quizData,
                          totalMarks,
                          instruction,
                          time:{totalTime}
                        });
                        setShowPaper('block')

                        window.scrollTo({
                          top: -100,
                          behavior: 'smooth' // Optional: adds smooth scrolling effect
                        });
                    }
              }
              className=" bg-blue-600 text-white w-1/6 py-2 rounded-md hover:bg-blue-700 print:hidden z-50"
            >
              Print
            </button>


          </div>

          <Paper
            course={course}
            subject={subject}
            medium={medium}
            data={quizData}
            totalQuizzes={totalQuizzes}
            totalMarks={totalMarks}
            instruction={instruction}
            time={totalTime}
            />
           
        </div>
      </div>
    </div>
  );
};

export default Equiz;
