"use client";
import { UserContext } from "@/app/userProvider/userProvider";
import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "../nav/nav";
import "./exampleques.css";
import Loading from "../loading/loading";
import Image from "next/image";

const exampleques = ({ namecourse }) => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showResultQuestion, setShowResultQuestion] = useState(false);
  const [questions, setQuestions] = useState([
    {
      correctAnswer: "0",
      id: 0,
      qu1: "0",
      qu2: "0",
      qu3: "0",
      qu4: "0",
      question: "0",
      subTitle: "0",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3010/${namecourse}`);
        const result = await response.json();
        setQuestions(result);
        setUnavailable(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
    
  }, []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hourTime, setHourTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [yourChoices, setYourChoices] = useState({
    id: [],
    choice: [],
  });
  const intervalRef = useRef(null);
  const startHandle = () => {
    setReady(true);
    setIsActive(true);
  };
  const handleOptionClick = (choice, id) => {
    setSelectedOption(choice);
    setYourChoices((prevState) => ({
      ...prevState,
      id: [...prevState.id, id],
      choice: [...prevState.choice, choice],
    }));
  };
  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    console.log(yourChoices);
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    
  };
  // Timer
  useEffect(() => {
    
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);
  if (timer > 59) {
    setHourTime((prev) => prev + 1);
    setTimer(0);
  }
  // End Timer
  // Again Exam
  const handleQuizRestart = () => {
    setTimer(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsActive(true);
  };

  if (loading) {
    return <Loading />;
  }
  if (unavailable) {
    return (
      <>
        <div className="flex items-center justify-center w-1/2 mx-auto mt-20 z-10">
          <span className="bg-sky-500 p-2 rounded-lg">سوالی موجود نیس</span>
          <Image
            src="/images/question.svg"
            width={400}
            height={400}
            alt="question-resolve"
          />
        </div>
      </>
    );
  }
  if (currentQuestionIndex >= questions.length) {
    clearInterval(intervalRef.current);
    console.log("112");
    let newUserScore = {
      Name: userContext.UsernameGlobal,
      Course: namecourse,
      Score: `${score} & ${questions.length}`,
    };
    fetch("http://localhost:3010/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserScore),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsActive(false);
        console.log("fetch");
      });

    return (
      <>
        <div className="w-1/2 mx-auto mt-8 text-center">
          <p className="bg-blue-300 rounded-lg p-2 my-3">
            آزمون به پایان رسید.
          </p>
          <div className="flex justify-around flex-row bg-green-300 rounded-lg p-2 my-3">
            <p>
              امتیاز شما: {score} از {questions.length}
            </p>
            <p>
              {hourTime}:{timer}
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleQuizRestart}
              className="border-2 border-gray-300 rounded-lg p-2 my-2 hover:bg-slate-200 transition-colors duration-500"
            >
              شروع مجدد آزمون
            </button>
            <button
              onClick={() => setShowResultQuestion(true)}
              className="bg-amber-300 rounded-lg p-2 my-2"
            >
              بررسی سوالات آزمون
            </button>
          </div>
        </div>
        {showResultQuestion &&
          questions.map((item, index) => (
            <div className="w-1/2 mx-auto mt-7 rounded-2xl my-16" key={item.id}>
              <p>سوال: {item.id}</p>
              <p className="border border-gray-300 p-2 rounded-md my-2 bg-sky-400">
                {item.question}
              </p>
              <p
                className={`border border-gray-300 p-2 rounded-md my-2 bg-slate-100 ${
                  item.qu1 == yourChoices.choice[index] && item.correctAnswer
                    ? "bg-red-500"
                    : ""
                } ${item.qu1 == item.correctAnswer ? "bg-green-500" : ""} `}
              >
                {item.qu1}
              </p>
              <p
                className={`border border-gray-300 p-2 rounded-md my-2 bg-slate-100 ${
                  item.qu2 == yourChoices.choice[index] && item.correctAnswer
                    ? "bg-red-500"
                    : ""
                } ${item.qu2 == item.correctAnswer ? "bg-green-500" : ""} `}
              >
                {item.qu2}
              </p>
              <p
                className={`border border-gray-300 p-2 rounded-md my-2 bg-slate-100 ${
                  item.qu3 == yourChoices.choice[index] && item.correctAnswer
                    ? "bg-red-500"
                    : ""
                } ${item.qu3 == item.correctAnswer ? "bg-green-500" : ""} `}
              >
                {item.qu3}
              </p>
              <p
                className={`border border-gray-300 p-2 rounded-md my-2 bg-slate-100 ${
                  item.qu4 == yourChoices.choice[index] && item.correctAnswer
                    ? "bg-red-500"
                    : ""
                } ${item.qu4 == item.correctAnswer ? "bg-green-500" : ""} `}
              >
                {item.qu4}
              </p>

              <p className="bg-teal-500 p-2 rounded-lg">
                توضیحات : {item.description}
              </p>
            </div>
          ))}
      </>
    );
  } else {
    return (
      <>
        <div className={`${ready && "hidden"}`}>
          <div className="w-1/2 mx-auto mt-4 text-center">
            <div className="text-center">
              <h1 className="bg-blue-300 rounded-lg p-2 my-3">
                آزمون {questions[0].Title}
              </h1>
              <div className="my-4 bg-zinc-200 rounded-lg p-2">
                <h2>تعداد سوالات : {questions.length}</h2>
              </div>
              <div className="my-4 bg-yellow-300 rounded-lg p-2">
                <h2>زمان پیشنهادی : {questions[0].SuggestTime} دقیقه</h2>
              </div>
            </div>
            <button
              onClick={() => startHandle()}
              className="border border-gray-300 rounded-lg py-1 px-3 mt-8 text-xl bg-green-300"
            >
              آماده ای ؟
            </button>
            <div>
              <Image
                src="/images/onlineTest.svg"
                width={360}
                height={360}
                alt="onlineTest"
                className="mx-auto mt-16"
              />
            </div>
          </div>
        </div>
        {ready && (
          <div className="w-1/2 mx-auto mt-12">
            <div className="text-center">
              <h1>آزمون درس {namecourse}</h1>
              <div className="flex justify-between px-0 mt-3">
                <div className="flex flex-row gap-3">
                  {showTime && (
                    <span className="bg-gray-100 p-1 rounded-md text-sm">
                      {hourTime}:{timer}
                    </span>
                  )}
                  <button type="submit" onClick={() => setShowTime(!showTime)}>
                    <svg className="w-6 h-6">
                      <use href="#eye"></use>
                    </svg>
                  </button>
                </div>
                <span>
                  {currentQuestionIndex + 1}/{questions.length}
                </span>
              </div>
            </div>
            <ul className="my-4 flex flex-col">
              {questions && (
                <>
                  <p>سوال: {questions[currentQuestionIndex].question}</p>
                  <input
                    type="text"
                    readOnly
                    value={questions[currentQuestionIndex].qu1}
                    className={`border border-gray-300 rounded-lg focus:bg-blue-300 p-2.5 mt-4 outline-none cursor-pointer ${
                      selectedOption === questions[currentQuestionIndex].qu1
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionClick(
                        questions[currentQuestionIndex].qu1,
                        questions[currentQuestionIndex].id
                      )
                    }
                  />

                  <input
                    type="text"
                    readOnly
                    value={questions[currentQuestionIndex].qu2}
                    className={`border border-gray-300 rounded-lg focus:bg-blue-300 p-2.5 mt-4 outline-none cursor-pointer ${
                      selectedOption === questions[currentQuestionIndex].qu2
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionClick(
                        questions[currentQuestionIndex].qu2,
                        questions[currentQuestionIndex].id
                      )
                    }
                  />
                  <input
                    type="text"
                    readOnly
                    value={questions[currentQuestionIndex].qu3}
                    className={`border border-gray-300 rounded-lg focus:bg-blue-300 p-2.5 mt-4 outline-none cursor-pointer ${
                      selectedOption === questions[currentQuestionIndex].qu3
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionClick(
                        questions[currentQuestionIndex].qu3,
                        questions[currentQuestionIndex].id
                      )
                    }
                  />
                  <input
                    type="text"
                    readOnly
                    value={questions[currentQuestionIndex].qu4}
                    className={`border border-gray-300 rounded-lg focus:bg-blue-300 p-2.5 mt-4 outline-none cursor-pointer ${
                      selectedOption === questions[currentQuestionIndex].qu4
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionClick(
                        questions[currentQuestionIndex].qu4,
                        questions[currentQuestionIndex].id
                      )
                    }
                  />
                  <input
                    type="text"
                    readOnly
                    value="خالی"
                    className={`border border-gray-300 rounded-lg focus:bg-blue-300 p-2.5 mt-4 outline-none cursor-pointer `}
                    onClick={() => setSelectedOption("empty")}
                  />
                </>
              )}
            </ul>
            <button
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="bg-green-300 rounded-lg p-2"
            >
              سوال بعدی
            </button>
          </div>
        )}
      </>
    );
  }
};

export default exampleques;
