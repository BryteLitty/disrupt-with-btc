import React from 'react'

import { Button, buttonVariants } from '../../ui/button'
import FastImage from '../../../../public/images/misc.png';
import ArrowImage from '../../../../public/images/arrow_down.png'
import WriggleImage from '../../../../public/images/wriggle.png';

import DefaultText from '@/components/content/defaultText';
import  Card  from '@/components/ui/card';


function ChooseFlow() {
  return (
    <div className='mb-10'>
      <DefaultText className='mb-5 dark:bg-custom-gradient dark:text-transparent dark:bg-clip-text md:text-[50px] md:pb-10'title='Save a soul today'/>

    <div className='grid overflow-hidden grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10 mx-5 md:mx-10 lg:mx-10'>

    <Card 
  title="Instant Support" 
  image={FastImage} 
  buttonClassName="mt-10 ml-10"
  imageClassName="top-28 right-20"    
  description="Set up your request in minutes and start receiving donations instantly. No complicated signups or long approval times."
/>

<Card 
  title="Low Transaction Fees" 
  image={ArrowImage} 
  buttonClassName="mt-[20rem] ml-5"
  imageClassName="top-[13rem] right-[-2rem]"    
  description="We use the Bitcoin Lightning Network to keep fees as low as 1% per donation — more money goes directly to those in need."
/>

<Card 
  title="Share Anywhere" 
  image={WriggleImage} 
  buttonClassName="mt-[20rem] ml-5"
  imageClassName="top-[2rem] right-[1rem]"    
  description="Each donation case gets a unique link. Share it via WhatsApp, social media, or SMS — and get support from anywhere in the world."
/>


      </div>


      <DefaultText className ="m-10 text-nowrapm md:text-custom-gradient dark:bg-custom-gradient dark:text-transparent dark:bg-clip-text md:pt-20"title='How it works'/>

      <div className="grid grid-cols-1 gap-4 px-10 sm:px-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">

      <Button
  className={buttonVariants({
    size: "sm",
    className:
      "hover:bg-custom-gradient dark:text-light dark:border-light rounded-full font-pop capitalize py-7 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-5 text-[16px] sm:text-[18px] lg:text-[20px] border text-dark border-dark shadow-none bg-transparent",
  })}
>
  create your request
</Button>

<Button
  className={buttonVariants({
    size: "sm",
    className:
      "hover:bg-custom-gradient dark:text-light dark:border-light rounded-full font-pop capitalize py-7 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-5 text-[16px] sm:text-[18px] lg:text-[20px] border text-dark border-dark shadow-none bg-transparent",
  })}
>
  upload case details
</Button>

<Button
  className={buttonVariants({
    size: "sm",
    className:
      "hover:bg-custom-gradient dark:text-light dark:border-light rounded-full font-pop capitalize py-7 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-5 text-[16px] sm:text-[18px] lg:text-[20px] border text-dark border-dark shadow-none bg-transparent",
  })}
>
  share donation link
</Button>

<Button
  className={buttonVariants({
    size: "sm",
    className:
      "hover:bg-custom-gradient dark:text-light dark:border-light rounded-full font-pop capitalize py-7 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-5 text-[16px] sm:text-[18px] lg:text-[20px] border text-dark border-dark shadow-none bg-transparent",
  })}
>
  receive bitcoin support
</Button>


</div>


    </div>
  )
}

export default ChooseFlow
