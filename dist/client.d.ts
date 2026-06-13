import { AxiosInstance, AxiosRequestConfig } from "axios";
import type { AyPaymentsAdmin, AyPaymentsAdminsResponse, AyPaymentsApiResult, AyPaymentsApiKeyResponse, AyPaymentsApiKeysResponse, AyPaymentsAuthAdminResponse, AyPaymentsAuthCustomerResponse, AyPaymentsAuthTenantResponse, AyPaymentsCalculateCheckoutPayload, AyPaymentsCheckoutCalculationResponse, AyPaymentsCheckoutPayload, AyPaymentsClientOptions, AyPaymentsConnectionResponse, AyPaymentsCreateAdminPayload, AyPaymentsCreateApiKeyPayload, AyPaymentsCreateApiKeyResponse, AyPaymentsCreateCheckoutResponse, AyPaymentsCreateCouponPayload, AyPaymentsCreateConnectionPayload, AyPaymentsCreateCustomerPayload, AyPaymentsCustomerRegisterPayload, AyPaymentsCreateManualOrderPayload, AyPaymentsCreateProductPayload, AyPaymentsCreateProjectPayload, AyPaymentsCreateProjectResponse, AyPaymentsCreateTenantPayload, AyPaymentsCustomerResponse, AyPaymentsCustomersResponse, AyPaymentsDeleteResponse, AyPaymentsLogsResponse, AyPaymentsLoginPayload, AyPaymentsOAuthPayload, AyPaymentsOAuthResponse, AyPaymentsOrderResponse, AyPaymentsOrdersResponse, AyPaymentsOverviewResponse, AyPaymentsPaginationQuery, AyPaymentsPlatformCommissionResponse, AyPaymentsProductResponse, AyPaymentsProductsResponse, AyPaymentsCouponQueryInput, AyPaymentsCouponResponse, AyPaymentsCouponsResponse, AyPaymentsProfileOrdersResponse, AyPaymentsProjectCommissionResponse, AyPaymentsProjectAccountsResponse, AyPaymentsProjectListResponse, AyPaymentsProjectResponse, AyPaymentsQuery, AyPaymentsTenant, AyPaymentsTenantRegisterPayload, AyPaymentsTenantsResponse, AyPaymentsUpdateCommissionPayload, AyPaymentsUpdateConnectionPayload, AyPaymentsUpdateCouponPayload, AyPaymentsUpdateProductPayload, AyPaymentsUpdateProjectCommissionPayload, AyPaymentsUpdateProjectPayload } from "./types.js";
export declare class AYPaymentsClient {
    readonly api: AxiosInstance;
    readonly axios: AxiosInstance;
    readonly apiUrl: string;
    readonly options: Required<Pick<AyPaymentsClientOptions, "apiVersion" | "debug" | "timeout">> & AyPaymentsClientOptions;
    constructor(options?: AyPaymentsClientOptions);
    private request;
    private toApiError;
    raw: <T = unknown>(config: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<AyPaymentsApiResult<T>>;
    v1: {
        auth: {
            admin: {
                me: () => Promise<AyPaymentsApiResult<{
                    admin: AyPaymentsAdmin;
                }>>;
                login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthAdminResponse>>;
                logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
                updateProfile: (payload: {
                    fullName: string;
                }) => Promise<AyPaymentsApiResult<{
                    admin: AyPaymentsAdmin;
                }>>;
                changePassword: (payload: {
                    currentPassword: string;
                    newPassword: string;
                    confirmPassword: string;
                }) => Promise<AyPaymentsApiResult<{
                    admin: AyPaymentsAdmin;
                }>>;
            };
            tenant: {
                me: () => Promise<AyPaymentsApiResult<{
                    tenant: AyPaymentsTenant;
                }>>;
                login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthTenantResponse>>;
                logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
                register: (payload: AyPaymentsTenantRegisterPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthTenantResponse>>;
                updateProfile: (payload: {
                    name?: string;
                    fullName?: string;
                    metadata?: Record<string, unknown>;
                }) => Promise<AyPaymentsApiResult<{
                    tenant: AyPaymentsTenant;
                }>>;
                changePassword: (payload: {
                    currentPassword: string;
                    newPassword: string;
                    confirmPassword: string;
                }) => Promise<AyPaymentsApiResult<{
                    tenant: AyPaymentsTenant;
                }>>;
            };
            customer: {
                me: () => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
                login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
                logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
                register: (payload: AyPaymentsCustomerRegisterPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
                resetPassword: (email: string) => Promise<AyPaymentsApiResult<{
                    message: string;
                }>>;
            };
        };
        profile: {
            orders: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProfileOrdersResponse>>;
            update: (payload: {
                fullName: string;
                bio?: string;
                website?: string;
                location?: string;
            }) => Promise<AyPaymentsApiResult<{
                message: string;
            }>>;
            changePassword: (payload: {
                oldPassword: string;
                newPassword: string;
            }) => Promise<AyPaymentsApiResult<{
                message: string;
            }>>;
            deleteAccount: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        projects: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProjectListResponse>>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProjectListResponse>>;
            get: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
            create: (payload: AyPaymentsCreateProjectPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateProjectResponse>>;
            update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectPayload) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
            delete: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
            commission: {
                get: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectCommissionResponse>>;
                update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectCommissionPayload) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
            };
            accounts: {
                oauth: (payload: AyPaymentsOAuthPayload) => Promise<AyPaymentsApiResult<AyPaymentsOAuthResponse>>;
                list: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectAccountsResponse>>;
                create: (projectIdOrExternalId: string, payload: AyPaymentsCreateConnectionPayload) => Promise<AyPaymentsApiResult<AyPaymentsConnectionResponse>>;
                update: (projectIdOrExternalId: string, connectionId: string, payload: AyPaymentsUpdateConnectionPayload) => Promise<AyPaymentsApiResult<AyPaymentsConnectionResponse>>;
                delete: (projectIdOrExternalId: string, connectionId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
            };
        };
        products: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
            listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
            queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
            create: (projectIdOrExternalId: string, payload: AyPaymentsCreateProductPayload) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
            createGlobal: (payload: AyPaymentsCreateProductPayload & {
                projectId: string;
            }) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
            update: (projectIdOrExternalId: string, productId: string, payload: AyPaymentsUpdateProductPayload) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
            updateGlobal: (productId: string, payload: AyPaymentsUpdateProductPayload & {
                projectId?: string;
            }) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
            delete: (projectIdOrExternalId: string, productId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
            deleteGlobal: (productId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        coupons: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCouponsResponse>>;
            query: (query: AyPaymentsCouponQueryInput, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCouponsResponse>>;
            create: (payload: AyPaymentsCreateCouponPayload) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
            get: (couponId: string) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
            update: (couponId: string, payload: AyPaymentsUpdateCouponPayload) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
            delete: (couponId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        checkouts: {
            calculate: (payload: AyPaymentsCalculateCheckoutPayload) => Promise<AyPaymentsApiResult<AyPaymentsCheckoutCalculationResponse>>;
            create: (payload: AyPaymentsCheckoutPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateCheckoutResponse>>;
        };
        orders: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
            listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
            queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
            createManual: (projectIdOrExternalId: string, payload: AyPaymentsCreateManualOrderPayload) => Promise<AyPaymentsApiResult<AyPaymentsOrderResponse & {
                created: boolean;
                checkoutUrl?: string;
            }>>;
        };
        customers: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
            create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsApiResult<AyPaymentsCustomerResponse>>;
            delete: (customerId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        admins: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsAdminsResponse>>;
            create: (payload: AyPaymentsCreateAdminPayload) => Promise<AyPaymentsApiResult<{
                admin: AyPaymentsAdmin;
            }>>;
            delete: (adminId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        merchants: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsTenantsResponse>>;
            create: (payload: AyPaymentsCreateTenantPayload) => Promise<AyPaymentsApiResult<{
                tenant: AyPaymentsTenant;
            }>>;
            delete: (tenantId: string, options?: {
                cascade?: boolean;
            }) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        tenants: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsTenantsResponse>>;
            create: (payload: AyPaymentsCreateTenantPayload) => Promise<AyPaymentsApiResult<{
                tenant: AyPaymentsTenant;
            }>>;
            delete: (tenantId: string, options?: {
                cascade?: boolean;
            }) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        apiKeys: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsApiKeysResponse>>;
            create: (payload: AyPaymentsCreateApiKeyPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateApiKeyResponse>>;
            revoke: (apiKeyId: string) => Promise<AyPaymentsApiResult<AyPaymentsApiKeyResponse>>;
            setStatus: (apiKeyId: string, status: "active" | "revoked") => Promise<AyPaymentsApiResult<AyPaymentsApiKeyResponse>>;
            delete: (apiKeyId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        };
        commissions: {
            get: () => Promise<AyPaymentsApiResult<AyPaymentsPlatformCommissionResponse>>;
            update: (payload: AyPaymentsUpdateCommissionPayload) => Promise<AyPaymentsApiResult<AyPaymentsPlatformCommissionResponse>>;
        };
        analytics: {
            overview: () => Promise<AyPaymentsApiResult<AyPaymentsOverviewResponse>>;
        };
        logs: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsLogsResponse>>;
            clear: (category: "login" | "general" | "webhook" | "order" | string) => Promise<AyPaymentsApiResult<{
                category: string;
                deleted: number;
            }>>;
        };
    };
    auth: {
        admin: {
            me: () => Promise<AyPaymentsApiResult<{
                admin: AyPaymentsAdmin;
            }>>;
            login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthAdminResponse>>;
            logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
            updateProfile: (payload: {
                fullName: string;
            }) => Promise<AyPaymentsApiResult<{
                admin: AyPaymentsAdmin;
            }>>;
            changePassword: (payload: {
                currentPassword: string;
                newPassword: string;
                confirmPassword: string;
            }) => Promise<AyPaymentsApiResult<{
                admin: AyPaymentsAdmin;
            }>>;
        };
        tenant: {
            me: () => Promise<AyPaymentsApiResult<{
                tenant: AyPaymentsTenant;
            }>>;
            login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthTenantResponse>>;
            logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
            register: (payload: AyPaymentsTenantRegisterPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthTenantResponse>>;
            updateProfile: (payload: {
                name?: string;
                fullName?: string;
                metadata?: Record<string, unknown>;
            }) => Promise<AyPaymentsApiResult<{
                tenant: AyPaymentsTenant;
            }>>;
            changePassword: (payload: {
                currentPassword: string;
                newPassword: string;
                confirmPassword: string;
            }) => Promise<AyPaymentsApiResult<{
                tenant: AyPaymentsTenant;
            }>>;
        };
        customer: {
            me: () => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
            login: (payload: AyPaymentsLoginPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
            logout: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
            register: (payload: AyPaymentsCustomerRegisterPayload) => Promise<AyPaymentsApiResult<AyPaymentsAuthCustomerResponse>>;
            resetPassword: (email: string) => Promise<AyPaymentsApiResult<{
                message: string;
            }>>;
        };
    };
    profile: {
        orders: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProfileOrdersResponse>>;
        update: (payload: {
            fullName: string;
            bio?: string;
            website?: string;
            location?: string;
        }) => Promise<AyPaymentsApiResult<{
            message: string;
        }>>;
        changePassword: (payload: {
            oldPassword: string;
            newPassword: string;
        }) => Promise<AyPaymentsApiResult<{
            message: string;
        }>>;
        deleteAccount: () => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    projects: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProjectListResponse>>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProjectListResponse>>;
        get: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
        create: (payload: AyPaymentsCreateProjectPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateProjectResponse>>;
        update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectPayload) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
        delete: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        commission: {
            get: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectCommissionResponse>>;
            update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectCommissionPayload) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
        };
        accounts: {
            oauth: (payload: AyPaymentsOAuthPayload) => Promise<AyPaymentsApiResult<AyPaymentsOAuthResponse>>;
            list: (projectIdOrExternalId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectAccountsResponse>>;
            create: (projectIdOrExternalId: string, payload: AyPaymentsCreateConnectionPayload) => Promise<AyPaymentsApiResult<AyPaymentsConnectionResponse>>;
            update: (projectIdOrExternalId: string, connectionId: string, payload: AyPaymentsUpdateConnectionPayload) => Promise<AyPaymentsApiResult<AyPaymentsConnectionResponse>>;
            delete: (projectIdOrExternalId: string, connectionId: string) => Promise<AyPaymentsApiResult<AyPaymentsProjectResponse>>;
        };
    };
    products: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
        listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
        queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsProductsResponse>>;
        create: (projectIdOrExternalId: string, payload: AyPaymentsCreateProductPayload) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
        createGlobal: (payload: AyPaymentsCreateProductPayload & {
            projectId: string;
        }) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
        update: (projectIdOrExternalId: string, productId: string, payload: AyPaymentsUpdateProductPayload) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
        updateGlobal: (productId: string, payload: AyPaymentsUpdateProductPayload & {
            projectId?: string;
        }) => Promise<AyPaymentsApiResult<AyPaymentsProductResponse>>;
        delete: (projectIdOrExternalId: string, productId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
        deleteGlobal: (productId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    coupons: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCouponsResponse>>;
        query: (query: AyPaymentsCouponQueryInput, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCouponsResponse>>;
        create: (payload: AyPaymentsCreateCouponPayload) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
        get: (couponId: string) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
        update: (couponId: string, payload: AyPaymentsUpdateCouponPayload) => Promise<AyPaymentsApiResult<AyPaymentsCouponResponse>>;
        delete: (couponId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    checkouts: {
        calculate: (payload: AyPaymentsCalculateCheckoutPayload) => Promise<AyPaymentsApiResult<AyPaymentsCheckoutCalculationResponse>>;
        create: (payload: AyPaymentsCheckoutPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateCheckoutResponse>>;
    };
    orders: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
        listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
        queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsOrdersResponse>>;
        createManual: (projectIdOrExternalId: string, payload: AyPaymentsCreateManualOrderPayload) => Promise<AyPaymentsApiResult<AyPaymentsOrderResponse & {
            created: boolean;
            checkoutUrl?: string;
        }>>;
    };
    customers: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
        create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsApiResult<AyPaymentsCustomerResponse>>;
        delete: (customerId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    clients: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsCustomersResponse>>;
        create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsApiResult<AyPaymentsCustomerResponse>>;
        delete: (customerId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    admins: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsAdminsResponse>>;
        create: (payload: AyPaymentsCreateAdminPayload) => Promise<AyPaymentsApiResult<{
            admin: AyPaymentsAdmin;
        }>>;
        delete: (adminId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    merchants: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsTenantsResponse>>;
        create: (payload: AyPaymentsCreateTenantPayload) => Promise<AyPaymentsApiResult<{
            tenant: AyPaymentsTenant;
        }>>;
        delete: (tenantId: string, options?: {
            cascade?: boolean;
        }) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    tenants: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsTenantsResponse>>;
        create: (payload: AyPaymentsCreateTenantPayload) => Promise<AyPaymentsApiResult<{
            tenant: AyPaymentsTenant;
        }>>;
        delete: (tenantId: string, options?: {
            cascade?: boolean;
        }) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    apiKeys: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsApiKeysResponse>>;
        create: (payload: AyPaymentsCreateApiKeyPayload) => Promise<AyPaymentsApiResult<AyPaymentsCreateApiKeyResponse>>;
        revoke: (apiKeyId: string) => Promise<AyPaymentsApiResult<AyPaymentsApiKeyResponse>>;
        setStatus: (apiKeyId: string, status: "active" | "revoked") => Promise<AyPaymentsApiResult<AyPaymentsApiKeyResponse>>;
        delete: (apiKeyId: string) => Promise<AyPaymentsApiResult<AyPaymentsDeleteResponse>>;
    };
    commissions: {
        get: () => Promise<AyPaymentsApiResult<AyPaymentsPlatformCommissionResponse>>;
        update: (payload: AyPaymentsUpdateCommissionPayload) => Promise<AyPaymentsApiResult<AyPaymentsPlatformCommissionResponse>>;
    };
    analytics: {
        overview: () => Promise<AyPaymentsApiResult<AyPaymentsOverviewResponse>>;
    };
    logs: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiResult<AyPaymentsLogsResponse>>;
        clear: (category: "login" | "general" | "webhook" | "order" | string) => Promise<AyPaymentsApiResult<{
            category: string;
            deleted: number;
        }>>;
    };
    isAuthenticated(): boolean;
}
export declare function createAYPaymentsClient(options?: AyPaymentsClientOptions): AYPaymentsClient;
//# sourceMappingURL=client.d.ts.map