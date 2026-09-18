import { createClient } from "@/lib/supabase/client";
import type { ApiError } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL!;

export class ApiRequestError extends Error {
  code: string;
  status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function getAuthHeader(): Promise<Record<string, string>> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token
    ? { Authorization: `Bearer ${session.access_token}` }
    : {};
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean; // set false for public endpoints   skips the session lookup
}

/**
 * Every call the frontend makes to the backend goes through here.
 * This is the ONE place that changes if the response envelope,
 * base URL, or auth scheme ever shifts   components never call
 * fetch() directly.
 */
export async function apiRequest<T>(
  path: string,
  { method = "GET", body, auth = true }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (auth) {
    Object.assign(headers, await getAuthHeader());
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    let parsed: ApiError | null = null;
    try {
      parsed = await res.json();
    } catch {
      // response wasn't JSON   fall through to generic error
    }
    throw new ApiRequestError(
      res.status,
      parsed?.error?.code ?? "unknown_error",
      parsed?.error?.message ?? `Request failed with status ${res.status}`
    );
  }

  // 204 / empty-body responses
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
