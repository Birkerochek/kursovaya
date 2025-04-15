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
      ? "#4caf50"
      : status === "rejected"
      ? "#f44336"
      : "#ff9800"};
  color: white;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
export const StatusText = styled.p`
  font-size: 14px;
  color: #fff;
`

export const Grid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  
  
  
  
`
