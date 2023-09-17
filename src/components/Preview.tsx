import { FC, useEffect, useState } from "react";
import { useNavigate } from "raviger";
import { Form, FormFieldData } from "../types/forms";
import { Carousel } from "../Carousel";
import { PreviewTextField } from "../previews/TextFieldPreview";
import { PreviewMultiSelect } from "../previews/MultiSelectFieldPreview";
import { PreviewRadio } from "../previews/RadioFieldPreview";
import { createSubmission, getFields, getForm } from "../utils/apiUtils";
import { useRequireAuth } from "../hooks/useRequireAuth";
import LocationSelector from "../previews/LocationSelectorPreview";
import { LatLngExpression } from "leaflet";

export interface FormProps {
  formID: number;
}

export const FormPreview: FC<FormProps> = ({ formID }) => {
  const user = useRequireAuth();
  const [form, setForm] = useState<Form>({
    is_public: false,
    title: "",
    description: "",
    id: -1,
  });

  const [fields, setFields] = useState<FormFieldData[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    user &&
      getForm(formID).then((form) => {
        setForm(form);
      });
  }, [formID, user]);

  useEffect(() => {
    user &&
      getFields(formID).then((fields) => {
        setFields(fields.results);
      });
  }, [formID, user]);

  const navigate = useNavigate();

  if (fields.length === 0) {
    return <p className="text-5xl">Empty Form</p>;
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(fields.some((field) => field.value === "")) {
            alert("Please fill all fields");
            return;
          }

          createSubmission(
            form,
            fields.map((field) => {
              return {
                form_field: field.id,
                value: field.value,
              };
            }),
          ).then(() => navigate("/"));
        }}
      >
        <h2 className="text-2xl text-center underline">{form.title}</h2>
        <Carousel setCurrent={setCurrent}>
          {fields.map((field) => {
            switch (field.kind) {
              case "TEXT":
                return (
                  <PreviewTextField
                    key={field.id}
                    field={field}
                    setAnswer={(answer) => {
                      setFields(
                        fields.map((f) => {
                          if (f.id === field.id) {
                            return {
                              ...f,
                              value: answer,
                            };
                          }
                          return f;
                        }),
                      );
                    }}
                  />
                );

              case "DROPDOWN":
                return (
                  <PreviewMultiSelect
                    key={field.id}
                    field={field}
                    setAnswer={(answer) => {
                      // console.log(answer);
                      setFields(
                        fields.map((f) => {
                          if (f.id === field.id) {
                            return {
                              ...f,
                              value: answer,
                            };
                          }
                          return f;
                        }),
                      );
                    }}
                  />
                );

              case "RADIO":
                return (
                  <PreviewRadio
                    key={field.id}
                    field={field}
                    setAnswer={(answer) => {
                      setFields(
                        fields.map((f) => {
                          if (f.id === field.id) {
                            return {
                              ...f,
                              value: answer,
                            };
                          }
                          return f;
                        }),
                      );
                    }}
                  />
                );

                case "GENERIC":
                  switch(field.meta.type) {
                    case  "LOCATION":
                      return (<LocationSelector onChange={(latlng:LatLngExpression) => {
                        setFields(
                          fields.map((f) => {
                            if (f.id === field.id) {
                              return {
                                ...f,
                                value: latlng.toString(),
                              };
                            }
                            return f;
                          }),
                        );
                      }}/>
                    )
                    default:
                      return <h1>Invalid generic field</h1>
                  }
              default:
                return <h1>Invalid form element</h1>;
            }
          })}
        </Carousel>

        {current === fields.length - 1 && (
        <input
          type="submit"
          value="Submit"
          className="mx-auto block bg-blue-600 p-2 text-white rounded"
        />

      )}
        <button></button>

      </form>
    </div>
  );
};
