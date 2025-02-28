import React, { useState } from "react";
import styled from "styled-components";
import AuthModal from "../AuthModal/AuthModal";

const Button = styled.button`
  background: transparent;
  border: 2px solid #1b3764;
  color: #1b3764;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1b3764;
    color: white;
  }
`;

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Войти</Button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AuthButton;
