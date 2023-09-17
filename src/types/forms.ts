export const HTMLInputTypeAttributeValues = [
  "TEXT",
  "password",
  "email",
  "number",
  "date",
  "time",
  "color",
  "range",
  // "search",
  "tel",
  "LOCATION",
  "RADIO",
  "DROPDOWN",
] as const;

export type fieldType = (typeof HTMLInputTypeAttributeValues)[number];

export type Field = {
  kind: fieldType;
};

export type TextFieldData = {
  kind: "TEXT";
  id: number;
  label: string;
  value: string;
  meta: {
    type: string;
  }
};

export type MultiSelectFieldData = {
  kind: "DROPDOWN";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type RadioFieldData = {
  kind: "RADIO";
  id: number;
  label: string;
  options: string[];
  value: string;
};

export type LocationFieldData = {
  kind :"GENERIC",
  id: number;
  label: string;
  value: string;
  meta: {
    type: string;
  }
};
export type FormFieldData =
  | TextFieldData
  | MultiSelectFieldData
  | RadioFieldData
  | LocationFieldData;

export type FormData = {
  id: number;
  title: string;
  formFields: FormFieldData[];
};

export type Kind = FormFieldData["kind"];
export type Form = {
  id: number;
  title: string;
  description?: string;
  is_public: boolean;
};

export type Answer = {
  form_field: number;
  value: string;
};

export type Submission = {
  id: number;
  form: Form;
  answers: Answer[];
};
export type Errors<T> = Partial<Record<keyof T, string>>;
