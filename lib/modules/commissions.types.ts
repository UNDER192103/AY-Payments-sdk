import type { AyPaymentsDateValue, AyPaymentsStatus } from "../core.js";
import type { AyPaymentsCommissionRule } from "../models.js";

export interface AyPaymentsPlatformCommissionResponse {
  platformCommission: {
    id?: string;
    name?: string;
    status?: AyPaymentsStatus;
    rules: AyPaymentsCommissionRule[];
    updatedDate?: AyPaymentsDateValue;
  };
}

export interface AyPaymentsUpdateCommissionPayload {
  name?: string;
  status?: AyPaymentsStatus;
  rules?: AyPaymentsCommissionRule[];
}
