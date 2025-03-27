import { useMemo } from "react";
import { authHook } from "./useAuth";
import { UserResource, AuthUser } from "@/types/auth.types";
import userApi from "@/lib/auth/user-api";

export function userHook(auth: ReturnType<typeof authHook>) {
  const { user: authUser, isSignedIn, reload } = auth;

  const user = useMemo<UserResource | null>(() => {
    if (!isSignedIn || !authUser) {
      return null;
    }

    return {
      ...authUser,

      update: async (data: Partial<AuthUser>) => {
        await userApi.update(data);
        reload();
      },
      reload,
    };
  }, [authUser, isSignedIn]);

  return { user, isSignedIn };
}
