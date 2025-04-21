import { Accordion, AccordionDetails} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, { useState } from "react";
import { AccordionsCont, AccordionSummary } from "./QuestionsStyles";


export default function Accordions() {
    const [expanded, setExpanded] = useState<string | false>('panel1');

const handleChange =
  (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
    return (
        <AccordionsCont>

            <Accordion
            expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
            defaultExpanded slotProps={{ heading: { component: 'h4' }, transition:{unmountOnExit: true}, }}>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Как происходит оплата?
                </AccordionSummary>
                <AccordionDetails>
                Оплата пока предусмотрена только наличными, в дальнейшем планируется внедрять онлайн систему оплаты.
                </AccordionDetails>
                
            </Accordion>
            <Accordion
            expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
            slotProps={{ heading: { component: 'h4' }, transition:{unmountOnExit: true}, }}>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Сколько в среднем обрабатывается заявка?
                </AccordionSummary>
                <AccordionDetails>
                Ваша заявка будет обработана не дольше, чем через 2 часа в дневное время суток, если не уложимся в этот срок, вам будет предоставлена скидка!
                </AccordionDetails>
            </Accordion>
            <Accordion
            expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
            slotProps={{ heading: { component: 'h4' }, transition:{unmountOnExit: true}, }}>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Как оформить заявку на ремонт техники онлайн?
                </AccordionSummary>
                <AccordionDetails>
                Для оформления заявки необходимо заполнить форму на сайте, указав ваше имя, контактный номер телефона, электронную почту (необязательно), модель устройства и описание неисправности. После отправки заявки с вами свяжется менеджер для уточнения деталей и согласования времени приёма или выезда курьера
                </AccordionDetails>
            </Accordion>


        </AccordionsCont>

    )

}

