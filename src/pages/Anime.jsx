import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import jikanApi from '../lib/api/jikan';
import Carousel from '../components/Carousel';

function Anime() {
   const [topAnimeList, setTopAnimeList] = useState([]);

   useEffect(() => {
      jikanApi.getTopAnime(
         { limit: 5, page: 1, filter: 'bypopularity' },
         (res) => {
            const animeData = JSON.parse(res);
            setTopAnimeList(animeData);
         }
      );
   }, []);

   return (
      <MainContainer>
         <Carousel data_list={topAnimeList} />
      </MainContainer>
   );
}

export default Anime;
