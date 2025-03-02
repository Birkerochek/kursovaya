import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "special1 special1 service1 service2"
    "service3 service4 special2 special2";
    gap: 55px;
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
 
  
`;
export const ServiceContent = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
export const UpCard = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`

export const ServiceTitle = styled.h3`
 font-family: var(--font-family);
font-weight: 700;
font-size: 20px;
color: #000;
margin: 0;
`;

export const ServiceDescription = styled.p`
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 15px;
    color: #000;
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin:0;
`;
export const ServicePriceContainer = styled.div`
border-radius: 10px;
width: 104px;
height: 30px;
background: #163e72;
display: flex;
justify-content: center;
align-items: center;

`
export const MoreContainer = styled.div`
display: flex;
align-items: center;
gap: 6px;
`
export const DownCard = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 98%;

`
export const MoreContainerText = styled.p`
font-family: var(--font-family);
font-weight: 400;
font-size: 15px;
color: #000;
`
export const MoreContainerIcon = styled.img`
margin-top: 2px;
`

export const ServicePrice = styled.p`
font-family: var(--font-family);
font-weight: 200;
font-size: 13px;
color: #fff;
`

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
  display: block;
  margin: 0 auto;
  
`;

export const AllServices = styled.div`
display: flex;
gap: 55px;
flex-wrap: wrap;
margin-top: 55px;
`


export const AllServiceImage = styled.img`
display: block;
margin: 0 auto;
`

export const AllServiceTitle = styled.p`
 font-family: var(--font-family);
font-weight: 700;
font-size: 20px;
color: #000;
margin: 0;
`
export const AllServiceDescription = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 15px;
  color: #000;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin:0;
`

export const AllUpCard = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
export const AllServicePriceContainer = styled.div`
border-radius: 10px;
width: 104px;
height: 30px;
background: #163e72;
display: flex;
justify-content: center;
align-items: center;

`
export const AllMoreContainer = styled.div`
display: flex;
align-items: center;
gap: 6px;
`
export const AllDownCard = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 98%;

`
export const AllMoreContainerText = styled.p`
font-family: var(--font-family);
font-weight: 400;
font-size: 15px;
color: #000;
`
export const AllMoreContainerIcon = styled.img`
margin-top: 2px;
`

export const AllServicePrice = styled.p`
font-family: var(--font-family);
font-weight: 200;
font-size: 13px;
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
  height: 360px;
  width: 278.7px;
  
  `

export const AllServiceContent = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`


