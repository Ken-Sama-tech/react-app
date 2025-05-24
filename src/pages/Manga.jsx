import React from 'react';
import jikanApi from '../lib/api/jikan';

function Manga() {
   jikanApi.getGenres({}, (res) => {
      console.log(res);
   });
   return <div>Manga</div>;
}

export default Manga;
