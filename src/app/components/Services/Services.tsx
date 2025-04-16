"use client";
import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { Wrapper } from "../Wrapper/Wrapper";
import { ServicesCont, ServiceItem, ServiceItemImage, ServiceItemText } from "./ServicesStyles";
import { servicesApi, type Service } from "@/app/api/services/route";

const Services = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAllServices();
        setServicesData(data);
      } catch (error) {
        console.error('Error fetching services:', error);
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
