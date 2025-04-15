import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@/app/components/Modal/Modal";
import ModalFeedbackForm from "@/app/components/ModalFeedbackForm/ModalFeedbackForm";
import { Mark } from "./styles";

export const SpecialItemContainer = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h2`
  font-size: clamp(20px, 4vw, 32px);
  color: #163E72;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: clamp(14px, 2.5vw, 18px);
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

export const ActionButton = styled.button`
  background: #163E72;
  color: white;
  padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px);
  border: none;
  border-radius: 4px;
  font-size: clamp(12px, 2vw, 16px);
  cursor: pointer;
  transition: background 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: #0B5C7E;
  }
`;

export const FirstGridItem = () => {
  return (
    <SpecialItemContainer>
      <Title>Специальное предложение</Title>
      <Description>
        Позвоните по номеру и скажите кодовое слово <Mark>Курсовая</Mark>  и получите скидку 20% при оформлении заявки прямо сейчас!
      </Description>
      <ActionButton>+7 (900) 084-86-83</ActionButton>
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