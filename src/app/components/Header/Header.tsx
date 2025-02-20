"use client";
import React from "react";
import styled from "styled-components";

export const HeaderWrapper = styled.div`
  border-radius: 20px;
  max-width: 1814px;
  margin: 0 auto;
  height: 131px;
  background: #0b5c7e;
  margin-top: 25px;
`;
export const HeaderCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-inline: 40px;
`;
export const Logo = styled.img``;
export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 66px;
`;
export const FindService = styled.input`
  border: 1px solid #fff;
  border-radius: 15px;
  width: 731px;
  height: 60px;
  padding-left: 20px;
  background: none;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
export const FeedbackCont = styled.div`
  display: flex;
  gap: 62px;
  align-items: center;
`;

export const FeedbackText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
`;
export const FeedbackButton = styled.button`
  border-radius: 10px;
  width: 215px;
  height: 51px;
  background: #2573d8;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  &:hover {
    background: #1954a0;
  }
`;

const Header = () => {
  return (
    <div>
      <HeaderWrapper>
        <HeaderCont>
          <Left>
            <Logo src="/logo.svg" alt="logo" />
            <FindService placeholder="Найти услугу" type="text" />
          </Left>

          <FeedbackCont>
            <FeedbackText>+7 951 456 95 95</FeedbackText>
            <FeedbackButton>Оставить заявку</FeedbackButton>
          </FeedbackCont>
        </HeaderCont>
      </HeaderWrapper>
    </div>
  );
};

export default Header;
