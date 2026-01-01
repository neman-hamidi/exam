"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, IconButton, Tooltip, Chip } from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { redirect } from "next/navigation";
import Loading from "../loading/loading";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("questions"); // 'questions' | 'comments'

  // States برای داده‌ها
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);

  // States برای مودال‌ها
  const [modalMode, setModalMode] = useState(null); // 'edit' | 'register' | 'delete'
  const [selectedId, setSelectedId] = useState(null);

  // States برای فیلدهای فرم
  const [formData, setFormData] = useState({
    subTitle: "",
    Title: "",
    question: "",
    qu1: "",
    qu2: "",
    qu3: "",
    qu4: "",
    correctAnswer: "",
    Description: "",
    SuggestTime: "",
  });

  // امنیت پنل
  useEffect(() => {
    if (localStorage.getItem("nameGlobal") !== "NemanHamidiUserAdmin") {
      redirect("/");
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [qRes, cRes] = await Promise.all([
        fetch("http://localhost:3010/admin/questions"),
        fetch("http://localhost:3010/comments"),
      ]);
      setQuestions(await qRes.json());
      setComments(await cRes.json());
    } catch (error) {
      console.error("خطا در دریافت داده‌ها", error);
    }
    setLoading(false);
  };

  // عملیات حذف سوال
  const handleDeleteSubmit = async () => {
    await fetch(`http://localhost:3010/question/${selectedId}`, {
      method: "DELETE",
    });
    setModalMode(null);
    fetchAllData();
  };

  // باز کردن مودال ویرایش
  const handleEditClick = (params) => {
    setSelectedId(params.id);
    setFormData({ ...params.row }); // پر کردن فرم با داده‌های ردیف
    setModalMode("edit");
  };

  // ثبت یا ویرایش نهایی
  const handleFormSubmit = async () => {
    const url =
      modalMode === "edit"
        ? `http://localhost:3010/question/${selectedId}`
        : "http://localhost:3010/sd";

    const method = modalMode === "edit" ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setModalMode(null);
    setFormData({
      subTitle: "",
      Title: "",
      question: "",
      qu1: "",
      qu2: "",
      qu3: "",
      qu4: "",
      correctAnswer: "",
      Description: "",
      SuggestTime: "",
    });
    fetchAllData();
  };

  // ستون‌های سوالات
  const questionColumns = [
    { field: "Title", headerName: "درس", width: 120 },
    { field: "question", headerName: "متن سوال", flex: 1, minWidth: 200 },
    {
      field: "correctAnswer",
      headerName: "پاسخ",
      width: 80,
      renderCell: (p) => (
        <Chip label={p.value} color="success" size="small" variant="outlined" />
      ),
    },
    {
      field: "action",
      headerName: "عملیات",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-1">
          <IconButton color="primary" onClick={() => handleEditClick(params)}>
            {" "}
            <EditIcon fontSize="small" />{" "}
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedId(params.id);
              setModalMode("delete");
            }}
          >
            {" "}
            <DeleteSweepIcon fontSize="small" />{" "}
          </IconButton>
        </div>
      ),
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 dir-rtl font-[vazir]">
      {/* هدر پنل */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            پنل مدیریت هوشمند
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            مدیریت سوالات و نظرات کاربران
          </p>
        </div>
        <button
          onClick={() => setModalMode("register")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-100"
        >
          <AddIcon /> ثبت سوال جدید
        </button>
      </div>

      {/* تب‌ها */}
      <div className="max-w-7xl mx-auto mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("questions")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "questions"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          مدیریت سوالات
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === "comments"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`}
        >
          نظرات کاربران
        </button>
      </div>

      {/* جداول */}
      <div className="max-w-7xl mx-auto transition-all">
        <Paper className="overflow-hidden rounded-2xl border-none shadow-xl">
          <div style={{ height: 500, width: "100%", direction: "ltr" }}>
            <DataGrid
              rows={activeTab === "questions" ? questions : comments}
              columns={
                activeTab === "questions"
                  ? questionColumns
                  : [] /* ستون‌های کامنت مشابه تعریف شود */
              }
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
            />
          </div>
        </Paper>
      </div>

      {/* مودال فرم (ثبت و ویرایش) */}
      <Dialog
        open={modalMode === "edit" || modalMode === "register"}
        onClose={() => setModalMode(null)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh] dir-rtl">
            <DialogTitle className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
              {modalMode === "edit" ? "ویرایش سوال" : "ثبت سوال جدید"}
            </DialogTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="عنوان درس"
                value={formData.Title}
                onChange={(v) => setFormData({ ...formData, Title: v })}
              />
              <InputField
                label="زیرعنوان"
                value={formData.subTitle}
                onChange={(v) => setFormData({ ...formData, subTitle: v })}
              />
              <div className="md:col-span-2">
                <InputField
                  label="متن سوال"
                  value={formData.question}
                  onChange={(v) => setFormData({ ...formData, question: v })}
                />
              </div>
              <InputField
                label="گزینه ۱"
                value={formData.qu1}
                onChange={(v) => setFormData({ ...formData, qu1: v })}
              />
              <InputField
                label="گزینه ۲"
                value={formData.qu2}
                onChange={(v) => setFormData({ ...formData, qu2: v })}
              />
              <InputField
                label="گزینه ۳"
                value={formData.qu3}
                onChange={(v) => setFormData({ ...formData, qu3: v })}
              />
              <InputField
                label="گزینه ۴"
                value={formData.qu4}
                onChange={(v) => setFormData({ ...formData, qu4: v })}
              />
              <InputField
                label="عدد گزینه صحیح"
                value={formData.correctAnswer}
                onChange={(v) => setFormData({ ...formData, correctAnswer: v })}
              />
              <InputField
                label="زمان پیشنهادی"
                value={formData.SuggestTime}
                onChange={(v) => setFormData({ ...formData, SuggestTime: v })}
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleFormSubmit}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                تایید نهایی
              </button>
              <button
                onClick={() => setModalMode(null)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                لغو
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* مودال حذف */}
      <Dialog
        open={modalMode === "delete"}
        onClose={() => setModalMode(null)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-red-900/20 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-sm w-full bg-white rounded-2xl p-6 text-center dir-rtl">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DeleteSweepIcon fontSize="large" />
            </div>
            <DialogTitle className="text-lg font-bold">حذف اطلاعات</DialogTitle>
            <p className="text-gray-500 text-sm mt-2">
              آیا از حذف این مورد اطمینان دارید؟ این عملیات غیرقابل بازگشت است.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDeleteSubmit}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold"
              >
                حذف کن
              </button>
              <button
                onClick={() => setModalMode(null)}
                className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold"
              >
                بی‌خیال
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

// کامپوننت کمکی برای اینپوت‌ها
const InputField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-gray-500 mr-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
    />
  </div>
);
