"use client";
import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { Wrapper } from "../Wrapper/Wrapper";
import styled from "styled-components";

export interface ServicesDataProps {
  id: number;
  title: string;
  img: string;
  description?: string;
  price?: number;
}

export const ServicesCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 66px;
`;
export const ServiceItem = styled.div`
  border: 1px solid #000;
  border-radius: 15px;
  width: 459px;
  height: 308px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;
export const ServiceItemImage = styled.img`
  height: 170px;
  width: 170px;
`;
export const ServiceItemText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #000;
`;

const Services = () => {
  const [servicesData, setServicesData] = useState<ServicesDataProps[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки данных: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setServicesData(data))
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  return (
    <Wrapper>
      <Title>Популярные услуги</Title>
      <ServicesCont>
        {servicesData.slice(0,6).map((item) => (
          <ServiceItem key={item.id}>
            <ServiceItemImage src={item.img} alt={item.title} />
            <ServiceItemText>{item.title}</ServiceItemText>
          </ServiceItem>
        ))}
      </ServicesCont>
    </Wrapper>
  );
};

export default Services;
