import React from 'react'

function Footer() {
  return (
    <div className='hidden md:block bg-dark py-5 lg:py-10'>
      <div className='mx-10'>
        <div className='flex flex-row items-center justify-between'>
          <h1 className='text-light font-pop'>&copy; 2025 — Built for real ones worldwide</h1>

          <div className='font-pop text-light text-sm italic tracking-wide'>
            no borders, no limits.
          </div>
        </div>
      </div>

      <div className='mt-5 bg-custom-gradient h-5 mx-10 rounded-full' />
    </div>
  )
}

export default Footer
