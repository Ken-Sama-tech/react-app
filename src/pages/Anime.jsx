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
   const [epsNumber, setEpsNumber] = useState([]);

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
               if (!res) return;
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

            jikanApi.searchAnime({ query: anime.title2, limit: 1 }, (res) => {
               if (!res) return;
               const response = res;
               const result = response.data[0];

               if (
                  compareTwoStrings(anime.title, result.title) > 0.8 ||
                  compareTwoStrings(anime.title2, result.title) > 0.8
               ) {
                  animeApi.getEpisodes(
                     { title: anime.title, alt: anime.title2 },
                     (res) => {
                        if (!res) return;
                        const response = res;
                        const eps = response.length;
                        setEpsNumber((prev) => [...prev, eps]);
                     }
                  );
                  setTrendingAnimeList((prev) => [...prev, result]);
                  validAnimeCount++;
               }
            });

            if (validAnimeCount >= 6) setIsReadyToLoad(true);

            await delay(1000);
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
                  return (
                     <VerticalCard
                        key={i}
                        params={{
                           image: item.images.webp.large_image_url,
                           title: item.title,
                           score: item.score,
                           entry: `${
                              epsNumber[i] ? 'Eps ' + epsNumber[i] : ''
                           }`,
                        }}
                     />
                  );
               })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
