import type { AxiosRequestConfig } from "axios";
export type AyPaymentsApiVersion = "v1" | (string & {});
export type AyPaymentsRecord = Record<string, unknown>;
export type AyPaymentsStatus = "active" | "inactive" | "blocked" | "archived" | "revoked";
export type AyPaymentsProvider = "mercadopago" | "stripe";
export type AyPaymentsFeeKind = "percentage" | "fixed";
export type AyPaymentsFeePayer = "customer" | "seller";
export type AyPaymentsPaymentMethod = "checkout" | "pix" | "boleto";
export type AyPaymentsOrderStatus = "pending" | "processing" | "approved" | "paid" | "rejected" | "cancelled" | "refunded" | "failed";
export interface AyPaymentsClientOptions {
    /**
     * Root application URL, without /api/v1.
     * Example: https://aypayments.undernouzen.com.br
     */
    baseUrl?: string;
    /**
     * Exact API URL. If provided, it wins over baseUrl/apiVersion.
     * Example: https://aypayments.undernouzen.com.br/api/v1
     */
    apiUrl?: string;
    apiVersion?: AyPaymentsApiVersion;
    apiKey?: string;
    /**
     * Default: authorization.
     * Use x-api-key if the integration prefers that header.
     */
    authHeader?: "authorization" | "x-api-key";
    /**
     * Default: Bearer.
     * Set false to send the raw key in Authorization.
     */
    authorizationPrefix?: "Bearer" | false | (string & {});
    timeout?: number;
    debug?: boolean;
    headers?: Record<string, string>;
    axios?: AxiosRequestConfig;
    onError?: (error: AyPaymentsApiError) => void;
}
export interface AyPaymentsPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface AyPaymentsPaginationQuery {
    page?: number;
    limit?: number;
    skip?: number;
    take?: number;
}
export type AyPaymentsQuery<T extends AyPaymentsRecord = AyPaymentsRecord> = T | {
    query?: T;
    pagination?: AyPaymentsPaginationQuery;
};
export interface AyPaymentsApiErrorPayload {
    error: string;
    provider?: AyPaymentsProvider | string;
    paymentMethod?: AyPaymentsPaymentMethod | string;
    orderId?: string;
    path?: string;
    status?: number;
    details?: unknown;
}
export declare class AyPaymentsApiError extends Error {
    status?: number;
    payload: AyPaymentsApiErrorPayload;
    constructor(payload: AyPaymentsApiErrorPayload, status?: number);
}
export interface AyPaymentsDeleteResponse {
    message: string;
}
export interface AyPaymentsUserBase {
    id: string;
    email: string;
    fullName?: string;
    avatar?: string;
    status?: AyPaymentsStatus;
    metadata?: AyPaymentsRecord;
    createdDate?: number;
    updatedDate?: number;
}
export interface AyPaymentsAdmin extends AyPaymentsUserBase {
    isMaster?: boolean;
    permissions?: AyPaymentsPermissions;
}
export interface AyPaymentsTenant extends AyPaymentsUserBase {
    name: string;
    permissions?: AyPaymentsPermissions;
}
export interface AyPaymentsCustomer extends AyPaymentsUserBase {
    name?: string;
    firstName?: string;
    lastName?: string;
    document?: string;
    phone?: string;
    accountNumber?: string | number;
}
export interface AyPaymentsLoginPayload {
    email?: string;
    username?: string;
    login?: string;
    password: string;
}
export interface AyPaymentsTenantRegisterPayload {
    email: string;
    password: string;
    name: string;
    fullName?: string;
    metadata?: AyPaymentsRecord;
}
export interface AyPaymentsCustomerRegisterPayload {
    email: string;
    password: string;
    fullName: string;
    document?: string;
    phone?: string;
    metadata?: AyPaymentsRecord;
}
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
}
export interface AyPaymentsProjectCommission {
    mode: "inherit" | "override";
    rules: AyPaymentsCommissionRule[];
    updatedDate?: number;
}
export interface AyPaymentsProjectConnection {
    id: string;
    provider: AyPaymentsProvider;
    connectedAccountId: string;
    name?: string;
    status: AyPaymentsStatus;
    publicKey?: string;
    expiresAt?: number;
    lastRefreshDate?: number;
    isPlatformOwnerAccount?: boolean;
    liveMode?: boolean;
    userId?: string;
    scope?: string;
    createdDate: number;
    updatedDate?: number;
}
export interface AyPaymentsProject {
    id: string;
    tenantId?: string | null;
    externalId: string;
    name?: string;
    status: AyPaymentsStatus;
    webhookUrl?: string;
    connectedAccounts: AyPaymentsProjectConnection[];
    commission?: AyPaymentsProjectCommission;
    metadata?: AyPaymentsRecord;
    createdDate: number;
    updatedDate?: number;
}
export interface AyPaymentsCreateProjectPayload {
    tenantId?: string | null;
    externalId: string;
    name?: string;
    status?: AyPaymentsStatus;
    webhookUrl?: string;
    webhook_url?: string;
    webhookSecret?: string;
    webhook_secret?: string;
    metadata?: AyPaymentsRecord;
}
export interface AyPaymentsUpdateProjectPayload extends Partial<AyPaymentsCreateProjectPayload> {
}
export interface AyPaymentsProjectListResponse {
    projects: AyPaymentsProject[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsProjectResponse {
    project: AyPaymentsProject;
}
export interface AyPaymentsCreateProjectResponse extends AyPaymentsProjectResponse {
    created: boolean;
}
export interface AyPaymentsOAuthPayload {
    projectId?: string;
    externalId?: string;
    provider: AyPaymentsProvider;
    name?: string;
    redirectUrl?: string;
    redirect_url?: string;
}
export interface AyPaymentsOAuthResponse {
    provider: AyPaymentsProvider;
    authorizationUrl: string;
    redirectUri?: string;
    redirectUrl?: string | null;
    name?: string | null;
    project: Pick<AyPaymentsProject, "id" | "externalId" | "name">;
}
export interface AyPaymentsCreateConnectionPayload {
    provider: AyPaymentsProvider;
    connectedAccountId: string;
    name?: string;
    status?: AyPaymentsStatus;
}
export interface AyPaymentsUpdateConnectionPayload {
    name?: string;
    status?: AyPaymentsStatus;
}
export interface AyPaymentsConnectionResponse {
    project: AyPaymentsProject;
    account: AyPaymentsProjectConnection;
}
export interface AyPaymentsProduct {
    id: string;
    projectId: string;
    connectedAccountId: string;
    name: string;
    icon?: string;
    description?: string;
    value: number;
    fees: AyPaymentsFee[];
    status: AyPaymentsStatus;
    webhookUrl?: string;
    metadata?: AyPaymentsRecord;
    createdDate: number;
    updatedDate?: number;
}
export interface AyPaymentsCreateProductPayload {
    connectedAccountId: string;
    name: string;
    icon?: string;
    description?: string;
    value: number;
    fees?: AyPaymentsFee[];
    webhookUrl?: string;
    webhook_url?: string;
    webhookSecret?: string;
    webhook_secret?: string;
    status?: AyPaymentsStatus;
    metadata?: AyPaymentsRecord;
}
export interface AyPaymentsUpdateProductPayload extends Partial<AyPaymentsCreateProductPayload> {
}
export interface AyPaymentsProductsResponse {
    products: AyPaymentsProduct[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsProductResponse {
    product: AyPaymentsProduct;
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
}
export interface AyPaymentsCustomerPhone {
    countryCode?: string;
    areaCode?: string;
    number?: string;
}
export interface AyPaymentsCheckoutCustomer {
    id?: string;
    email: string;
    name?: string;
    fullName?: string;
    documentType?: "CPF" | "CNPJ" | "cpf" | "cnpj" | "passport" | "other";
    document?: string;
    cpf?: string;
    phone?: AyPaymentsCustomerPhone | string;
    birthDate?: string;
    address?: AyPaymentsCustomerAddress;
    metadata?: AyPaymentsRecord;
}
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
}
export type AyPaymentsCheckoutItem = AyPaymentsCheckoutProductItem | AyPaymentsCheckoutCustomItem;
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
export interface AyPaymentsCheckoutPayload {
    projectId?: string;
    projectExternalId?: string;
    accountId?: string;
    connectedAccountId?: string;
    paymentMethod?: AyPaymentsPaymentMethod;
    items: AyPaymentsCheckoutItem[];
    customer: AyPaymentsCheckoutCustomer;
    currency?: string;
    webhookUrl?: string;
    webhook_url?: string;
    webhookSecret?: string;
    webhook_secret?: string;
    externalReference?: string;
    external_reference?: string;
    redirectUrl?: string;
    redirect_url?: string;
    redirectUrls?: AyPaymentsCheckoutRedirectUrls;
    metadata?: AyPaymentsRecord;
    clientSecret?: string;
    client_secret?: string;
}
export type AyPaymentsCalculateCheckoutPayload = Omit<AyPaymentsCheckoutPayload, "paymentMethod"> & {
    paymentMethod?: AyPaymentsPaymentMethod;
};
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
export interface AyPaymentsOrder {
    id: string;
    tenantId?: string | null;
    projectId: string;
    clientId?: string;
    customerId?: string;
    provider: AyPaymentsProvider;
    connectedAccountId: string;
    paymentMethod: AyPaymentsPaymentMethod | string;
    status: AyPaymentsOrderStatus;
    amount: number;
    currency: string;
    subtotal: number;
    feesTotal: number;
    commissionTotal: number;
    sellerNetTotal: number;
    items: AyPaymentsOrderItem[];
    customer: AyPaymentsCheckoutCustomer;
    externalReference?: string;
    metadata?: AyPaymentsRecord;
    checkoutUrl?: string;
    webhookUrl?: string;
    providerPayload?: unknown;
    webhookDelivery?: unknown;
    projectName?: string;
    connectionName?: string;
    itemCount?: number;
    createdDate: number;
    updatedDate?: number;
}
export interface AyPaymentsOrderPayment {
    provider: AyPaymentsProvider;
    method: AyPaymentsPaymentMethod;
    status: AyPaymentsOrderStatus;
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
    provider: AyPaymentsProvider;
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
export interface AyPaymentsOrdersResponse {
    orders: AyPaymentsOrder[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsOrderResponse {
    order: AyPaymentsOrder;
}
export interface AyPaymentsCreateManualOrderPayload {
    provider?: AyPaymentsProvider;
    connectedAccountId?: string;
    clientId: string;
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
    status?: AyPaymentsOrderStatus;
}
export interface AyPaymentsCreateCustomerPayload {
    email: string;
    password?: string;
    fullName: string;
    document?: string;
    phone?: string;
    metadata?: AyPaymentsRecord;
}
export interface AyPaymentsCustomersResponse {
    clients: AyPaymentsCustomer[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsCustomerResponse {
    client: AyPaymentsCustomer;
    reused?: boolean;
}
export interface AyPaymentsCreateAdminPayload {
    email: string;
    password: string;
    fullName: string;
    isMaster?: boolean;
    permissions?: AyPaymentsPermissions;
    metadata?: AyPaymentsRecord;
    status?: AyPaymentsStatus;
}
export interface AyPaymentsAdminsResponse {
    admins: AyPaymentsAdmin[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsCreateTenantPayload {
    email: string;
    password: string;
    name: string;
    fullName?: string;
    metadata?: AyPaymentsRecord;
    permissions?: AyPaymentsPermissions;
    status?: AyPaymentsStatus;
}
export interface AyPaymentsTenantsResponse {
    tenants: AyPaymentsTenant[];
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsApiKey {
    id: string;
    name: string;
    keyPrefix?: string;
    prefix?: string;
    status: "active" | "revoked";
    ownerRole?: "admin" | "tenant" | "customer";
    ownerId?: string;
    scope?: unknown;
    permissions?: AyPaymentsPermissions;
    createdDate: number;
    updatedDate?: number;
    lastUsedAt?: number;
}
export interface AyPaymentsCreateApiKeyPayload {
    name: string;
    permissions?: AyPaymentsPermissions;
}
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
export interface AyPaymentsPlatformCommissionResponse {
    platformCommission: {
        id?: string;
        name?: string;
        status?: AyPaymentsStatus;
        rules: AyPaymentsCommissionRule[];
        updatedDate?: number;
    };
}
export interface AyPaymentsUpdateCommissionPayload {
    name?: string;
    status?: AyPaymentsStatus;
    rules?: AyPaymentsCommissionRule[];
}
export interface AyPaymentsProjectCommissionResponse {
    project: Pick<AyPaymentsProject, "id" | "externalId" | "name" | "commission">;
    platformCommission: AyPaymentsPlatformCommissionResponse["platformCommission"];
}
export interface AyPaymentsUpdateProjectCommissionPayload {
    mode?: "inherit" | "override";
    rules?: AyPaymentsCommissionRule[];
    clearOverride?: boolean;
}
export interface AyPaymentsOverviewResponse {
    totals: {
        clients: number;
        projects: number;
        products: number;
        sales: number;
        admins: number;
        apiKeys: number;
        grossRevenue: number;
        customerFeesTotal: number;
        commissionTotal: number;
        sellerNetTotal: number;
        approvedSales: number;
        pendingSales: number;
    };
    recentClients: AyPaymentsCustomer[];
    recentProjects: AyPaymentsProject[];
    recentOrders: AyPaymentsOrder[];
}
export interface AyPaymentsProfileOrdersResponse {
    orders: AyPaymentsOrder[];
    totals: {
        count: number;
        grossRevenue: number;
        pendingSales: number;
        approvedSales: number;
    };
    pagination: AyPaymentsPagination;
}
export interface AyPaymentsLogsResponse {
    loginLogs: unknown[];
    generalLogs: unknown[];
    webhookLogs: unknown[];
    orderLogs: unknown[];
    pagination: {
        loginLogs: AyPaymentsPagination;
        generalLogs: AyPaymentsPagination;
        webhookLogs: AyPaymentsPagination;
        orderLogs: AyPaymentsPagination;
    };
}
//# sourceMappingURL=types.d.ts.map