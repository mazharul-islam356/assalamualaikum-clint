
import { Box } from "@mui/material";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import {  MdOutlineDashboard } from "react-icons/md";

const borrowersData = [
  { state: "QLD", amount: 18.6, color: "bg-red-500" },
  { state: "SA", amount: 3.9, color: "bg-orange-400" },
  { state: "WA", amount: 3.2, color: "bg-green-400" },
  { state: "VIC", amount: 0, color: "bg-gray-300" },
];



const DashBoard = () => {





  
    return (
        <div className="bg-gray-100 h-screen">

           <div className="flex items-center gap-2 justify-center">
           <MdOutlineDashboard className="text-3xl mt-10" />
           <h1 className="font-bangla font-semibold text-2xl text-center mt-10">ড্যাশবোর্ড</h1>
           </div>
           <div>

      <div className="w-11/12 mx-auto grid grid-cols-2 items-start mt-10">

      <div className="bg-white shadow-lg rounded-lg min-h-[60vh] flex flex-col justify-center px-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-medium text-gray-600">Borrowers by State</h2>
          
        

        </div>

       <div className="flex items-center justify-between">
         {/* Circular Progress Simulation */}
      

        {/* Borrowers by State */}
        <div>
          {borrowersData.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                <span className="text-gray-600 text-sm">{item.state}...............</span>
              </div>
              <p className="text-gray-800 font-medium text-sm">
               ........ ${item.amount}M
              </p>
            </div>
          ))}
        </div>
       </div>

      </div>

      <div className="bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Current balance</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BsArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BsArrowRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="bg-[#C1F7CF] rounded-2xl p-6 relative">
          <button className="absolute left-4 top-4 bg-white p-2 rounded-full">
            <FiRefreshCw className="w-4 h-4 text-gray-600" />
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-1">
              <span className="text-gray-700 font-medium">14%</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                <path d="M5 15l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600">Avg score: 18,324$</p>
          </div>

          <div className="relative flex justify-center">
            <svg className="w-48 h-24" viewBox="0 0 192 96">
              <path
                d="M 8 88 A 84 84 0 0 1 184 88"
                fill="none"
                stroke="#000000"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M 184 88 A 84 84 0 0 1 160 40"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <circle cx="160" cy="40" r="4" fill="#6366F1" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-10%] text-center">
              <p className="text-3xl font-bold text-gray-900">15,368$</p>
            </div>
          </div>
        </div>
      </div>
    </div>

      




    </div>


           </div>
          
        </div>
    );
};

export default DashBoard;