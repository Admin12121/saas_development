import Safari from "@/components/global/safari";
import {
  useGetFormQuery,
  useRegisterFormMutation,
} from "@/api/service/user_Auth_Api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import content from "@/assets/content";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { useState } from "react";
import {
  FormElementInstance,
  FormElements,
} from "@/pages/site-management/app/formbuilder/components/FormElements";
import { ThemeCustomizer } from "@/pages/site-management/components/theme-customizer";
const { registration, login, profile, membership } = content;

interface Form {
  id: number;
  published: boolean;
  name: string;
  content: FormElementInstance[];
  form_type: string;
}

interface FormConfig {
  url: string;
  name: string;
  content: any;
  formType: string;
}

const SiteManagement = () => {
  const [CreateForm, { isLoading }] = useRegisterFormMutation();
  const { data, isLoading: dataLoading, refetch } = useGetFormQuery({});
  const [bgtheme, setBgtheme] = useState<any>("");

  const forms: FormConfig[] = [
    { url: "login", name: "Login", content: login, formType: "login" },
    {
      url: "register",
      name: "Register",
      content: registration,
      formType: "registration",
    },
    { url: "profile", name: "Profile", content: profile, formType: "profile" },
    {
      url: "membership",
      name: "Membership",
      content: membership,
      formType: "membership",
    },
  ];

  const handleCreateForm = async (form: FormConfig) => {
    const actualData = {
      content: form.content,
      form_type: form.formType,
    };

    const res = await CreateForm({ actualData });
    if (res.data) {
      toast.success("Form Created");
      refetch();
    } else {
      toast.error("Some thing went wrong");
    }
  };

  return (
    <div className="h-screen overflow-hidden overflow-y-auto">
      <span className="flex justify-end gap-2">
        <ThemeCustomizer setBgtheme={setBgtheme} bgtheme={bgtheme} />
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Create Forms</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Forms</DialogTitle>
              <DialogDescription>
                Create new forms. Click the button to create the respective
                form.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {forms.map((form) => {
                const formData = data?.find(
                  (item: Form) =>
                    item?.form_type?.toLowerCase() ===
                    form.formType.toLowerCase()
                );
                return (
                  <Button
                    key={form.url}
                    onClick={() => handleCreateForm(form)}
                    disabled={!!formData || isLoading}
                  >
                    {form.name}
                  </Button>
                );
              })}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </span>
      <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-5">
        {dataLoading ? (
          <Spinner />
        ) : (
          forms
            .map((form) => {
              const formData = data?.find(
                (item: Form) =>
                  item?.form_type?.toLowerCase() === form.formType.toLowerCase()
              );
              return formData ? (
                <Safari
                  key={form.url}
                  url={form.formType}
                  className="size-full cursor-pointer"
                  data={formData}
                >
                  <div>
                    {(
                      formData.content as FormElementInstance[]
                    ).map((element) => {
                      const FormElement =
                        FormElements[element.type].formComponent;
                      return (
                        <FormElement
                          key={element.id}
                          elementInstance={element}
                        />
                      );
                    })}
                  </div>
                </Safari>
              ) : null;
            })
            .filter(Boolean)
        )}
      </div>
    </div>
  );
};
export default SiteManagement;
