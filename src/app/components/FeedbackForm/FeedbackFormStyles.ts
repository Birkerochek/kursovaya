import styled from "styled-components";

export const FeedbackCont = styled.div`
  border-radius: 20px;
  width: 650px;
  height: 850px;
  background: #0b5c7e;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`;

export const FeedbackTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 45px;
  color: #fff;
  margin: 40px 0;
  text-align: center;
`;

export const FeedbackFormCont = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const FeedbackInput = styled.input`
  border: 1px solid #fff;
  border-radius: 20px;
  width: 536px;
  height: 60px;
  background: none;
  padding-left: 20px;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    color: #a5a5a5;
  }
`;

export const FeedbackTextarea = styled.textarea`
  border: 1px solid #fff;
  border-radius: 20px;
  width: 516px;
  height: 200px;
  padding: 20px;
  background: none;

  &::placeholder {
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 20px;
    color: #a5a5a5;
  }
`;

export const FeedbackButton = styled.button`
  border-radius: 10px;
  width: 215px;
  height: 51px;
  background: #2573d8;
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
  border: none;

  &:hover {
    background: #1954a0;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
  padding-left: 20px;
`;
