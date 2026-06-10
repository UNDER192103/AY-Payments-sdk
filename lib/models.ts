import type {
  AyPaymentsDateValue,
  AyPaymentsFeeKind,
  AyPaymentsFeePayer,
  AyPaymentsOrderPaymentMethod,
  AyPaymentsOrderStatus,
  AyPaymentsProvider,
  AyPaymentsRecord,
  AyPaymentsStatus,
} from "./core.js";

export interface AyPaymentsPermissionSet {
  list?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
}

export interface AyPaymentsPermissions {
  createAdmins?: boolean;
  manageApiKeys?: boolean;
  projects?: AyPaymentsPermissionSet;
  products?: AyPaymentsPermissionSet;
  orders?: AyPaymentsPermissionSet;
  clients?: AyPaymentsPermissionSet;
  customers?: AyPaymentsPermissionSet;
  commissions?: AyPaymentsPermissionSet;
  sales?: AyPaymentsPermissionSet;
  [area: string]: unknown;
}

export interface AyPaymentsUserBase {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string | null;
  status?: "active" | "blocked" | AyPaymentsStatus;
  metadata?: AyPaymentsRecord;
  createdDate?: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export interface AyPaymentsAdmin extends AyPaymentsUserBase {
  role?: "admin" | "master";
  isMaster?: boolean;
  permissions?: AyPaymentsPermissions;
  lastLoginAt?: number;
}

export interface AyPaymentsTenant extends AyPaymentsUserBase {
  type?: "tenant";
  name: string;
  fullName: string;
  permissions?: AyPaymentsPermissions;
  lastLoginAt?: number;
}

export interface AyPaymentsCustomer extends AyPaymentsUserBase {
  name?: string;
  firstName?: string;
  lastName?: string;
  document?: string;
  phone?: string;
  accountNumber?: string | number;
}

export interface AyPaymentsApiKey {
  id: string;
  name: string;
  keyPrefix?: string;
  prefix?: string;
  status: "active" | "revoked";
  ownerRole?: "admin" | "tenant" | "customer";
  ownerId?: string;
  scope?: AyPaymentsRecord;
  metadata?: AyPaymentsRecord;
  permissions?: AyPaymentsPermissions;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
  lastUsedAt?: number;
}

export interface AyPaymentsFee {
  id?: string;
  name: string;
  kind: AyPaymentsFeeKind;
  value: number;
  payer: AyPaymentsFeePayer;
  active?: boolean;
  description?: string;
}

export interface AyPaymentsCommissionRule extends AyPaymentsFee {
  id: string;
}

export interface AyPaymentsProjectCommission {
  mode: "inherit" | "override";
  rules: AyPaymentsCommissionRule[];
  updatedDate?: AyPaymentsDateValue;
}

export interface AyPaymentsProjectConnection {
  id: string;
  provider: AyPaymentsProvider;
  connectedAccountId: string;
  name?: string;
  status?: "active" | "inactive" | "blocked";
  publicKey?: string;
  expiresAt?: number;
  lastRefreshDate?: number;
  isPlatformOwnerAccount?: boolean;
  liveMode?: boolean;
  userId?: string;
  scope?: string;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export interface AyPaymentsProject {
  id: string;
  tenantId?: string | null;
  externalId: string;
  name?: string;
  status?: "active" | "archived" | "blocked";
  webhookUrl?: string;
  connectedAccounts: AyPaymentsProjectConnection[];
  commission?: AyPaymentsProjectCommission;
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export type AyPaymentsProjectMin = Pick<
  AyPaymentsProject,
  "id" | "externalId" | "name" | "status" | "connectedAccounts" | "metadata" | "createdDate"
>;
export type AyPaymentsProjectFull = AyPaymentsProject;

export interface AyPaymentsProduct {
  id: string;
  projectId: string;
  connectedAccountId: string;
  name: string;
  icon?: string;
  description?: string;
  webhookUrl?: string;
  value: number;
  fees: AyPaymentsFee[];
  status?: "active" | "inactive" | "blocked";
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export type AyPaymentsProductMin = Pick<
  AyPaymentsProduct,
  "id" | "projectId" | "connectedAccountId" | "name" | "value" | "fees" | "status" | "metadata" | "createdDate"
>;
export type AyPaymentsProductFull = AyPaymentsProduct;

export interface AyPaymentsCustomerPhone {
  countryCode?: string;
  areaCode?: string;
  number?: string;
}

export interface AyPaymentsCustomerAddress {
  street?: string;
  streetName?: string;
  number?: string;
  streetNumber?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  federalUnit?: string;
  zipCode?: string;
  country?: string;
  [key: string]: unknown;
}

export interface AyPaymentsCheckoutCustomer {
  id?: string;
  email?: string;
  name?: string;
  fullName?: string;
  documentType?: "CPF" | "CNPJ" | "cpf" | "cnpj" | "passport" | "other";
  document?: string;
  cpf?: string;
  phone?: AyPaymentsCustomerPhone | string;
  birthDate?: string;
  address?: AyPaymentsCustomerAddress | AyPaymentsRecord;
  metadata?: AyPaymentsRecord;
}

export interface AyPaymentsOrderWebhookDelivery {
  status?: "pending" | "sent" | "failed";
  attempts?: number;
  lastStatusCode?: number;
  lastResponse?: string;
  lastDeliveredAt?: number;
  source?: "order" | "product" | "project";
  url?: string;
}

export interface AyPaymentsOrderItem {
  id: string;
  productId?: string;
  name: string;
  icon?: string;
  quantity: number;
  subtotal: number;
  total: number;
  sellerNetTotal: number;
  customerFeeTotal?: number;
  sellerFeeTotal?: number;
  customerCommissionTotal?: number;
  sellerCommissionTotal?: number;
  fees: AyPaymentsFee[];
}

export interface AyPaymentsOrder {
  id: string;
  projectId: string;
  clientId?: string;
  provider: AyPaymentsProvider;
  connectedAccountId: string;
  paymentMethod?: AyPaymentsOrderPaymentMethod;
  externalReference?: string;
  providerPaymentId?: string;
  providerEventId?: string;
  checkoutUrl?: string;
  webhookUrl?: string;
  status: AyPaymentsOrderStatus;
  amount: number;
  currency: string;
  items: AyPaymentsOrderItem[];
  subtotal: number;
  feesTotal: number;
  commissionTotal: number;
  sellerNetTotal: number;
  customer?: AyPaymentsCheckoutCustomer;
  metadata?: AyPaymentsRecord;
  providerPayload?: AyPaymentsRecord;
  webhookDelivery?: AyPaymentsOrderWebhookDelivery;
  projectName?: string;
  connectionName?: string;
  itemCount?: number;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export interface AyPaymentsLoginLog {
  id: string;
  userRole: "admin" | "tenant" | "customer";
  userId?: string;
  email?: string;
  success: boolean;
  failureReason?: string;
  ip?: string;
  userAgent?: string;
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
}

export interface AyPaymentsGeneralLog {
  id: string;
  level: "debug" | "info" | "warn" | "error";
  name: string;
  source?: string;
  tenantId?: string;
  projectId?: string;
  userRole?: "admin" | "tenant" | "customer" | "apiKey";
  userId?: string;
  message?: string;
  content?: unknown;
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
}

export interface AyPaymentsWebhookLog {
  id: string;
  provider: AyPaymentsProvider | string;
  eventType?: string;
  method: string;
  tenantId?: string;
  projectId?: string;
  orderId?: string;
  connectedAccountId?: string;
  providerEventId?: string;
  providerPaymentId?: string;
  status: "received" | "skipped" | "processed" | "failed" | string;
  processed: boolean;
  requestHeaders?: AyPaymentsRecord;
  query?: AyPaymentsRecord;
  body?: unknown;
  response?: AyPaymentsRecord;
  error?: string;
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
  updatedDate?: AyPaymentsDateValue;
}

export interface AyPaymentsOrderLog {
  id: string;
  orderId?: string;
  tenantId?: string;
  projectId?: string;
  eventType: string;
  status?: string;
  message?: string;
  content?: unknown;
  metadata?: AyPaymentsRecord;
  createdDate: AyPaymentsDateValue;
}
