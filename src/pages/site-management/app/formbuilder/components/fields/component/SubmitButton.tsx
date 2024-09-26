"use client";

import { useState } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../../FormElements";
import { Button } from "@/pages/site-management/registry/new-york/ui/button";
import { MdSend } from "react-icons/md";
import useDesigner from "../../hooks/useDesigner";
import Spinner from "@/components/ui/spinner";

const type: ElementsType = "SubmitButtonField";

const extraAttributes = {
  label: "Submit",
};

export const SubmitButtonFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdSend,
    label: "Submit Button",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <Button className="w-full" disabled>
      {element.extraAttributes.label}
    </Button>
  );
}

function FormComponent({
  elementInstance,
  submitForm,
  pending
}: {
  elementInstance: FormElementInstance;
  submitForm?: () => void;
  pending?: boolean;
}) {
  const element = elementInstance as CustomInstance;
  return (
    <Button
      type="submit" 
      className="w-full"
      onClick={submitForm}
      disabled={pending}
      >
      {!pending && element.extraAttributes.label}
      {pending && <Spinner/>}
    </Button>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const [label, setLabel] = useState(element.extraAttributes.label);

  const handleBlur = () => {
    updateElement(element.id, {
      ...element,
      extraAttributes: { label },
    });
  };

  return (
    <div className="flex flex-col p-2">
      <label className="text-sm text-foreground/70">Button Label</label>
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={handleBlur}
        className="mt-2 p-2 border rounded"
      />
    </div>
  );
}