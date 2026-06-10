import type { AyPaymentsPagination, AyPaymentsRecord, AyPaymentsStatus } from "../core.js";
import type { AyPaymentsAdmin, AyPaymentsPermissions, AyPaymentsTenant } from "../models.js";

export interface AyPaymentsCreateAdminPayloadMin {
  email: string;
  password: string;
  fullName: string;
}

export interface AyPaymentsCreateAdminPayloadFull extends AyPaymentsCreateAdminPayloadMin {
  isMaster?: boolean;
  permissions?: AyPaymentsPermissions;
  metadata?: AyPaymentsRecord;
  status?: AyPaymentsStatus;
}

export type AyPaymentsCreateAdminPayload =
  | AyPaymentsCreateAdminPayloadMin
  | AyPaymentsCreateAdminPayloadFull;

export interface AyPaymentsAdminsResponse {
  admins: AyPaymentsAdmin[];
  pagination: AyPaymentsPagination;
}

export interface AyPaymentsCreateTenantPayloadMin {
  email: string;
  password: string;
  name: string;
}

export interface AyPaymentsCreateTenantPayloadFull extends AyPaymentsCreateTenantPayloadMin {
  fullName?: string;
  metadata?: AyPaymentsRecord;
  permissions?: AyPaymentsPermissions;
  status?: AyPaymentsStatus;
}

export type AyPaymentsCreateTenantPayload =
  | AyPaymentsCreateTenantPayloadMin
  | AyPaymentsCreateTenantPayloadFull;

export interface AyPaymentsTenantsResponse {
  tenants: AyPaymentsTenant[];
  pagination: AyPaymentsPagination;
}
