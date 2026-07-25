// Simplified AuthContext for frontend-only development
"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Role } from "@/types";
import type { Session, User } from "@supabase/supabase-js"; 
import { useRouter } from "next/navigation";

interface AuthState {
  user: User | null;
  session: Session | null;
  role: Role | null;
  loading: boolean;
  signIn: (email: string, fullName: string, role?: Role) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("mock_auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = (email: string, fullName: string, role: Role = "student") => {
    const mockUser = {
      id: "mock-user-" + Date.now(),
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: { full_name: fullName },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      email: email,
      role: role
    } as unknown as User;
    
    setUser(mockUser);
    localStorage.setItem("mock_auth_user", JSON.stringify(mockUser));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("mock_auth_user");
    router.push("/login");
  };

  const value: AuthState = {
    user,
    session: user ? ({ access_token: "mock-token", user } as unknown as Session) : null,
    role: (user?.role as Role) || null,
    loading,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
