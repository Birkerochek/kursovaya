"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import { ServicesDataProps } from "@/app/components/Services/Services";
import {
  GridContainer,
  GridItem,
  ServiceTitle,
  ServiceDescription,
  LoadingMessage,
  ErrorMessage,
  ServiceImage,
} from "./styles";

interface PageProps {
  services?: ServicesDataProps[];
}

// Массив с обозначениями зон для сетки
const gridAreas = ["a", "b", "c", "e", "f", "g"];

const ServicesPage: NextPage<PageProps> = ({ services: initialServices }) => {
  const [services, setServices] = useState<ServicesDataProps[]>(
    initialServices || [],
  );
  const [loading, setLoading] = useState<boolean>(!initialServices);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialServices) {
      setLoading(true);
      fetch("./../../api/services")
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Ошибка загрузки данных: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          setError(error.message || "Произошла ошибка при загрузке данных");
          setLoading(false);
        });
    }
  }, [initialServices]);

  if (loading) {
    return (
      <Wrapper>
        <LoadingMessage>Загрузка услуг...</LoadingMessage>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorMessage>{error}</ErrorMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <GridContainer>
        {services.slice(0, gridAreas.length).map((service, index) => (
          <GridItem key={service.id || index} $area={gridAreas[index]}>
            <ServiceImage src={service.img} alt={service.title} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDescription>{service.price}</ServiceDescription>
          </GridItem>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default ServicesPage;
