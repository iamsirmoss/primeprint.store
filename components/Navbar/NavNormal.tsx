"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavNormal = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Shop", path: "/shop" },
    { name: "About us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
  ];

  const pathname = usePathname();

  return (
    <div className="hidden xl:flex items-center gap-10 text-sm text-black">
      {links.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`
              relative font-medium transition-all duration-300
              ${isActive ? "font-semibold text-blue-400" : "font-medium text-black/60 hover:text-blue-400"}
              
              after:content-['']
              after:absolute after:left-1/2 after:-bottom-1
              after:h-0.5 after:w-0 after:bg-blue-400
              after:-translate-x-1/2 after:transition-all after:duration-300

              hover:after:w-1/2
              ${isActive ? "after:w-1/2" : ""}
            `}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavNormal;
