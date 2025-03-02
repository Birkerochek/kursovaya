"use client";
import React, { useState } from "react";
import AuthButton from "../AuthButton/AuthButton";
import ModalFeedbackForm from "../ModalFeedbackForm/ModalFeedbackForm";
import Modal from "../Modal/Modal";
import {
  HeaderWrapper,
  HeaderCont,
  Left,
  LogoCont,
  Logo,
  FindService,
  FeedbackCont,
  FeedbackText,
  FeedbackButton,
} from "./HeaderStyles";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <HeaderWrapper>
        <HeaderCont>
          <Left>
            <LogoCont href="/">
              <Logo src="/logo.svg" alt="logo" />
            </LogoCont>
            <FindService placeholder="Найти услугу" type="text" />
          </Left>

          <FeedbackCont>
            <FeedbackText>+7 951 456 95 95</FeedbackText>
            <FeedbackButton onClick={() => setIsModalOpen(true)}>
              Оставить заявку
            </FeedbackButton>
          </FeedbackCont>
          <AuthButton />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalFeedbackForm />
          </Modal>
        </HeaderCont>
      </HeaderWrapper>
    </div>
  );
};

export default Header;
