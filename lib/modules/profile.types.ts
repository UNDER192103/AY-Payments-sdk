import type { AyPaymentsPagination } from "../core.js";
import type { AyPaymentsOrder } from "../models.js";

export interface AyPaymentsProfileOrdersResponse {
  orders: AyPaymentsOrder[];
  totals: {
    count: number;
    grossRevenue: number;
    pendingSales: number;
    approvedSales: number;
  };
  pagination: AyPaymentsPagination;
}

export interface AyPaymentsUpdateCustomerProfilePayload {
  fullName: string;
  bio?: string;
  website?: string;
  location?: string;
}

export interface AyPaymentsCustomerChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}
