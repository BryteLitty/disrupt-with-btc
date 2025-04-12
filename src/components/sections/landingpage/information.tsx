import React from 'react'

function Information() {
  return (
    <div className="mx-5 md:mx-10 lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-10 lg:items-center">
    
      <div className="mt-5 mb-3 lg:mt-10 lg:mb-5">
        <h1 className="font-nowy text-2xl md:text-3xl lg:text-5xl leading-tight md:leading-snug lg:leading-tight dark:bg-custom-gradient dark:text-transparent dark:bg-clip-text">
        Save Lives with Bitcoin, One Satoshi at a Time
        </h1>
      </div>

  
      <div className="mt-3 lg:mt-0">
        <p className="font-pop text-base md:text-lg lg:text-xl dark:text-light">
        A simple way to support urgent medical and food needs across Ghana. Verified cases are listed. You donate using Bitcoin through the Lightning Network. 100% of your donation goes toward saving a real life — fast, transparent, and borderless.
        </p>
      </div>
    </div>
  );
}


export default Information