import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Anime from './pages/anime.jsx';
import Manga from './pages/Manga.jsx';

function App() {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      let timeout;
      if (isLoading) {
         timeout = setTimeout(() => {
            window.location.href = '/';
         }, 10000);
      }

      if (!isLoading) {
         clearTimeout(timeout);
         const loader = document.getElementById('loader');
         loader.remove();
      }

      setIsLoading(false);

      return () => {
         clearTimeout(timeout);
      };
   }, [isLoading]);
   return (
      <>
         {!isLoading && (
            <>
               <Navbar />
               <Routes>
                  <Route path="/" element={<Anime />}></Route>
                  <Route path="/manga" element={<Manga />}></Route>
                  <Route path="/webtoon" element={<h1>Webtoon</h1>}></Route>
                  <Route path="/Novel" element={<h1>Novel</h1>}></Route>
               </Routes>
            </>
         )}
      </>
   );
}

export default App;
