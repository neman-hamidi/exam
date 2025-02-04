"use client";
import Header from "./components/header/header";
import Div from "./components/div/div";
import InfoQuestions from "./components/infoQuestions/infoQuestions";
import UserInfo from "./components/userInfo/userInfo";
import Utiliti from "./components/utiliti/utiliti";
import Comments from "./components/comments/comments";
import QuestionsSite from "./components/questionsSite/questionsSite";
import Footer from "./components/footer/footer";
import Loading from "./components/loading/loading";
import RegisterComments from "./components/registerComments/registerComments";
import { useEffect, useState } from "react";
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", setLoading(false));
    return () =>
      window.removeEventListener("DOMContentLoaded", setLoading(false));
  }, []);
  if (loading) {
    return <Loading />;
  } else {
    
    
    return (
      <>
        <Header />
        <Div />
        <InfoQuestions />
        <Div />
        <UserInfo />
        <Div />
        <Utiliti />
        <Div />
        <Comments />
        <Div />
        <RegisterComments/>
        <Div/>
        <QuestionsSite />
        <Footer />
      </>
    );
  }
}
