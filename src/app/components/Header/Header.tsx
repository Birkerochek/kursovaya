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
} from "./HeaderStyles";
import Link from "next/link";
import { servicesApi } from "@/app/api/services/route";

interface ISearchResult {
  id: number;
  title: string;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const searchServices = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await servicesApi.searchServices(searchQuery);
        setSearchResults(results || []);
      } catch (error) {
        console.error("Error searching services:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchServices, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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
          <div style={{ position: "relative", flex: 1 }}>
            <FindService
              placeholder="Найти услугу"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Поиск услуг"
            />
            {searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((service) => (
                  <Link
                    href={`/pages/catalog/${service.id}`}
                    key={service.id}
                    style={{ textDecoration: "none" }}
                  >
                    <SearchResultItem>{service.title}</SearchResultItem>
                  </Link>
                ))}
              </SearchResults>
            )}
          </div>
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