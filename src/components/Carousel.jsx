import React, { useEffect, useRef, useState } from 'react';
import greater_than_img from '../assets/greater-than.png';
import TruncatedText from './TruncatedText';
import { Heart, Star } from 'lucide-react';

function Carousel({ data_list }) {
   const [carouselIems, setCarouselItems] = useState([]);
   const [activeIndex, setActiveIndex] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const prevBtnRef = useRef(null);
   const nextBtnRef = useRef(null);

   useEffect(() => {
      if (data_list.length == 0) return;
      setCarouselItems(data_list.data);
      setIsLoading(false);
      console.log(data_list.data);
   }, [data_list]);

   useEffect(() => {
      if (isLoading) return;
      const delay = 3000;
      const autoUpdateIndex = setInterval(() => {
         carouselIems.length - 1 == activeIndex
            ? setActiveIndex(0)
            : setActiveIndex(activeIndex + 1);
      }, delay);

      activeIndex == 0
         ? prevBtnRef.current.classList.add('hidden')
         : prevBtnRef.current.classList.remove('hidden');

      activeIndex == carouselIems.length - 1
         ? nextBtnRef.current.classList.add('hidden')
         : nextBtnRef.current.classList.remove('hidden');

      return () => {
         clearInterval(autoUpdateIndex);
      };
   }, [activeIndex, isLoading]);

   const handleCarIndcator = (i) => {
      setActiveIndex(i);
   };

   const handlePrev = () => {
      setActiveIndex(activeIndex - 1);
   };

   const handleNext = () => {
      setActiveIndex(activeIndex + 1);
   };

   return (
      <section aria-label="carousel">
         <div className="h-[55vh] w-full md:h-[95vh] aspect-[16/9] relative overflow-hidden">
            <ul className="h-full w-full">
               {isLoading && (
                  <li className="h-full w-full">
                     <div className="h-full w-[85%] left-10 z-2 absolute top-0 lg:left-15 md:w-[40%] flex flex-col">
                        <div className="h-[40px] w-[45%] flex items-center mt-2 rounded md:mt-20 md:h-[50px] sm:w-[250px] skeleton-loading"></div>
                        <div className="h-[60px] w-full mt-1 md:mt-5 md:h-[70px] ps-1 skeleton-loading"></div>
                        <div className="h-20 w-full text-white mt-1 overflow-hidden md:mt-5 skeleton-loading"></div>
                        <div className="bg-white h-10 w-full mt-1  md:mt-5 skeleton-loading"></div>
                     </div>
                     <div className="hidden h-9 w-9 absolute z-2 left-0 top-[50%] transform-[-50%, -50%] !rounded-[50%] lg:left-3 skeleton-loading md:block"></div>
                     <div className="hidden h-9 w-9 absolute z-2 right-0 top-[50%] transform-[-50%, -50%] !rounded-[50%] lg:right-3 skeleton-loading md:block"></div>
                  </li>
               )}

               {!isLoading && (
                  <>
                     <button
                        aria-label="prev button"
                        onClick={handlePrev}
                        ref={prevBtnRef}
                        title="previous"
                        className="invisible h-10 w-10 overflow-hidden bg-transparent cursor-pointer opacity-50 transition-opacity duration-500 hover:opacity-100 absolute z-2 left-0 top-[50%] transform-[-50%, -50%] rounded-[50%] rotate-180 flex justify-center items-center md:visible lg:left-3"
                     >
                        <img
                           src={greater_than_img}
                           className="h-full w-full object-cover"
                        />
                     </button>

                     <div
                        aria-label="next button"
                        onClick={handleNext}
                        ref={nextBtnRef}
                        title="next"
                        className="invisible h-10 w-10 overflow-hidden bg-transparent cursor-pointer opacity-50 transition-opacity duration-500 hover:opacity-100 absolute z-2 right-0 top-[50%] transform-[-50%, -50%] rounded-[50%] flex justify-center items-center md:visible lg:right-3"
                     >
                        <img
                           src={greater_than_img}
                           className="h-full w-full object-cover"
                        />
                     </div>

                     {carouselIems.map((item, i) => {
                        return (
                           <li
                              key={i}
                              className={`h-full w-full overflow-hidden absolute translate-x-0 transition-all duration-500 ease-in-out ${
                                 activeIndex == i ? 'is-visible' : 'not-visible'
                              }`}
                           >
                              <div
                                 style={{
                                    backgroundImage: `url(${item.trailer.images.maximum_image_url})`,
                                 }}
                                 role="img"
                                 className="w-full h-full relative bg-no-repeat bg-cover bg-center after:content-[''] after:absolute after:inset-0 after:bg-[rgba(0,0,0,0.7)]"
                              >
                                 <div className="h-full w-[85%] left-10 z-2 absolute top-0 flex flex-col sm:w-[60%] md:w-[50%] lg:w-[40%] lg:left-15 ">
                                    <div className="h-[40px] w-[60%] bg-(image:--custom-gradient-blue) flex items-center mt-2 ms-1 rounded md:mt-20 md:h-[50px] sm:w-[250px]">
                                       <p className="ms-2 font-medium text-white capitalize text-based md:text-lg md:ms-5">
                                          #{i + 1} most popular{' '}
                                          {item.genres[0].type}
                                       </p>
                                    </div>

                                    <div className="h-[40px] w-full mt-1 md:mt-5 md:h-[50px]">
                                       <p className="h-full w-full text-white flex items-center font-bold text-lg truncate md:text-[1.6rem]">
                                          {item.title}
                                       </p>
                                    </div>
                                    <div className="h-[20px] w-full">
                                       <p className="h-full w-full italic font-thin text-md text-white truncate text-nowrap">
                                          Alternatives:
                                          <span className="font-semibold">
                                             {` ${item.title_english}, ${item.title_japanese}`}
                                          </span>
                                       </p>
                                    </div>
                                    <div className="h-auto w-full text-white mt-1 md:mt-5">
                                       <TruncatedText
                                          text={item.synopsis}
                                          maxlength={260}
                                          expandable={true}
                                          minlength={150}
                                          className="h-full w-full text-sm md:text-base"
                                       />
                                    </div>

                                    <div className="h-10 w-full mt-1 flex items-center md:mt-5 gap-3">
                                       <div className="bg-(--gold) opacity-70 shadow-md h-8 rounded-full w-auto px-5 py-2 flex justify-center items-center gap-2">
                                          <Star color="black" strokeWidth={2} />
                                          <p className="text-md">
                                             {item.score}
                                          </p>
                                       </div>
                                       <div className="bg-(--tomato) opacity-70 shadow-md h-8 rounded-full w-auto px-5 py-2 flex justify-center items-center gap-2">
                                          <Heart
                                             color="black"
                                             strokeWidth={2}
                                          />
                                          <p className="text-md">
                                             {item.favorites}
                                          </p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        );
                     })}
                  </>
               )}
            </ul>

            <div
               aria-label="carousel indicator wrapper"
               className="h-10 w-full absolute bottom-[-0] flex justify-center items-center gap-1 z-2"
            >
               {carouselIems.map((_, i) => {
                  return (
                     <button
                        aria-label="carousel indicator"
                        key={i}
                        className={`h-[8px] w-[8px] rounded cursor-pointer hover:bg-neutral-100 ${
                           activeIndex == i
                              ? 'bg-neutral-100'
                              : 'bg-neutral-400'
                        }`}
                        onClick={() => handleCarIndcator(i)}
                     ></button>
                  );
               })}
            </div>
         </div>
      </section>
   );
}

export default Carousel;
