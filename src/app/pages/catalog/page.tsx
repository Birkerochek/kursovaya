"use client";
import { useEffect, useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
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
import { Service } from "@/app/lib/supabase/serviceApi";
import useCatalogFetch from "./hooks/useCatalogFetch";
import { createErrorHandler } from "@/app/utils/fetchError";

const ServiceCard = ({
  service,
  area,
}: {
  service: Service;
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
  const getServiceError = createErrorHandler("услуг")
  const { isLoading,isError, error, data: services = [] } = useCatalogFetch()
  if (isLoading) return <LoadingMessage>Загрузка услуг...</LoadingMessage>;
  if (isError) return <ErrorMessage>{getServiceError(error)}</ErrorMessage>;

  return (
    <Wrapper>
      <BackButton />
      <GridContainer>
        <GridItem $area="special1">
          <FirstGridItem />
        </GridItem>

        {services.slice(0, 4).map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            area={`service${index + 1}`}
          />
        ))}

        <GridItem $area="special2">
          <LastGridItem />
        </GridItem>
      </GridContainer>
      <AllServices>
        {services.slice(4).map((service) => (
          <AllServiceCard key={service.id}>
            <AllServiceImage src={service.img} alt={service.title} />
            <AllServiceContent>
              <AllServiceTitle>{service.title}</AllServiceTitle>
              <AllServiceDescription>{service.description}</AllServiceDescription>
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
        ))}
      </AllServices>
    </Wrapper>
  );
};

export default ServicesPage;