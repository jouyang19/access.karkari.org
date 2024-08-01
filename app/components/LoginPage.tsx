import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export type LoginType = {
  className?: string;
};

export const Login = ({ className = "" }) => {
  const { signIn } = useAuthActions();

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-khaki-100 flex flex-col justify-between p-8">
      {/* Top left logo */}
      <div>
        <img
          className="h-7 w-[217px] object-cover"
          loading="lazy"
          alt="Institute logo"
          src="/institute-logo.png"
        />
      </div>

      {/* Centered Google login button */}
      <div className="flex justify-center">
        <div className="w-[213px]">
          <button
            className="shadow-md rounded-full bg-khaki-200 border-gray-100 border-3 py-2 px-4 cursor-pointer flex items-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <span className="font-medium">Login with Google</span>
            <img
              className="w-6 h-6 object-cover"
              alt="Google logo"
              src="/google-logo.png"
            />
          </button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex justify-between items-end">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold text-gray-200 mb-2">
            EXCERPT FROM THE SUFI PATH OF LIGHT
          </h2>
          <p className="text-xl text-black font-eb-garamond">
            The word shaykh is made of the letters Shīn, Yāʾ, and Khāʾ, which
            stands for shārib, "to imbibe," yaqīn, "certainty," and khamra,
            "wine," the pre-eternal wine; the Shaykh is the one who imbibes the
            certainty of pre-eternal wine.
          </p>
        </div>
        <div className="w-[185px] h-[116px]">
          <img
            className="w-full h-full object-contain"
            loading="lazy"
            alt="Nun Logo"
            src="/Nun Logo.svg"
          />
        </div>
      </div>
    </div>
  );
};
