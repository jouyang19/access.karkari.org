import { useAuthActions } from "@convex-dev/auth/react";
import { GoogleLogo } from "../utils/GoogleLogo";
import { Button } from "@/components/ui/button";

export function SignInWithGoogle() {
  const { signIn } = useAuthActions();

  const handleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <Button className="" variant="outline" type="button" onClick={handleSignIn}>
      <GoogleLogo className="mr-2 h-4 w-4" /> Google
    </Button>
  );
}
