"use client";
import { apiLink } from "@/api";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "...",
//   description: "...",

// };

export default function Home() {
  const loggin = async () => {
    const res = await axios.post(
      apiLink + "/auth/login",
      { username: "admin", password: "admin" },
      { withCredentials: true }
    );
    console.log(res);
  };

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const res = await axios.get(apiLink + "/auth/check-login", {
  //       withCredentials: true,
  //     });
  //     console.log(res);
  //   };
  //   checkLogin();
  // }, []);
  return (
    <div className="p-8">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">ADMIN PANEL</h1>
      <p className="text-lg mb-4">Choose what you want to do</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/courses" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Check Course
          </div>
        </Link>
        <Link href="/users" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Check Users
          </div>
        </Link>
        <Link href="/courses/add" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Add Course
          </div>
        </Link>

        <Link href="/resources" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Resources
          </div>
        </Link>

        <Link href="/contact" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Messages
          </div>
        </Link>
        {/* <button
          onClick={() => {
            loggin();
          }}
        >
          login
        </button> */}
      </div>
    </div>
  );
}
