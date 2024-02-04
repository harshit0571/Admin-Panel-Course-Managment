"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Courses = () => {
  const [data, setData] = useState({ courses: [] });

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get("http://localhost:9000/course");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl text-center mt-3 font-bold mb-3">Courses List</h1>
      <div className="flex flex-wrap justify-between flex-col p-10">
        {data.courses.length > 0 ? (
          data.courses.map((course, index) => (
            <div key={index} className="w-full mx-auto mb-8">
              <Link href={`/courses/${course._id}`} className="w-full">
                <div className="bg-blue-300 cursor-pointer hover:bg-blue-600 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl text-blue-600 font-bold mb-2">
                      {course.title}
                    </h2>
                    <h2 className="text-xl text-gray-600 mb-2">
                      {course.description}
                    </h2>

                    <p className="text-gray-100 mb-2">
                      Duration: {course.duration} hours
                    </p>
                    <p className="text-gray-50 mb-4">
                      Instructor: {course.instructor}
                    </p>
                    <h3 className="text-lg text-blue-600 font-semibold mb-2">
                      Modules
                    </h3>
                    <ul>
                      {course.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="mb-2">
                          <p className="text-gray-100">{module.title}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No courses</div>
        )}
      </div>
    </div>
  );
};

export default Courses;
