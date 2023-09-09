import { FC, useReducer } from "react";
import { useNavigate } from "raviger";
import { getFormById, getDefaultFormData } from "../utils/forms";
import { FormData } from "../types/forms";
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

type SetAnswer = {
  type: "set_answer";
  fieldId: number;
  answer: string;
};

type AddAnswer = {
  type: "add_answer";
  fieldId: number;
  answer: string;
};

type DeleteAnswer = {
  type: "delete_answer";
  fieldId: number;
  answer: string;
};

type PreviewActions = SetAnswer | AddAnswer | DeleteAnswer;

const reducer = (state: FormData, action: PreviewActions): FormData => {
  switch (action.type) {
    case "set_answer":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.fieldId) {
            if (
              field.kind !== "multiselect" &&
              typeof action.answer == "string"
            ) {
              return { ...field, value: action.answer };
            }
          }
          return field;
        }),
      };

    case "add_answer":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.fieldId) {
            if (field.kind === "multiselect") {
              return {
                ...field,
                value: [...field.value, action.answer],
              };
            }
          }
          return field;
        }),
      };

    case "delete_answer":
      return {
        ...state,
        fields: state.fields.map((field) => {
          if (field.id === action.fieldId) {
            if (field.kind === "multiselect") {
              return {
                ...field,
                value: field.value.filter((v) => v !== action.answer),
              };
            }
          }
          return field;
        }),
      };
    default:
      return state;
  }
};

export const FormPreview: FC<FormProps> = ({ formID }) => {
  const [formData, dispatch] = useReducer(reducer, null!, () =>
    initialState(formID),
  );

  const navigate = useNavigate();

  if (formData.fields.length === 0) {
    return <p className="text-5xl">Empty Form</p>;
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
          {formData.fields.map((field) => {
            switch (field.kind) {
              case "text":
                return (
                  <PreviewTextField
                    key={field.id}
                    field={field}
                    setAnswer={(answer) => {
                      dispatch({
                        type: "set_answer",
                        fieldId: field.id,
                        answer,
                      });
                    }}
                  />
                );

              case "multiselect":
                return (
                  <PreviewMultiSelect
                    key={field.id}
                    field={field}
                    addAnswer={(answer) => {
                      dispatch({
                        type: "add_answer",
                        fieldId: field.id,
                        answer,
                      });
                    }}
                    deleteAnswer={(answer) => {
                      dispatch({
                        type: "delete_answer",
                        fieldId: field.id,
                        answer,
                      });
                    }}
                  />
                );

              case "radio":
                return (
                  <PreviewRadio
                    key={field.id}
                    field={field}
                    setAnswer={(answer) => {
                      dispatch({
                        type: "set_answer",
                        fieldId: field.id,
                        answer,
                      });
                    }}
                  />
                );
              default:
                return <h1>Invalid form element</h1>;
            }
          })}
        </Carousel>
      </form>
    </div>
  );
};
