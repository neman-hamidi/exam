"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "@/app/userProvider/userProvider";
import "./nav.css";
export default function nav() {
  const userContext = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [nameGlobal, setNameGlobal] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const logOutUser = () => {
    userContext.logout();
  };

  useEffect(() => {
    setNameGlobal(localStorage.getItem("nameGlobal"));
  }, [userContext.isLoggin]);

  return (
    <>
      <nav className="bg-white shadow-md p-3 z-50 sticky top-0 right-0 left-0">
        <div className="flex items-center justify-between w-11/12 mx-auto">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/icon.webp"
                  width={32}
                  height={32}
                  alt="logo-site"
                  aria-label="logo-site"
                />
              </Link>
              <span
                className="mr-4 flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                خدمات
                <svg className="w-3 h-3 mr-1">
                  <use href="#chevron-down"></use>
                </svg>
              </span>
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="border-l border-l-gray-500 pl-5 ml-4 hover:-translate-y-1 transition-transform">
                <Link href="/questions/konkur">کنکور</Link>
              </div>
              <div className="border-l border-l-gray-500 pl-5 ml-4 hover:-translate-y-1 transition-transform">
                <Link href="/questions/dahom-yazdahom">یازدهم دهم</Link>
              </div>
              <div className="border-l border-l-gray-500 pl-5 ml-4 hover:-translate-y-1 transition-transform">
                <Link href="/questions/secondaryschool">متوسطه</Link>
              </div>
              <div className="hover:-translate-y-1 transition-transform">
                <Link href="/questions/elementaryschool">دبستان</Link>
              </div>
            </div>
          </div>
          {userContext.isLoggin ? (
            <div
              className="flex items-center flex-row gap-2 cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              <svg className="w-6 h-6">
                <use href="#user"></use>
              </svg>
              <span className="text-sm pt-1">{nameGlobal}</span>
              {showProfile ? (
                <div className="shadow-md fixed p-6 rounded-lg left-20 top-14 bg-white z-10 blur-bg">
                  <ul className="flex flex-col gap-2 text-sm">
                    {localStorage.getItem("nameGlobal") ===
                    "NemanHamidiUserAdmin" ? (
                      <Link href="/admin">ادمین</Link>
                    ) : (
                      ""
                    )}
                    <li>مشاهده پروفایل</li>
                    <li>دروس تست داده شده</li>
                    <button type="submit" onClick={logOutUser}>
                      خروج از حساب کاربری
                    </button>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/register">ثبت نام</Link>
              <p>|</p>
              <Link href="/login">ورود</Link>
            </div>
          )}
        </div>
      </nav>
      {isHovered && (
        <div
          className="fixed shadow-xl p-6 rounded-lg right-32 top-10 z-[51] blur-bg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ul className="flex flex-col gap-4">
            <Link href="/questions/shimi">سوالات شیمی</Link>
            <Link href="/questions/fizik">سوالات فیزیک</Link>
            <Link href="/questions/zist">سوالات زیست</Link>
            <Link href="/questions/zaban">سوالات زبان</Link>
            <Link href="/questions/ravanshenasi">سوالات روانشناسی</Link>
          </ul>
        </div>
      )}
    </>
  );
}
