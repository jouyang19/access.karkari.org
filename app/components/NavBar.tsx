import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "@remix-run/react";

export default function Navbar() {
  const { signOut } = useAuthActions();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Button onClick={() => void signOut}>Sign out</Button>
        </li>
      </ul>
    </nav>
  );
}
