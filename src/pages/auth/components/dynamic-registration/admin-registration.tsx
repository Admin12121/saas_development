import { Link } from "react-router-dom";
import { UserAuthForm } from "@/pages/auth/components/user-auth-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AuthenticationPage() {


  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/available-domains"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 bg-blue-600 text-white"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" >
            <img src="/theme.jpg" alt="" className="w-full h-full object-cover"/>
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img src="/images/logo.png" className="p-2 w-14 h-14" alt="logo" /> 
            Kantipur Infotech
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning system to my clients faster than
                ever before.&rdquo;
              </p>
              {/* <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 flex flex-col justify-center items-center h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:px-5">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>
              and
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
