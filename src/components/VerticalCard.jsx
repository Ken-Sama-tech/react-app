import { TimerOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VerticalCard({ className = '', params = {} }) {
   const { image = null, ranking = null, title = '', goto = '#' } = params;
   const [isLoading, setIsLoading] = useState(true);
   const timeOutRef = useRef(null);
   const timerIconRef = useRef(null);

   useEffect(() => {
      let timeOut = setTimeout(() => {
         timerIconRef.current.classList.remove('hidden');
         timeOutRef.current.classList.remove('skeleton-loading');
         timeOutRef.current.innerHTML += `<span class="text-white text-lg font-thin ms-1">Request timed out.</span>`;
      }, 30000);

      if (image) {
         setIsLoading(false);
         clearTimeout(timeOut);
      }
   }, [isLoading]);
   return (
      <>
         {isLoading && (
            <div
               ref={timeOutRef}
               className={`h-[300px] w-[220px] shrink-[0] bg-(--custom-bg-charcoal) rounded-[10px] flex items-center px-2 justify-center skeleton-loading ${className}`}
            >
               <TimerOff ref={timerIconRef} color="white" className="hidden" />
            </div>
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
