import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; details?: Record<string, string[]> };

export function sendSuccess<T>(data: T, status = 200) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, { status });
}

export function sendError(
  message: string,
  status = 400,
  details?: Record<string, string[]>,
) {
  return NextResponse.json<ApiResponse>(
    { success: false, error: message, details },
    { status },
  );
}
