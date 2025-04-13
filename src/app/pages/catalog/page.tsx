"use client";
import { useEffect, useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import { ServicesDataProps } from "@/app/components/Services/Services";
import { FirstGridItem, LastGridItem } from "./SpecialGridItems";
import {
  GridContainer,
  GridItem,
  ServiceTitle,
  ServiceDescription,
  LoadingMessage,
  ErrorMessage,
  ServiceImage,
  ServicePriceContainer,
  ServicePrice,
  MoreContainer,
  MoreContainerText,
  MoreContainerIcon,
  DownCard,
  ServiceContent,
  UpCard,
  AllServices,
  AllServiceCard,
  AllServiceImage,
  AllServiceTitle,
  AllServiceDescription,
  AllServiceContent,
  AllDownCard,
  AllMoreContainerIcon,
  AllMoreContainer,
  AllMoreContainerText,
  AllServicePriceContainer,
  AllServicePrice,
} from "./styles";
import BackButton from "@/app/UI/BackButton";
import Link from "next/link";

const ServiceCard = ({
  service,
  area,
}: {
  service: ServicesDataProps;
  area?: string;
}) => (
  <GridItem $area={area}>
    <ServiceImage src={service.img} alt={service.title} />
    <ServiceContent>
      <ServiceTitle>{service.title}</ServiceTitle>
      <ServiceDescription>{service.description}</ServiceDescription>
    </ServiceContent>

    <AllDownCard href={`/pages/catalog/${service.id}`}>
      <MoreContainer>
        <MoreContainerText>Перейти</MoreContainerText>
        <MoreContainerIcon src="/moreArrow.svg" />
      </MoreContainer>
      <ServicePriceContainer>
        <ServicePrice>{service.price}р</ServicePrice>
      </ServicePriceContainer>
    </AllDownCard>
  </GridItem>
);

const ServicesPage = () => {
  const [services, setServices] = useState<ServicesDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError("Не удалось загрузить услуги");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <LoadingMessage>Загрузка услуг...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <Wrapper>
      <BackButton />
      <GridContainer>
        <GridItem $area="special1">
          <FirstGridItem />
        </GridItem>

        {services.slice(1, 5).map((index) => {
          const arrayIndex = services.indexOf(index);
          return (
            <ServiceCard
              key={services[arrayIndex]?.id}
              service={services[arrayIndex]}
              area={`service${index}`}
            />
          );
        })}

        <GridItem $area="special2">
          <LastGridItem />
        </GridItem>
      </GridContainer>
      <AllServices>
        {services.slice(5).map((service) => {
          return (
            <AllServiceCard key={service.id}>
              <AllServiceImage src={service.img} alt={service.title} />
              <AllServiceContent>
                <AllServiceTitle>{service.title}</AllServiceTitle>
                <AllServiceDescription>
                  {service.description}
                </AllServiceDescription>
              </AllServiceContent>
             
              <AllDownCard href={`/pages/catalog/${service.id}`}>
                <AllMoreContainer>
                  <AllMoreContainerText>Перейти</AllMoreContainerText>
                  <AllMoreContainerIcon src="/moreArrow.svg" />
                </AllMoreContainer>
                <AllServicePriceContainer>
                  <AllServicePrice>{service.price}р</AllServicePrice>
                </AllServicePriceContainer>
              </AllDownCard>
              
              
            </AllServiceCard>
          );
        })}
      </AllServices>
    </Wrapper>
  );
};

export default ServicesPage;
