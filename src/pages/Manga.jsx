import React from 'react';
import jikanApi from '../lib/api/jikan';

function Manga() {
   jikanApi.searchAnime(
      { query: 'Enen no Shouboutai: San no Shou', limit: 2 },
      (res) => {
         console.log(res);
      }
   );
   return <div>Manga</div>;
}

export default Manga;
