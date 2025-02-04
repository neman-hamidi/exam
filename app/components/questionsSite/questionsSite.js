import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function questionsSite() {
  return (
    <div>
      <div className="w-9/10 mx-auto">
        <p className="text-center font-bold text-lg text-gray-500 py-5">
          پرسش و پاسخ
        </p>
        <Accordion className="mb-4">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography className="fs-4 text-sm md:text-base pl-1">
              بانک سوال چه ویژگی هایی دارد ؟
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="pt-0">
            <Typography className="text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography className="fs-5 text-sm md:text-base pl-1">
              هزینه دسترسی به بانک سوال چه مقدار است؟
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="pt-0">
            <Typography className="text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography className="fs-5 text-sm md:text-base pl-1">
              بانک سوال چه مزایایی دارد؟
            </Typography>
          </AccordionSummary>
          <AccordionDetails className=" pt-0">
            <Typography className="fs-5 text-sm md:text-base pl-1 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className="mb-4">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography className="fs-5 text-sm md:text-base pl-1">
              با چه دستگاهی میتوان به بانک سوال دسترسی داشت؟
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="pt-0">
            <Typography className="text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
