"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded"; // آیکون مدرن‌تر
import { faqData } from "./faqs";

const FaqItem = ({ question, answer, id, expanded, handleChange }) => (
  <Accordion
    expanded={expanded === id}
    onChange={handleChange(id)}
    sx={{
      mb: 2,
      borderRadius: "20px !important",
      "&:before": { display: "none" }, // حذف خط پیش‌فرض MUI
      boxShadow:
        expanded === id ? "0 10px 25px -5px rgba(59, 130, 246, 0.1)" : "none",
      border: "1px solid",
      borderColor: expanded === id ? "#2563eb" : "#f1f5f9",
      transition: "all 0.3s ease",
      overflow: "hidden",
    }}
  >
    <AccordionSummary
      expandIcon={
        <AddRoundedIcon
          sx={{
            color: expanded === id ? "#2563eb" : "#64748b",
            transform: expanded === id ? "rotate(45deg)" : "rotate(0deg)",
            transition: "all 0.3s",
          }}
        />
      }
      sx={{
        px: 3,
        py: 1,
        backgroundColor: expanded === id ? "#eff6ff" : "white",
      }}
    >
      <Typography className="font-black text-slate-700 text-sm md:text-base pr-2 text-right w-full">
        {question}
      </Typography>
    </AccordionSummary>
    <AccordionDetails
      sx={{
        px: 4,
        pb: 3,
        pt: 0,
        backgroundColor: expanded === id ? "#eff6ff" : "white",
      }}
    >
      <div className="h-[1px] w-full bg-blue-100 mb-4 opacity-50"></div>
      <Typography className="text-slate-500 text-sm md:text-base leading-8 text-justify font-medium">
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default function QuestionsSite() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="w-full py-20 bg-white font-[vazir] dir-rtl">
      <div className="max-w-4xl mx-auto px-6">
        {/* هدر بخش */}
        <div className="text-center mb-12">
          
          <h2 className="text-3xl md:text-4xl font-[1000] text-slate-900 mt-2">
            سوالات <span className="text-blue-600">متداول</span>
          </h2>
          <p className="text-slate-400 mt-4 font-medium">
            پاسخ سریع به پرسش‌هایی که ممکن است برای شما پیش بیاید
          </p>
        </div>

        {/* لیست سوالات */}
        <div className="mt-10">
          {faqData.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              expanded={expanded}
              handleChange={handleChange}
            />
          ))}
        </div>

        {/* بخش تماس اضافی */}
        <div className="mt-12 p-6 bg-blue-50 rounded-[30px] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-800 font-bold text-sm md:text-base">
            پاسخ سوال خود را پیدا نکردید؟
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            ارسال تیکت پشتیبانی
          </button>
        </div>
      </div>
    </section>
  );
}
