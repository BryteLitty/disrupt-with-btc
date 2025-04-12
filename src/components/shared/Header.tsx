import React from 'react';
import LightLogo from '../../../public/images/logo/logo1.png';
import DarkLogo from '../../../public/images/logo/logo.png';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';



const Header=() => {
    return (
        <div className='dark:bg-dark bg-grayTint p-3 sm:p-5 sticky top-0 z-50'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center space-x-2'>

              <h1 className='font-pop uppercase font-extrabold dark:text-light text-dark text-[18px] md:font-nowy md:text-[28px]'>
                save a soul
              </h1>
            </div>
            <div className='flex flex-row items-center gap-5'>
              <Link href="/dashboard">
              <Button
                className={buttonVariants({
                  size: "lg",
                  className: 'rounded-full font-pop capitalize px-3 md:px-5 text-nowrap border-[0.1px] text-dark border-dark shadow-none bg-primary text-white'
                })}>
                get started
              </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    
}

export default Header;