import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  color: ${(props) => (props.active ? "#1B3764" : "#666")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#1B3764" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #1b3764;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1b3764;
  }
`;

const SubmitButton = styled.button`
  background: #1b3764;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #152a4d;
  }
`;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(activeTab === "register" && { name: formData.get("name") }),
    };

    try {
      const response = await fetch(`/api/auth/${activeTab}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Произошла ошибка");
      }

      // Успешная авторизация/регистрация
      onClose();
      window.location.reload(); // Перезагружаем страницу для обновления состояния
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <TabContainer>
          <Tab
            active={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            Вход
          </Tab>
          <Tab
            active={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          >
            Регистрация
          </Tab>
        </TabContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          {activeTab === "register" && (
            <Input name="name" type="text" placeholder="Имя" required />
          )}
          <Input name="email" type="email" placeholder="Email" required />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading
              ? "Загрузка..."
              : activeTab === "login"
                ? "Войти"
                : "Зарегистрироваться"}
          </SubmitButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ErrorMessage = styled.div`
  color: #e53935;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

export default AuthModal;
