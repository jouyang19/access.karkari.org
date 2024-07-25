import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Layout>
        <div>
          <h1>Welcome to Remix</h1>
        </div>
      </Layout>
    </>
  );
}
