import { BadgeAlert, Play, TimerOff } from 'lucide-react';
import React, { use, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CardTooltip from '../tooltips/VerticalCardTooltip';

function VerticalCard({ className = '', params = {}, settings = {} }) {
   const {
      image = null,
      score = null,
      title = '',
      entry = null,
      goto = '#',
      //for tooltip data
      // rating = null,
      // genres = [null],
      // status = '',
      // alt = '',
      // type = '',
   } = params;

   const { hover = false, useTooltip = false, error = false } = settings;

   const [isLoading, setIsLoading] = useState(true);
   const [hasImage, setHasImage] = useState(false);
   const [isHover, setIsHover] = useState(false);
   const [tooltipPosition, setTooltipPosition] = useState('');
   const [tooltip, setTooltip] = useState(useTooltip);
   const [isError, setIsError] = useState(error);

   const card = useRef(null);
   const cardContent = useRef(null);
   const errorCard = useRef(null);

   useEffect(() => {
      if (image || score || title || entry) {
         if (image) setHasImage(true);
         setIsLoading(false);
      }

      setIsError(error);

      if (isLoading) return;

      const handleMouseEnter = () => {
         setIsHover(true);
         cardContent.current?.classList.add('blur-xs');
      };

      const handleMouseLeave = () => {
         setIsHover(false);
         cardContent.current?.classList.remove('blur-xs');
      };

      if (hover) {
         card.current?.addEventListener('mouseenter', handleMouseEnter);
         card.current?.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
         if (hover) {
            card.current?.removeEventListener('mouseenter', handleMouseEnter);
            card.current?.removeEventListener('mouseleave', handleMouseLeave);
         }
      };
   }, [isLoading, error]);

   useEffect(() => {
      if (!isHover) return;
      if (!card.current) return;

      const rect = card.current?.getBoundingClientRect();

      if (rect.left < window.innerWidth / 2) {
         setTooltipPosition('left-[100%]');
      } else {
         setTooltipPosition('right-[100%]');
      }

      if (window.innerWidth < 1024) {
         setTooltip(false);
      } else {
         setTooltip(true);
      }
   }, [isHover]);

   useEffect(() => {
      if (isError) {
         errorCard.current?.classList.remove('skeleton-loading');
      }
   }, [isError]);

   return (
      <>
         {isLoading && (
            <div
               ref={errorCard}
               className={` shrink-[0] bg-(--custom-bg-charcoal) rounded-[10px] gap-1 flex items-center justify-center p-2 ${className} skeleton-loading !w-[180px] !h-[280px] sm:!h-[300px] sm:!w-[220px]`}
            >
               {isError && (
                  <>
                     <TimerOff color="tomato" />
                     <span className="text-white text-based">
                        Request Timed Out
                     </span>
                  </>
               )}
            </div>
         )}
         {!isLoading && (
            <li
               className="relative h-auto w-auto flex flex-col snap-start grow-[0] shrink-[0]"
               ref={card}
            >
               <div
                  className={`h-[250px] overflow-hidden w-[150px] shadow-xl/20 z-2 rounded-[10px] relative ${className} fade-in sm:h-[300px] sm:w-[220px]`}
               >
                  <div
                     ref={cardContent}
                     className="transition-all duration-200 ease-in h-full w-full"
                  >
                     <Link to={goto} className="h-full w-full block">
                        {!hasImage && (
                           <div className=" h-full w-full flex items-center justify-center text-white gap-1">
                              <BadgeAlert color="tomato" size={24} />
                              <span>Cover unavailable</span>
                           </div>
                        )}

                        {hasImage && (
                           <img
                              src={image}
                              className="block h-full w-full object-cover border-none aspect-2/3"
                           />
                        )}
                     </Link>

                     {title && (
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1">
                           <span className="text-white text-sm font-semibold text-center drop-shadow-sm">
                              {title}
                           </span>
                        </div>
                     )}

                     {score && (
                        <div className="absolute top-2 right-2 bg-(--gold) text-black rounded-md px-2 py-0.5 shadow-md backdrop-blur-sm opacity-80">
                           <span className="text-sm font-bold text-center">
                              {score}
                           </span>
                        </div>
                     )}

                     {entry && (
                        <div className="absolute top-2 left-2 bg-(--bright-green) text-black rounded-md px-2 py-0.5 shadow-md backdrop-blur-sm opacity-80">
                           <span className="text-sm font-bold text-center text-white">
                              {entry}
                           </span>
                        </div>
                     )}
                  </div>
               </div>

               {isHover && (
                  <>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-15 w-15 z-3 bg-[#2563ebbb] rounded-full flex items-center justify-center fade-in">
                        <Play color="white" size={30} />
                     </div>

                     {tooltip && (
                        <CardTooltip
                           data={params}
                           className={`fade-in ${tooltipPosition}`}
                        />
                     )}
                  </>
               )}
            </li>
         )}
      </>
   );
}

export default VerticalCard;
