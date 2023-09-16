import { FC, useEffect, useReducer, useRef, useState } from "react";
import { FormField } from "../inputs/FormField";
import { Link } from "raviger";
import { saveFormData } from "../utils/forms";
import {
  FormData,
  FormFieldData,
  HTMLInputTypeAttributeValues,
} from "../types/forms";
import { MultiSelectField } from "../inputs/MultiSelectFormField";
import { RadioField } from "../inputs/RadioFormField";
import {
  createField,
  deleteField,
  getFields,
  getForm,
  updateOptions,
} from "../utils/apiUtils";
import { useRequireAuth } from "../hooks/useRequireAuth";

export interface FormProps {
  formID: number;
}

const getNewField = (type: string, label: string): FormFieldData => {
  switch (type) {
    case "DROPDOWN":
      return {
        kind: "DROPDOWN",
        options: [],
        id: -1,
        label: label,
        value: "",
      };

    case "RADIO":
      return {
        kind: "RADIO",
        options: [],
        id: -1,
        label: label,
        value: "",
      };

    default:
      return {
        kind: "TEXT",
        id: -1,
        label: label,
        type: type,
        value: "",
      };
  }
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type AddAction = {
  type: "add_field";
  field: FormFieldData;
};

type UpdateTitle = {
  type: "update_title";
  title: string;
};

type UpdateFieldTypeAction = {
  type: "update_field_type";
  fieldType: string;
  fieldId: number;
};

// type AddOptionAction = {
//   type: "add_option";
//   option: string;
//   fieldId: number;
// };

// type RemoveOptionAction = {
//   type: "remove_option";
//   fieldId: number;
//   index: number;
// };

type UpdateLabelAction = {
  type: "update_label";
  fieldId: number;
  label: string;
};

// type UpdateOptionAction = {
//   type: "update_option";
//   fieldId: number;
//   index: number;
//   option: string;
// };

type SetFieldsAction = {
  type: "set_fields";
  fields: FormFieldData[];
};

type UpdateForm = {
  type: "update_form";
  form: Partial<FormData>;
};

type FormAction =
  | RemoveAction
  | AddAction
  | UpdateTitle
  | UpdateFieldTypeAction
  // | AddOptionAction
  // | RemoveOptionAction
  // | UpdateOptionAction
  | UpdateLabelAction
  | SetFieldsAction
  | UpdateForm;

const reducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case "add_field":
      return { ...state, formFields: [...state.formFields, action.field] };

    case "remove_field":
      return {
        ...state,
        formFields: state.formFields.filter((field) => action.id !== field.id),
      };

    // case "update_field_type":
    //   return {
    //     ...state,
    //     formFields: state.formFields.map((field) => {
    //       if (field.id === action.fieldId) {
    //         return getNewField(action.fieldType, field.label);
    //       }
    //       return field;
    //     }),
    //   };

    case "update_label":
      return {
        ...state,
        formFields: state.formFields.map((field) => {
          return field.id === action.fieldId
            ? { ...field, label: action.label }
            : field;
        }),
      };

    case "update_title":
      return { ...state, title: action.title };

    // case "add_option":
    //   return {
    //     ...state,
    //     formFields: state.formFields.map((field: FormFieldData) => {
    //       if (
    //         field.id === action.fieldId &&
    //         (field.kind === "RADIO" || field.kind === "DROPDOWN")
    //       )
    //         return {
    //           ...field,
    //           options: [...field.options, action.option],
    //         };

    //       return field;
    //     }),
    //   };

    // case "remove_option":
    //   return {
    //     ...state,
    //     formFields: state.formFields.map((field) => {
    //       if (
    //         field.id === action.fieldId &&
    //         (field.kind === "RADIO" || field.kind === "DROPDOWN")
    //       ) {
    //         return {
    //           ...field,
    //           options: field.options.filter((_, i) => action.index !== i),
    //         };
    //       }
    //       return field;
    //     }),
    //   };

    // case "update_option":
    //   return {
    //     ...state,
    //     formFields: state.formFields.map((field: FormFieldData) => {
    //       if (
    //         field.id === action.fieldId &&
    //         (field.kind === "RADIO" || field.kind === "DROPDOWN")
    //       )
    //         return {
    //           ...field,
    //           options: field.options.map((option, i) =>
    //             action.index !== i ? option : action.option,
    //           ),
    //         };
    //       return field;
    //     }),
    //   };

    case "set_fields":
      return {
        ...state,
        formFields: action.fields,
      };

    case "update_form":
      return {
        ...state,
        ...action.form,
      };

    default:
      return state;
  }
};

