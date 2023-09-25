import { API_BASE_URL } from "../constants";
import { Answer, Form, FormFieldData } from "../types/forms";
import { Pagination, PaginationParams } from "../types/commons";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: any = {},
) => {
  let url, payload: string | null;
  if (method === "GET") {
    const requestParams = data
      ? `?${new URLSearchParams(data).toString()}`
      : "";
    url = API_BASE_URL + endpoint + requestParams;
    payload = null;
  } else {
    url = API_BASE_URL + endpoint;
    payload = data ? JSON.stringify(data) : null;
  }

  // Basic auth
  // const auth = "Basic " + window.btoa("kekeh:VD]L9V6j8&*2Tg&");

  // Token auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: payload,
  });
  if (res.status === 204) {
    return {};
  } else if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    const errorJson = await res.json();
    throw new Error(errorJson);
  }
};

export const createForm = async (form: Form) => {
  return await request("/forms/", "POST", form);
};

export const login = (username: string, password: string) => {
  return request("/auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("/users/me/", "GET", {});
};

export const listForms = (pageParams: PaginationParams) => {
  return request("/forms/", "GET", pageParams);
};

export const getForm = (formId: number) => {
  return request(`/forms/${formId}/`, "GET");
};

export const getFields = async (
  formId: number,
  pageParams: PaginationParams = {
    offset: 0,
    limit: 10,
  },
) => {
  return (await request(
    `/forms/${formId}/fields/`,
    "GET",
    pageParams,
  )) as Pagination<FormFieldData>;
};

export const updateForm = (id:number, form: Partial<Form>) => {
  return request(`/forms/${id}/`, "PATCH", form);
};

export const createField = (
  formId: number,
  field: Omit<FormFieldData, "id">,
) => {
  return request(`/forms/${formId}/fields/`, "POST", field);
};

export const deleteForm = (formId: number) => {
  return request(`/forms/${formId}/`, "DELETE", {});
};

export const deleteField = (formId: number, fieldId: number) => {
  return request(`/forms/${formId}/fields/${fieldId}/`, "DELETE", {});
};

export const updateOptions = (
  formId: number,
  fieldId: number,
  options: string[],
) => {
  return request(`/forms/${formId}/fields/${fieldId}/`, "PATCH", {
    options: options,
  });
};

export const createSubmission = (form: Form, Answer: Answer[]) => {
  return request(`/forms/${form.id}/submission/`, "POST", {
    form: form,
    answers: Answer,
  });
};

export const getSubmissions = (
  formId: number,
  pageParams: PaginationParams = { limit: 10, offset: 0 },
) => {
  return request(`/forms/${formId}/submission/`, "GET", pageParams);
};

export const getSubmission = (formId: number, submissionId: number) => {
  return request(`/forms/${formId}/submission/${submissionId}/`, "GET");
};
