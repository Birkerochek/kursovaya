"use client";
import React from "react";
import { Wrapper } from "./components/Wrapper/Wrapper";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import AboutUs from "./components/AboutUs/AboutUs";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import UserApplications from "./components/UserApplications/UserApplications";
import Questions from "./components/Questions/Questions";

const page = () => {
  return (
    <div>
      <Wrapper>
        <UserApplications />
      </Wrapper>
      <Hero />
      <Services />
      <AboutUs />
      <FeedbackForm />
      <Questions/>
    </div>
  );
};

export default page;
