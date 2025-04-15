import styled from "styled-components";

export const AboutUsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const TextContent = styled.div`
  padding: 1rem;
`;

export const Description = styled.p`
  font-size: 1.7rem;
  line-height: 1.6;
  color: #000000;
  margin: 0;
  text-align: left;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AboutUsImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;