"use client";
import { UserContext } from "@/app/userProvider/userProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import Loading from "../loading/loading";
import Image from "next/image";
import {
  TimerOutlined,
  ChevronLeft,
  Replay,
  AssignmentTurnedIn,
  HelpOutline,
  CheckCircle,
  Cancel,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const ExampleQues = ({ namecourse }) => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showResultQuestion, setShowResultQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [yourChoices, setYourChoices] = useState({ id: [], choice: [] });
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3010/${namecourse}`);
        const result = await response.json();
        if (result.length > 0) {
          setQuestions(result);
          setUnavailable(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [namecourse]);

  // Timer Logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startHandle = () => {
    setReady(true);
    setIsActive(true);
  };

  const handleOptionClick = (choice, id) => {
    setSelectedOption(choice);
  };

  const handleNextQuestion = () => {
    // ذخیره انتخاب فعلی
    setYourChoices((prev) => ({
      id: [...prev.id, questions[currentQuestionIndex].id],
      choice: [...prev.choice, selectedOption],
    }));

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleQuizRestart = () => {
    setTimer(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsActive(true);
    setShowResultQuestion(false);
    setYourChoices({ id: [], choice: [] });
  };

  if (loading) return <Loading />;

  if (unavailable) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-8">
        <Image
          src="/images/question.svg"
          width={300}
          height={300}
          alt="no-questions"
          className="opacity-80"
          unoptimized
        />
        <h2 className="text-2xl font-black text-slate-700">
          هنوز سوالی برای این درس طرح نشده!
        </h2>
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 font-bold flex items-center gap-2"
        >
          بازگشت به عقب <ChevronLeft />
        </button>
      </div>
    );
  }

  // --- صفحه نتیجه نهایی ---
  if (currentQuestionIndex >= questions.length) {
    if (isActive) setIsActive(false);

    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 font-[vazir] dir-rtl">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-blue-100 overflow-hidden border border-blue-50">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white text-center">
            <AssignmentTurnedIn
              sx={{ fontSize: 60 }}
              className="mb-4 opacity-80"
            />
            <h2 className="text-3xl font-black">پایان آزمون!</h2>
            <p className="mt-2 text-blue-100 italic">
              خسته نباشی، نتیجه تلاشت رو اینجا ببین
            </p>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-slate-500 text-sm mb-1">امتیاز شما</span>
              <div className="text-4xl font-black text-blue-600">
                {score}{" "}
                <span className="text-lg text-slate-400">
                  از {questions.length}
                </span>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center">
              <span className="text-slate-500 text-sm mb-1">زمان کل</span>
              <div className="text-4xl font-black text-slate-700">
                {formatTime(timer)}
              </div>
            </div>
          </div>

          <div className="p-8 pt-0 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleQuizRestart}
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              <Replay fontSize="small" /> شروع دوباره آزمون
            </button>
            <button
              onClick={() => setShowResultQuestion(!showResultQuestion)}
              className="flex-1 bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              {showResultQuestion
                ? "پنهان‌سازی تحلیل"
                : "بررسی سوالات و پاسخ‌نامه"}
            </button>
          </div>
        </div>

        {/* بخش تحلیل سوالات */}
        {showResultQuestion && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <HelpOutline className="text-blue-600" /> تحلیل خط‌به‌خط سوالات:
            </h3>
            {questions.map((item, index) => {
              const userAns = yourChoices.choice[index];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden"
                >
                  <div
                    className={`absolute right-0 top-0 bottom-0 w-2 ${
                      userAns === item.correctAnswer
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  ></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-bold">
                      سوال شماره {index + 1}
                    </span>
                    {userAns === item.correctAnswer ? (
                      <CheckCircle className="text-emerald-500" />
                    ) : (
                      <Cancel className="text-rose-500" />
                    )}
                  </div>
                  <p className="text-lg font-bold text-slate-800 mb-6 leading-relaxed">
                    {item.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[item.qu1, item.qu2, item.qu3, item.qu4].map(
                      (opt, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl text-sm font-medium border-2 transition-all 
                        ${
                          opt === item.correctAnswer
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : opt === userAns
                            ? "border-rose-200 bg-rose-50 text-rose-700"
                            : "border-slate-50 bg-slate-50 text-slate-500"
                        }`}
                        >
                          {opt}
                        </div>
                      )
                    )}
                  </div>
                  {item.description && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm leading-relaxed text-blue-800 border-r-4 border-blue-400">
                      <strong>پاسخ تشریحی:</strong> {item.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // --- صفحه خوش‌آمدگویی قبل شروع ---
  if (!ready) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-6 font-[vazir] dir-rtl text-center">
        <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <h1 className="text-3xl font-black text-slate-800 mb-6 underline decoration-blue-500 decoration-4 underline-offset-8">
            آماده‌ای برای آزمون {questions[0]?.Title || namecourse}؟
          </h1>
          <div className="space-y-4 mb-10">
            <div className="bg-blue-50 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-slate-600 font-bold">تعداد کل سوالات:</span>
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full">
                {questions.length} سوال
              </span>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl flex items-center justify-between">
              <span className="text-slate-600 font-bold">زمان پیشنهادی:</span>
              <span className="bg-amber-500 text-white px-4 py-1 rounded-full">
                {questions[0]?.SuggestTime || "15"} دقیقه
              </span>
            </div>
          </div>
          <button
            onClick={startHandle}
            className="w-full bg-blue-600 text-white py-5 rounded-[20px] text-xl font-black shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            بزن بریم شروع کنیم!
          </button>
          <Image
            src="/images/onlineTest.svg"
            width={250}
            height={250}
            alt="start-quiz"
            className="mx-auto mt-10"
            unoptimized
          />
        </div>
      </div>
    );
  }

  // --- بدنه اصلی آزمون (در حال اجرا) ---
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 font-[vazir] dir-rtl">
      {/* هدر آزمون */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTime(!showTime)}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400"
          >
            {showTime ? <VisibilityOff /> : <Visibility />}
          </button>
          {showTime && (
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2 shadow-sm">
              <TimerOutlined
                className="text-blue-500 animate-pulse"
                fontSize="small"
              />
              <span className="font-mono font-bold text-slate-700 text-lg">
                {formatTime(timer)}
              </span>
            </div>
          )}
        </div>
        <div className="text-left">
          <span className="text-slate-400 text-xs font-bold block mb-1">
            پیشرفت آزمون
          </span>
          <span className="text-blue-600 font-black">
            {currentQuestionIndex + 1} از {questions.length}
          </span>
        </div>
      </div>

      {/* نوار پیشرفت */}
      <div className="w-full h-3 bg-slate-100 rounded-full mb-10 overflow-hidden border border-slate-50">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* کارت سوال */}
      <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-left-4 duration-500">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {[
            currentQuestion.qu1,
            currentQuestion.qu2,
            currentQuestion.qu3,
            currentQuestion.qu4,
          ].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(opt, currentQuestion.id)}
              className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 text-right
                ${
                  selectedOption === opt
                    ? "border-blue-600 bg-blue-50 shadow-md shadow-blue-100"
                    : "border-slate-100 bg-slate-50 hover:border-blue-200 hover:bg-white"
                }`}
            >
              <span
                className={`font-bold ${
                  selectedOption === opt ? "text-blue-700" : "text-slate-600"
                }`}
              >
                {opt}
              </span>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  selectedOption === opt
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 group-hover:border-blue-400"
                }`}
              >
                {selectedOption === opt && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </button>
          ))}

          <button
            onClick={() => setSelectedOption("بدون پاسخ")}
            className="mt-4 text-slate-400 text-sm font-bold hover:text-rose-500 transition-colors"
          >
            نمی‌دانم (رد کردن سوال)
          </button>
        </div>

        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          className={`w-full mt-10 py-5 rounded-[20px] font-black text-lg transition-all flex items-center justify-center gap-2
            ${
              !selectedOption
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600"
            }`}
        >
          {currentQuestionIndex === questions.length - 1
            ? "مشاهده نتیجه نهایی"
            : "ثبت و سوال بعدی"}
          <ChevronLeft />
        </button>
      </div>
    </div>
  );
};

export default ExampleQues;