export const Form: FC<FormProps> = ({ formID }) => {
  const user = useRequireAuth();
  const [formData, dispatch] = useReducer(reducer, {
    id: formID,
    title: "",
    formFields: [],
  });

  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("TEXT");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = "Form Editor";

    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    user &&
      getForm(formID).then((form) => {
        dispatch({ type: "update_form", form });
      });
  }, [formID, user]);

  useEffect(() => {
    user &&
      getFields(formID).then((fieldPagination) => {
        return dispatch({
          type: "set_fields",
          fields: fieldPagination.results,
        });
      });
  }, [formID, user]);

  const renderField = (field: FormFieldData) => {
    switch (field.kind) {
      case "TEXT":
        return <FormField key={field.id} fieldData={field} />;
      case "DROPDOWN":
        return (
          <MultiSelectField
            updateOptions={(options) => {
              updateOptions(formID, field.id, options).then(() => {
                // dispatch({ type: "update_options", fieldId: field.id, options });
              });
            }}
            key={field.id}
            fieldData={field}
          />
        );

      case "RADIO":
        return (
          <RadioField
            updateLabel={(label) =>
              dispatch({ type: "update_label", fieldId: field.id, label })
            }
            updateOptions={(options) => {
              updateOptions(formID, field.id, options).then(() => {
                // dispatch({ type: "update_options", fieldId: field.id, options });
              });
            }}
            key={field.id}
            fieldData={field}
          />
        );

      default:
        return <></>;
    }
  };

  const addField = (type: string, label: string) => {
    const field = getNewField(type, label);
    createField(formID, field).then((newField) => {
      dispatch({ type: "add_field", field: newField });
    });
  };

  return (
    <div className="w-full">
      <form>
        <input
          ref={titleRef}
          value={formData.title}
          onChange={(e) => {
            dispatch({ type: "update_title", title: e.target.value });
          }}
          className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full my-1 bg-slate-100 outline-none rounded-sm"
        />

        {formData.formFields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            {renderField(field)}
            {field.kind === "TEXT" ? field.type : field.kind}

            <svg
              onClick={() => {
                deleteField(formID, field.id).then(() => {
                  dispatch({ type: "remove_field", id: field.id });
                });
              }}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 fill-red-600"
            >
              <title>Click to remove "{field.label}" field</title>
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}

        <div className="flex items-center gap-2 border-y-2 py-2 mt-2">
          <input
            placeholder="Untited Field"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            type="TEXT"
            className="focus:border-blue-300 border-2 border-gray-300 p-2 w-full bg-slate-100 outline-none rounded-sm"
          />

          <select
            className="p-3"
            onChange={(e) => {
              setNewFieldType(e.target.value);
            }}
          >
            {HTMLInputTypeAttributeValues.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </select>
          <svg
            onClick={() => {
              if (newFieldLabel.length === 0) return;
              addField(newFieldType, newFieldLabel);
              setNewFieldLabel("");
            }}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 fill-blue-600"
          >
            <title>Click to add new field</title>
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex flex-row gap-2 justify-start mt-4">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-60 text-white rounded-md"
            onClick={(e) => {
              e.preventDefault();
              saveFormData(formData);
            }}
          >
            Save
          </button>
          <Link href="/">
            <button className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md ml-auto">
              Close Form
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
