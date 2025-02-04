"use client";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "@/app/userProvider/userProvider";
import Loading from "../loading/loading";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { redirect } from "next/navigation";

export default function admin() {
  useEffect(() => {
    if (localStorage.getItem("nameGlobal") === "NemanHamidiUserAdmin") {
    } else {
      redirect("/");
    }
  }, []);
  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [showRegisterQuestion, setShowRegisterQuestion] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Description, setDescription] = useState("");
  const [Title, setTitle] = useState("");
  const [SuggestTime, setSuggestTime] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [qus, setQus] = useState({
    qu1: "",
    qu2: "",
    qu3: "",
    qu4: "",
    correctAnswer: "",
  });
  const [row, setRow] = useState([]);
  const [rowComments, setRowComments] = useState([]);
  const [id, setId] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAllQuestions = async () => {
      const res = await fetch("http://localhost:3010/admin/questions");
      const data = await res.json();
      setRow(data);
      setLoading(false);
    };
    getAllQuestions();
  }, [row]);

  useEffect(() => {
    const getAllComments = async () => {
      const res = await fetch("http://localhost:3010/comments");
      const data = await res.json();
      setRowComments(data);
    };
    getAllComments();
  }, [rowComments]);

  const iconDeleteSubmit = (params) => {
    fetch(`http://localhost:3010/question/${params}`, {
      method: "DELETE",
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleteShow(false);
      });
  };
  //
  const openEditModal = (params) => {
    setId(params.id);
    fetch(`http://localhost:3010/question/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.question);
        setQus({
          qu1: data.qu1,
          qu2: data.qu2,
          qu3: data.qu3,
          qu4: data.qu4,
          correctAnswer: data.correctAnswer,
        });
        setShow(true);
      });
  };

  const iconEditSubmit = () => {
    const editUser = {
      question,
      Title,
      SuggestTime,
      qu1:qus.qu1,
      qu2:qus.qu2,
      qu3:qus.qu3,
      qu4:qus.qu4,
      correctAnswer:qus.correctAnswer,
    };
    fetch(`http://localhost:3010/question/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setShow(false);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Title", headerName: "اسم درس", width: 100 },
    { field: "question", headerName: "سوالات", width: 130 },
    {
      field: "qu1",
      headerName: "گزینه 1",
      type: "string",
      width: 90,
    },
    {
      field: "qu2",
      headerName: "گزینه 2",
      type: "string",
      width: 90,
    },
    {
      field: "qu3",
      headerName: "گزینه 3",
      type: "string",
      width: 90,
    },
    {
      field: "qu4",
      headerName: "گزینه 4",
      type: "string",
      width: 90,
    },
    {
      field: "correctAnswer",
      headerName: "جواب",
      type: "string",
      width: 90,
    },
    {
      field: "action",
      headerName: "عملیات",
      width: 130,
      renderCell: (params) => (
        <div className="flex justify-evenly">
          <span className="cursor-pointer">
            <DeleteSweepIcon
              onClick={() => {
                setId(params.id);
                setDeleteShow(true);
              }}
            />
          </span>
          <span className="cursor-pointer">
            <EditIcon
              onClick={() => {
                setId(params.id);
                openEditModal(params);
              }}
            />
          </span>
        </div>
      ),
    },
  ];
  // column Comments
  const columnComments = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "اسم", width: 130 },
    {
      field: "userClass",
      headerName: "پایه",
      type: "string",
      width: 90,
    },
    {
      field: "suggest",
      headerName: "موضوع",
      type: "string",
      width: 90,
    },
    {
      field: "text",
      headerName: "متن",
      type: "string",
      width: 450,
    },
    {
      field: "approved",
      headerName: "تایید",
      type: "string",
      width: 50,
    },
    {
      field: "action",
      headerName: "عملیات",
      width: 180,
      renderCell: (params) => (
        <div className="flex justify-evenly items-center gap-2">
          <button
            className="cursor-pointer"
            type="submit"
            onClick={() => {
              approve(params.id);
            }}
          >
            Approv
          </button>
          <button
            className="cursor-pointer"
            type="submit"
            onClick={() => {
              rejecte(params.id);
            }}
          >
            reject
          </button>
          <button
            className="cursor-pointer"
            type="submit"
            onClick={() => {
              DeleteComment(params.id);
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const approve = (params) => {
    fetch(`http://localhost:3010/approved/${params}`, {
      method: "put",
    })
  };
  const rejecte = (params) => {
    fetch(`http://localhost:3010/rejected/${params}`, {
      method: "put",
    })
  };
  const DeleteComment = (params) => {
    fetch(`http://localhost:3010/delete/${params}`, {
      method: "delete",
      body: params,
    })
  };
  const paginationModel = { page: 0, pageSize: 5 };
  const registerQuestion = () => {
    const newQuestion = {
      subTitle,
      Title,
      SuggestTime,
      question,
      qu1:qus.qu1,
      qu2:qus.qu2,
      qu3:qus.qu3,
      qu4:qus.qu4,
      correctAnswer:qus.correctAnswer,
      Description,
    };
    fetch("http://localhost:3010/sd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubTitle("");
        setTitle("");
        setSuggestTime("");
        setQuestion("");
        setQus({
          qu1: "",
          qu2: "",
          qu3: "",
          qu4: "",
          correctAnswer: "",
        });
        setDescription("");
        setShowRegisterQuestion(false);
      });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <button
          type="submit"
          className="p-2 bg-yellow-400"
          onClick={() => setShowRegisterQuestion(true)}
        >
          ثبت سوال
        </button>
        {showRegisterQuestion && (
          <>
            <div className="w-screen h-screen fixed top-1 right-auto left-auto transition-all duration-1000 z-40">
              <div className="w-2/5 h-full mx-auto bg-gray-100 shadow-lg  rounded-lg">
                <p className="text-center text-2xl  pt-20">ادیت سوالات</p>
                <div className="flex flex-row flex-wrap gap-4 pt-4">
                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>subDomain</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={subTitle}
                      onChange={(e) => setSubTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>عنوان درس</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>سوال</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>گزینه 1</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={qus.qu1}
                      onChange={(e) => {
                        setQus((prevQus) => ({
                          ...prevQus,
                          qu1: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>گزینه 2</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={qus.qu2}
                      onChange={(e) => {
                        setQus((prevQus) => ({
                          ...prevQus,
                          qu2: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>گزینه 3</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={qus.qu3}
                      onChange={(e) => {
                        setQus((prevQus) => ({
                          ...prevQus,
                          qu3: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>گزینه 4</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={qus.qu4}
                      onChange={(e) => {
                        setQus((prevQus) => ({
                          ...prevQus,
                          qu4: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>گزینه صحیح</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={qus.correctAnswer}
                      onChange={(e) => {
                        setQus((prevQus) => ({
                          ...prevQus,
                          correctAnswer: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>توضیحات</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 justify-start items-center">
                    <label>زمان پیشنهادی</label>
                    <input
                      type="text"
                      className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                      value={SuggestTime}
                      onChange={(e) => setSuggestTime(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-3">
                    <button
                      type="submit"
                      className="p-2 border border-gray-300 rounded-lg"
                      onClick={registerQuestion}
                    >
                      تایید
                    </button>
                    <button
                      type="submit"
                      className="p-2 border border-gray-300 rounded-lg"
                      onClick={() => setShowRegisterQuestion(false)}
                    >
                      لغو
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-9/10 mx-auto mt-5" style={{ direction: "ltr" }}>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={row}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>

        {deleteShow ? (
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <svg className="size-6 text-red-600">
                          {/* delete svg*/}
                          <use href="#exclamation-triangle"></use>
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold text-gray-900"
                        >
                          آیا از حذف اطمینان دارید ؟
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            آیا میخواید آیتم را به کل حذف کنید ؟
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                    <button
                      type="button"
                      onClick={() => iconDeleteSubmit(id)}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      حذف
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setDeleteShow(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      لغو
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        ) : (
          ""
        )}
      </div>
      {show ? (
        <>
          <div className="w-screen h-screen fixed top-1 right-auto left-auto transition-all duration-1000 z-40">
            <div className="w-2/5 mx-auto bg-gray-100 shadow-lg  rounded-lg">
              <div className="flex flex-col gap-4 py-4">
                <p className="text-center text-2xl">ادیت سوالات</p>
                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>سوال</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>گزینه 1</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={qus.qu1}
                    onChange={(e) => {
                      setQus((prevQus) => ({
                        ...prevQus,
                        qu1: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>گزینه 2</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={qus.qu2}
                    onChange={(e) => {
                      setQus((prevQus) => ({
                        ...prevQus,
                        qu2: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>گزینه 3</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={qus.qu3}
                    onChange={(e) => {
                      setQus((prevQus) => ({
                        ...prevQus,
                        qu3: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>گزینه 4</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={qus.qu4}
                    onChange={(e) => {
                      setQus((prevQus) => ({
                        ...prevQus,
                        qu4: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-start items-center">
                  <label>گزینه صحیح</label>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 max-w-[500px] rounded-lg"
                    value={qus.correctAnswer}
                    onChange={(e) => {
                      setQus((prevQus) => ({
                        ...prevQus,
                        correctAnswer: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex justify-center items-center gap-3">
                  <button
                    type="submit"
                    className="p-2 border border-gray-300 rounded-lg"
                    onClick={iconEditSubmit}
                  >
                    تایید
                  </button>
                  <button
                    type="submit"
                    className="p-2 border border-gray-300 rounded-lg"
                    onClick={() => setShow(false)}
                  >
                    لغو
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* comments */}
      <p className="w-9/10 mx-auto text-end mt-10 text-3xl">Comments</p>
      <div className="w-9/10 mx-auto mt-5" style={{ direction: "ltr" }}>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rowComments}
            columns={columnComments}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </>
  );
}
