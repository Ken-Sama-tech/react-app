import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import jikanApi from '../lib/api/jikan';
import Carousel from '../components/features/anime/Carousel';
import ContentSlider from '../components/ContentSlider';
import VerticalCard from '../components/VerticalCard';
import animeApi from '../lib/api/anime';
import useFetch from '../lib/hooks/useFetch';

function Anime() {
   const [carouselItems, setCarouselItems] = useState([]);
   const [trendingAnimeList, setTrendingAnimeList] = useState([]);
   const [trendingAnime, setTrendingAnime] = useState([]);
   const [isReadyToLoad, setIsReadyToLoad] = useState(false);

   useEffect(() => {
      jikanApi.getTopAnime(
         { limit: 5, page: 1, filter: 'bypopularity' },
         (res) => {
            const animeData = JSON.parse(res);
            setCarouselItems(animeData);
         }
      );

      animeApi.getTrending((res) => {
         const data = JSON.parse(res);
         setTrendingAnime(data);
      });
   }, []);

   useEffect(() => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const loadTrendingAnime = async () => {
         for (let i = 0; i < trendingAnime.length; i++) {
            const anime = trendingAnime[i];

            jikanApi.searchAnime({ query: anime.title, limit: 1 }, (res) => {
               if (!res) return;
               const response = JSON.parse(res);
               setTrendingAnimeList((prev) => [...prev, response.data[0]]);
            });

            if (i >= 6) setIsReadyToLoad(true);

            await delay(1000);
         }
      };

      loadTrendingAnime();
      console.log(trendingAnime);
   }, [trendingAnime]);

   return (
      <MainContainer>
         <Carousel data_list={carouselItems} />
         <ContentSlider params={{ heading: 'Trending Now', button: true }}>
            {isReadyToLoad &&
               trendingAnimeList.map((item, i) => {
                  return (
                     <VerticalCard
                        key={i}
                        params={{
                           image: item.images.webp.large_image_url,
                        }}
                     />
                  );
               })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
