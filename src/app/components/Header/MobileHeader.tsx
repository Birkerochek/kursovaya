"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import AuthButton from "../AuthButton/AuthButton";
import ModalFeedbackForm from "../ModalFeedbackForm/ModalFeedbackForm";
import Modal from "../Modal/Modal";
import { Logo, LogoCont, MenuButton, MenuButtonFeedback, MenuText, MobileHeaderCont, MobileHeaderWrapper, MobileMenu } from "./HeaderStyles";



const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <MobileHeaderWrapper>
        <MobileHeaderCont>
          <LogoCont href="/">
            <Logo src="/logo.svg" alt="Логотип" loading="lazy" />
          </LogoCont>
          <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </MenuButton>
        </MobileHeaderCont>
        {isMenuOpen && (
          <MobileMenu>
            <MenuText>+7 951 456 95 95</MenuText>
            <MenuButtonFeedback onClick={() => setIsModalOpen(true)}>
              Оставить заявку
            </MenuButtonFeedback>
            <AuthButton />
          </MobileMenu>
        )}
      </MobileHeaderWrapper>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalFeedbackForm />
      </Modal>
    </>
  );
};

export default MobileHeader;
