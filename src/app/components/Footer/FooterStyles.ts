import styled from "styled-components";
import Link from "next/link";

export const FooterContainer = styled.footer`
  background-color: var(--color-primary);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  color: #fff;
  border-radius: 16px;
  padding: 20px 20px;
  margin-inline: 10px;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  

  h3 {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  p {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 1rem;
    margin: 0.3rem 0;
    color: var(--color-white-grey);
    line-height: 1.6;
  }
`;

export const FooterLink = styled(Link)`
  font-family: var(--font-family);
  color: var(--color-white-grey);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 1rem;
  display: block;
  margin: 0.5rem 0;

  &:hover {
    color: var(--color-accent);
  }
`;


export const FooterBottom = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-grey-white);

  p {
    font-family: var(--font-family);
    color: var(--color-grey-white);
    font-size: 0.9rem;
  }
`;