// "use client";

// import { useState, useEffect } from "react";
// import {
//   ElementsType,
//   FormElement,
//   FormElementInstance,
//   SubmitFunction,
// } from "../../FormElements";
// import { Upload as MdFileUpload, Trash as MdDelete, Image as MdImage, Paperclip } from "lucide-react";
// import { CiImageOn } from "react-icons/ci";
// import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";
// import { Label } from "@/pages/site-management/registry/new-york/ui/label";
// import { Input } from "@/pages/site-management/registry/new-york/ui/input";
// import Spinner from "@/components/ui/spinner"

// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/pages/site-management/registry/new-york/ui/form";
// import z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import useDesigner from "../../hooks/useDesigner";
// import { Switch } from "@/pages/site-management/registry/new-york/ui/switch";
// import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const type: ElementsType = "ImageUploader";

// const extraAttributes = {
//   label: "Image",
//   helperText: "Upload an image",
//   required: false,
//   placeholder: "Choose an image...",
//   uploaderType: "file" as "file" | "profile",
//   maxFileSize: 5,
//   allowedFileTypes: "image/*" as "image/*" | "application/*" | "all",
// };

// const propertiesSchema = z.object({
//   label: z.string().min(2).max(50),
//   helperText: z.string().max(200),
//   required: z.boolean().default(false),
//   placeholder: z.string().max(50),
//   uploaderType: z.enum(["file", "profile"]),
//   maxFileSize: z.number().min(1).max(50),
//   allowedFileTypes: z.enum(["image/*", "application/*", "all"]),
// });

// export const ImageUploaderFormElement: FormElement = {
//   type,
//   construct: (id: string) => ({
//     id,
//     type,
//     extraAttributes,
//   }),

//   designerBtnElement: {
//     icon: MdImage,
//     label: "Image",
//   },

//   designerComponent: DesignerComponent,
//   formComponent: FormComponent,
//   propertiesComponent: PropertiesComponent,
//   validate: (
//     formElement: FormElementInstance,
//     currentValue: string
//   ): boolean => {
//     const element = formElement as CustomInstance;
//     if (element.extraAttributes.required) {
//       return currentValue.length > 0;
//     }
//     return true;
//   },
// };

// type CustomInstance = FormElementInstance & {
//   extraAttributes: typeof extraAttributes;
// };

// type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

// function PropertiesComponent({
//   elementInstance,
// }: {
//   elementInstance: FormElementInstance;
// }) {
//   const element = elementInstance as CustomInstance;
//   const { updateElement } = useDesigner();

//   const form = useForm<propertiesFormSchemaType>({
//     resolver: zodResolver(propertiesSchema),
//     mode: "onBlur",
//     defaultValues: {
//       label: element.extraAttributes.label,
//       helperText: element.extraAttributes.helperText,
//       required: element.extraAttributes.required,
//       placeholder: element.extraAttributes.placeholder,
//       uploaderType: element.extraAttributes.uploaderType,
//       maxFileSize: element.extraAttributes.maxFileSize,
//       allowedFileTypes: element.extraAttributes.allowedFileTypes,
//     },
//   });

//   useEffect(() => {
//     form.reset(element.extraAttributes);
//   }, [element, form]);

//   function applyChanges(values: propertiesFormSchemaType) {
//     const {
//       label,
//       helperText,
//       placeholder,
//       required,
//       uploaderType,
//       maxFileSize,
//       allowedFileTypes,
//     } = values;

//     updateElement(element.id, {
//       ...element,
//       extraAttributes: {
//         label,
//         helperText,
//         placeholder,
//         required,
//         uploaderType,
//         maxFileSize,
//         allowedFileTypes,
//       },
//     });
//   }

