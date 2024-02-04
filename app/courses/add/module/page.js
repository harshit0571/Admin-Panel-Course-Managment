"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const AddModuleForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [moduleTitle, setModuleTitle] = useState("");
  const [CourseId, setCourseId] = useState(id);
  console.log(CourseId);
  const [videos, setVideos] = useState([{ title: "", url: "" }]);
  const [assignments, setAssignments] = useState([
    { title: "", type: "MCQ", questions: [] },
  ]);

  const handleVideoChange = (index, key, value) => {
    const newVideos = [...videos];
    newVideos[index][key] = value;
    setVideos(newVideos);
  };

  const handleAssignmentChange = (index, key, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][key] = value;
    setAssignments(newAssignments);
  };

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { title: "", type: "MCQ", questions: [] }]);
  };

  const handleAddQuestion = (index) => {
    const newAssignments = [...assignments];
    newAssignments[index].questions.push({
      questionText: "",
      options: ["", "", ""],
      correctAnswer: "",
      questionType: "MCQ",
    });
    setAssignments(newAssignments);
  };

  const handleRemoveQuestion = (assignIndex, quesIndex) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions.splice(quesIndex, 1);
    setAssignments(newAssignments);
  };

  const handleQuestionChange = (assignIndex, quesIndex, key, value) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions[quesIndex][key] = value;
    setAssignments(newAssignments);
  };

  const handleOptionChange = (assignIndex, quesIndex, optionIndex, value) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions[quesIndex].options[optionIndex] =
      value;
    setAssignments(newAssignments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(moduleTitle, videos, assignments);
    try {
      const response = await axios.post(
        "http://localhost:9000/course/" + CourseId + "/modules",
        {
          moduleTitle,
          videosArray: videos,
          assignments,
        }
      );
      console.log("Module added successfully:", response.data);
      // Reset form fields
      setModuleTitle("");
      setVideos([{ title: "", url: "" }]);
      setAssignments([{ title: "", questionType: "MCQ", questions: [] }]);
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Module</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="moduleTitle" className="block font-medium">
            Module Title:
          </label>
          <input
            type="text"
            placeholder="title"
            id="moduleTitle"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            className="form-input w-full"
            required
          />
        </div>
        {videos.map((video, index) => (
          <div key={index} className="mt-4">
            <label className="block font-medium">Video {index + 1}:</label>
            <input
              type="text"
              value={video.title}
              onChange={(e) =>
                handleVideoChange(index, "title", e.target.value)
              }
              className="form-input w-full mt-2"
              placeholder="Title"
            />
            <input
              type="text"
              value={video.url}
              onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              className="form-input w-full mt-2"
              placeholder="URL"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Video
        </button>
        {assignments.map((assignment, assignIndex) => (
          <div key={assignIndex} className="mt-4">
            <label className="block font-medium">
              Assignment {assignIndex + 1} Title:
            </label>
            <input
              type="text"
              value={assignment.title}
              onChange={(e) =>
                handleAssignmentChange(assignIndex, "title", e.target.value)
              }
              className="form-input w-full mt-2"
              placeholder="Title"
            />
            <label className="block font-medium mt-2">
              Assignment {assignIndex + 1} Type:
            </label>
            <select
              value={assignment.type}
              onChange={(e) =>
                handleAssignmentChange(assignIndex, "type", e.target.value)
              }
              className="form-select w-full mt-2"
            >
              <option value="MCQ">MCQ</option>
              <option value="SubmissionLink">Submission Link</option>
            </select>
            {assignment.type === "SubmissionLink" && (
              <div className="mt-4">
                <label className="block font-medium">Submission Link:</label>
                <input
                  type="text"
                  value={assignment.link}
                  onChange={(e) =>
                    handleAssignmentChange(assignIndex, "link", e.target.value)
                  }
                  className="form-input w-full mt-2"
                  placeholder="Submission Link"
                />
              </div>
            )}
            {assignment.type === "MCQ" && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleAddQuestion(assignIndex)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Add Question
                </button>
                {assignment.questions.map((question, quesIndex) => (
                  <div key={quesIndex} className="mt-4">
                    <label className="block font-medium">
                      Question {quesIndex + 1}:
                    </label>
                    <input
                      type="text"
                      value={question.questionText}
                      onChange={(e) =>
                        handleQuestionChange(
                          assignIndex,
                          quesIndex,
                          "questionText",
                          e.target.value
                        )
                      }
                      className="form-input w-full mt-2"
                      placeholder="Question Text"
                    />
                    <label className="block font-medium mt-2">Options:</label>
                    {question.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            assignIndex,
                            quesIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        className="form-input w-full mt-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    ))}
                    <label className="block font-medium mt-2">
                      Correct Answer:
                    </label>
                    <input
                      type="text"
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          assignIndex,
                          quesIndex,
                          "correctAnswer",
                          e.target.value
                        )
                      }
                      className="form-input w-full mt-2"
                      placeholder="Correct Answer"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveQuestion(assignIndex, quesIndex)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Remove Question
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAssignment}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Assignment
        </button>
        <br />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add Module
        </button>
      </form>
    </div>
  );
};

export default AddModuleForm;
