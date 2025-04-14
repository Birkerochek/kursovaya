"use client";
import React from "react";
import styled from "styled-components";
import { Wrapper } from "../Wrapper/Wrapper";
import { FeedbackButton } from "../Header/HeaderStyles";

export const HeroCont = styled.div`
  background-image: url("/hero.png");
  height: 652px;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  border-radius: 0 15px 15px 0;
`;

export const OfferCont = styled.div`
  margin-left: 78px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const OfferTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 40px;
  color: #fff;
  width: 700px;
  margin: 0 0;
`;
export const OfferText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
`;

export const OfferButton = styled(FeedbackButton)`
  border-radius: 10px;
  width: 269px;
  height: 72px;
  text-align: left;
  padding-left: 20px;
`;
export const OfferButtonTextBold = styled.span`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  font-weight: 700;
`;

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
