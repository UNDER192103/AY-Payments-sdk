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
export declare class AyPaymentsApiError extends Error {
    status?: number;
    payload: AyPaymentsApiErrorPayload;
    constructor(payload: AyPaymentsApiErrorPayload, status?: number);
}
export declare function isApiError<T>(response: AyPaymentsApiResult<T>): response is ErrorResponse;
export declare function isContextError(response: unknown): response is ContextError;
export declare function isExternalProviderError(response: unknown): response is ExternalProviderError;
//# sourceMappingURL=errors.d.ts.map