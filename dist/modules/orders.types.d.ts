import type { AyPaymentsPagination, AyPaymentsRecord } from "../core.js";
import type { AyPaymentsCheckoutCustomer, AyPaymentsOrder } from "../models.js";
import type { AyPaymentsProvider } from "../core.js";
export interface AyPaymentsOrdersResponse {
    orders: AyPaymentsOrder[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsOrderResponse {
    order: AyPaymentsOrder;
}
export interface AyPaymentsCreateManualOrderPayloadMin {
    clientId: string;
}
export interface AyPaymentsCreateManualOrderPayloadFull extends AyPaymentsCreateManualOrderPayloadMin {
    provider?: AyPaymentsProvider;
    connectedAccountId?: string;
    items?: Array<{
        productId: string;
        quantity?: number;
    }>;
    amount?: number;
    paymentMethod?: string;
    currency?: string;
    webhookUrl?: string;
    webhookSecret?: string;
    externalReference?: string;
    customer?: Partial<AyPaymentsCheckoutCustomer>;
    metadata?: AyPaymentsRecord;
    status?: AyPaymentsOrder["status"];
}
export type AyPaymentsCreateManualOrderPayload = AyPaymentsCreateManualOrderPayloadMin | AyPaymentsCreateManualOrderPayloadFull;
//# sourceMappingURL=orders.types.d.ts.map