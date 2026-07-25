"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface GateState {
  open: boolean;
  redirectTo: string;
}

interface AuthGateContextValue {
  requireAuth: (redirectTo: string) => boolean; // returns true if already authed
}

const AuthGateContext = createContext<AuthGateContextValue | undefined>(undefined);

/**
 * Wrap the app with this once. Any component can call `requireAuth(path)`
 * from `useAuthGate()` before performing a protected action (enroll,
 * book a class, submit an enquiry). If the user isn't logged in, this
 * opens the login modal instead of letting the action proceed.
 */
export function AuthGateProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [gate, setGate] = useState<GateState>({ open: false, redirectTo: "/" });

  const requireAuth = useCallback(
    (redirectTo: string) => {
      if (user) return true;
      setGate({ open: true, redirectTo });
      return false;
    },
    [user]
  );

  const close = () => setGate((g) => ({ ...g, open: false }));

  const goToLogin = () => {
    close();
    router.push(`/login?redirect=${encodeURIComponent(gate.redirectTo)}`);
  };

  const goToSignup = () => {
    close();
    router.push(`/signup?redirect=${encodeURIComponent(gate.redirectTo)}`);
  };

  return (
    <AuthGateContext.Provider value={{ requireAuth }}>
      {children}
      {gate.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm border-2 border-[#1a1a1a] bg-white p-6 shadow-[8px_8px_0px_#1a1a1a]">
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
              auth_required.sh
            </p>
            <h2 className="mb-4 text-2xl font-extrabold text-[#1a1a1a]">
              Log in to continue
            </h2>
            <p className="mb-6 text-sm text-[#1a1a1a]/80">
              You need an account to enroll, book a class, or send an enquiry.
            </p>
            <div className="flex gap-3">
              <button
                onClick={goToLogin}
                className="flex-1 border-2 border-[#1a1a1a] bg-[#f5c518] px-4 py-2 font-bold text-[#1a1a1a] shadow-[4px_4px_0px_#1a1a1a] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Log in
              </button>
              <button
                onClick={goToSignup}
                className="flex-1 border-2 border-[#1a1a1a] bg-white px-4 py-2 font-bold text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-white"
              >
                Sign up
              </button>
            </div>
            <button
              onClick={close}
              className="mt-4 w-full text-center text-xs text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </AuthGateContext.Provider>
  );
}

export function useAuthGate() {
  const ctx = useContext(AuthGateContext);
  if (!ctx) throw new Error("useAuthGate must be used within AuthGateProvider");
  return ctx;
}
