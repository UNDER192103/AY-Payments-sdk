import type { AyPaymentsPagination, AyPaymentsRecord } from "../core.js";
import type { AyPaymentsCustomer } from "../models.js";

export interface AyPaymentsCreateCustomerPayloadMin {
  email: string;
  password: string;
  fullName: string;
}

export interface AyPaymentsCreateCustomerPayloadFull extends AyPaymentsCreateCustomerPayloadMin {
  document?: string;
  phone?: string;
  metadata?: AyPaymentsRecord;
}

export type AyPaymentsCreateCustomerPayload =
  | AyPaymentsCreateCustomerPayloadMin
  | AyPaymentsCreateCustomerPayloadFull;

export interface AyPaymentsCustomersResponse {
  clients: AyPaymentsCustomer[];
  pagination: AyPaymentsPagination;
}

export interface AyPaymentsCustomerResponse {
  client: AyPaymentsCustomer;
  reused?: boolean;
}
