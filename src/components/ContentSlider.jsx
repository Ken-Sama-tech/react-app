import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VerticalCard from './VerticalCard';

function ContentSlider({ children, params = {}, className = '' }) {
   const [isLoading, setIsLoading] = useState(true);
   const [snapBtn, setSnapBtn] = useState(false);

   const {
      heading = null,
      goto = '#',
      button = false,
      hasMore = false,
   } = params;

   const scrollRef = useRef(null);

   const scrollLeft = () => {
      scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
   };

   const scrollRight = () => {
      scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
   };

   useEffect(() => {
      if (children) {
         setIsLoading(false);
         setTimeout(() => setSnapBtn(button), 500);
      }
   }, [isLoading, children]);
   return (
      <section aria-label="content slider">
         <div className="h-auto w-full flex justify-center items-center py-3">
            <div className="flex flex-col w-[98%] items-center relative">
               {isLoading && (
                  <>
                     <div className="w-full flex justify-between overflow-hidden">
                        <div className="h-8 w-60 skeleton-loading"></div>
                        {hasMore && (
                           <div className="w-20 self-end h-8 skeleton-loading"></div>
                        )}
                     </div>
                  </>
               )}

               {!isLoading && (
                  <>
                     <div className="w-full flex items-center justify-between">
                        <h2 className="text-2xl border-s-4 border-[#2563eb] w-60 ps-3 font-semibold text-white ">
                           {heading}
                        </h2>

                        {hasMore && (
                           <Link
                              to={goto}
                              className="text-nowrap text-white text-sm me-1"
                           >
                              View All
                           </Link>
                        )}
                     </div>

                     <div
                        ref={scrollRef}
                        className={`mt-3 h-auto w-[95%] gap-6 flex justify-start items-center overflow-x-auto overflow-y-hidden rm-scrollbar snap-x snap-mandatory scroll-smooth ${className}`}
                     >
                        {children}
                     </div>

                     {snapBtn && (
                        <>
                           <button
                              onClick={scrollLeft}
                              className="absolute left-0 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100"
                           >
                              <ChevronLeft color="white" size={100} />
                           </button>
                           <button
                              onClick={scrollRight}
                              className="absolute right-0 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100"
                           >
                              <ChevronRight color="white" size={100} />
                           </button>
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
      </section>
   );
}

export default ContentSlider;
