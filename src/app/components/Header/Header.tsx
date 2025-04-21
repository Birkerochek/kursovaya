"use client";
import React, { useState, useEffect } from "react";
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
  SearchResults,
  SearchResultItem,
  MenuButton,
  MobileMenu,
  NoResults,
} from "./HeaderStyles";
import Link from "next/link";
import { Service } from "@/app/lib/supabase/serviceApi";
import SearchBar from "./SearchBar";

interface ISearchResult {
  id: number;
  title: string;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderWrapper>
      <HeaderCont>
        <Left>
          <LogoCont href="/">
            <Logo src="/logo.svg" alt="Логотип" loading="lazy" />
          </LogoCont>
          <SearchBar/>
        </Left>

        <MenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? "✕" : "☰"}
        </MenuButton>

        <FeedbackCont>
          <FeedbackText>+7 951 456 95 95</FeedbackText>
          <FeedbackButton onClick={() => setIsModalOpen(true)}>
            Оставить заявку
          </FeedbackButton>
          <AuthButton />
        </FeedbackCont>

        {isMobileMenuOpen && (
          <MobileMenu>
            <FeedbackText>+7 951 456 95 95</FeedbackText>
            <FeedbackButton onClick={() => setIsModalOpen(true)}>
              Оставить заявку
            </FeedbackButton>
            <AuthButton />
          </MobileMenu>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalFeedbackForm />
        </Modal>
      </HeaderCont>
    </HeaderWrapper>
  );
};

export default Header;