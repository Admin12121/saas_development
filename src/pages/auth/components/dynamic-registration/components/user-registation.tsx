import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import {
  useRegistersubUserMutation,
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
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirm_password: z.string().min(6, "Confirm Password must be at least 6 characters."),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type ProfileFormValues = z.infer<typeof userRegistrationSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegistersubUserMutation();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onChange",
    defaultValues: {
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    const actualdata =  {
      "user_name" : data.user_name,
      "email" : data.email,
      "first_name" : data.first_name,
      "last_name" : data.last_name,
      "password" : data.password,
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
    }
  }

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
            name="password"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem style={{ margin: "0" }}>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </div>
  );
}