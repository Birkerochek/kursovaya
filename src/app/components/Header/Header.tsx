"use client";
import React, { useState, useEffect } from "react";
import AuthButton from "../AuthButton/AuthButton";
import ModalFeedbackForm from "../ModalFeedbackForm/ModalFeedbackForm";
import Modal from "../Modal/Modal";
import { supabase } from "../supabaseClient";
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
} from "./HeaderStyles";
import Link from "next/link";
interface ISearchResult {
  id: number;
  title: string;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchServices = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const { data, error } = await supabase
          .from("services")
          .select("id, title")
          .ilike("title", `%${searchQuery}%`)
          .limit(5);

        if (error) throw error;
        setSearchResults(data || []);
      } catch (error) {
        console.error("Error searching services:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchServices, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div>
      <HeaderWrapper>
        <HeaderCont>
          <Left>
            <LogoCont href="/">
              <Logo src="/logo.svg" alt="logo" />
            </LogoCont>
            <div style={{ position: 'relative' }}>
              <FindService 
                placeholder="Найти услугу" 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((service: any) => (
                    <Link href={`/pages/catalog/${service.id}`} key={service.id} style={{ textDecoration: 'none' }}>
                      <SearchResultItem>
                        {service.title}
                      </SearchResultItem>
                    </Link>
                  ))}
                </SearchResults>
              )}
            </div>
          </Left>

          <FeedbackCont>
            <FeedbackText>+7 951 456 95 95</FeedbackText>
            <FeedbackButton onClick={() => setIsModalOpen(true)}>
              Оставить заявку
            </FeedbackButton>
          </FeedbackCont>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalFeedbackForm />
          </Modal>
          <AuthButton />
        </HeaderCont>
      </HeaderWrapper>
    </div>
  );
};

export default Header;
