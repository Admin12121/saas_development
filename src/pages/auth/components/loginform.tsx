import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfileMutation } from "@/api/service/user_Auth_Api";

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
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  password: z.string().max(160).min(4, "Password is required"),
});

type ProfileFormValues = z.infer<typeof userRegistrationSchema>;

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [UpdateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    const NewFormData = new FormData();
    NewFormData.append("email", data.email);
    NewFormData.append("password", data.password);
    const res = await UpdateProfile({ NewFormData });
    if (res.data) {
      toast.success(res.data.msg, {
        action: {
          label: "X",
          onClick: () => toast.dismiss(),
        },
      });
    } else {
      console.log(res.error);
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
              <FormItem className="col-span-full" style={{ margin: "0" }}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="col-span-full"
            loading={isLoading}
            disabled={isLoading || !form.formState.isValid}
            type="submit"
          >
            Login
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
