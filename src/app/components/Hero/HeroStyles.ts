import styled from "styled-components";
import { FeedbackButton } from "../Header/HeaderStyles";

export const HeroCont = styled.div`
  background-image: url("/hero.png");
  height: 652px;
  width: 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  border-radius: 0 15px 15px 0;

  @media (max-width: 768px) {
    height: 450px;
    background-size: cover;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`;

export const OfferCont = styled.div`
  margin-left: 78px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    margin-left: 40px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    margin-left: 20px;
    gap: 15px;
  }
`;

export const OfferTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 40px;
  color: var(--color-white);
  width: 700px;
  margin: 0 0;

  @media (max-width: 1024px) {
    width: 500px;
    font-size: 32px;
  }

  @media (max-width: 768px) {
    width: 400px;
    font-size: 28px;
  }

  @media (max-width: 480px) {
    width: 280px;
    font-size: 24px;
  }
`;

export const OfferText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: var(--color-white);

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const OfferButton = styled(FeedbackButton)`
  border-radius: 10px;
  width: 230px;
  height: 70px;
  text-align: left;
  padding-left: 20px;

  @media (max-width: 768px) {
    width: 220px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 50px;
  }
`;

export const OfferButtonTextBold = styled.span`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: var(--color-white);
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;