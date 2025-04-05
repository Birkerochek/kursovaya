"use client";
import React from "react";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";

const page = () => {
  return (
    <div>
      <Hero />
      <Services />
      <AboutUs />
      <FeedbackForm />
    </div>
  );
};

export default page;
