import { convexAuth } from "@convex-dev/auth/server";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTP } from "./ResendOTP";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google, Password({ verify: ResendOTP })],
});
