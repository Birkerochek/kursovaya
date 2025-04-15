import styled from "styled-components";
import Link from "next/link";

export const StyledLink = styled(Link)`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:active {
    text-decoration: none;
    color: #2573d8; 
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const NotLink = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #000;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #2573d8;
  }

  @media (max-width: 1024px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const LinksCont = styled.div`
  display: flex;
  align-items: center;
  gap: 65px;
  margin: 30px 0;
  @media (max-width: 1024px) {
    gap: 40px;
    margin: 30px 0;
  }

  @media (max-width: 768px) {
    gap: 20px;
    margin: 20px 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    margin: 15px 0;
    align-items: flex-start;
  }
`;