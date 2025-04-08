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
  width: 447px;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Начинаем загрузку услуг...');
        const response = await fetch('/api/services');
        console.log('Статус ответа:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Полученные данные:', data);
        
        if (Array.isArray(data)) {
          setServicesData(data);
        } else {
          console.error('Полученные данные не являются массивом:', data);
          setError('Неверный формат данных');
        }
      } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
        setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Загрузка услуг...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки услуг: {error}</div>;
  }

  return (
    <Wrapper>
      <Title>Популярные услуги</Title>
      <ServicesCont>
        {servicesData.length === 0 ? (
          <div>Услуги не найдены</div>
        ) : (
          servicesData.slice(0,6).map((item) => (
            <ServiceItem key={item.id}>
              <ServiceItemImage src={item.img} alt={item.title} />
              <ServiceItemText>{item.title}</ServiceItemText>
            </ServiceItem>
          ))
        )}
      </ServicesCont>
    </Wrapper>
  );
};

export default Services;
