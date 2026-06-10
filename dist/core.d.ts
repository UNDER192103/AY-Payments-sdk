import type { AxiosRequestConfig } from "axios";
import type { AyPaymentsApiError } from "./errors.js";
export type AyPaymentsApiVersion = "v1" | (string & {});
export type AyPaymentsRecord = Record<string, unknown>;
export type AyPaymentsDateValue = number | string;
export type AyPaymentsStatus = "active" | "inactive" | "blocked" | "archived" | "revoked";
export type AyPaymentsProvider = "mercadopago" | "stripe";
export type AyPaymentsFeeKind = "percentage" | "fixed";
export type AyPaymentsFeePayer = "customer" | "seller";
export type AyPaymentsPaymentMethod = "checkout" | "pix" | "boleto";
export type AyPaymentsOrderPaymentMethod = AyPaymentsPaymentMethod | "card" | "wallet" | "unknown";
export type AyPaymentsOrderStatus = "draft" | "pending" | "processing" | "approved" | "paid" | "rejected" | "cancelled" | "refunded" | "failed";
export interface AyPaymentsClientOptions {
    baseUrl?: string;
    apiUrl?: string;
    apiVersion?: AyPaymentsApiVersion;
    apiKey?: string;
    authHeader?: "authorization" | "x-api-key";
    authorizationPrefix?: "Bearer" | false | (string & {});
    timeout?: number;
    debug?: boolean;
    headers?: Record<string, string>;
    axios?: AxiosRequestConfig;
    onError?: (error: AyPaymentsApiError) => void;
}
export interface AyPaymentsPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface AyPaymentsPaginationQuery {
    page?: number;
    limit?: number;
    skip?: number;
    take?: number;
}
export type AyPaymentsQuery<T extends AyPaymentsRecord = AyPaymentsRecord> = T | {
    query?: T;
    pagination?: AyPaymentsPaginationQuery;
};
export interface AyPaymentsDeleteResponse {
    message: string;
}
export interface AyPaymentsClearLogsResponse {
    category: string;
    deleted: number;
}
//# sourceMappingURL=core.d.ts.map