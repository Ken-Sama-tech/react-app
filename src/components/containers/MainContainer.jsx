import React from 'react';

function MainContainer({ children, className = '' }) {
   return (
      <main>
         <div className={`bg-(--custom-bg-dark) h-[100%] ${className}`}>
            {children}
         </div>
      </main>
   );
}

export default MainContainer;
