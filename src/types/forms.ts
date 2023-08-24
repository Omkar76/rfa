import { HTMLInputTypeAttribute } from "react";

export interface FormFieldData {
  id: number;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
}

export interface FormData {
  id: number;
  title: string;
  fields: FormFieldData[];
}
