import { BadgeAlert } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VerticalCard({ className = '', params = {} }) {
   let {
      image = null,
      ranking = null,
      score = null,
      title = '',
      entry = null,
      goto = '#',
   } = params;
   const [isLoading, setIsLoading] = useState(true);
   const [hasImage, setHasImage] = useState(false);

   useEffect(() => {
      if (image || ranking || score || title || entry) {
         if (image) setHasImage(true);
         setIsLoading(false);
      }
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
                     <p className="text-white text-sm font-semibold text-center drop-shadow-sm">
                        {title}
                     </p>
                  </div>
               )}

               {score && (
                  <div className="absolute top-2 right-2 bg-(--gold) text-black rounded-md px-2 py-0.5 shadow-md backdrop-blur-sm opacity-80">
                     <p className="text-sm font-bold text-center">{score}</p>
                  </div>
               )}

               {entry && (
                  <div className="absolute top-2 left-2 bg-(--bright-green) text-black rounded-md px-2 py-0.5 shadow-md backdrop-blur-sm opacity-80">
                     <p className="text-sm font-bold text-center text-white">
                        {entry}
                     </p>
                  </div>
               )}
            </div>
         )}
      </>
   );
}

export default VerticalCard;
