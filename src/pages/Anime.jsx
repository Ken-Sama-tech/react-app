import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import jikanApi from '../lib/api/jikan';
import Carousel from '../components/features/anime/Carousel';
import ContentSlider from '../components/ContentSlider';
import VerticalCard from '../components/VerticalCard';
import animeApi from '../lib/api/anime';

function Anime() {
   const [carouselItems, setCarouselItems] = useState([]);
   const [topAnimeList, setTopAnimeList] = useState([]);

   useEffect(() => {
      jikanApi.getTopAnime(
         { limit: 5, page: 1, filter: 'bypopularity' },
         (res) => {
            const animeData = JSON.parse(res);
            setCarouselItems(animeData);
         }
      );

      animeApi.getTrending();

      jikanApi.getTopAnime({ page: 1, filter: 'bypopularity' }, (res) => {
         const animeData = JSON.parse(res);
         setTopAnimeList(animeData.data);
      });
   }, []);

   return (
      <MainContainer>
         <Carousel data_list={carouselItems} />
         <ContentSlider params={{ heading: 'Top Anime', button: true }}>
            {topAnimeList.map((item, i) => {
               return (
                  <VerticalCard
                     key={i}
                     params={{ image: item.images.webp.large_image_url }}
                  />
               );
            })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
