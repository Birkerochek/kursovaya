"use client";
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import { HeroCont, OfferButton, OfferButtonTextBold, OfferCont, OfferText, OfferTitle } from "./HeroStyles";



const Hero = () => {
  const scrollToFeedbackForm = () => {
    const feedbackForm = document.getElementById("feedback-form");
    if (feedbackForm) {
      feedbackForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Wrapper>
        <HeroCont>
          <OfferCont>
            <OfferTitle>
              Выбирая нас вы выбираете долговечность своего устройства
            </OfferTitle>
            <OfferText>Более 10000 довольных клиентов</OfferText>
            <OfferButton onClick={scrollToFeedbackForm}>
              Оставить заявку <br /> прямо {" "}
              <OfferButtonTextBold>сейчас!</OfferButtonTextBold>
            </OfferButton>
          </OfferCont>
        </HeroCont>
      </Wrapper>
    </div>
  );
};

export default Hero;
