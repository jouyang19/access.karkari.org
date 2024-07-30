import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { Authenticated, Unauthenticated } from "convex/react";
import { Login } from "~/components/LoginPage";
import { Navigate } from "@remix-run/react";

// Website metadata
export const meta: MetaFunction = () => {
  return [
    { title: "Al-Karkari Institute: The Foundations" },
    { name: "Reader", content: "The Foundations" },
  ];
};

// Home Page
export default function Index() {
  return (
    <>
      <Layout>
        <Unauthenticated>
          <Login />
        </Unauthenticated>
        <Authenticated>
          <Navigate to="/reader" />
        </Authenticated>
      </Layout>
    </>
  );
}
