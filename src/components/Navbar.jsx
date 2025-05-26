import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const pages = [
   { path: '/anime', label: 'Anime' },
   { path: '/manga', label: 'Manga' },
   { path: '/novel', label: 'Novel' },
];

const dropdownOptions = [
   { path: '#', label: 'Library' },
   { path: '#', label: 'History' },
   { path: '#', label: 'Settings' },
   { path: '#', label: 'About' },
   { path: '#', label: 'Help' },
];

function Navbar() {
   const menuToggleRef = useRef(null);
   const menuDropdownRef = useRef(null);
   const navbarToggleRef = useRef(null);
   const navbarMenuRef = useRef(null);

   const handleNavbarToggle = () => {
      navbarMenuRef.current.classList.toggle('show');
   };

   const handleMenuToggle = () => {
      menuDropdownRef.current.classList.toggle('hidden');
   };

   useEffect(() => {
      const handleOutsideClick = (e) => {
         if (
            !menuDropdownRef.current.classList.contains('hidden') &&
            !menuDropdownRef.current.contains(e.target) &&
            !menuToggleRef.current.contains(e.target)
         )
            menuDropdownRef.current.classList.add('hidden');

         if (
            !navbarToggleRef.current.classList.contains('show') &&
            !navbarMenuRef.current.contains(e.target) &&
            !navbarToggleRef.current.contains(e.target)
         )
            navbarMenuRef.current.classList.remove('show');
      };

      document.addEventListener('click', handleOutsideClick);

      return () => document.removeEventListener('click', handleOutsideClick);
   }, []);

   return (
      <nav className="h-10 w-full flex items-center ps-2 bg-(--custom-bg-charcoal) sticky top-0 z-999">
         {/* navbar toggle */}
         <div
            className="space-y-1.5 w-6 cursor-pointer lg:hidden"
            onClick={handleNavbarToggle}
            ref={navbarToggleRef}
         >
            <span className="block h-0.5 bg-white"></span>
            <span className="block h-0.5 bg-white"></span>
            <span className="block h-0.5 bg-white"></span>
         </div>

         {/* brand name */}
         <div className="p-1">
            <Link
               to="/"
               className="text-xl font-semibold text-blue-600 ms-2 lg:ms-0"
            >
               IDK
            </Link>
         </div>

         {/* nav links  */}
         <ul
            className="flex flex-col gap-1 text-start opacity-0 z-[-1] absolute -left-[1000px] w-50 top-10 transition-left h-screen duration-200 ease-in-out bg-(--custom-bg-charcoal)
            lg:opacity-100 lg:z-0 lg:relative lg:left-[0] lg:flex-row lg:w-60 lg:top-0 lg:justify-evenly lg:items-center lg:ms-5 lg:h-auto"
            ref={navbarMenuRef}
         >
            {pages.map((page, i) => {
               return (
                  <li key={i} className="list-none block text-center lg:grow-1">
                     <NavLink
                        to={page.path}
                        className={({ isActive }) => {
                           isActive ? (document.title = page.label) : '';
                           return `${
                              isActive ? 'text-blue-600' : 'text-white'
                           } block hover:bg-(--custom-hover-gray) lg:rounded-md text-start ps-2 lg:text-center`;
                        }}
                     >
                        {page.label}
                     </NavLink>
                  </li>
               );
            })}
         </ul>

         {/* search bar */}
         <div className="h-10 ms-auto flex items-center me-2 gap-1">
            <input
               type="search"
               className="border-1 border-gray-200 w-50 h-7 italic bg-(--custom-bg-dark) ps-2 focus:not-italic focus:outline-none text-white rounded-sm"
               placeholder="Search..."
               role="search"
            />
         </div>

         {/* menu button */}
         <div className="relative text-left h-10 flex items-center m-0 p-0">
            <button
               ref={menuToggleRef}
               className="p-2 rounded-full hover:bg-(--custom-hover-gray) cursor-pointer"
               onClick={handleMenuToggle}
            >
               <div className="flex flex-col items-center justify-between h-4">
                  <span className="w-1 h-1 bg-(--custom-bg-white) rounded-full"></span>
                  <span className="w-1 h-1 bg-(--custom-bg-white) rounded-full"></span>
                  <span className="w-1 h-1 bg-(--custom-bg-white) rounded-full"></span>
               </div>
            </button>

            <div
               ref={menuDropdownRef}
               className="hidden absolute right-0 top-10 w-50 bg-(--custom-bg-charcoal) rounded-md shadow-lg z-10"
            >
               {dropdownOptions.map((option, i) => {
                  return (
                     <Link
                        to={option.path}
                        key={i}
                        className="block px-4 py-2 text-sm hover:bg-(--custom-hover-gray) text-white"
                     >
                        {option.label}
                     </Link>
                  );
               })}
            </div>
         </div>
      </nav>
   );
}

export default Navbar;
