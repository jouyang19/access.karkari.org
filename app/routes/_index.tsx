import type { MetaFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { signIn } from "convex/auth";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Al-Karkari Institute: The Foundations" },
    { name: "Reader", content: "The Foundations" },
  ];
};

export default function Index() {
  const [pages, setPages] = useState([]);

  const getEntireBook = useQuery(api.books.getAll);
  return (
    <>
      <Layout>
        <div className="grid grid-cols-2">
          <div className="flex bg-yellow-200 w-screen h-screen overflow-hidden font-serif">
            {/* Left Page */}
            <div className="w-1/2 p-8 border-r border-gray-400 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                The Foundations of the Karkariya Order
              </h2>
              <div className="space-y-6">
                {[...Array(2)].map((_, index) => (
                  <p key={index} className="text-base leading-relaxed">
                    He is the sun of knowledge, the meeting of the two seas, the
                    ocean of gnosis, the inmost heart of the spirit, the red
                    sulphur, the inheritor of the secret of the essence, and the
                    guide upon the Path of unveiling. He is the spiritual
                    trainer, Shaykh Abū 'Abd Allāh, Sīdī Mohamed Faouzi b.
                    Ṭayyib al- Karkarī – may God sanctify his secret – of noble
                    Prophetic descent, through Idrīsī and Ḥasanī lineage.
                  </p>
                ))}
              </div>
              <div className="flex justify-between mt-8 text-sm">
                <span>Footnotes 4</span>
                <span>43</span>
              </div>
            </div>

            {/* Right Page */}
            <div className="w-1/2 p-8 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                CHAPTER: The Pact (al-Ahd)
              </h2>
              <div className="space-y-6">
                {[...Array(2)].map((_, index) => (
                  <p key={index} className="text-base leading-relaxed">
                    He is the sun of knowledge, the meeting of the two seas, the
                    ocean of gnosis, the inmost heart of the spirit, the red
                    sulphur, the inheritor of the secret of the essence, and the
                    guide upon the Path of unveiling. He is the spiritual
                    trainer, Shaykh Abū 'Abd Allāh, Sīdī Mohamed Faouzi b.
                    Ṭayyib al- Karkarī – may God sanctify his secret – of noble
                    Prophetic descent, through Idrīsī and Ḥasanī lineage.
                  </p>
                ))}
              </div>
              <div className="flex justify-end mt-8 text-sm">
                <span>44</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
