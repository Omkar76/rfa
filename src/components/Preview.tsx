import { FC, useEffect, useState } from "react";
import { useNavigate } from "raviger";
import { getFormById, getDefaultFormData, saveFormData } from "../utils/forms";
import { FormData, FormFieldData } from "../types/forms";
import { Carousel } from "../Carousel";

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
          {formData.fields.map((field) => (
            <div key={field.id} className="flex items-center gap-2">
              <label>
                {" "}
                {field.label}
                <input
                  required
                  value={field.value}
                  onChange={(e) =>
                    setField(field.id, { ...field, value: e.target.value })
                  }
                  type={field.type}
                  className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
                />
              </label>
            </div>
          ))}
        </Carousel>
      </form>
    </div>
  );
};
