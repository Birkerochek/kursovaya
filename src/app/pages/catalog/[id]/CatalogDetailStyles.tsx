import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const ServiceHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  flex: 0 0 40%;
  border-radius: 15px;
  overflow: hidden;
`;

export const ServiceImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const ServiceInfo = styled.div`
  flex: 1;
`;

export const ServiceTitle = styled.h1`
  font-size: 2.5rem;
  color: #1b3764;
  margin-bottom: 1rem;
`;

export const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

export const PriceContainer = styled.div`
  background: #163e72;
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  display: inline-block;
`;

export const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const OrderButton = styled.button`
  background: #1b3764;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: background 0.3s ease;

  &:hover {
    background: #152a4d;
  }
`;
