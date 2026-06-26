import { authClient } from "@/lib/auth-client";

export const getUsr = async () => {
  const { data: session } = await authClient.getSession();
  return session;
};
