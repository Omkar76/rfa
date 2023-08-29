export const HTMLInputTypeAttributeValues = [
  "text",
  "password",
  "email",
  "number",
  "date",
  "time",
  "checkbox",
  "submit",
  "color",
  "range",
  "search",
  "tel",
  "url",
  "radio",
  "multiselect",
] as const;

export type fieldType = (typeof HTMLInputTypeAttributeValues)[number];

export type Field = {
  kind: fieldType;
};

export type TextFieldData = {
  kind: "text";
  id: number;
  label: string;
  type?: string;
  value: string;
};

export type MultiSelectFieldData = {
  kind: "multiselect";
  id: number;
  label: string;
  options: string[];
  value: string[];
};

export type RadioFieldData = {
  kind: "radio";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type FormFieldData =
  | TextFieldData
  | MultiSelectFieldData
  | RadioFieldData;

export type FormData = {
  id: number;
  title: string;
  fields: FormFieldData[];
};
