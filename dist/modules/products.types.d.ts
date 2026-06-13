import type { AyPaymentsPagination, AyPaymentsRecord, AyPaymentsStatus } from "../core.js";
import type { AyPaymentsFee, AyPaymentsMediaGalleryItem, AyPaymentsProduct } from "../models.js";
export interface AyPaymentsCreateProductPayloadMin {
    connectedAccountId: string;
    name: string;
    value: number;
}
export interface AyPaymentsCreateProductPayloadFull extends AyPaymentsCreateProductPayloadMin {
    icon?: string;
    description?: string;
    fees?: AyPaymentsFee[];
    webhookUrl?: string;
    webhook_url?: string;
    webhookSecret?: string;
    webhook_secret?: string;
    couponMode?: "none" | "single" | "multiple";
    status?: AyPaymentsStatus;
    metadata?: AyPaymentsRecord;
    mediaGallery?: AyPaymentsMediaGalleryItem[];
}
export type AyPaymentsCreateProductPayload = AyPaymentsCreateProductPayloadMin | AyPaymentsCreateProductPayloadFull;
export type AyPaymentsUpdateProductPayload = Partial<AyPaymentsCreateProductPayloadMin> & Partial<AyPaymentsCreateProductPayloadFull>;
export interface AyPaymentsProductsResponse {
    products: AyPaymentsProduct[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsProductResponse {
    product: AyPaymentsProduct;
}
//# sourceMappingURL=products.types.d.ts.map