import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useThrottle from '../lib/hooks/useThrottle';

function TruncatedText({
   text,
   maxlength = 150,
   minlength = 0,
   className = '',
   goTo = '#',
   expandable = false,
}) {
   minlength = minlength || maxlength;
   const [displayText, setDisplayText] = useState('');
   const [screenSize, setScreenSize] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const newText =
         screenSize > 500 ? text.slice(0, maxlength) : text.slice(0, minlength);

      setDisplayText(newText);
   }, [isLoading, screenSize]);

   useEffect(() => {
      setScreenSize(window.innerWidth);
      setIsLoading(false);

      if (isLoading) return;

      const updateScreenSize = useThrottle(() => {
         setScreenSize(window.innerWidth);
      });

      window.addEventListener('resize', updateScreenSize);

      return () => {
         window.removeEventListener('resize', updateScreenSize);
      };
   }, [isLoading, displayText]);

   return (
      <p className={className}>
         {displayText}...
         {expandable && (
            <Link
               to={goTo}
               className="text-(--custom-blue-text) font-semibold text-lg text-nowrap"
            >
               See More
            </Link>
         )}
      </p>
   );
}

export default TruncatedText;
