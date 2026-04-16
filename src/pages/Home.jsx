import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DashboardPreview from '../components/DashBoardPreview'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

function Home() {
  return (
   <div className='flex flex-col w-full'>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <CTA/>
    <Footer/>
   </div>
  )
}

export default Home
