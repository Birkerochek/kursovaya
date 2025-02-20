'use client'
import React from 'react'
import Header from './components/Header/Header'
import { GlobalStyles } from './GlobalStyles'
import Links from './components/Links/Links'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import FeedbackForm from './components/FeedbackForm/FeedbackForm'
import { SessionProvider } from 'next-auth/react'

const page = () => {
  return (
   <div>
    <SessionProvider>
      <GlobalStyles/>
      <Header/>
      <Links/>
      <Hero/>
      <Services/>
      <FeedbackForm/>

    </SessionProvider>
    </div>
  )
}

export default page

