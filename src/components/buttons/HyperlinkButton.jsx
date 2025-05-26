import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HyperLinkButton({ params = {}, className = '' }) {
   const [isLoading, setIsLoading] = useState(true);
   const { label = '', goto = '#' } = params;

   useEffect(() => {
      if (label) setIsLoading(false);
   }, []);

   return (
      <>
         {isLoading && (
            <div
               className={`w-full py-1 h-9 skeleton-loading ${className}`}
            ></div>
         )}

         {!isLoading && (
            <Link
               to={goto}
               className={`block w-full text-white py-1 ps-1 text-base border border-(--blue) transition-all duration-300 ease rounded-md hover:bg-(--blue) cursor-pointer ${className}`}
            >
               {label}
            </Link>
         )}
      </>
   );
}

export default HyperLinkButton;
