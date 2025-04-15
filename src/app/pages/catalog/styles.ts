import Link from "next/link";
import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  gap: 2vw; 
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "special1 special1 service1 service2"
    "service3 service4 special2 special2";
  

  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "special1 special1"
      "service1 service2"
      "service3 service4"
      "special2 special2";
    gap: 3vw;
  }

 
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "special1"
      "service1"
      "service2"
      "service3"
      "service4"
      "special2";
    gap: 4vw;
  }
`;

export const GridItem = styled.div<{ $area?: string }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 372px;
  grid-area: ${props => props.$area};
  

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
    padding: 1rem;
  }
`;

export const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ServiceTitle = styled.h3`
  font-family: var(--font-family);
  font-weight: 700;
  font-size: clamp(16px, 2.5vw, 20px);
  color: #000;
  margin: 0;
`;

export const ServiceDescription = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 2vw, 15px);
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const ServicePriceContainer = styled.div`
  border-radius: 10px;
  width: clamp(80px, 10vw, 104px);
  height: clamp(24px, 4vw, 30px);
  background: #163E72;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const DownCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
`;

export const MoreContainerText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 2vw, 15px);
  color: #000;
`;

export const MoreContainerIcon = styled.img`
  margin-top: 2px;
  width: 45px;
`;

export const ServicePrice = styled.p`
  font-family: var(--font-family);
  font-weight: 200;
  font-size: clamp(10px, 1.8vw, 13px);
  color: #fff;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: clamp(14px, 2.5vw, 16px);
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e53935;
  font-size: clamp(14px, 2.5vw, 16px);
`;

export const ServiceImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
`;

export const AllServices = styled.div`
  display: flex;
  
  gap: 2vw;
  flex-wrap: wrap;
  margin-top: 3vw;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 4vw;
  }
`;

export const AllServiceImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
`;

export const AllServiceTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 700;
  font-size: clamp(16px, 2.5vw, 20px);
  color: #000;
  margin: 0;
`;

export const AllServiceDescription = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 2vw, 15px);
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const AllServicePriceContainer = styled.div`
  border-radius: 10px;
  width: clamp(80px, 10vw, 104px);
  height: clamp(24px, 4vw, 30px);
  background: #163E72;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AllMoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const AllDownCard = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  cursor: pointer;
  text-decoration: none;
`;

export const AllMoreContainerText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: clamp(12px, 2vw, 15px);
  color: #000;
`;

export const AllMoreContainerIcon = styled.img`
  margin-top: 2px;
  width: 45px;
  transition: all 0.3s ease;
 
`;

export const AllServicePrice = styled.p`
  font-family: var(--font-family);
  font-weight: 200;
  font-size: clamp(10px, 1.8vw, 13px);
  color: #fff;
`;

export const Mark = styled.mark`
background: #2573D8;
border-radius: 5px;
padding: 2px 5px;
color: #fff;
`

export const AllServiceCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  width: 290px;
  height: 360px;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    min-height: 300px;
    padding: 1rem;
  }
`;

export const AllServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;