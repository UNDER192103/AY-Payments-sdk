import type { AyPaymentsPaymentMethod, AyPaymentsRecord } from "../core.js";
import type { AyPaymentsCheckoutCustomer, AyPaymentsFee, AyPaymentsOrder, AyPaymentsOrderItem } from "../models.js";

export interface AyPaymentsCheckoutProductItem {
  productId: string;
  quantity?: number;
}

export interface AyPaymentsCheckoutCustomItem {
  name: string;
  amount: number;
  quantity?: number;
  icon?: string;
  description?: string;
  fees?: AyPaymentsFee[];
  metadata?: AyPaymentsRecord;
}

export type AyPaymentsCheckoutItem =
  | AyPaymentsCheckoutProductItem
  | AyPaymentsCheckoutCustomItem;

export interface AyPaymentsCheckoutRedirectUrls {
  redirectUrl?: string;
  redirect_url?: string;
  successUrl?: string;
  successRedirectUrl?: string;
  success_redirect_url?: string;
  pendingUrl?: string;
  pendingRedirectUrl?: string;
  pending_redirect_url?: string;
  failureUrl?: string;
  failureRedirectUrl?: string;
  failure_redirect_url?: string;
  cancelUrl?: string;
  cancelRedirectUrl?: string;
  cancel_redirect_url?: string;
}

export interface AyPaymentsCheckoutPayloadMin {
  items: AyPaymentsCheckoutItem[];
  customer: AyPaymentsCheckoutCustomer;
}

export interface AyPaymentsCheckoutCustomPayloadMin {
  projectId: string;
  accountId: string;
  items: AyPaymentsCheckoutCustomItem[];
  customer: AyPaymentsCheckoutCustomer;
}

export interface AyPaymentsCheckoutPayloadFull extends AyPaymentsCheckoutPayloadMin {
  projectId?: string;
  projectExternalId?: string;
  accountId?: string;
  connectedAccountId?: string;
  paymentMethod?: AyPaymentsPaymentMethod;
  currency?: string;
  webhookUrl?: string;
  webhook_url?: string;
  webhookSecret?: string;
  webhook_secret?: string;
  externalReference?: string;
  external_reference?: string;
  redirectUrl?: string;
  redirect_url?: string;
  redirectUri?: string;
  redirect_uri?: string;
  successRedirectUrl?: string;
  success_redirect_url?: string;
  pendingRedirectUrl?: string;
  pending_redirect_url?: string;
  failureRedirectUrl?: string;
  failure_redirect_url?: string;
  cancelRedirectUrl?: string;
  cancel_redirect_url?: string;
  redirectUrls?: AyPaymentsCheckoutRedirectUrls;
  providerPaymentId?: string;
  providerEventId?: string;
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  clientSecret?: string;
  client_secret?: string;
  stripeClientSecret?: string;
  metadata?: AyPaymentsRecord;
}

export type AyPaymentsCheckoutPayload =
  | AyPaymentsCheckoutPayloadMin
  | AyPaymentsCheckoutCustomPayloadMin
  | AyPaymentsCheckoutPayloadFull;

export type AyPaymentsCalculateCheckoutPayload = Omit<AyPaymentsCheckoutPayloadFull, "paymentMethod"> & {
  paymentMethod?: AyPaymentsPaymentMethod;
};

export interface AyPaymentsCheckoutSummary {
  subtotal: number;
  feesTotal: number;
  commissionTotal: number;
  sellerNetTotal: number;
  amount: number;
  currency: string;
  itemCount: number;
}

export interface AyPaymentsCheckoutCalculationResponse {
  summary: AyPaymentsCheckoutSummary;
  items: AyPaymentsOrderItem[];
}

export interface AyPaymentsOrderPayment {
  provider: string;
  method: AyPaymentsPaymentMethod;
  status: AyPaymentsOrder["status"];
  statusDetail?: string;
  checkoutUrl?: string;
  ticketUrl?: string;
  digitableLine?: string;
  qrCode?: string;
  qrCodeBase64?: string;
  redirectUrls?: AyPaymentsCheckoutRedirectUrls;
  providerPaymentId?: string;
  message?: string;
  applicationFeeApplied?: boolean;
  applicationFeeSkippedReason?: string;
}

export interface AyPaymentsCheckoutSession {
  provider: string;
  method: AyPaymentsPaymentMethod;
  type?: "redirect" | "qr" | "link";
  url?: string;
  checkoutUrl?: string;
  redirectUrls?: AyPaymentsCheckoutRedirectUrls;
  checkoutId?: string;
  sessionId?: string;
  clientSecret?: string | null;
}

export interface AyPaymentsCreateCheckoutResponse {
  order: AyPaymentsOrder;
  checkout?: AyPaymentsCheckoutSession;
  payment?: AyPaymentsOrderPayment;
  created: boolean;
}
