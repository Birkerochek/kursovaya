import styled from "styled-components";

export const FormContainer = styled.div`
  border-radius: 20px;
  background: var(--color-primary);
  padding: 20px;
  width: 100%;
  max-width: 500px;
`;
export const NoForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-direction:column;
`
export const NoAuthorizationText = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: var(--color-grey-white);
`
export const FormTitle = styled.h3`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 28px;
  color: #fff;
  margin: 20px 0;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0 20px 20px;
`;

export const Input = styled.input`
  border: 1px solid var(--color-white);
  border-radius: 15px;
  width: 92.5%;
  height: 50px;
  background: none;
  padding: 0 15px;
  color: #fff;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: var(--color-light-grey);
  }
`;

export const Textarea = styled.textarea`
  border: 1px solid var(--color-white);
  border-radius: 15px;
  width: 92.5%;
  height: 120px;
  padding: 15px;
  background: none;
  color: #fff;
  resize: none;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 16px;
    color: #a5a5a5;
  }
`;

export const SubmitButton = styled.button`
  border-radius: 10px;
  width: 100%;
  height: 45px;
  background: var(--color-accent);
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 18px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--color-help);
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-rejected);
  font-size: 14px;
  margin-top: -10px;
`;
