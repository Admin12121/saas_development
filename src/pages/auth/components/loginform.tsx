import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUserMutation } from "@/api/service/user_Auth_Api";
import { useNavigate } from "react-router-dom";
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
    .string({
      required_error: "Please enter your username.",
    }),
  password: z.string().max(160).min(4, "Password is required"),
});

type ProfileFormValues = z.infer<typeof userRegistrationSchema>;

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [Login , { isLoading }] = useLoginUserMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userRegistrationSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    const user = data
    const res = await Login({ user });
    if (res.data) {
      toast.success(res.data.message, {
        action: {
          label: "X",
          onClick: () => toast.dismiss(),
        },
      });
      navigate(`/login/${res.data.user_name}`);
    } else {
      if ((res.error as any)?.data) {
        Object.keys((res.error as any).data).forEach((key) => {
          form.setError(key as keyof ProfileFormValues, { message: (res.error as any).data[key][0] });
          toast.error((res.error as any).data[key][0]);
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
              <FormItem className="col-span-full" style={{ margin: "0" }}>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
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
            disabled={isLoading}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
