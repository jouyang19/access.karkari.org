import { useState, useCallback } from "react";
import { useAuthActions, ConvexHttpClient } from "@convex-dev/auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useConvex } from "convex/react";
import { api } from "convex/_generated/api";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);
const verificationCodeSchema = z.string().length(8); // Assuming 6-digit code

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");

  const { signIn, verifyCodeAndSetToken } = useAuthActions();

  const validateInput = () => {
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateInput()) return;

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("flow", step);

      const result = await signIn("password", formData);

      setIsVerifying(true);

      if ("redirect" in result && result.redirect) {
        window.location.assign(result.redirect);
      } else if ("verifier" in result) {
        setIsVerifying(true);
      } else if ("started" in result && result.started) {
        console.log(`${step} process started`);
      } else if ("tokens" in result) {
        console.log(`${step} successful`);
        // Handle successful sign-in/sign-up (e.g., redirect or update app state)
      }
    } catch (error) {
      console.error(`${step} error:`, error);
      setError(`Invalid email or password`);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      verificationCodeSchema.parse(verificationCode);
    } catch (error) {
      setError("Invalid verification code. Please enter a 8-digit code.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("verifier", verificationCode);
      formData.append("flow", step);

      const result = await verifyCodeAndSetToken({ code: verificationCode });

      if ("tokens" in result) {
        console.log("Verification successful");
        // Handle successful verification (e.g., redirect or update app state)
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Invalid verification code");
    }
  };

  const toggleStep = () => {
    setStep(step === "signIn" ? "signUp" : "signIn");
    setError("");
    setIsVerifying(false);
  };

  if (isVerifying) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="verificationCode"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="8-digit code"
                  maxLength={8}
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleVerify} className="w-full">
            Verify
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{step === "signIn" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          {step === "signIn"
            ? "Enter your email and password to sign in."
            : "Create a new account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={handleSubmit} className="w-full">
          {step === "signIn" ? "Sign In" : "Sign Up"}
        </Button>
        <Button onClick={toggleStep} variant="link" className="w-full">
          {step === "signIn" ? "Sign up instead" : "Sign in instead"}
        </Button>
      </CardFooter>
    </Card>
  );
}
