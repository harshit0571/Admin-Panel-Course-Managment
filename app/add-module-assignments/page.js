"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";
const AddModuleAssignmentsPage = () => {
  const searchParams = useSearchParams();

  const courseId = searchParams.get("courseId");
  const moduleId = searchParams.get("moduleId");

  console.log(courseId);

  return <AddMCQForm courseId={courseId} moduleId={moduleId} />;
};

const AddMCQForm = ({ courseId, moduleId }) => {
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questions);
    try {
      const response = await axios.post(
        apiLink + `/course/${courseId}/${moduleId}/0`,
        { mcqsData: questions }
      );
      console.log("MCQs added successfully:", response.data);
      // Reset form fields
      setQuestions([
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ]);
      router.push(`/courses/${courseId}/modules/${moduleId}`);
    } catch (error) {
      console.error("Error adding MCQs:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add MCQs</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="mt-4">
            <label className="block font-medium">Question {index + 1}:</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              className="form-input w-full mt-2"
              placeholder="Question Text"
              required
            />
            <label className="block font-medium mt-2">Options:</label>
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
                className="form-input w-full mt-2"
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            ))}
            <label className="block font-medium mt-2">Correct Answer:</label>
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
              className="form-input w-full mt-2"
              placeholder="Correct Answer"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Question
        </button>
        <br />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add MCQs
        </button>
      </form>
    </div>
  );
};

export default AddModuleAssignmentsPage;
