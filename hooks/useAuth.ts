import { useState, useEffect, useCallback, useMemo } from "react";
import authClient from "@/lib/auth/auth-client";
import { AuthState, SignInParams } from "@/types/auth.types";

export function authHook() {
  const [state, setState] = useState<AuthState>({
    isSignedIn: false,
    userId: null,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authClient.getUser();
        if (user) {
          setState({
            isSignedIn: true,
            userId: user.id,
            user,
            isLoading: false,
          });
        } else {
          setState({
            isSignedIn: false,
            userId: null,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        setState({
          isSignedIn: false,
          userId: null,
          user: null,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  // Sign in function
  const signIn = useMemo(() => {
    return {
      create: async (params: Omit<SignInParams, "deviceInfo">) => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
          const user = await authClient.signIn(params);
          setState({
            isSignedIn: true,
            userId: user.id,
            user,
            isLoading: false,
          });
          return { status: "complete" };
        } catch (error) {
          setState((prev) => ({ ...prev, isLoading: false }));
          throw error;
        }
      },

      prepareFirstFactor: async ({ email }: { email: string }) => {
        try {
          await authClient.prepareFirstFactor({ email });
        } catch (error) {
          throw error;
        }
      },

      attemptFirstFactor: async (data: { strategy: string; code: string; password: string; email: string }) => {
        try {
          const response = await authClient.attemptFirstFactor(data);
          if (response.status === "complete") {
            const { user } = response;
            setState({
              isSignedIn: true,
              userId: user.id,
              user,
              isLoading: false,
            });
          }
          return response;
        } catch (error: any) {
          throw error;
        }
      },
    };
  }, []);

  // Sign out function
  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await authClient.signOut();
    setState({
      isSignedIn: false,
      userId: null,
      user: null,
      isLoading: false,
    });
  }, []);

  const reload = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const user = await authClient.getUser();
    setState({
      isSignedIn: true,
      userId: user.id,
      user,
      isLoading: false,
    });
  }, []);

  return {
    ...state,
    signIn,
    signOut,
    reload,
  };
}
