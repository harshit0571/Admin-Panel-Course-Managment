"use client";
import React, { useState } from "react";
import axios from "axios";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/course",
        formData
      );
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter title"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter description"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="instructor"
          className="block text-gray-700 font-bold mb-2"
        >
          Instructor
        </label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter instructor"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="duration"
          className="block text-gray-700 font-bold mb-2"
        >
          Duration (hours)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter duration"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Course
      </button>
    </form>
  );
};

export default CreateCourseForm;
