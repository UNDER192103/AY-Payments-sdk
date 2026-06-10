import type { AyPaymentsClearLogsResponse, AyPaymentsPagination } from "../core.js";
import type {
  AyPaymentsGeneralLog,
  AyPaymentsLoginLog,
  AyPaymentsOrderLog,
  AyPaymentsWebhookLog,
} from "../models.js";

export interface AyPaymentsLogsResponse {
  loginLogs: AyPaymentsLoginLog[];
  generalLogs: AyPaymentsGeneralLog[];
  webhookLogs: AyPaymentsWebhookLog[];
  orderLogs: AyPaymentsOrderLog[];
  pagination: {
    loginLogs: AyPaymentsPagination;
    generalLogs: AyPaymentsPagination;
    webhookLogs: AyPaymentsPagination;
    orderLogs: AyPaymentsPagination;
  };
}

export type AyPaymentsClearLogResponse = AyPaymentsClearLogsResponse;
