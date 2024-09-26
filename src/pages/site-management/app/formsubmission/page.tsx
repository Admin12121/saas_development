"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "../formbuilder/components/FormElements";
import { toast } from "@/pages/site-management/app/formbuilder/components/ui/use-toast";
import { SubmitForm } from "@/pages/site-management/actions/form";

const FormSubmitComponent = ({
  content,
}: {
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      let valid = false;
  
      try {
        valid = FormElements[field.type].validate(field, actualValue);
      } catch (error) {
        console.error(`Validation error for field ${field.id}:`, error);
        formErrors.current[field.id] = true;
        continue;
      }
  
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
  
    if (Object.keys(formErrors.current).length > 0) return false;
  
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });

      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "somethin went wrong!",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank u for submitting the form, you can close this page now
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full items-center p-8 h-screen">
      <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border rounded ">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
              submitForm={submitForm}
              pending={pending}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormSubmitComponent;
