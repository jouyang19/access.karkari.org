import { SignInWithGoogle } from "./auth/SignInWithGoogle";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LoginForm } from "./auth/PasswordForm";

export const Login = () => {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="flex-1 m-auto">
          <p className="text-center w-[75%] m-auto">
            Welcome to access.karkari.org
          </p>
        </div>
        <div className="m-auto flex-1">
          <SignInWithGoogle />
          <LoginForm />
        </div>
      </div>
    </>
  );
};
