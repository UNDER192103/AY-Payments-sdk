import type { AyPaymentsPagination } from "../core.js";
import type { AyPaymentsApiKey, AyPaymentsPermissions } from "../models.js";
export interface AyPaymentsCreateApiKeyPayloadMin {
    name: string;
}
export interface AyPaymentsCreateApiKeyPayloadFull extends AyPaymentsCreateApiKeyPayloadMin {
    permissions?: AyPaymentsPermissions;
}
export type AyPaymentsCreateApiKeyPayload = AyPaymentsCreateApiKeyPayloadMin | AyPaymentsCreateApiKeyPayloadFull;
export interface AyPaymentsApiKeyResponse {
    apiKey: AyPaymentsApiKey;
}
export interface AyPaymentsCreateApiKeyResponse extends AyPaymentsApiKeyResponse {
    key?: string;
}
export interface AyPaymentsApiKeysResponse {
    apiKeys: AyPaymentsApiKey[];
    pagination: AyPaymentsPagination;
}
//# sourceMappingURL=api-keys.types.d.ts.map