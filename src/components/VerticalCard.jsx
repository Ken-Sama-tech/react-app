import { TimerOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VerticalCard({ className = '', params = {} }) {
   const {
      image = null,
      ranking = null,
      score = null,
      title = '',
      entry = null,
      goto = '#',
   } = params;
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (image || ranking || score || title || entry) setIsLoading(false);
   }, [isLoading]);

   return (
      <>
         {isLoading && (
            <div
               className={`h-[300px] w-[220px] shrink-[0] bg-(--custom-bg-charcoal) rounded-[10px] skeleton-loading ${className}`}
            ></div>
         )}
         {!isLoading && (
            <div
               className={`h-[300px] w-[220px] shadow-xl/20 rounded-[10px] snap-center overflow-hidden grow-[0] shrink-[0] relative ${className}`}
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
