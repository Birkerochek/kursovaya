import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  grid-template-areas:
    "a a b c"
    "e f g g";
`;

export const GridItem = styled.div<{ $area: string }>`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  grid-area: ${(props) => props.$area};
  height: 372px;
 
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const ServiceTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
`;

export const ServiceDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53935;
  font-size: 1rem;
`;

export const ServiceImage = styled.img`
  height: 40%;
`; 