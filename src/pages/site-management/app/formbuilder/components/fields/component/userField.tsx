"use client";

import { useState, useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements";
import { MdPerson } from "react-icons/md";
import { Label } from "@/pages/site-management/registry/new-york/ui/label";
import { Input } from "@/pages/site-management/registry/new-york/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/pages/site-management/registry/new-york/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDesigner from "../../hooks/useDesigner";
import { Switch } from "@/pages/site-management/registry/new-york/ui/switch";
import { cn } from "@/lib/utils";

const type: ElementsType = "UserField";

const extraAttributes = {
  firstNameLabel: "First Name",
  lastNameLabel: "Last Name",
  helperText: "Helper Text",
  required: false,
  firstNamePlaceholder: "First name...",
  lastNamePlaceholder: "Last name...",
};

const propertiesSchema = z.object({
  firstNameLabel: z.string().min(2).max(50),
  lastNameLabel: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  firstNamePlaceholder: z.string().max(50),
  lastNamePlaceholder: z.string().max(50),
});

export const UserFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdPerson,
    label: "User Field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    const parsedValue = JSON.parse(currentValue);
    if (element.extraAttributes.required) {
      return (
        parsedValue.firstName.length > 0 && parsedValue.lastName.length > 0
      );
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      firstNameLabel: element.extraAttributes.firstNameLabel,
      lastNameLabel: element.extraAttributes.lastNameLabel,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      firstNamePlaceholder: element.extraAttributes.firstNamePlaceholder,
      lastNamePlaceholder: element.extraAttributes.lastNamePlaceholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const {
      firstNameLabel,
      lastNameLabel,
      helperText,
      firstNamePlaceholder,
      lastNamePlaceholder,
      required,
    } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        firstNameLabel,
        lastNameLabel,
        helperText,
        firstNamePlaceholder,
        lastNamePlaceholder,
        required,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="firstNameLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Label for the first name field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastNameLabel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Label for the last name field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstNamePlaceholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Placeholder for the first name field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastNamePlaceholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Placeholder for the last name field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Helper text for the field</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>Is this field required?</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const {
    firstNameLabel,
    lastNameLabel,
    required,
    firstNamePlaceholder,
    lastNamePlaceholder,
    helperText,
  } = element.extraAttributes;
  return (
    <div className="flex gap-2 flex-col w-full">
      <span className="grid grid-cols-2 w-full gap-3">
        <span className="space-y-2">
          <Label>
            {firstNameLabel}
            {required && "*"}
          </Label>
          <Input readOnly disabled placeholder={firstNamePlaceholder} />
        </span>
        <span className="space-y-2">
          <Label>
            {lastNameLabel}
            {required && "*"}
          </Label>
          <Input readOnly disabled placeholder={lastNamePlaceholder} />
        </span>
      </span>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState<{ firstName: string; lastName: string }>(
    defaultValue ? JSON.parse(defaultValue) : { firstName: "", lastName: "" }
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const {
    firstNameLabel,
    lastNameLabel,
    required,
    firstNamePlaceholder,
    lastNamePlaceholder,
    helperText,
  } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="grid grid-cols-2 w-full gap-3">
        <span className="space-y-2">
          <Label className={cn(error && "text-red-500")}>
            {firstNameLabel}
            {required && "*"}
          </Label>
          <Input
            placeholder={firstNamePlaceholder}
            className={cn(error && "text-red-500")}
            onChange={(e) => setValue({ ...value, firstName: e.target.value })}
            onBlur={() => {
              if (!submitValue) return;
              const valid = UserFieldFormElement.validate(
                element,
                JSON.stringify(value)
              );
              setError(!valid);
              if (!valid) return;

              submitValue(element.id, JSON.stringify(value));
            }}
            value={value.firstName}
          />
        </span>
        <span className="space-y-2">
          <Label className={cn(error && "text-red-500")}>
            {lastNameLabel}
            {required && "*"}
          </Label>
          <Input
            placeholder={lastNamePlaceholder}
            className={cn(error && "text-red-500")}
            onChange={(e) => setValue({ ...value, lastName: e.target.value })}
            onBlur={() => {
              if (!submitValue) return;
              const valid = UserFieldFormElement.validate(
                element,
                JSON.stringify(value)
              );
              setError(!valid);
              if (!valid) return;

              submitValue(element.id, JSON.stringify(value));
            }}
            value={value.lastName}
          />
        </span>
      </span>

      {helperText && (
        <p
          className={cn(
            "text-muted-foreground text-[0.8rem]",
            error && "text-red-500"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
