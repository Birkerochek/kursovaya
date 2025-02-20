"use client";
import styled from "styled-components";
import { Wrapper } from "../Wrapper/Wrapper";
import Link from "next/link";
import { useState } from "react";
import { GlobalStyles } from "@/app/GlobalStyles";
import { signIn } from "next-auth/react";

export const StyledLink = styled(Link)`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  &:hover,
  &:active {
    text-decoration: none;
  }
;`
export const NotLink = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #000;
  cursor: pointer;
;`

export const LinksCont = styled.div`
  display: flex;
  align-items: center;
  gap: 65px;
  margin: 40px 0;
;`



const Links = () => {


  return (
    <div>
      <GlobalStyles />
      <Wrapper>
        <LinksCont>
          <StyledLink href="/pages/catalog">Каталог услуг</StyledLink>
          <NotLink>О компании</NotLink>
          <StyledLink href="/pages/reviews">Отзывы</StyledLink>
          <NotLink>Контакты</NotLink>
          <NotLink>Вход</NotLink>
        </LinksCont>
      </Wrapper>
    </div>
  );
};

export default Links;