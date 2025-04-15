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

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    width: 95%;
    border-radius: 15px;
  }
`;

export const NoAuthorization = styled.div`
  border-radius: 20px;
  width: 650px;
  height: 350px;
  background: #0b5c7e;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px 0;
  }

  @media (max-width: 480px) {
    width: 95%;
    border-radius: 15px;
  }
`

export const FeedbackTitle = styled.p`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 45px;
  color: #fff;
  margin: 40px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 35px;
    margin: 30px 0;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin: 20px 0;
  }
`;

export const FeedbackFormCont = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    width: 100%;
    padding: 0 20px;
  }
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

  @media (max-width: 768px) {
    width: 80%;
    height: 50px;
    
    &::placeholder {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    height: 45px;
    border-radius: 15px;
    
    &::placeholder {
      font-size: 14px;
    }
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

  @media (max-width: 768px) {
    width: 76%;
    height: 180px;
    
    &::placeholder {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    height: 150px;
    border-radius: 15px;
    padding: 15px;
    
    &::placeholder {
      font-size: 14px;
    }
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

  @media (max-width: 768px) {
    width: 180px;
    height: 45px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 160px;
    height: 40px;
    font-size: 16px;
    border-radius: 8px;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  align-self: flex-start;
  padding-left: 20px;

  @media (max-width: 768px) {
    font-size: 13px;
    padding-left: 15px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding-left: 10px;
  }
`;

export const NoAuthorizationText = styled.div`
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 35px;
  color: #fff;
  margin: 40px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 25px;
    margin: 30px 0;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin: 20px 0;
  }
`