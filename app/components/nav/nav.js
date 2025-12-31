"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "@/app/userProvider/userProvider";
import {
  KeyboardArrowDown,
  PersonOutline,
  AdminPanelSettingsOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MenuBookOutlined,
  SchoolOutlined,
  WorkspacePremiumOutlined,
  LoginOutlined,
} from "@mui/icons-material";

export default function Navbar() {
  const userContext = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [nameGlobal, setNameGlobal] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setNameGlobal(localStorage.getItem("nameGlobal") || "");
  }, [userContext.isLoggin]);

  const logOutUser = () => {
    userContext.logout();
    setShowProfile(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 font-[vazir] dir-rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* بخش راست: لوگو و منوها */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="p-2 bg-blue-600 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-200">
                  <Image
                    src="/images/icon.webp"
                    width={28}
                    height={28}
                    alt="logo"
                    unoptimized
                  />
                </div>
                <span className="font-black text-xl text-slate-800 tracking-tight">
                  بانک سوال
                </span>
              </Link>

              {/* منوی اصلی (دسکتاپ) */}
              <div className="hidden lg:flex items-center gap-6">
                <div
                  className="relative py-7 group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className={`flex items-center gap-1 text-sm font-bold transition-colors ${
                      isHovered ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    خدمات{" "}
                    <KeyboardArrowDown
                      className={`transition-transform duration-300 ${
                        isHovered ? "rotate-180" : ""
                      }`}
                      fontSize="small"
                    />
                  </div>
                  {/* خط زیرین منو */}
                  <div
                    className={`absolute bottom-5 right-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>

                <NavLink
                  href="/questions/konkur"
                  label="کنکور"
                  icon={<WorkspacePremiumOutlined fontSize="inherit" />}
                />
                <NavLink
                  href="/questions/dahom-yazdahom"
                  label="یازدهم و دهم"
                  icon={<SchoolOutlined fontSize="inherit" />}
                />
                <NavLink href="/questions/secondaryschool" label="متوسطه اول" />
                <NavLink href="/questions/elementaryschool" label="دبستان" />
              </div>
            </div>

            {/* بخش چپ: پروفایل و ورود */}
            <div className="flex items-center gap-4">
              {userContext.isLoggin ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-2 pr-4 rounded-2xl border border-slate-100 transition-all active:scale-95"
                  >
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-slate-400 font-bold">
                        خوش آمدی،
                      </span>
                      <span className="text-xs font-black text-slate-700">
                        {nameGlobal}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-100">
                      <PersonOutline />
                    </div>
                  </button>

                  {/* دراپ‌داون پروفایل */}
                  {showProfile && (
                    <div className="absolute left-0 mt-3 w-64 bg-white rounded-[24px] shadow-2xl shadow-slate-200 border border-slate-50 p-3 animate-in fade-in zoom-in duration-200 origin-top-left">
                      <ul className="space-y-1">
                        {nameGlobal === "NemanHamidiUserAdmin" && (
                          <ProfileLink
                            href="/admin"
                            icon={<AdminPanelSettingsOutlined />}
                            label="پنل مدیریت ادمین"
                            color="text-amber-600"
                          />
                        )}
                        <ProfileLink
                          href="/profile"
                          icon={<PersonOutline />}
                          label="مشاهده پروفایل"
                        />
                        <ProfileLink
                          href="/history"
                          icon={<HistoryOutlined />}
                          label="دروس تست داده شده"
                        />
                        <hr className="my-2 border-slate-50" />
                        <button
                          onClick={logOutUser}
                          className="w-full flex items-center gap-3 p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-sm font-bold"
                        >
                          <LogoutOutlined fontSize="small" /> خروج از حساب
                        </button>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-slate-600 hover:text-blue-600 px-4 py-2 transition-colors"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <LoginOutlined fontSize="inherit" /> ثبت نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* مگا منوی خدمات */}
        {isHovered && (
          <div
            className="absolute right-0 left-0 bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top-2 duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <ServiceItem
                href="/questions/shimi"
                label="شیمی"
                desc="تست‌های مفهومی و ترکیبی"
                color="bg-rose-500"
              />
              <ServiceItem
                href="/questions/fizik"
                label="فیزیک"
                desc="سوالات محاسباتی و کنکوری"
                color="bg-blue-500"
              />
              <ServiceItem
                href="/questions/zist"
                label="زیست"
                desc="بانک سوالات خط‌به‌خط"
                color="bg-emerald-500"
              />
              <ServiceItem
                href="/questions/zaban"
                label="زبان"
                desc="گرامر و واژگان تخصصی"
                color="bg-amber-500"
              />
              <ServiceItem
                href="/questions/ravanshenasi"
                label="روانشناسی"
                desc="سوالات پایه تا کنکور"
                color="bg-purple-500"
              />
            </div>
          </div>
        )}
      </nav>
      {/* لایه تیره پشت منو وقتی باز است */}
      {isHovered && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity"></div>
      )}
    </>
  );
}

// کامپوننت‌های کمکی برای تمیزی کد
const NavLink = ({ href, label, icon }) => (
  <Link
    href={href}
    className="flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
  >
    {icon} {label}
  </Link>
);

const ProfileLink = ({ href, icon, label, color = "text-slate-600" }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-bold ${color}`}
  >
    {icon} {label}
  </Link>
);

const ServiceItem = ({ href, label, desc, color }) => (
  <Link
    href={href}
    className="flex flex-col gap-2 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
  >
    <div
      className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white mb-2 shadow-lg group-hover:scale-110 transition-transform`}
    >
      <MenuBookOutlined fontSize="small" />
    </div>
    <span className="font-black text-slate-800 text-sm">{label}</span>
    <span className="text-[10px] text-slate-400 leading-tight">{desc}</span>
  </Link>
);
