'use client'
import React, { useState, useEffect } from "react";
import './QuestionForm.css';

import axios from "axios";
import { Heading } from "lucide-react";
import { useSession } from "next-auth/react";

const QuestionForm = () => {

  const { data: sessionData } = useSession();
  //const { name, rank, role } = sessionData.user;

  const name = sessionData?.user?.name || "";
  const rank = sessionData?.user?.rank || "";


  useEffect(() => {
      getCourseslist()
  }, []);

const [courselist, setCourseList] = useState("") 
const [subjectlist, setSubjectList] = useState("") 
const [showDialog, setShowDialog] = useState(false)
const [selectAllCourses, setSelectAllCourses] = useState(false); 
async function getCourseslist() {
 // console.log("api get response-------------------", `${process.env.NEXT_PUBLIC_ROOT_API}/api/courses`)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/courses`)
  const response2 = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_API}/api/subjects`)
  //console.log("api get response----------------", response2.data)
  setCourseList(response.data)
  setSubjectList(response2.data)

}

  const [formData, setFormData] = useState({
    subjectid: "",
    medium: "",
    stage: "medium",
    question: "",
    optA:'',
    optC:'',
    optB:'',
    optD:'',
    answer: "",
    // levels: {
    //   advance: false,
    //   upper: false,
    //   intermediate: false,
    //   lower: false,
    //   basic: false,
    // }
    addedBy:rank + " " + name,
    date: new Date().toISOString(),
    courseid:[]

  });

  const [errors, setErrors] = useState({});



  const handleReset = async ()=>{

    setFormData({  // Clear form data
      subjectid: formData.subjectid,
      medium: formData.medium,
      stage: "medium",
      question: "",
      optA: '',
      optB: '',
      optC: '',
      optD: '',
      answer: "",
      addedBy:rank + " " + name,
      date: new Date().toISOString(),
      courseid:""

       });
  
  }

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.subjectid) formErrors.subjectid = "Subject is required.";
    if (!formData.medium) formErrors.medium = "Medium type is required.";
    if (!formData.stage) formErrors.stage = "Difficulty level is required.";
    if (!formData.question) formErrors.question = "Question is required.";
    if (!formData.optA) formErrors.optA = "Option A is required.";
    if (!formData.optB) formErrors.optB = "Option B is required.";
    if (!formData.optC) formErrors.optC = "Option C is required.";
    if (!formData.optD) formErrors.optD = "Option D is required.";
    if (formData.courseid.length === 0) {
      formErrors.courseid = "At least one course must be selected.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


    if (!formData.answer) formErrors.answer = "Correct Answer is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleOptionChange = (value, checked) => {
   
    let newOptions = [...formData.courseid];
  
    if (checked) {
        // Add course ID if checked
        newOptions.push(value);
        
    } else {
        // Remove course ID if unchecked
        newOptions = newOptions.filter((course) => course !== value);
    }

    setFormData({ ...formData, courseid: newOptions });
};

const handleSelectAll = () => {
  if (selectAllCourses) {
    // Deselect all courses
    setFormData({ ...formData, courseid: [] });
  } else {
    // Select all courses
    const allCourseIds = courselist.map(course => course.id);
    setFormData({ ...formData, courseid: allCourseIds });
  }
  setSelectAllCourses(!selectAllCourses); // Toggle "Select All" state
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      console.log("api response before----------------", formData)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_API}/api/quizbank`,formData)
  console.log("api response----------------", response)

      if(response.data.status===0){
       
        setShowDialog(true); 
        // handleOptionChange(formData.courseid, false)
        // setFormData({...formData,  
        //   subjectid: "",
        //   medium: "",
        //   stage: "",
        //   question: "",
        //   optA: '',
        //   optB: '',
        //   optC: '',
        //   optD: '',
        //   answer: "",
        //   addedBy: '',
        //   date: '',
        //   courseid:[]
        // });
handleReset()
        
  //     console.log("courses................", formData.courseid)
  //     setFormData({...formData, courseid:[]})
  //     console.log("courses....after............", formData.courseid)
       }
       else if(response.data.status===1) {
        alert("Question already exist..")
       } else {alert("Error.......")}
     }
    }
  
  //   useEffect(() => {
  //     console.log("courses after reset:", formData.courseid);
  // }, [formData]);
  

  return (
    <div className=" bg-gray-100 ">
    <form onSubmit={handleSubmit}>
      <div className={`${styles.outerview} border-t-blue-800 border-t-2 rounded-t-lg `}>
        <h2 className={`${styles.heading} hover:bg-blue-600 bg-blue-900 rounded-b-2xl text-white border-b-4 border-b-yellow-500` } >MCQ Addition Form</h2>
        <label>Select Subject:</label>
        <select name="subjectid" value={formData.subjectid} onChange={handleInputChange}>
          <option value="">--Select Subject--</option>

          {subjectlist && subjectlist.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        {errors.subjectid && <p>{errors.subjectid}</p>}
      </div>

      <div className={styles.outerview}>
        <label>Medium Type:</label>
        <select name="medium" value={formData.medium} onChange={handleInputChange}>
          <option value="">--Select Medium--</option>
          <option value="english">English</option>
          <option value="urdu">Urdu</option>
        </select>
        {errors.medium && <p>{errors.medium}</p>}
      </div>

      <div className={styles.outerview}>
        <label>Dificulty Level:</label>
        <label>
          <input
            type="radio"
            name="stage"
            value="easy"
            checked={formData.stage === "easy"}
            onChange={handleInputChange}
          /> Easy
        </label>
        <label>
          <input
            type="radio"
            name="stage"
            value="medium"
            checked={formData.stage === "medium"}
            onChange={handleInputChange}
          /> Medium
        </label>
        <label>
          <input
            type="radio"
            name="stage"
            value="hard"
            checked={formData.stage === "hard"}
            onChange={handleInputChange}
          /> Hard
        </label>
        {errors.stage && <p>{errors.stage}</p>}
      </div>

      <div className={styles.outerview}>
        <label>Select Courses</label>
        <span
    className="text-blue-500 cursor-pointer"
    onClick={handleSelectAll}
  >
    {selectAllCourses ? 'Deselect All' : 'Select All'}
  </span>
        <div className="broder  grid grid-cols-2">
        { courselist && courselist.map((item, key) => (
    <div key={key} className="flex flex-row gap-2 ">
        <input 
            type="checkbox" 
            className="w-4 border border-red-500"
            name="courseid"
            id={item.id} 
            checked={formData.courseid.includes(item.id)?item.id:""} // Ensure checkbox reflects state
            onChange={(e) => handleOptionChange(item.id, e.target.checked)}  
        />
        <label htmlFor={item.id}>{item.name}</label>
    </div>
))}
        </div>
        {errors.courseid && <p>{errors.courseid}</p>}
      </div>

      <div className={styles.outerview}>
        <label>Question:</label>
        <textarea
        className=" min-h-20 "
          name="question"
          value={formData.question}
          onChange={handleInputChange}
        ></textarea>
        {errors.question && <p>{errors.question}</p>}
      </div>

      <div className={styles.outerview}>
        
        <label>Option A:</label>
        <textarea
         className=" min-h-8 bg-gray-50"
          name="optA"
          value={formData.optA}
          onChange={handleInputChange}
        ></textarea>
        {errors.optA && <p>{errors.optA}</p>}
       
      </div>

      <div className={styles.outerview}>
        
        <label>Option B:</label>
        <textarea
        className=" min-h-14 bg-gray-50"
          name="optB"
          value={formData.optB}
          onChange={handleInputChange}
        ></textarea>
        {errors.optB && <p>{errors.optB}</p>}
       
      </div>

      <div className={styles.outerview}>
        
        <label>Option C:</label>
        <textarea
         className=" min-h-14 bg-gray-50"
          name="optC"
          value={formData.optC}
          onChange={handleInputChange}
        ></textarea>
        {errors.optC && <p>{errors.optC}</p>}
       
      </div>

      <div className={styles.outerview}>
        
        <label>Option D:</label>
        <textarea
         className=" min-h-14 bg-gray-50"
          name="optD"
          value={formData.optD}
          onChange={handleInputChange}
        ></textarea>
        {errors.optD && <p>{errors.optD}</p>}
       
      </div>

      <div className={styles.outerview}>
  <label>Correct Answer:</label>

<select name="answer" value={formData.answer} onChange={handleInputChange}>
    <option value="">--Select Correct Answer--</option>
    {formData.optA && (
      <option value="optA">{`Option A`}</option>
    )}
    {formData.optB && (
      <option value="optB">{`Option B`}</option>
    )}
    {formData.optC && (
      <option value="optC">{`Option C`}</option>
    )}
    {formData.optD && (
      <option value="optD">{`Option D`}</option>
    )}
  </select>
  {errors.answer && <p>{errors.answer}</p>}
</div>
<div className={`${styles.outerview} flex flex-row gap-6 `}>
      <button className="min-w-36 bg-red-500 text-white rounded-md hover:bg-red-800" type="reset" onClick={()=>handleReset()}>Reset</button>
      <button className="min-w-36 " type="submit">Submit</button>
</div>
      {showDialog && showDialog && (
       <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
       <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white border border-gray-300 rounded-md shadow-lg p-6 z-50">
         <h3 className="text-xl font-bold mb-4 text-green-600">Congratulations!</h3>
         <p className="text-left text-black">MCQ has been added successfully</p>
         <div className="mt-4 flex justify-center">
           <button
             onClick={handleCloseDialog}
             className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
           >
             Close
           </button>
         </div>
       </div>
     </div>
    )}

    </form>
    </div>
     
     

  );
};

const styles = {
 
  outerview:
    'bg-blue-50 hover:bg-blue-100  shadow-blue-900 pb-4 p-8 pt-0 border-r-4 border-l-4  border-blue-800  ',
  heading:
  'border-b text-lg border-blue-500 p-4  font-bold text-center text-blue-800 mb-4 '
};


export default QuestionForm;
