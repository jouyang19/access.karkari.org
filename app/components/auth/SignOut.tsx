import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@remix-run/react";

export function SignOut() {
  const { signOut } = useAuthActions();
  const navigate = useNavigate();
  function handleClick() {
    void signOut();
    navigate("/");
  }

  return <Button onClick={handleClick}>Sign out</Button>;
}
