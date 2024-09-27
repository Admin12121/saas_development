import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import {
  useRegisterUserMutation,
  useDomainCheckMutation,
} from "@/api/service/user_Auth_Api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userRegistrationSchema = z.object({
  user_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string().max(160).min(4),
  organization: z.string().min(1, "Organization name is required"),
  subdomain: z.string().min(5, "minimum 5 character required"),
});

type ProfileFormValues = z.infer<typeof userRegistrationSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [checkDomain, { isLoading: DoaminLoading }] = useDomainCheckMutation();
  const [verified, setverified] = React.useState<boolean>(false);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      organization: "",
      subdomain: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    if(!verified){
      return 
    }
    const actualdata =  {
      "user_name" : data.user_name,
      "email" : data.email,
      "first_name" : data.first_name,
      "last_name" : data.last_name,
      "phone" : data.phone,
      "organization" : data.organization,
      "subdomain" : data.subdomain,
      "password" : "eghsbgskdgjhskdgm"
    }
    const res = await registerUser(actualdata);
    if (res.data) {
      toast.success(res.data.message, {
        action: {
          label: "X",
          onClick: () => toast.dismiss(),
        },
      });
      navigate(`/active-account/${res.data.user_name}`);
    } else {
      if ((res.error as any)?.data) {
        Object.keys((res.error as any).data).forEach((key) => {
          form.setError(key as keyof ProfileFormValues, { message: (res.error as any).data[key][0] });
        });
      }
      if(form.formState.errors.subdomain){
        setverified(false)
      }
    }
  }

  const handleDoaminCheck = async (subdomain: string) => {
    const actualData = { "subdomain" : subdomain };
    const res = await checkDomain({ actualData });
    if (res.data) {
      setverified(true)
      toast.success("Domain is available");
    } else {
      setverified(false)
      toast.error("Domain is not available");
    }
  };

  return (
    <div className={cn("grid gap-6 px-10", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid grid-cols-1 md:grid-cols-2 relative gap-x-5 gap-y-2"
        >
          <FormField
            control={form.control}
            name="user_name"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="User Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full" style={{ margin: "0" }}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organization" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span
            className="flex gap-5 items-end w-full col-span-full"
            style={{ margin: "0" }}
          >
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem style={{ margin: "0" }}>
                  <FormLabel>Sub Domain</FormLabel>
                  <FormControl>
                    <div className="flex gap-3 flex-row">
                      <div className={`flex items-center border pr-10 rounded-md justify-center ${verified ? "border-green-500" : "border-red-600"}`}>
                        <Input
                          placeholder="subdomain"
                          {...field}
                          className="flex-grow border-0 shadow-none outline-none"
                        />
                        <span className="ml-2">.vicky.com</span>
                      </div>
                      <Button
                        type="button"
                        className="bg-blue-700 text-white "
                        disabled={
                          DoaminLoading || !!form.formState.errors.subdomain ||  form.getValues("subdomain") === ""
                        }
                        loading={DoaminLoading}
                        onClick={() =>
                          handleDoaminCheck(form.getValues("subdomain"))
                        }
                      >
                        Check domain
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </span>
          <Button
            className="col-span-full"
            loading={isLoading}
            disabled={isLoading}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} loading={isLoading}>
        GitHub
      </Button> */}
    </div>
  );
}