//   return (
//     <Form {...form}>
//       <form
//         onBlur={form.handleSubmit(applyChanges)}
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//         className="space-y-3"
//       >
//         <FormField
//           control={form.control}
//           name="label"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Label</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") e.currentTarget.blur();
//                   }}
//                 />
//               </FormControl>
//               <FormDescription>
//                 Label of the field <br /> It will be displayed above the field
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="placeholder"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>PlaceHolder</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") e.currentTarget.blur();
//                   }}
//                 />
//               </FormControl>
//               <FormDescription>Placeholder of the field</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="helperText"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Helper Text</FormLabel>
//               <FormControl>
//                 <Input
//                   {...field}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") e.currentTarget.blur();
//                   }}
//                 />
//               </FormControl>
//               <FormDescription>Helper text of the field</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="required"
//           render={({ field }) => (
//             <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
//               <div className="space-y-0.5">
//                 <FormLabel>Required</FormLabel>
//                 <FormDescription>Is this field required?</FormDescription>
//               </div>
//               <FormControl>
//                 <Switch
//                   checked={field.value}
//                   onCheckedChange={field.onChange}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="uploaderType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Uploader Type</FormLabel>
//               <FormControl>
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select uploader type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Uploader Type</SelectLabel>
//                       <SelectItem value="file">File Uploader</SelectItem>
//                       <SelectItem value="profile">
//                         Profile Picture Uploader
//                       </SelectItem>
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormDescription>Choose the type of uploader</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="maxFileSize"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Max File Size (MB)</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   {...field}
//                   onChange={(e) => field.onChange(Number(e.target.value))}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") e.currentTarget.blur();
//                   }}
//                 />
//               </FormControl>
//               <FormDescription>Maximum file size in MB</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="allowedFileTypes"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Allowed File Types</FormLabel>
//               <FormControl>
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select file types" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>File Types</SelectLabel>
//                       <SelectItem value="image/*">
//                         Images (all formats)
//                       </SelectItem>
//                       <SelectItem value="application/*">
//                         Files (all formats)
//                       </SelectItem>
//                       <SelectItem value="all">
//                         All (images and files)
//                       </SelectItem>
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormDescription>Choose the allowed file types</FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </form>
//     </Form>
//   );
// }

// function DesignerComponent({
//   elementInstance,
// }: {
//   elementInstance: FormElementInstance;
// }) {
//   const element = elementInstance as CustomInstance;
//   const { label, required, placeholder, helperText, uploaderType } =
//     element.extraAttributes;
//   return (
//     <div className="flex flex-col gap-2 w-full">
//       <Label>
//         {label}
//         {required && "*"}
//       </Label>
//       <Input readOnly disabled placeholder={placeholder} />

//       {helperText && (
//         <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
//       )}
//     </div>
//   );
// }

// function FormComponent({
//     elementInstance,
//     submitValue,
//     isInvalid,
//     defaultValue,
//   }: {
//     elementInstance: FormElementInstance;
//     submitValue?: SubmitFunction;
//     isInvalid?: boolean;
//     defaultValue?: string;
//   }) {
//     const element = elementInstance as CustomInstance;
//     const [files, setFiles] = useState<File[]>([]);
//     const [error, setError] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState<number[]>([]);
//     const [isDragging, setIsDragging] = useState(false); // State for dragging
//     const [isUploading, setIsUploading] = useState(false); // State for uploading
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // State for hover
  
//     useEffect(() => {
//       setError(isInvalid === true);
//     }, [isInvalid]);
  
//     const {
//       label,
//       required,
//       placeholder,
//       helperText,
//       uploaderType,
//       maxFileSize,
//       allowedFileTypes,
//     } = element.extraAttributes;
  
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const selectedFiles = Array.from(e.target.files || []);
//       const validFiles = selectedFiles.filter((file) => {
//         const isValidType =
//           allowedFileTypes === "all" || file.type.match(allowedFileTypes);
//         const isValidSize = file.size <= maxFileSize * 1024 * 1024;
//         return isValidType && isValidSize;
//       });
  
//       if (validFiles.length !== selectedFiles.length) {
//         alert("Some files were not valid based on the allowed types or size.");
//       }
  
//       setFiles(validFiles);
//       setUploadProgress(new Array(validFiles.length).fill(0));
//       setIsUploading(true); // Set uploading state
//       if (submitValue) {
//         submitValue(element.id, validFiles.map((file) => file.name).join(", "));
//       }
//       setIsUploading(false); // Reset uploading state after submission
//     };
  
//     const handleProfilePictureChange = (
//       e: React.ChangeEvent<HTMLInputElement>
//     ) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setFiles([file]);
//           if (submitValue) {
//             submitValue(element.id, reader.result as string);
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     };
  
//     const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       setIsDragging(false); // Reset dragging state
//       const selectedFiles = Array.from(e.dataTransfer.files);
//       handleFileChange({
//         target: { files: selectedFiles },
//       } as unknown as React.ChangeEvent<HTMLInputElement>);
//     };
  
//     const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//       e.preventDefault();
//       setIsDragging(true); // Set dragging state
//     };
  
//     const handleDragLeave = () => {
//       setIsDragging(false); // Reset dragging state
//     };
  
//     const getFileIcon = (fileType: string) => {
//       if (fileType.startsWith("image/")) {
//         return <CiImageOn className="text-green-500 h-7 w-7" />;
//       } else if (fileType === "application/pdf") {
//         return <BsFileEarmarkPdf className="text-red-500 h-7 w-7" />;
//       } else if (fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
//         return <BsFileEarmarkExcel className="text-green-500 h-7 w-7" />;
//       } else {
//         return <Paperclip className="text-red-500 h-7 w-7" />;
//       }
//     };
  
