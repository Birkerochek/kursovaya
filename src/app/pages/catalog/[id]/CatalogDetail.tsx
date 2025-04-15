"use client";

import { useState } from "react";
import { Wrapper } from "@/app/components/Wrapper/Wrapper";
import Modal from "@/app/components/Modal/Modal";
import ModalFeedbackForm from "@/app/components/ModalFeedbackForm/ModalFeedbackForm";
import BackButton from "@/app/UI/BackButton";
import {
  DetailContainer,
  ServiceHeader,
  ImageContainer,
  ServiceImage,
  ServiceInfo,
  ServiceTitle,
  ServiceDescription,
  PriceContainer,
  Price,
  OrderButton,
  ServiceUse,
  ServiceContent,
} from "./CatalogDetailStyles";

interface ServiceData {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
}

interface CatalogDetailProps {
  service: ServiceData;
}

export default function CatalogDetail({ service }: CatalogDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      <DetailContainer>
        <BackButton />
        <ServiceHeader>
          <ImageContainer>
            <ServiceImage src={service.img} alt={service.title} />
          </ImageContainer>
          <ServiceInfo>
            <ServiceContent>

            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceContent>

            <ServiceUse>

            <PriceContainer>
              <Price>{service.price}р</Price>
            </PriceContainer>
            <OrderButton onClick={() => setIsModalOpen(true)}>
              Заказать услугу
            </OrderButton>
            </ServiceUse>
          </ServiceInfo>
        </ServiceHeader>
      </DetailContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalFeedbackForm />
      </Modal>
    </Wrapper>
  );
}
