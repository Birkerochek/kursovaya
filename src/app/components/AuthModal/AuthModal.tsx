import React, { useState } from "react";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
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

const Tab = styled.button<{ active: string }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  color: ${(props) => (props.active === "true" ? "#1B3764" : "#666")};
  border-bottom: 2px solid
    ${(props) => (props.active === "true" ? "#1B3764" : "transparent")};
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
const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

interface FormData {
  email: string;
  password: string;
  name?: string;
}



const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setError(null);
    setLoading(true);

    try {
      if (activeTab === "register") {
        const response = await fetch(`/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Ошибка при регистрации");
        }
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      onLoginSuccess(data.name || "");
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <TabContainer>
          <Tab
            active={(activeTab === "login").toString() as any}
            onClick={() => setActiveTab("login")}
          >
            Вход
          </Tab>
          <Tab
            active={(activeTab === "register").toString() as any}
            onClick={() => setActiveTab("register")}
          >
            Регистрация
          </Tab>
        </TabContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {activeTab === "register" && (
            <>
              <Input
                {...register("name", {
                  required: "Имя обязательно",
                  minLength: {
                    value: 2,
                    message: "Имя должно содержать минимум 2 символа",
                  },
                })}
                type="text"
                placeholder="Имя"
              />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </>
          )}
          <Input
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат email",
              },
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          
          <Input
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символов",
              },
            })}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

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

export default AuthModal;