//     return (
//       <div className="flex flex-col gap-2 w-full">
//         <Label className={cn(error && "text-red-500")}>
//           {label}
//           {required && "*"}
//         </Label>
//         {uploaderType === "file" ? (
//           <>
//             <div
//               className={cn(
//                 "border-1 border-dashed p-4 rounded-lg",
//                 isDragging ? "border-primary " : "border-gray-300"
//               )}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//             >
//               <Input
//                 type="file"
//                 accept={allowedFileTypes === "all" ? "*" : allowedFileTypes}
//                 multiple
//                 placeholder={placeholder}
//                 className="hidden"
//                 id="file-upload"
//                 onChange={handleFileChange}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="flex flex-col items-center justify-center h-40 cursor-pointer"
//               >
//                 <MdFileUpload size={48} />
//                 <span className="mt-2 text-sm text-gray-500">
//                   Drag & drop or click to choose files
//                 </span>
//                 <span className="mt-1 text-xs text-gray-400">
//                   Max file size: {maxFileSize} MB
//                 </span>
//               </label>
//             </div>
//             {isUploading && <Spinner />} {/* Show spinner during upload */}
//             {files.length > 0 && (
//               <div className="mt-4">
//                 {files.map((file, index) => (
//                   <div
//                     key={index}
//                     className={cn(
//                       "flex items-center justify-between p-2 border rounded-lg mb-2 transition duration-500",
//                       hoveredIndex === index && "" 
//                     )}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <span className="px-2">
//                         {getFileIcon(file.type)}
//                       </span>
//                       <span className="flex flex-col">
//                         <span>{file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}</span>
//                         <span className="text-zinc-700 text-xs">
//                           {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
//                         </span>
//                       </span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       {isUploading ? (
//                         <Spinner />
//                       ) : (
//                         <span className="w-24"></span>
//                       )}
//                       <span
//                         className="bg-red-600 p-2 rounded-sm text-white hover:text-destructive-foreground"
//                         onMouseEnter={() => setHoveredIndex(index)}
//                         onMouseLeave={() => setHoveredIndex(null)}
//                       >
//                         <MdDelete
//                           className="cursor-pointer h-4 w-4"
//                           onClick={() =>
//                             setFiles(files.filter((_, i) => i !== index))
//                           }
//                         />
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="profile-picture-uploader flex items-center space-x-4">
//             <div className="flex flex-col items-center">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 placeholder={placeholder}
//                 className="hidden"
//                 id="profile-picture-upload"
//                 onChange={handleProfilePictureChange}
//               />
//               <label
//                 htmlFor="profile-picture-upload"
//                 className="flex flex-col items-center justify-center h-32 w-32 border-1 border-dashed border-gray-300  rounded-full cursor-pointer"
//               >
//                 {files.length > 0 ? (
//                   <img
//                     src={URL.createObjectURL(files[0])}
//                     alt="Profile"
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 ) : (
//                     <MdFileUpload size={24} />
//                 )}
//               </label>
//             </div>
//           </div>
//         )}
  
//         {helperText && (
//           <p
//             className={cn(
//               "text-muted-foreground text-[0.8rem]",
//               error && "text-red-500"
//             )}
//           >
//             {helperText}
//           </p>
//         )}
//       </div>
//     );
//   }


"use client";

import { useState, useEffect } from "react";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../../FormElements";
import { Upload as MdFileUpload, Trash as MdDelete, Image as MdImage, Paperclip } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import { BsFileEarmarkPdf, BsFileEarmarkExcel } from "react-icons/bs";
import { Label } from "@/pages/site-management/registry/new-york/ui/label";
import { Input } from "@/pages/site-management/registry/new-york/ui/input";
import Spinner from "@/components/ui/spinner"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const type: ElementsType = "ImageUploader";

const extraAttributes = {
  label: "Image",
  helperText: "Upload an image",
  required: false,
  placeholder: "Choose an image...",
  uploaderType: "file" as "file" | "profile",
  maxFileSize: 5,
  allowedFileTypes: "image/*" as "image/*" | "application/*" | "all",
  maxFiles: 5, // New attribute for max number of files
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  uploaderType: z.enum(["file", "profile"]),
  maxFileSize: z.number().min(1).max(50),
  allowedFileTypes: z.enum(["image/*", "application/*", "all"]),
  maxFiles: z.number().min(1).max(20), // New schema validation for maxFiles
});

