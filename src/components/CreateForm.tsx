import { useState } from "react";
import { Form, Errors } from "../types/forms";
import { navigate } from "raviger";
import { createForm } from "../utils/apiUtils";

export const validateForm = (form: Form) => {
  const errors: Errors<Form> = {};

  if (form.title.length < 1) {
    errors.title = "Title is required";
  }
  if (form.title.length > 100) {
    errors.title = "Title must be less than 100 characters";
  }

  return errors;
};

export default function CreateForm() {
  const [form, setForm] = useState<Form>({
    id: -1,
    title: "",
    description: "",
    is_public: false,
  });

  const [errors, setErrors] = useState<Errors<Form>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const data = await createForm(form);
        navigate("/forms/" + data.id);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="w-full divide-y divide-grey-200">
      <h1 className="text-2xl my-2 text-grey-700">Create Form</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="flex flex-col">
          Title
          <input
            className="p-2 border"
            id="title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            aria-describedby="title-error"
          />
        </label>
        {errors.title && (
          <p id="title-error" className="text-red-600" aria-live="assertive">
            {errors.title}
          </p>
        )}

        <label className="flex flex-col">
          Description
          <input
            className="p-2 border"
            name="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        {errors.description && (
          <p className="text-red-600">{errors.description}</p>
        )}

        <label className="flex">
          <input
            className="p-2 border"
            type="checkbox"
            name="is_public"
            checked={form.is_public}
            onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
          />
          &nbsp;&nbsp;Public
        </label>
        {errors.is_public && <p className="text-red-600">{errors.is_public}</p>}

        <button className="p-2 bg-blue-500 text-white">SUBMIT</button>
      </form>
    </div>
  );
}
