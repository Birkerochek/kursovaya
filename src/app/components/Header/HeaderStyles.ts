import styled from "styled-components";
import Link from "next/link";

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-radius: 20px;
  max-width: 1814px;
  margin: 0 auto;
  height: 131px;
  background: #0b5c7e;
  padding: 0 20px;
`;

export const HeaderCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-inline: 40px;
`;

export const LogoCont = styled(Link)`
  text-decoration: none;
  cursor: pointer;
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

export const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 5px;
`;

export const SearchResultItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  color: #000;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-radius: 0 0 15px 15px;
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
