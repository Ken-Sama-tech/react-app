import React, { useEffect, useState } from 'react';
import jikanApi from '../lib/api/jikan';
import FilterByGenre from '../components/containers/FilterByGenre';
import HyperLinkButton from '../components/buttons/HyperLinkButton';

function Manga() {
   const [genreList, setGenreList] = useState([]);

   useEffect(() => {
      jikanApi.getGenres({}, (res) => {
         const genres = res.data.map((genre) => genre.name);
         setGenreList(genres);
      });

      jikanApi.getAllAnime({}, (res) => {
         console.log(res.data);
      });
   }, []);
   console.log(genreList);
   return (
      <div>
         <FilterByGenre
            params={{ genres: genreList, heading: 'Filter Anime by Genre' }}
         />
      </div>
   );
}

export default Manga;