export const ImageUploaderFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerBtnElement: {
    icon: MdImage,
    label: "Image",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
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
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
      uploaderType: element.extraAttributes.uploaderType,
      maxFileSize: element.extraAttributes.maxFileSize,
      allowedFileTypes: element.extraAttributes.allowedFileTypes,
      maxFiles: element.extraAttributes.maxFiles, // New default value
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const {
      label,
      helperText,
      placeholder,
      required,
      uploaderType,
      maxFileSize,
      allowedFileTypes,
      maxFiles, // New value
    } = values;

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeholder,
        required,
        uploaderType,
        maxFileSize,
        allowedFileTypes,
        maxFiles, // New attribute
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                Label of the field <br /> It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PlaceHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Placeholder of the field</FormDescription>
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
              <FormDescription>Helper text of the field</FormDescription>
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

        <FormField
          control={form.control}
          name="uploaderType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uploader Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select uploader type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Uploader Type</SelectLabel>
                      <SelectItem value="file">File Uploader</SelectItem>
                      <SelectItem value="profile">
                        Profile Picture Uploader
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose the type of uploader</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxFileSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max File Size (MB)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Maximum file size in MB</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowedFileTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allowed File Types</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select file types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>File Types</SelectLabel>
                      <SelectItem value="image/*">
                        Images (all formats)
                      </SelectItem>
                      <SelectItem value="application/*">
                        Files (all formats)
                      </SelectItem>
                      <SelectItem value="all">
                        All (images and files)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose the allowed file types</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Number of Files</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>Maximum number of files allowed</FormDescription>
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
  const { label, required, placeholder, helperText, uploaderType } =
    element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />

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
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [isUploading, setIsUploading] = useState(false); // State for uploading
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // State for hover

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const {
    label,
    required,
    placeholder,
    helperText,
    uploaderType,
    maxFileSize,
    allowedFileTypes,
    maxFiles,
  } = element.extraAttributes;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      const isValidType =
        allowedFileTypes === "all" || file.type.match(allowedFileTypes);
      const isValidSize = file.size <= maxFileSize * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      alert("Some files were not valid based on the allowed types or size.");
    }

    const newFiles = [...files, ...validFiles].slice(0, maxFiles);

    if (newFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files.`);
    }

    setFiles(newFiles);
    setUploadProgress(new Array(newFiles.length).fill(0));
    setIsUploading(true); // Set uploading state
    if (submitValue) {
      submitValue(element.id, newFiles.map((file) => file.name).join(", "));
    }
    setIsUploading(false); // Reset uploading state after submission
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles([file]);
        if (submitValue) {
          submitValue(element.id, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false); // Reset dragging state
    const selectedFiles = Array.from(e.dataTransfer.files);
    handleFileChange({
      target: { files: selectedFiles },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true); // Set dragging state
  };

  const handleDragLeave = () => {
    setIsDragging(false); // Reset dragging state
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <CiImageOn className="text-green-500 h-7 w-7" />;
    } else if (fileType === "application/pdf") {
      return <BsFileEarmarkPdf className="text-red-500 h-7 w-7" />;
    } else if (fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      return <BsFileEarmarkExcel className="text-green-500 h-7 w-7" />;
    } else {
      return <Paperclip className="text-red-500 h-7 w-7" />;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      {uploaderType === "file" ? (
        <>
          <div
            className={cn(
              "border-1 border-dashed p-4 rounded-lg",
              isDragging ? "border-primary " : "border-gray-300"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Input
              type="file"
              accept={allowedFileTypes === "all" ? "*" : allowedFileTypes}
              multiple
              placeholder={placeholder}
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center h-40 cursor-pointer"
            >
              <MdFileUpload size={48} />
              <span className="mt-2 text-sm text-gray-500">
                Drag & drop or click to choose files
              </span>
              <span className="mt-1 text-xs text-gray-400">
                Max file size: {maxFileSize} MB
              </span>
            </label>
          </div>
          {isUploading && <Spinner />} {/* Show spinner during upload */}
          {files.length > 0 && (
            <div className="mt-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between p-2 border rounded-lg mb-2 transition duration-500",
                    hoveredIndex === index && "" 
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <span className="px-2">
                      {getFileIcon(file.type)}
                    </span>
                    <span className="flex flex-col">
                      <span>{file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}</span>
                      <span className="text-zinc-700 text-xs">
                        {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isUploading ? (
                      <Spinner />
                    ) : (
                      <span className="w-24"></span>
                    )}
                    <span
                      className="bg-red-600 p-2 rounded-sm text-white hover:text-destructive-foreground"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <MdDelete
                        className="cursor-pointer h-4 w-4"
                        onClick={() =>
                          setFiles(files.filter((_, i) => i !== index))
                        }
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="profile-picture-uploader flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <Input
              type="file"
              accept="image/*"
              placeholder={placeholder}
              className="hidden"
              id="profile-picture-upload"
              onChange={handleProfilePictureChange}
            />
            <label
              htmlFor="profile-picture-upload"
              className="flex flex-col items-center justify-center h-32 w-32 border-1 border-dashed border-gray-300  rounded-full cursor-pointer"
            >
              {files.length > 0 ? (
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                  <MdFileUpload size={24} />
                )}
              </label>
            </div>
          </div>
        )}
  
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