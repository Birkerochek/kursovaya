import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import Title from "../Title/Title";
import {
  AboutUsContainer,
  TextContent,
  ImageContainer,
  AboutUsImage,
  Description,
} from "./AboutUsStyles";

const AboutUs: React.FC = () => {
  return (
    <Wrapper>
      <Title>О нас</Title>
      <AboutUsContainer id="aboutUs">
        <TextContent>
          <Description>
            RemTopia - ваш надежный партнер в ремонте и обслуживании техники. Мы
            предоставляем профессиональные услуги по ремонту различных видов
            техники, от бытовой до промышленной. Наша команда состоит из опытных
            специалистов, которые постоянно совершенствуют свои навыки для
            обеспечения высокого качества услуг.
          </Description>
        </TextContent>
        <ImageContainer>
          <AboutUsImage src="/AboutUs.png" alt="О компании RemTopia" />
        </ImageContainer>
      </AboutUsContainer>
    </Wrapper>
  );
};

export default AboutUs;
