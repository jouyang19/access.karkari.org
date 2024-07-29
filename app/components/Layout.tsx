import { ReactNode } from "react";
import Navbar from "./NavBar";
import { Login } from "./LoginPage";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <AuthLoading>Loading</AuthLoading>
      <Unauthenticated>
        <Login />
      </Unauthenticated>
      <Authenticated>
        {/* <Navbar /> */}
        <main>{children}</main>
      </Authenticated>
    </div>
  );
}
