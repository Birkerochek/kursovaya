'use client'
import React from 'react'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import FeedbackForm from './components/FeedbackForm/FeedbackForm'

const page = () => {
  return (
   <div>
      <Hero/>
      <Services/>
      <FeedbackForm />
    </div>
  )
}

export default page

