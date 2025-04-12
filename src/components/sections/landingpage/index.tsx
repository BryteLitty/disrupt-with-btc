import React from 'react'
import Header from '../../shared/Header'
import Information from './information'
import ChooseFlow from './chooseFlow'
import Empowering from './empowering'
import GetStarted from './getStart'
import SpiralImage from './spiralImage'
import MoveUp from './moveUp'
import Footer from '@/components/shared/Footer'

function LandingPage() {
  return (
    <div>
        <Header/>
        <Information/>
        <ChooseFlow/>
        <Empowering/>
        <GetStarted/>
        <SpiralImage/>
        <MoveUp />
        <Footer/>
    </div>
  )
}

export default LandingPage