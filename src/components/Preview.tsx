import { FC, useEffect, useState } from "react";
import { useNavigate } from "raviger";
import { getFormById, getDefaultFormData, saveFormData } from "../utils/forms";
import { FormData, FormFieldData } from "../types/forms";
import { Carousel } from "../Carousel";
import { PreviewTextField } from "../previews/TextFieldPreview";
import { PreviewMultiSelect } from "../previews/MultiSelectFieldPreview";
import { PreviewRadio } from "../previews/RadioFieldPreview";

export interface FormProps {
  formID: number;
}

function initialState(formID: number): FormData {
  const form = getFormById(formID);

  return form || getDefaultFormData();
}

export const FormPreview: FC<FormProps> = ({ formID }) => {
  const [formData, setFormData] = useState(() => initialState(formID));

  useEffect(() => {
    let timeout = setTimeout(() => {
      saveFormData(formData);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [formData]);

  const setField = (id: number, updatedFieldData: FormFieldData) => {
    setFormData({
      ...formData,
      fields: formData.fields.map((field) => {
        if (field.id !== id) {
          return field;
        }

        return updatedFieldData;
      }),
    });
  };

  const renderField = (field: FormFieldData) => {
    switch (field.kind) {
      case "text":
        return (
          <PreviewTextField
            field={field}
            setField={setField.bind(null, field.id)}
          />
        );

      case "multiselect":
        return (
          <PreviewMultiSelect
            field={field}
            setField={setField.bind(null, field.id)}
          />
        );

      case "radio":
        return (
          <PreviewRadio
            field={field}
            setField={setField.bind(null, field.id)}
          />
        );

      default:
        <h1>Unsupported field type</h1>;
    }
  };

  const navigate = useNavigate();

  if(formData.fields.length === 0){
    return <p className="text-5xl">Empty Form</p>
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <h2 className="text-2xl text-center underline">{formData.title}</h2>
        <Carousel>
          {formData.fields.map((field) => renderField(field))}
        </Carousel>
      </form>
    </div>
  );
};
