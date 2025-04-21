"use client";
import React, { useState, useEffect } from "react";
import Title from "../Title/Title";
import { Wrapper } from "../Wrapper/Wrapper";
import { ServicesCont, ServiceItem, ServiceItemImage, ServiceItemText } from "./ServicesStyles";
import { Service } from "@/app/lib/supabase/serviceApi";
import useFetchServices from "./hooks/useFetchServices";

const Services = () => {
  const {error, loading, servicesData} = useFetchServices()

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
