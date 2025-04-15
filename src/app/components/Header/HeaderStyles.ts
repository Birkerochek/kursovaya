import styled from "styled-components";
import Link from "next/link";

export const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  max-width: 99%;
  margin: 0 auto;
  background: #0b5c7e;
  padding: 0 20px;
  height: 130px;
  border-radius: 16px;
  transition: height 0.3s ease, border-radius 0.3s ease;
  margin-top: 10px;
  margin-inline: 10px;

  @media (max-width: 1024px) {
    height: 120px;
    padding: 0 15px;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    height: 110px;
    padding: 0 10px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    height: 100px;
    padding: 0 8px;
    border-radius: 8px;
  }
`;

export const HeaderCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 5px;
  }
`;

export const LogoCont = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;

  @media (max-width: 1024px) {
    width: 70px;
  }

  @media (max-width: 768px) {
    width: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;

  @media (max-width: 1024px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const FindService = styled.input`
  border: 1px solid #fff;
  border-radius: 12px;
  width: 30%;
  height: 40px;
  padding: 0 15px;
  background: transparent;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  transition: height 0.3s ease, font-size 0.3s ease;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 1024px) {
    height: 36px;
    font-size: 15px;
    width:50%;

    &::placeholder {
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    height: 32px;
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    height: 28px;
    font-size: 12px;
    padding: 0 10px;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;

  @media (max-width: 768px) {
    border-radius: 0 0 10px 10px;
    margin-top: 2px;
  }
`;

export const SearchResultItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f7f7f7;
  }

  &:last-child {
    border-radius: 0 0 12px 12px;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

export const FeedbackCont = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 20px;

  @media (max-width: 1024px) {
    gap: 15px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FeedbackText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  white-space: nowrap;

  @media (max-width: 1024px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const FeedbackButton = styled.button`
  border-radius: 8px;
  width: 160px;
  height: 36px;
  background: #2573d8;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  border: none;
  transition: background 0.3s ease;

  &:hover {
    background: #1954a0;
  }

  @media (max-width: 1024px) {
    width: 140px;
    height: 34px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 32px;
    font-size: 12px;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 10px;
  background: #0b5c7e;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 15px;
    right: 8px;
  }
`;