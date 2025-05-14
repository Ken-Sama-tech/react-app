import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function VerticalCard({ className = '', image, goto = '#' }) {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (image) setIsLoading(false);
   }, [isLoading]);
   return (
      <>
         {isLoading && (
            <div
               className={`h-[300px] w-[220px] skeleton-loading ${className}`}
            ></div>
         )}
         {!isLoading && (
            <div
               className={`h-[300px] w-[220px] shadow-xl/20 rounded-[10px] snap-center overflow-hidden grow shrink-[0] ${className}`}
            >
               <Link to={goto} className="h-full w-full block">
                  <img
                     src={image}
                     className="block h-full w-full object-cover border-none aspect-2/3"
                  />
               </Link>
            </div>
         )}
      </>
   );
}

export default VerticalCard;
