import type { Session, UserProfile } from "@/types";

export interface SignupInput {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

interface AuthResponse {
  user: Pick<UserProfile, "id" | "email" | "role" | "full_name">;
  session: Session;
}

// Dummy mock user
const MOCK_USER: UserProfile = {
  id: "mock-user-123",
  email: "student@example.com",
  full_name: "Mock Student",
  phone: "1234567890",
  role: "student",
  avatar_url: null,
  created_at: new Date().toISOString(),
};

const MOCK_SESSION: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
};

export const authApi = {
  signup: async (input: SignupInput): Promise<AuthResponse> => {
    return {
      user: {
        id: MOCK_USER.id,
        email: input.email,
        full_name: input.full_name,
        role: "student",
      },
      session: MOCK_SESSION,
    };
  },

  login: async (input: LoginInput): Promise<AuthResponse> => {
    // Demo credentials for the student Kevin Fannex
    const demoStudent = { email: "kfannex@gmail.com", password: "kevin@123" };
    // Demo credentials for the admin
    const demoAdmin = { email: "connect@genzcodemy.com", password: "genzcodemy26" };

    if (input.email === demoStudent.email && input.password === demoStudent.password) {
      return {
        user: {
          id: MOCK_USER.id,
          email: input.email,
          full_name: "Kevin Fannex",
          role: "student",
        },
        session: MOCK_SESSION,
      };
    }

    if (input.email === demoAdmin.email && input.password === demoAdmin.password) {
      return {
        user: {
          id: MOCK_USER.id,
          email: input.email,
          full_name: "Admin User",
          role: "admin",
        },
        session: MOCK_SESSION,
      };
    }

    // Existing simple admin detection logic for other emails
    return {
      user: {
        id: MOCK_USER.id,
        email: input.email,
        full_name: "Logged In User",
        // Hack: Treat testadmin@example.com as an admin for UI testing
        role: input.email.includes("admin") ? "admin" : "student",
      },
      session: MOCK_SESSION,
    };
  },

  me: async (): Promise<UserProfile> => {
    // Determine role dynamically based on local storage if we want to be fancy,
    // but a static student is fine for simple mock mode.
    return MOCK_USER;
  },

  logout: async () => {
    return { success: true };
  },
};
