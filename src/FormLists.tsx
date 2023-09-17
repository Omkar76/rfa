import React, { FC, useEffect, useState } from "react";
import { Link, useQueryParams } from "raviger";
import Modal from "./components/commons/Modal";
import CreateForm from "./components/CreateForm";
import { Form } from "./types/forms";
import { deleteForm, listForms } from "./utils/apiUtils";
import { useUserContext } from "./context/userContext";

interface FormListProps {}

const fetchForms = (
  setFormsCB: (value: Form[]) => void,
  setCountCB: (count: number) => void,
  offset: number,
  limit: number
) => {
  listForms({ offset: offset, limit: limit })
    .then((data) => {
      setCountCB(data.count);
      setFormsCB(data.results);
    })
    .catch((error) => console.log(error));
};

const limit = 5;

export const FormList: FC<FormListProps> = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [{ search }, setQuery] = useQueryParams();
  const [searchTitle, setSearchTitle] = useState(search || "");
  const [newForm, setNewForm] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const { user } = useUserContext();

  useEffect(() => {
    fetchForms(setForms, setCount, offset, limit);
  }, [offset, user]);

  return (
    <>
      <Modal open={newForm} closeCB={() => setNewForm(false)}>
        <CreateForm />
      </Modal>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchTitle });
        }}
      >
        <input
          type="search"
          value={searchTitle}
          placeholder="Search forms by title"
          className="p-2 border border-gray-400 outline-none m-3"
          onChange={(e) => setSearchTitle(e.target.value)}
          aria-label="Search forms by title"
        />
      </form>
      <div className="flex justify-between w-full p-2">
        <h2 className="font-bold text-lg">Saved Forms</h2>
        <button
          onClick={() => {
            setNewForm(true);
          }}
          className="bg-blue-600 text-white rounded-md p-2 ml-auto"
          aria-label="Create New Form"
        >
          New Form
        </button>
      </div>
      <p>
        {forms.length === 0 &&
          'No saved forms found. Create new forms by clicking "New Form" button'}
      </p>
      <div className="flex gap-1 flex-col w-full">
        {forms
          .filter((form) => form.title.includes(search || ""))
          .map((f) => {
            return (
              <div key={f.id} className="flex gap-2 border border-blue-400 p-2">
                <span className="flex-1">{f.title || "-"}</span>

                <Link href={"/forms/preview/" + f.id} aria-label={`Preview Form ${f.title}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={"w-6 h-6 " + (user ? "text-blue-500" : "text-gray-400")}
                  >
                    <title>Preview Form</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Link>

                <Link href={"/forms/" + f.id} aria-label={`Open Form ${f.title}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={"w-6 h-6 " + (user ? "text-blue-500" : "text-gray-400")}
                  >
                    <title>Open Form</title>
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </Link>

                <Link
                  href={"/forms/submissions/" + f.id}
                  className={
                    "w-6 h-6 " + (user ? "text-blue-500" : "text-gray-400")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                </Link>

                <button
                  disabled={!user}
                  onClick={() => {
                    deleteForm(f.id).then(() => {
                      setForms(forms.filter((form) => form.id !== f.id));
                    });
                  }}
                  aria-label={`Delete Form ${f.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={"w-6 h-6 " + (user ? "text-red-500" : "text-gray-400")}
                  >
                    <title>Delete Form</title>
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            );
          })}

        <div className="flex justify-between w-full p-2">
          {
            <button
              style={{ visibility: offset - limit < 0 ? "hidden" : "initial" }}
              onClick={() => {
                setOffset(offset - limit);
              }}
              className="bg-blue-600 text-white font-bold p-2 rounded-lg"
              aria-label="Previous Page"
            >
              Previous
            </button>
          }
          <button
            style={{
              visibility: offset + limit > count ? "hidden" : "initial",
            }}
            onClick={() => {
              setOffset(offset + limit);
            }}
            className="bg-blue-600 text-white font-bold p-2 rounded-lg"
            aria-label="Next Page"
          >
            <p className="font-semibold">Next</p>
          </button>
        </div>
      </div>
    </>
  );
};
