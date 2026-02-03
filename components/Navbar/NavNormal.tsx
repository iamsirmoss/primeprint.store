// "use client"

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// const NavNormal = () => {
//       const links = [
//             {
//                   name: "Home",
//                   path: "/"
//             },
            
//             {
//                   name: "Services",
//                   path: "/services"
//             },
//             {
//                   name: "Shop",
//                   path: "/shop"
//             },
//             {
//                   name: "About us",
//                   path: "/about-us"
//             },
//             {
//                   name: "Contact",
//                   path: "/contact"
//             },
//       ]
//       const pathName = usePathname()

//   return (
//       <div className='hidden xl:flex items-center gap-10 text-[16px]'>
//             {links.map((link, index) => (
//                   <Link key={index} href={link.path} className={`${link.path === pathName && `text-gray-400 
//                   font-semibold transition-all duration-300`}
//                   font-semibold hover:text-gray-400 transition-all duration-500
//                   `}>
//                         <h5>{link.name}</h5>
//                   </Link>
//             ))}
//       </div>
//   )
// }

// export default NavNormal

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
    <div className="hidden xl:flex items-center gap-10 text-[16px]">
      {links.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            className={`
              relative font-semibold transition-colors duration-300
              hover:text-gray-400
              ${isActive ? "text-gray-400" : ""}
              
              after:content-['']
              after:absolute after:left-1/2 after:-bottom-1
              after:h-[2px] after:w-0 after:bg-gray-400
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
