import React, { useState } from "react";
import styled from "styled-components";
import AuthModal from "../AuthModal/AuthModal";
import { useSession, signOut } from "next-auth/react";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Username = styled.span`
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    border: 2px solid #1b3764;

    background: #1b3764;
    color: white;
  }
`;

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {session ? (
        <Container>
          <Username>{session.user?.name}</Username>
          <Button onClick={handleLogout}>Выход</Button>
        </Container>
      ) : (
        <Button onClick={handleLogin}>Войти</Button>
      )}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={(name: string) => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default AuthButton;
