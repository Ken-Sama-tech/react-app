import React, { useEffect, useState } from 'react';
import HyperLinkButton from '../buttons/HyperLinkButton';

function FilterByGenre({ params = {}, className = '' }) {
   const { genres = [], heading = '', sectionId = '' } = params;
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      if (heading) {
         setIsLoading(false);
      }
      console.log(genres);
      let timeout;
      // if (genres.length < 1) {
      //    timeout = setTimeout(() => setError(true), 30000);
      // } else {
      //    clearTimeout(timeout);
      //    setError(false);
      // }
   }, [genres]);

   return (
      <section className="bg-(--custom-bg-dark)" id={sectionId}>
         <div className="flex flex-col justify-center items-center pt-3">
            {isLoading && <div className="h-10 w-80 skeleton-loading"></div>}
            {!isLoading && (
               <h2 className="text-3xl text-white font-bold">{heading}</h2>
            )}

            {error && (
               <div className="h-50 flex items-center justify-center w-full">
                  <span className="text-2xl text-red-400">
                     HTTP 404 Genres not found
                  </span>
               </div>
            )}

            {!error && (
               <ul
                  className={`h-auto w-full gap-3 p-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ${className}`}
               >
                  {genres.map((genre, i) => {
                     return (
                        <li key={i}>
                           <HyperLinkButton params={{ label: genre }} />
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>
      </section>
   );
}

export default FilterByGenre;
