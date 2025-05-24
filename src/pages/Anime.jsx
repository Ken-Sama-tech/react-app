import React, { use, useEffect, useRef, useState } from 'react';
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
   const [mostPopularAnimeList, setMostPopularAnimeList] = useState([]);
   const [upcomingAnimeList, setUpcomingAnimeList] = useState([]);
   const [isReadyToload, setIsReadyToload] = useState(false);
   const [allAnimeList, setAllAnimeList] = useState([]);
   const [updateLocalStorage, setUpdateLocalStorage] = useState(false);

   useEffect(() => {
      const today = new Date().toISOString().slice(0, 10);
      const lastUpdated = localStorage.getItem('updateLocalStorage');

      if (
         (new Date().getDate() === 1 || new Date().getDate() === 16) &&
         lastUpdated !== today
      ) {
         localStorage.setItem('updateLocalStorage', today);
         setUpdateLocalStorage(true);
      } else {
         setUpdateLocalStorage(false);
      }

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      let validAnimeCount = 0;

      const trendingAnimePlaceholder = [];

      const loadTrendingAnime = async () => {
         for (let i = 0; i < trendingAnimePlaceholder.length; i++) {
            const anime = trendingAnimePlaceholder[i];

            jikanApi.searchAnime({ query: anime.title2, limit: 5 }, (res) => {
               const response = [];
               res.data.filter((item) => {
                  if (
                     compareTwoStrings(anime.title, item.title) >= 0.8 ||
                     compareTwoStrings(anime.title2, item.title) >= 0.8
                  ) {
                     response.push({
                        score: compareTwoStrings(anime.title2, item.title),
                        data: item,
                     });
                  }
               });

               if (response.length < 1) return;

               response.sort((a, b) => {
                  return b.score - a.score;
               });

               const result = response[0].data;

               animeApi.getEpisodes({ query: anime.title }, (res) => {
                  if (!res) return;
                  const response = res;
                  const eps = response.length;
                  setTrendingAnimeList((prev) => [
                     ...prev,
                     { data: result, eps: eps },
                  ]);
                  validAnimeCount++;
               });
            });

            if (validAnimeCount >= 6) setIsReadyToload(true);

            if (i > 2) {
               await delay(1000);
            }
         }
      };

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
               trendingAnimePlaceholder.push(data);

               if (currentCount == trendingAnimeCount) {
                  loadTrendingAnime();
               }
            });
         });
      });

      const popularListStorage = localStorage.getItem('mostPopularAnimeList');

      if (popularListStorage && !updateLocalStorage) {
         const popularList = JSON.parse(popularListStorage);
         setMostPopularAnimeList(popularList);
      } else {
         jikanApi.getTopAnime(
            { limit: 20, page: 1, filter: 'bypopularity' },
            (res) => {
               const anime = res;
               setMostPopularAnimeList(anime.data);
               localStorage.setItem(
                  'mostPopularAnimeList',
                  JSON.stringify(anime.data)
               );
            }
         );
      }

      const upcomingListStorage = localStorage.getItem('upcomingAnimeList');

      if (upcomingListStorage && !updateLocalStorage) {
         const upcomingList = JSON.parse(upcomingListStorage);
         setUpcomingAnimeList(upcomingList);
      } else {
         jikanApi.getTopAnime(
            { limit: 20, page: 1, filter: 'upcoming' },
            (res) => {
               const anime = res;
               setUpcomingAnimeList(anime.data);
               localStorage.setItem(
                  'upcomingAnimeList',
                  JSON.stringify(anime.data)
               );
            }
         );
      }

      const allAnimeListStorage = localStorage.getItem('allAnimeList');

      if (allAnimeListStorage && !updateLocalStorage) {
         const allAnimeList = JSON.parse(allAnimeListStorage);
         setAllAnimeList(allAnimeList);
      } else {
         jikanApi.getAllAnime({ page: 1, limit: 24 }, (res) => {
            const anime = res;
            setAllAnimeList(anime.data);
            localStorage.setItem('allAnimeList', JSON.stringify(anime.data));
         });
      }
   }, []);

   return (
      <MainContainer>
         <Carousel data_list={carouselItems} />
         <ContentSlider
            params={{
               heading: 'Trending Now',
               button: true,
            }}
         >
            {isReadyToload &&
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
                           entry: `${eps ? `Eps ${eps}` : ''}`,
                           rating: data.rating,
                           status: data.status,
                           genres: Array.from(data.genres, (genre) => {
                              return genre.name;
                           }),
                           type: data.type,
                           alt: data.title_japanese,
                        }}
                        settings={{ hover: true, useTooltip: true }}
                     />
                  );
               })}
         </ContentSlider>
         <ContentSlider
            params={{
               heading: 'Most Popular',
               button: true,
               hasMore: true,
            }}
         >
            {mostPopularAnimeList.length > 6 &&
               mostPopularAnimeList.map((item, i) => {
                  return (
                     <VerticalCard
                        key={i}
                        params={{
                           image: item.images.webp.large_image_url,
                           title: item.title_english
                              ? item.title_english
                              : item.title,
                           score: item.score,
                           entry: `${
                              item.episodes ? `Eps ${item.episodes}` : ''
                           }`,
                           rating: item.rating,
                           status: item.status,
                           genres: Array.from(item.genres, (genre) => {
                              return genre.name;
                           }),
                           type: item.type,
                           alt: item.title_japanese,
                        }}
                        settings={{ hover: true, useTooltip: true }}
                     />
                  );
               })}
         </ContentSlider>
         <ContentSlider
            params={{
               heading: 'Upcoming Next Season',
               button: true,
               hasMore: true,
            }}
         >
            {upcomingAnimeList.length > 6 &&
               upcomingAnimeList.map((item, i) => {
                  return (
                     <VerticalCard
                        key={i}
                        params={{
                           image: item.images.webp.large_image_url,
                           title: item.title_english
                              ? item.title_english
                              : item.title,
                           score: item.score,
                           rating: item.rating,
                           status: item.status,
                           genres: Array.from(item.genres, (genre) => {
                              return genre.name;
                           }),
                           type: item.type,
                           alt: item.title_japanese,
                        }}
                        settings={{ hover: true, useTooltip: true }}
                     />
                  );
               })}
         </ContentSlider>
         <ContentSlider
            params={{
               heading: 'All Anime',
               button: true,
               hasMore: true,
               vertical: true,
            }}
            className="mk-scrollbar !gap-x-4"
         >
            {allAnimeList.length > 6 &&
               allAnimeList.map((item, i) => {
                  return (
                     <VerticalCard
                        key={i}
                        className="!w-[150px] !h-[250px] sm:!h-[300px] sm:!w-[220px]"
                        params={{
                           image: item.images.webp.large_image_url,
                           title: item.title_english
                              ? item.title_english
                              : item.title,
                           score: item.score,
                           rating: item.rating,
                           status: item.status,
                           genres: Array.from(item.genres, (genre) => {
                              return genre.name;
                           }),
                           type: item.type,
                           alt: item.title_japanese,
                        }}
                        settings={{ hover: true, useTooltip: true }}
                     />
                  );
               })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
