import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormBuilder from "@/pages/site-management/app/formbuilder/components/FormBuilder";
interface Form {
  id: number;
  published: boolean;
  name: string;
  content: string;
}
import Loader from "@/components/global/loader";
import { useGetFormQuery } from "@/api/service/user_Auth_Api";

export function BuilderPage() {
  const { form_type } = useParams(); // Extract form_type from the URL
  const { data, isLoading: dataLoading } = useGetFormQuery(
    { form_type },
    { skip: !form_type }
  );
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    if (data ) {
      const fetchedForm = data;
      setForm({
        id: fetchedForm.id,
        published: fetchedForm.published,
        name: fetchedForm.form_type,
        content: fetchedForm.content,
      });
    }
  }, [data]);

  return (
    <>
      <Loader disable={!dataLoading} type="spinner">
        {form && <FormBuilder form={form}/>}
      </Loader>
    </>
  );
}
