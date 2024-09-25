import FormBuilder from "@/pages/site-management/app/formbuilder/components/FormBuilder";
interface Form {
    id: number;
    userId: string;
    createdAt: string;
    published: boolean;
    name: string;
    description: string;
    content: string;
    visits: number;
    submissions: number;
    shareURL: string;
  }

  
export function BuilderPage() {
  const form:Form = {
    content: "[]",
    createdAt: "$D2024-09-24T05:07:30.629Z",
    description: "",
    id: 261,
    name: "seehsjsfjfj",
    published: false,
    shareURL: "65cc767a-dd18-4611-86f8-cea367520b89",
    submissions: 0,
    userId: "user_2mTHQ9UPulcoPYdt0Kkiv0Tyxc4",
    visits: 0,
  };
    if (!form) {
      throw new Error("form not found");
    }
  return (
    <>
      <FormBuilder form={form} />
    </>
  );
}
