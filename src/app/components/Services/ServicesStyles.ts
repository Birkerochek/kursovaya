import Link from "next/link";
import styled from "styled-components";

export const ServicesCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 66px;
  justify-content: center;
  
  @media (max-width: 1440px) {
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const ServiceItem = styled(Link)`
  text-decoration: none;
  border: 1px solid var(--color-black);
  border-radius: 15px;
  width: 447px;
  height: 308px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  
  @media (max-width: 1440px) {
    width: 380px;
    height: 280px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 240px;
    gap: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
  }
`;

export const ServiceItemImage = styled.img`
  height: 170px;
  width: 170px;

  @media (max-width: 1440px) {
    height: 150px;
    width: 150px;
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 120px;
  }

  @media (max-width: 480px) {
    height: 100px;
    width: 100px;
  }
`;

export const ServiceItemText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: var(--color-black);
  text-align: center;
  padding: 0 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;