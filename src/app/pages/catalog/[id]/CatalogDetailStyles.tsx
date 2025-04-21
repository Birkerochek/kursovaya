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
  padding: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  
`;
export const ServiceUse = styled.div`
display: flex;
gap: 20px;
align-items: center;
`
export const ServiceTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--color-help);
  margin-bottom: 1rem;
`;

export const ServiceDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-grey);
  
`;

export const PriceContainer = styled.div`
  background: var(--color-help);
  color: var(--color-white);
  padding: 1rem 2rem;
  border-radius: 10px;
  display: inline-block;
`;
export const ServiceContent = styled.div`
`

export const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const OrderButton = styled.button`
  background: var(--color-accent);
  color: var(--color-white);
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-help);
  }
`;
