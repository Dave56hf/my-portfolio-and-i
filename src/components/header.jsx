import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
export default function header() {
  return (
    <div className="inline-flex items-center  mx-5 mt-1.5 py-2 transition-all">
      <FaAngleLeft className="text-cyan-300 text-3xl " />
      <span className=" text-cyan-100 font-bold text-2xl">Dave</span>
      <FaAngleRight className="text-cyan-300 text-3xl" />
    </div>
  );
}
