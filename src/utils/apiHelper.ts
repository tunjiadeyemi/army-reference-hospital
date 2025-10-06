import type { ApiResponse } from "./types/generic.types";


export async function handleApi<T>(
  request: Promise<{ data: ApiResponse<T> }>
): Promise<T> {
  try {
    const res = await request;
    const { status, message, data } = res.data;

    if (!status) {
      throw new Error(message || "Request failed");
    }

    return data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
}