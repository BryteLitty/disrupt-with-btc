"use client"

import Image from 'next/image';
import darkScrollImage from '../../../../public/images/dark-scroll.png';



const MoveUp = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex flex-row mr-10 justify-end pb-20'>
      <div onClick={scrollToTop} className='cursor-pointer'>
        <Image 
          src={darkScrollImage} 
          width={50} 
          height={50} 
          alt="arrow"
        />
      </div>
    </div>
  );
}

export default MoveUp;

