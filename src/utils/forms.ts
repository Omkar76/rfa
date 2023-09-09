import { FormFieldData, FormData } from "../types/forms";

const LOCAL_FORMS_KEY = "LOCAL_FORMS_KEY_V1";

const initialFormFields: FormFieldData[] = [
  { kind: "text", id: 1, label: "First Name", value: "" },
  { kind: "text", id: 2, label: "Last Name", value: "" },
  { kind: "text", id: 3, label: "Email", type: "email", value: "" },
  { kind: "text", id: 4, label: "Date of Birth", type: "date", value: "" },
  { kind: "text", id: 5, label: "Phone number", type: "tel", value: "" },
];

export function getLocalForms(): FormData[] {
  const savedFormsJSON = localStorage.getItem(LOCAL_FORMS_KEY);
  return savedFormsJSON ? JSON.parse(savedFormsJSON) : [];
}

export function getDefaultFormData(): FormData {
  return {
    id: new Date().getTime(),
    title: "Untitled Form",
    fields: initialFormFields,
  };
}

export function saveLocalForms(forms: FormData[]): FormData[] {
  localStorage.setItem(LOCAL_FORMS_KEY, JSON.stringify(forms));
  return forms;
}

export function addLocalForm(form: FormData): FormData[] {
  const updatedLocalForms = [form, ...getLocalForms()];
  saveLocalForms(updatedLocalForms);
  return updatedLocalForms;
}

export function deleteLocalForm(id: number): FormData[] {
  const updatedLocalForms = getLocalForms().filter((form) => form.id !== id);
  saveLocalForms(updatedLocalForms);

  return updatedLocalForms;
}

export function getFormById(id: number): FormData | undefined {
  const form = getLocalForms().find((form) => form.id === id);
  return form;
}

export function saveFormData(currentFormState: FormData): FormData[] {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((form) =>
    form.id === currentFormState.id ? currentFormState : form,
  );

  saveLocalForms(updatedLocalForms);
  return updatedLocalForms;
}

export function formExists(id: FormData["id"]) {
  return getLocalForms().some((form) => form.id === id);
}
