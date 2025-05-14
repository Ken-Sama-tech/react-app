import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import jikanApi from '../lib/api/jikan';
import Carousel from '../components/features/anime/Carousel';
import ContentSlider from '../components/ContentSlider';
import VerticalCard from '../components/VerticalCard';
import { Heading } from 'lucide-react';

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

      jikanApi.getTopAnime({ page: 1, filter: 'bypopularity' }, (res) => {
         const animeData = JSON.parse(res);
         setTopAnimeList(animeData.data);
      });
   }, []);

   return (
      <MainContainer>
         <Carousel data_list={carouselItems} />
         <ContentSlider
            props={{ heading: 'Top Anime', button: true }}
            className=""
         >
            {topAnimeList.map((item, i) => {
               return (
                  <VerticalCard
                     key={i}
                     image={item.images.webp.large_image_url}
                  />
               );
            })}
         </ContentSlider>
      </MainContainer>
   );
}

export default Anime;
