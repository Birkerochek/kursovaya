import { styled } from "@mui/system";
import { Card, IconButton, Chip } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
}));

export const DeleteButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
});

export const StatusChip = styled(Chip)(({ status }: { status: string }) => ({
  backgroundColor:
    status === "approved"
      ? "#4caf50"
      : status === "rejected"
        ? "#f44336"
        : "#ff9800",
  color: "white",
  fontWeight: "bold",
}));
