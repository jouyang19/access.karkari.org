import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@remix-run/react";
import { signOut } from "convex/auth";

export default function Navbar() {
  const { signOut } = useAuthActions();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Button onClick={() => void signOut()}>Sign out</Button>
        </li>
      </ul>
    </nav>
  );
}
