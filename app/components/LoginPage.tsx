import { SignInWithGoogle } from "./auth/SignIn";
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "@/components/ui/input";

export const Login = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <p className="m-auto mt-10">access.karkari.org</p>
        <div className="flex">
          <SignInWithGoogle />
        </div>
      </div>
    </>
  );
};
