import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@/app/components/Modal/Modal";
import ModalFeedbackForm from "@/app/components/ModalFeedbackForm/ModalFeedbackForm";

export const SpecialItemContainer = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: clamp(20px, 4vw, 32px);
  color: #1b3764;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: clamp(14px, 2.5vw, 18px);
  color: #666;
  margin-bottom: 1.5rem;
`;

export const ActionButton = styled.button`
  background: #1b3764;
  color: white;
  padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px);
  border: none;
  border-radius: 4px;
  font-size: clamp(12px, 2vw, 16px);
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