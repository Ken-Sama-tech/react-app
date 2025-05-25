import React from 'react';
import HyperLinkButton from '../buttons/HyperLinkButton';

function FilterByGenre({ params = {}, className = '' }) {
   const { genres = [], heading = '', sectionId = '' } = params;
   return (
      <section className="bg-(--custom-bg-dark)" id={sectionId}>
         <div className="flex flex-col justify-center items-center pt-3">
            <h2 className="text-3xl text-white font-bold">{heading}</h2>
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
         </div>
      </section>
   );
}

export default FilterByGenre;
