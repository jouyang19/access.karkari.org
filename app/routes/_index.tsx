import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
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
        {/* Upon login, lead user to Reader.tsx route */}
        <Navigate to="/reader" />
      </Layout>
    </>
  );
}
