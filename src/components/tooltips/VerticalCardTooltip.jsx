import React from 'react';

function CardTooltip({ data = {}, className = '' }) {
   const {
      rating = null,
      score = null,
      title = '',
      entry = null,
      genres = [null],
      status = '',
      alt = '',
      type = '',
   } = data;
   return (
      <div
         className={`absolute h-[220px] w-[350px] top-0 gap-2 flex flex-col bg-black/40 backdrop-blur-md rounded-lg p-4 shadow-md z-3 ${className} cursor-pointer overflow-y-auto overflow-x-hidden rm-scrollbar`}
      >
         <p className="text-lg font-semibold text-white w-full">{title}</p>

         <ul className="list-none h-auto w-full flex gap-1">
            <li className="px-2 py-1 bg-(--rose) w-[fit-content] rounded-md">
               <span className="text-md text-white">
                  {rating ? rating.split(' - ')[0] : 'Rating: ??'}
               </span>
            </li>

            <li className="px-2 py-1 bg-(--bright-green) w-[fit-content] rounded-md">
               <span className="text-md text-white">
                  {type ? type : 'Type: ??'}
               </span>
            </li>

            <li className="px-2 py-1 bg-(--blue) w-[fit-content] rounded-md">
               <span className="text-md text-white">
                  {entry ? entry : 'Entry: ??'}
               </span>
            </li>

            <li className="px-2 py-1 bg-(--gold) w-[fit-content] rounded-md">
               <span className="text-md text-white">
                  {score ? score : 'Score: ??'}
               </span>
            </li>
         </ul>

         <div className="w-full h-1 bg-neutral-300"></div>

         <p className="text-white text-md">
            Japanese: <span className="italic">{alt ? alt : '???'}</span>
         </p>
         <p className="text-white text-md">
            Status: <span className="italic">{status ? status : '???'}</span>
         </p>
         <p className="text-white text-md flex flex-wrap gap-2">
            Genres:
            {genres.map((genre, i) => (
               <span className="italic text-nowrap" key={i}>
                  {genre}
                  {i < genres.length - 1 ? ', ' : ''}
               </span>
            ))}
         </p>
      </div>
   );
}

export default CardTooltip;
