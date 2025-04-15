"use client";
import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { Wrapper } from "../Wrapper/Wrapper";
import { ServicesCont, ServiceItem, ServiceItemImage, ServiceItemText } from "./ServicesStyles";

export interface ServicesDataProps {
  id: number;
  title: string;
  img: string;
  description?: string;
  price?: number;
}

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
            <ServiceItem key={item.id} href={`/pages/catalog/${item.id}`}>
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
