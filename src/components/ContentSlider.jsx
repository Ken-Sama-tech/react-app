import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ContentSlider({ children, props = {}, className = '' }) {
   const [isLoading, setIsLoading] = useState(true);
   const [snapBtn, setSnapBtn] = useState(false);

   const { heading = null, goto = '#', button = false } = props;

   const scrollRef = useRef(null);

   const scrollLeft = () => {
      scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
   };

   const scrollRight = () => {
      scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
   };

   useEffect(() => {
      if (heading) {
         setIsLoading(false);
         setTimeout(() => setSnapBtn(button), 2000);
      }
   }, [isLoading]);
   return (
      <section aria-label="content slider">
         <div className="h-auto w-full flex flex-col justify-center items-center py-3 relative">
            <div className="flex justify-between w-[98%] items-center">
               {isLoading && (
                  <>
                     <div className="h-8 w-60 skeleton-loading"></div>
                     <div className="w-20 h-8 skeleton-loading"></div>
                  </>
               )}

               {!isLoading && (
                  <>
                     <h2 className="text-2xl border-s-4 border-[#2563eb] w-60 ps-3 font-semibold text-white ">
                        {heading}
                     </h2>

                     <Link to={goto} className="text-nowrap text-white text-sm">
                        View All
                     </Link>
                  </>
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
                     className="absolute left-3 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100"
                  >
                     <ChevronLeft color="white" size={100} />
                  </button>
                  <button
                     onClick={scrollRight}
                     className="absolute right-3 top-[50%] flex justify-center items-center h-10 w-8 opacity-70 cursor-pointer transition-all duration-300 ease-in hover:opacity-100"
                  >
                     <ChevronRight color="white" size={100} />
                  </button>
               </>
            )}
         </div>
      </section>
   );
}

export default ContentSlider;
