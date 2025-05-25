import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VerticalCard from '../cards/VerticalCard';

function ContentSlider({ children, params = {}, className = '' }) {
   const [isLoading, setIsLoading] = useState(true);
   const [snapBtn, setSnapBtn] = useState(false);
   const [placeholderCount, setPlaceholderCount] = useState(0);
   const [reqTimedout, setReqTimeout] = useState(false);

   const {
      heading = '',
      goto = '#',
      button = false,
      hasMore = false,
      vertical = false,
      sectionId = '',
   } = params;

   const container = useRef(null);

   const scrollLeft = () => {
      container.current?.scrollBy({ left: -200, behavior: 'smooth' });
   };

   const scrollRight = () => {
      container.current?.scrollBy({ left: 200, behavior: 'smooth' });
   };

   useEffect(() => {
      if (children) {
         setIsLoading(false);
         setTimeout(() => setSnapBtn(button), 500);
      }

      if (!heading) return;

      let timeout;

      if (!children) {
         const storedCount = localStorage.getItem(heading);

         storedCount > 6
            ? setPlaceholderCount(storedCount)
            : setPlaceholderCount(6);

         timeout = setTimeout(() => {
            setReqTimeout(true);
         }, 30000);
      } else {
         clearTimeout(timeout);
         localStorage.setItem(heading, container.current?.children.length);
      }
   }, [isLoading, children]);
   return (
      <section className="bg-(--custom-bg-dark)" id={sectionId}>
         <div className="h-auto w-full flex justify-center items-center py-3">
            <div className="flex flex-col items-center relative w-[98%]">
               <div className="w-full flex items-center justify-between">
                  <h2 className="text-2xl border-s-4 border-[#2563eb] w-auto ps-3 font-semibold text-white ">
                     {heading}
                  </h2>

                  {hasMore && (
                     <Link
                        to={goto}
                        className="text-nowrap text-white text-sm me-1 transition-all duration-200 ease hover:text-[#2563ebbb]"
                     >
                        View All
                     </Link>
                  )}
               </div>

               {isLoading && (
                  <>
                     <div
                        className={`flex items-center mt-3 w-[95%] gap-5 mk-scrollbar justify-start ${
                           !vertical
                              ? 'overflow-x-auto overflow-y-hidden pb-[5px]'
                              : 'overflow-y-auto overflow-x-hidden flex-wrap !justify-center'
                        } ${className}`}
                     >
                        {Array.from({ length: placeholderCount }, (_, i) => (
                           <VerticalCard
                              key={i}
                              className={`${
                                 vertical
                                    ? '!w-[150px] !h-[250px] sm:!h-[300px] sm:!w-[220px]'
                                    : ''
                              }`}
                              settings={reqTimedout ? { error: true } : ''}
                           />
                        ))}
                     </div>
                  </>
               )}

               {!isLoading && (
                  <>
                     <ul
                        ref={container}
                        className={`list-none fade-in mt-3 h-auto w-[95%] gap-5 flex justify-start items-center z-1 ${className} py-1 ${
                           !vertical
                              ? 'snap-x snap-mandatory scroll-smooth overflow-x-auto overflow-y-hidden rm-scrollbar'
                              : 'overflow-x-hidden overflow-y-auto flex-wrap !justify-center'
                        }`}
                     >
                        {children}
                     </ul>

                     {snapBtn && !vertical && (
                        <>
                           <button
                              onClick={scrollLeft}
                              className="absolute left-0 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100 z-2"
                           >
                              <ChevronLeft color="white" size={100} />
                           </button>
                           <button
                              onClick={scrollRight}
                              className="absolute right-0 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100 z-2"
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
