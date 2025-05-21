import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import jikanApi from '../lib/api/jikan';
import Carousel from '../components/features/anime/Carousel';
import ContentSlider from '../components/ContentSlider';
import VerticalCard from '../components/VerticalCard';
import animeApi from '../lib/api/anime';
import { compareTwoStrings } from 'string-similarity';

function Anime() {
   const [carouselItems, setCarouselItems] = useState([]);
   const [trendingAnimeList, setTrendingAnimeList] = useState([]);
   const [trendingAnime, setTrendingAnime] = useState([]);
   const [isReadyToLoad, setIsReadyToLoad] = useState(false);
   const [isCompleted, setIsCompleted] = useState(false);

   useEffect(() => {
      jikanApi.getTopAnime(
         { limit: 5, page: 1, filter: 'bypopularity' },
         (res) => {
            const animeData = res;
            setCarouselItems(animeData);
         }
      );

      animeApi.getTrending((res) => {
         const anime = res;
         const trendingAnimeCount = anime.length;
         let currentCount = 1;
         anime.forEach((a) => {
            animeApi.searchAnime({ query: a.title }, (res) => {
               currentCount++;
               const data = res[0];
               setTrendingAnime((prev) => [...prev, data]);

               if (currentCount == trendingAnimeCount) {
                  setIsCompleted(true);
               }
            });
         });
      });
   }, []);

   useEffect(() => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let validAnimeCount = 0;

      const loadTrendingAnime = async () => {
         for (let i = 0; i < trendingAnime.length; i++) {
            const anime = trendingAnime[i];

            jikanApi.searchAnime({ query: anime.title2 }, (res) => {
               const response = res;
               const result = response.data[0];
               if (
                  compareTwoStrings(anime.title, result.title) > 0.8 ||
                  compareTwoStrings(anime.title2, result.title) > 0.8
               ) {
                  animeApi.getEpisodes({ query: anime.title }, (res) => {
                     if (!res) return;
                     const response = res;
                     const eps = response.length;
                     console.log(anime.title + ' has ' + eps + ' eps');

                     setTrendingAnimeList((prev) => [
                        ...prev,
                        { data: result, eps: eps },
                     ]);
                     validAnimeCount++;
                  });
               }
            });

            if (validAnimeCount >= 6) setIsReadyToLoad(true);

            if (i <= 3) {
               await delay(0);
            } else {
               await delay(1000);
            }
         }
      };
      loadTrendingAnime();
   }, [isCompleted]);
   return (
      <MainContainer>
         <Carousel data_list={carouselItems} />
         <ContentSlider
            params={{
               heading: 'Trending Now',
               button: true,
            }}
         >
            {!isReadyToLoad && (
               <>
                  <VerticalCard />
                  <VerticalCard />
                  <VerticalCard />
                  <VerticalCard />
                  <VerticalCard />
                  <VerticalCard />
               </>
            )}

            {isReadyToLoad &&
               trendingAnimeList.map((item, i) => {
                  const data = item.data;
                  const eps = item.eps;
                  return (
                     <VerticalCard
                        key={i}
                        params={{
                           image: data.images.webp.large_image_url,
                           title: data.title_english
                              ? data.title_english
                              : data.title,
                           score: data.score,
                           entry: `${eps ? `Ep ${eps}` : ''}`,
                        }}
                     />
                  );
               })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
