"use client";

import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMobile = ({ isHome }: { isHome: boolean }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const links = [
    { name: "home", path: "/" },
    { name: "services", path: "/services" },
    { name: "shop", path: "/shop" },
    { name: "about us", path: "/about-us" },
    { name: "contact", path: "/contact" },
    // { name: "order", path: "/shop" },
  ];

  const toggle = () => setOpen((v) => !v);

  return (
    <div
      className={`block xl:hidden fixed top-0 left-0 right-0 z-40 shadow-md ${
        isHome ? "bg-blue-400" : "bg-blue-400"
      }`}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-1">
        <span className="text-transparent select-none">.</span>

        <button onClick={toggle} className="text-white cursor-pointer">
          {open ? (
            <RiCloseFill className="text-lg" />
          ) : (
            <RiMenu3Fill className="text-lg" />
          )}
        </button>
      </div>

      {/* overlay */}
      {open && (
        <div
          onClick={toggle}
          className="fixed inset-0 top-8 bg-black/30 z-40"
        />
      )}

      {/* drawer */}
      <div
        className={`fixed inset-x-0 top-8 z-50 bg-white shadow-sm transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        <div className="flex flex-col items-start justify-start overflow-y-auto h-[calc(100vh-44px)] pb-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setOpen(false)}
              className={`w-full px-4 py-3 text-[16px] capitalize transition-all duration-200
              ${link.path === pathName ? "bg-gray-200" : "text-black hover:bg-gray-200"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
