import type { AyPaymentsRecord } from "../core.js";
import type { AyPaymentsAdmin, AyPaymentsCustomer, AyPaymentsTenant } from "../models.js";
export interface AyPaymentsLoginPayload {
    email?: string;
    username?: string;
    login?: string;
    password: string;
}
export interface AyPaymentsTenantRegisterPayloadMin {
    email: string;
    password: string;
    name: string;
}
export interface AyPaymentsTenantRegisterPayloadFull extends AyPaymentsTenantRegisterPayloadMin {
    fullName?: string;
    metadata?: AyPaymentsRecord;
}
export type AyPaymentsTenantRegisterPayload = AyPaymentsTenantRegisterPayloadMin | AyPaymentsTenantRegisterPayloadFull;
export interface AyPaymentsCustomerRegisterPayloadMin {
    email: string;
    password: string;
    fullName: string;
}
export interface AyPaymentsCustomerRegisterPayloadFull extends AyPaymentsCustomerRegisterPayloadMin {
    document?: string;
    phone?: string;
    metadata?: AyPaymentsRecord;
}
export type AyPaymentsCustomerRegisterPayload = AyPaymentsCustomerRegisterPayloadMin | AyPaymentsCustomerRegisterPayloadFull;
export interface AyPaymentsAuthAdminResponse {
    admin: AyPaymentsAdmin;
    token?: string;
}
export interface AyPaymentsAuthTenantResponse {
    tenant: AyPaymentsTenant;
    token?: string;
}
export interface AyPaymentsAuthCustomerResponse {
    client: AyPaymentsCustomer;
    token?: string;
}
export interface AyPaymentsUpdateAdminProfilePayload {
    fullName: string;
}
export interface AyPaymentsUpdateTenantProfilePayload {
    name?: string;
    fullName?: string;
    metadata?: AyPaymentsRecord;
}
export interface AyPaymentsChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
//# sourceMappingURL=auth.types.d.ts.map