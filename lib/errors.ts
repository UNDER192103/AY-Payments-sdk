import type { AyPaymentsPaymentMethod, AyPaymentsProvider } from "./core.js";

export interface AyPaymentsApiErrorPayload {
  error: string;
  provider?: AyPaymentsProvider | string;
  paymentMethod?: AyPaymentsPaymentMethod | string;
  orderId?: string;
  path?: string;
  status?: number;
  details?: unknown;
}

export interface CommunError {
  error: string;
}

export interface ContextError {
  error: string;
  provider: string;
  paymentMethod: string;
  orderId: string;
  path: string;
}

export interface ExternalProviderErrorDetails {
  message: string;
  code?: string | number;
  status?: number;
  [key: string]: unknown;
}

export interface ExternalProviderError {
  error: string;
  provider: string;
  status: number;
  details: ExternalProviderErrorDetails;
}

export type ErrorResponse = CommunError | ContextError | ExternalProviderError;
export type AyPaymentsApiResult<T> = T | ErrorResponse;

export class AyPaymentsApiError extends Error {
  status?: number;
  payload: AyPaymentsApiErrorPayload;

  constructor(payload: AyPaymentsApiErrorPayload, status?: number) {
    super(payload.error || "AY Payments API error");
    this.name = "AyPaymentsApiError";
    this.status = status;
    this.payload = payload;
  }
}

export function isApiError<T>(response: AyPaymentsApiResult<T>): response is ErrorResponse {
  return !!response && typeof response === "object" && "error" in response;
}

export function isContextError(response: unknown): response is ContextError {
  return (
    !!response &&
    typeof response === "object" &&
    "error" in response &&
    "provider" in response &&
    "paymentMethod" in response &&
    "orderId" in response &&
    "path" in response
  );
}

export function isExternalProviderError(response: unknown): response is ExternalProviderError {
  return (
    !!response &&
    typeof response === "object" &&
    "error" in response &&
    "provider" in response &&
    "status" in response &&
    "details" in response
  );
}
