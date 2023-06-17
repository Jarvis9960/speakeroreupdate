import React, { useEffect, useState } from 'react';
import MainComponent from './Viewdetails';
import MobileComponent from './ViewdetailsMob';

export default function Viewdetails1() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth < 967 ? <MobileComponent /> : <MainComponent />;
}