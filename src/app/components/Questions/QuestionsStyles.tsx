import { Accordion as AccordionMui, AccordionDetails as AccordionDetailsMui, AccordionSummary as AccordionSummaryMui } from "@mui/material";
import styled from "styled-components";

export const AccordionSummary = styled(AccordionSummaryMui)`
    font-size: 22px;
    color: var(--color-help);
    font-weight: 100;

`

export const AccordionsCont = styled.div`
    display: flex;
    flex-direction:column;
    gap: 20px;
`

