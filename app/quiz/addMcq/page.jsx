'use client'
import React, { useState } from "react";
import './QuestionForm.css';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    mediumType: "",
    difficulty: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    levels: {
      advance: false,
      upper: false,
      intermediate: false,
      lower: false,
      basic: false,
    }
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.subject) formErrors.subject = "Subject is required.";
    if (!formData.mediumType) formErrors.mediumType = "Medium type is required.";
    if (!formData.difficulty) formErrors.difficulty = "Difficulty level is required.";
    if (!formData.question) formErrors.question = "Question is required.";
    formData.options.forEach((option, index) => {
      if (!option) formErrors[`option${index + 1}`] = `Option ${index + 1} is required.`;
    });
    if (!formData.correctAnswer) formErrors.correctAnswer = "Correct answer is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleLevelChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      levels: { ...formData.levels, [name]: checked }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      // Form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      

      <div>
        <h2 className="bg-blue-500 p-2  text-white text-center mb-4">ADD MCQs</h2>
        <label>Select Subject:</label>
        <select name="subject" value={formData.subject} onChange={handleInputChange}>
          <option value="">--Select Subject--</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
        </select>
        {errors.subject && <p>{errors.subject}</p>}
      </div>

      <div>
        <label>Medium Type:</label>
        <select name="mediumType" value={formData.mediumType} onChange={handleInputChange}>
          <option value="">--Select Medium--</option>
          <option value="english">English</option>
          <option value="urdu">Urdu</option>
        </select>
        {errors.mediumType && <p>{errors.mediumType}</p>}
      </div>

      <div>
        <label>Difficulty Level:</label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked={formData.difficulty === "easy"}
            onChange={handleInputChange}
          /> Easy
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            checked={formData.difficulty === "medium"}
            onChange={handleInputChange}
          /> Medium
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={formData.difficulty === "hard"}
            onChange={handleInputChange}
          /> Hard
        </label>
        {errors.difficulty && <p>{errors.difficulty}</p>}
      </div>
      <div>
        <label>Courses</label>
        <div>
          {["advance", "upper", "intermediate", "lower", "basic"].map((level) => (
            <label key={level}>
              <input
                type="checkbox"
                name={level}
                checked={formData.levels[level]}
                onChange={handleLevelChange}
              />{" "}
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label>Question:</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={handleInputChange}
        ></textarea>
        {errors.question && <p>{errors.question}</p>}
      </div>

      {formData.options.map((option, index) => (
        <div key={index}>
          <label>Option {index + 1}:</label>
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          {errors[`option${index + 1}`] && <p>{errors[`option${index + 1}`]}</p>}
        </div>
      ))}

      <div>
        <label>Correct Answer:</label>
        <select name="correctAnswer" value={formData.correctAnswer} onChange={handleInputChange}>
          <option value="">--Select Correct Answer--</option>
          {formData.options.map((option, index) => (
            <option key={index} value={option}>
              {`Option ${index + 1}`}
            </option>
          ))}
        </select>
        {errors.correctAnswer && <p>{errors.correctAnswer}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
