"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import AuthButton from "../AuthButton/AuthButton";
import ModalFeedbackForm from "../ModalFeedbackForm/ModalFeedbackForm";
import Modal from "../Modal/Modal";

const MobileHeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #0b5c7e;
  padding: 0 10px;
  height: 110px;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileHeaderCont = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const LogoCont = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 60px;
  height: auto;
  object-fit: contain;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 10px;
  background: #0b5c7e;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1001;
`;

const MenuText = styled.p`
  color: #fff;
  margin: 0;
  font-size: 14px;
`;

const MenuButtonFeedback = styled.button`
  border: none;
  border-radius: 8px;
  background: #2573d8;
  color: #fff;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #1954a0;
  }
`;

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
