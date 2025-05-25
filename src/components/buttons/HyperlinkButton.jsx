import React from 'react';
import { Link } from 'react-router-dom';

function HyperLinkButton({ params = {}, className = '' }) {
   const { label = '', goto = '#' } = params;

   return (
      <Link
         to={goto}
         className={`block w-full text-white py-1 ps-1 text-base border border-(--blue) transition-all duration-300 ease rounded-md hover:bg-(--blue) cursor-pointer ${className}`}
      >
         {label}
      </Link>
   );
}

export default HyperLinkButton;
