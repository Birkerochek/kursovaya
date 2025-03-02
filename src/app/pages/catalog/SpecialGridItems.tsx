import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@/app/components/Modal/Modal";
import ModalFeedbackForm from "@/app/components/ModalFeedbackForm/ModalFeedbackForm";

const SpecialItemContainer = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 32px;
  color: #1b3764;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  background: #1b3764;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: #152a4d;
  }
`;

export const FirstGridItem = () => {
  return (
    <SpecialItemContainer>
      <Title>Специальное предложение</Title>
      <Description>
        Получите скидку 20% на первый заказ при оформлении заявки прямо сейчас
      </Description>
      <ActionButton>Получить скидку</ActionButton>
    </SpecialItemContainer>
  );
};

export const LastGridItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SpecialItemContainer>
      <Title>Нужна консультация?</Title>
      <Description>
        Оставьте заявку и наш специалист свяжется с вами в ближайшее время
      </Description>
      <ActionButton onClick={() => setIsModalOpen(true)}>
        Оставить заявку
      </ActionButton>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalFeedbackForm />
      </Modal>
    </SpecialItemContainer>
  );
};
