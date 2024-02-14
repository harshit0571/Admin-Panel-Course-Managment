"use client";
import { apiLink } from "@/api";
import axios from "axios";
import { Router, useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [Name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [type, setType] = useState("video"); // Default type is 'video'

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0].name);
    setName(event.target.files[0].name);
  };

  const handleSubmit = async () => {
    // if (!file) {
    const resource = await axios.post(apiLink + "/resource", {
      title,
      description,
      type,
      name: Name,
    });

    console.log(resource.data);
    router.push("/resources");

    return;
    // }

    // const formData = new FormData();
    // formData.append("file", file);

    // try {
    //   // Upload file
    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const { fileName } = await response.json();

    //   // Create resource
    //   const resource = await axios.post(apiLink + "/resource", {
    //     title,
    //     description,
    //     type,
    //     name: fileName,
    //   });

    //   console.log(resource.data);

    //   // Handle response if needed
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    //   // Handle error
    // }
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl text-center">Upload Resource</h2>
      <div className="form-container flex flex-col w-full justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4  w-[70%] border-solid border-2 border-black"
        />
        <input
          type="text"
          placeholder="Video Url or File Url"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="p-4  w-[70%] border-solid border-2 border-black"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-4 mt-4 w-[70%] border-solid border-2 border-black"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-4 w-[50%]  border-solid border-2 border-black"
        >
          <option value="video">Video</option>
          <option value="document">Document</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default Page;
