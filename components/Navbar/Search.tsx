"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

const Search = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative">
      {/* Search Icon */}
      <SearchIcon
        onClick={toggle}
        className="cursor-pointer hover:text-blue-500 transition-all duration-300"
      />

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 bg-white h-screen w-full z-50 transition-all duration-500 ease-in-out ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Close Button */}
        <div className="mt-20 px-4 xl:px-10 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
          <div className="flex justify-end">
            <RiCloseFill
              onClick={toggle}
              color="#000"
              className="text-xl sm:text-2xl cursor-pointer mt-8"
            />
          </div>

          {/* Search Input */}
          <div className="mt-20 max-w-3xl mx-auto flex items-center gap-3 bg-black/55 p-3 border-b border-gray-600 rounded-md shadow-lg">
            <SearchIcon className="text-2xl md:text-3xl" color="white" />
            <input
              className="w-full outline-none border-none bg-transparent py-1 text-white"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
