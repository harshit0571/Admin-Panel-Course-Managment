"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  return (
    <div className="p-8">
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
        <Link href="/courses/add" passHref>
          <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            Add Module
          </div>
        </Link>
      </div>
    </div>
  );
}
