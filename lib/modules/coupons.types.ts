import type { AyPaymentsPagination, AyPaymentsRecord } from "../core.js";
import type {
  AyPaymentsCoupon,
  AyPaymentsCouponDiscountType,
  AyPaymentsCouponStatus,
  AyPaymentsMediaGalleryItem,
} from "../models.js";

export interface AyPaymentsCreateCouponPayloadMin {
  name: string;
  code: string;
  discountType: AyPaymentsCouponDiscountType;
  discountValue: number;
}

export interface AyPaymentsCreateCouponPayloadFull extends AyPaymentsCreateCouponPayloadMin {
  tenantId?: string | null;
  productId?: string | null;
  icon?: string;
  description?: string;
  metadata?: AyPaymentsRecord;
  mediaGallery?: AyPaymentsMediaGalleryItem[];
  minimumAmount?: number;
  maximumDiscountAmount?: number;
  status?: AyPaymentsCouponStatus;
  startsAt?: number | string | Date;
  expiresAt?: number | string | Date;
  maxUses?: number;
}

export type AyPaymentsCreateCouponPayload =
  | AyPaymentsCreateCouponPayloadMin
  | AyPaymentsCreateCouponPayloadFull;

export type AyPaymentsUpdateCouponPayload =
  Partial<AyPaymentsCreateCouponPayloadMin> &
  Partial<AyPaymentsCreateCouponPayloadFull>;

export interface AyPaymentsCouponQueryInput extends AyPaymentsRecord {
  id?: string;
  tenantId?: string | null;
  productId?: string | null;
  code?: string;
  name?: string;
  status?: AyPaymentsCouponStatus | string;
  metadata?: AyPaymentsRecord;
}

export interface AyPaymentsCouponsResponse {
  coupons: AyPaymentsCoupon[];
  pagination: AyPaymentsPagination;
}

export interface AyPaymentsCouponResponse {
  coupon: AyPaymentsCoupon;
}
