import { styled as styleMui } from "@mui/system";
import { Card, IconButton, Chip } from "@mui/material";
import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  position: relative;
  border-radius: 15px;
`

export const DeleteButton = styleMui(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
});

export const StatusChip = styled.div<{ status: string }>`
  background-color: ${({ status }) =>
    status === "approved"
      ? "var(--color-approved)"
      : status === "rejected"
      ? "var(--color-rejected)"
      : "var(--color-pending)"};
  color: var(--color-white);
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const StatusText = styled.p`
  font-size: 14px;
  color: var(--color-white);
`

export const Grid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  
  
  
  
`
export const UserCont = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 8px rgba(0,0,0,0.3);
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const CreateMasterCont = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap:wrap;
  margin-bottom: 50px;

`

export const SubmitButton = styled.div`
background: var(--color-accent);
color: var(--color-white);
height: 40px;
width:150px;
font-size: 14px;
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
transition: .3s;

&:hover{
  background: var(--color-primary);
}
`
