import { AxiosInstance, AxiosRequestConfig } from "axios";
import type { AyPaymentsAdmin, AyPaymentsAdminsResponse, AyPaymentsApiKeyResponse, AyPaymentsApiKeysResponse, AyPaymentsCalculateCheckoutPayload, AyPaymentsCheckoutCalculationResponse, AyPaymentsCheckoutPayload, AyPaymentsClientOptions, AyPaymentsCreateAdminPayload, AyPaymentsCreateApiKeyPayload, AyPaymentsCreateApiKeyResponse, AyPaymentsCreateCheckoutResponse, AyPaymentsCreateConnectionPayload, AyPaymentsCreateCustomerPayload, AyPaymentsCustomerRegisterPayload, AyPaymentsCreateManualOrderPayload, AyPaymentsCreateProductPayload, AyPaymentsCreateProjectPayload, AyPaymentsCreateProjectResponse, AyPaymentsCreateTenantPayload, AyPaymentsCustomerResponse, AyPaymentsCustomersResponse, AyPaymentsDeleteResponse, AyPaymentsLogsResponse, AyPaymentsLoginPayload, AyPaymentsOAuthPayload, AyPaymentsOAuthResponse, AyPaymentsOrderResponse, AyPaymentsOrdersResponse, AyPaymentsPaginationQuery, AyPaymentsPlatformCommissionResponse, AyPaymentsProductResponse, AyPaymentsProductsResponse, AyPaymentsProfileOrdersResponse, AyPaymentsProjectCommissionResponse, AyPaymentsProjectListResponse, AyPaymentsProjectResponse, AyPaymentsQuery, AyPaymentsTenantRegisterPayload, AyPaymentsTenantsResponse, AyPaymentsUpdateCommissionPayload, AyPaymentsUpdateConnectionPayload, AyPaymentsUpdateProductPayload, AyPaymentsUpdateProjectCommissionPayload, AyPaymentsUpdateProjectPayload } from "./types.js";
export declare class AYPaymentsClient {
    readonly api: AxiosInstance;
    readonly axios: AxiosInstance;
    readonly apiUrl: string;
    readonly options: Required<Pick<AyPaymentsClientOptions, "apiVersion" | "debug" | "timeout">> & AyPaymentsClientOptions;
    constructor(options?: AyPaymentsClientOptions);
    private request;
    private toApiError;
    raw: <T = unknown>(config: AxiosRequestConfig) => Promise<T>;
    get: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
    patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<T>;
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    v1: {
        auth: {
            admin: {
                me: () => Promise<{
                    admin: AyPaymentsAdmin;
                }>;
                login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
                logout: () => Promise<AyPaymentsDeleteResponse>;
                updateProfile: (payload: {
                    fullName: string;
                }) => Promise<unknown>;
                changePassword: (payload: {
                    currentPassword: string;
                    newPassword: string;
                    confirmPassword: string;
                }) => Promise<unknown>;
            };
            tenant: {
                me: () => Promise<unknown>;
                login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
                logout: () => Promise<AyPaymentsDeleteResponse>;
                register: (payload: AyPaymentsTenantRegisterPayload) => Promise<unknown>;
                updateProfile: (payload: {
                    name?: string;
                    fullName?: string;
                    metadata?: Record<string, unknown>;
                }) => Promise<unknown>;
                changePassword: (payload: {
                    currentPassword: string;
                    newPassword: string;
                    confirmPassword: string;
                }) => Promise<unknown>;
            };
            customer: {
                me: () => Promise<unknown>;
                login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
                logout: () => Promise<AyPaymentsDeleteResponse>;
                register: (payload: AyPaymentsCustomerRegisterPayload) => Promise<unknown>;
                resetPassword: (email: string) => Promise<{
                    message: string;
                }>;
            };
        };
        profile: {
            orders: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProfileOrdersResponse>;
            update: (payload: {
                fullName: string;
                bio?: string;
                website?: string;
                location?: string;
            }) => Promise<{
                message: string;
            }>;
            changePassword: (payload: {
                oldPassword: string;
                newPassword: string;
            }) => Promise<{
                message: string;
            }>;
            deleteAccount: () => Promise<AyPaymentsDeleteResponse>;
        };
        projects: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProjectListResponse>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProjectListResponse>;
            get: (projectIdOrExternalId: string) => Promise<AyPaymentsProjectResponse>;
            create: (payload: AyPaymentsCreateProjectPayload) => Promise<AyPaymentsCreateProjectResponse>;
            update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectPayload) => Promise<AyPaymentsProjectResponse>;
            delete: (projectIdOrExternalId: string) => Promise<AyPaymentsDeleteResponse>;
            commission: {
                get: (projectIdOrExternalId: string) => Promise<AyPaymentsProjectCommissionResponse>;
                update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectCommissionPayload) => Promise<AyPaymentsProjectResponse>;
            };
            accounts: {
                oauth: (payload: AyPaymentsOAuthPayload) => Promise<AyPaymentsOAuthResponse>;
                list: (projectIdOrExternalId: string) => Promise<{
                    accounts: unknown[];
                }>;
                create: (projectIdOrExternalId: string, payload: AyPaymentsCreateConnectionPayload) => Promise<unknown>;
                update: (projectIdOrExternalId: string, connectionId: string, payload: AyPaymentsUpdateConnectionPayload) => Promise<unknown>;
                delete: (projectIdOrExternalId: string, connectionId: string) => Promise<AyPaymentsProjectResponse>;
            };
        };
        products: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
            listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
            queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
            create: (projectIdOrExternalId: string, payload: AyPaymentsCreateProductPayload) => Promise<AyPaymentsProductResponse>;
            createGlobal: (payload: AyPaymentsCreateProductPayload & {
                projectId: string;
            }) => Promise<AyPaymentsProductResponse>;
            update: (projectIdOrExternalId: string, productId: string, payload: AyPaymentsUpdateProductPayload) => Promise<AyPaymentsProductResponse>;
            updateGlobal: (productId: string, payload: AyPaymentsUpdateProductPayload & {
                projectId?: string;
            }) => Promise<AyPaymentsProductResponse>;
            delete: (projectIdOrExternalId: string, productId: string) => Promise<AyPaymentsDeleteResponse>;
            deleteGlobal: (productId: string) => Promise<AyPaymentsDeleteResponse>;
        };
        checkouts: {
            calculate: (payload: AyPaymentsCalculateCheckoutPayload) => Promise<AyPaymentsCheckoutCalculationResponse>;
            create: (payload: AyPaymentsCheckoutPayload) => Promise<AyPaymentsCreateCheckoutResponse>;
        };
        orders: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
            listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
            queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
            createManual: (projectIdOrExternalId: string, payload: AyPaymentsCreateManualOrderPayload) => Promise<AyPaymentsOrderResponse & {
                created: boolean;
                checkoutUrl?: string;
            }>;
        };
        customers: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
            query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
            create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsCustomerResponse>;
            delete: (customerId: string) => Promise<AyPaymentsDeleteResponse>;
        };
        admins: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsAdminsResponse>;
            create: (payload: AyPaymentsCreateAdminPayload) => Promise<{
                admin: AyPaymentsAdmin;
            }>;
            delete: (adminId: string) => Promise<AyPaymentsDeleteResponse>;
        };
        merchants: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsTenantsResponse>;
            create: (payload: AyPaymentsCreateTenantPayload) => Promise<unknown>;
            delete: (tenantId: string, options?: {
                cascade?: boolean;
            }) => Promise<AyPaymentsDeleteResponse>;
        };
        tenants: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsTenantsResponse>;
            create: (payload: AyPaymentsCreateTenantPayload) => Promise<unknown>;
            delete: (tenantId: string, options?: {
                cascade?: boolean;
            }) => Promise<AyPaymentsDeleteResponse>;
        };
        apiKeys: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiKeysResponse>;
            create: (payload: AyPaymentsCreateApiKeyPayload) => Promise<AyPaymentsCreateApiKeyResponse>;
            revoke: (apiKeyId: string) => Promise<AyPaymentsApiKeyResponse>;
            setStatus: (apiKeyId: string, status: "active" | "revoked") => Promise<AyPaymentsApiKeyResponse>;
            delete: (apiKeyId: string) => Promise<AyPaymentsDeleteResponse>;
        };
        commissions: {
            get: () => Promise<AyPaymentsPlatformCommissionResponse>;
            update: (payload: AyPaymentsUpdateCommissionPayload) => Promise<AyPaymentsPlatformCommissionResponse>;
        };
        analytics: {
            overview: () => Promise<unknown>;
        };
        logs: {
            list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsLogsResponse>;
            clear: (category: "login" | "general" | "webhook" | "order" | string) => Promise<{
                category: string;
                deleted: number;
            }>;
        };
    };
    auth: {
        admin: {
            me: () => Promise<{
                admin: AyPaymentsAdmin;
            }>;
            login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
            logout: () => Promise<AyPaymentsDeleteResponse>;
            updateProfile: (payload: {
                fullName: string;
            }) => Promise<unknown>;
            changePassword: (payload: {
                currentPassword: string;
                newPassword: string;
                confirmPassword: string;
            }) => Promise<unknown>;
        };
        tenant: {
            me: () => Promise<unknown>;
            login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
            logout: () => Promise<AyPaymentsDeleteResponse>;
            register: (payload: AyPaymentsTenantRegisterPayload) => Promise<unknown>;
            updateProfile: (payload: {
                name?: string;
                fullName?: string;
                metadata?: Record<string, unknown>;
            }) => Promise<unknown>;
            changePassword: (payload: {
                currentPassword: string;
                newPassword: string;
                confirmPassword: string;
            }) => Promise<unknown>;
        };
        customer: {
            me: () => Promise<unknown>;
            login: (payload: AyPaymentsLoginPayload) => Promise<unknown>;
            logout: () => Promise<AyPaymentsDeleteResponse>;
            register: (payload: AyPaymentsCustomerRegisterPayload) => Promise<unknown>;
            resetPassword: (email: string) => Promise<{
                message: string;
            }>;
        };
    };
    profile: {
        orders: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProfileOrdersResponse>;
        update: (payload: {
            fullName: string;
            bio?: string;
            website?: string;
            location?: string;
        }) => Promise<{
            message: string;
        }>;
        changePassword: (payload: {
            oldPassword: string;
            newPassword: string;
        }) => Promise<{
            message: string;
        }>;
        deleteAccount: () => Promise<AyPaymentsDeleteResponse>;
    };
    projects: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProjectListResponse>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProjectListResponse>;
        get: (projectIdOrExternalId: string) => Promise<AyPaymentsProjectResponse>;
        create: (payload: AyPaymentsCreateProjectPayload) => Promise<AyPaymentsCreateProjectResponse>;
        update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectPayload) => Promise<AyPaymentsProjectResponse>;
        delete: (projectIdOrExternalId: string) => Promise<AyPaymentsDeleteResponse>;
        commission: {
            get: (projectIdOrExternalId: string) => Promise<AyPaymentsProjectCommissionResponse>;
            update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectCommissionPayload) => Promise<AyPaymentsProjectResponse>;
        };
        accounts: {
            oauth: (payload: AyPaymentsOAuthPayload) => Promise<AyPaymentsOAuthResponse>;
            list: (projectIdOrExternalId: string) => Promise<{
                accounts: unknown[];
            }>;
            create: (projectIdOrExternalId: string, payload: AyPaymentsCreateConnectionPayload) => Promise<unknown>;
            update: (projectIdOrExternalId: string, connectionId: string, payload: AyPaymentsUpdateConnectionPayload) => Promise<unknown>;
            delete: (projectIdOrExternalId: string, connectionId: string) => Promise<AyPaymentsProjectResponse>;
        };
    };
    products: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
        listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
        queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsProductsResponse>;
        create: (projectIdOrExternalId: string, payload: AyPaymentsCreateProductPayload) => Promise<AyPaymentsProductResponse>;
        createGlobal: (payload: AyPaymentsCreateProductPayload & {
            projectId: string;
        }) => Promise<AyPaymentsProductResponse>;
        update: (projectIdOrExternalId: string, productId: string, payload: AyPaymentsUpdateProductPayload) => Promise<AyPaymentsProductResponse>;
        updateGlobal: (productId: string, payload: AyPaymentsUpdateProductPayload & {
            projectId?: string;
        }) => Promise<AyPaymentsProductResponse>;
        delete: (projectIdOrExternalId: string, productId: string) => Promise<AyPaymentsDeleteResponse>;
        deleteGlobal: (productId: string) => Promise<AyPaymentsDeleteResponse>;
    };
    checkouts: {
        calculate: (payload: AyPaymentsCalculateCheckoutPayload) => Promise<AyPaymentsCheckoutCalculationResponse>;
        create: (payload: AyPaymentsCheckoutPayload) => Promise<AyPaymentsCreateCheckoutResponse>;
    };
    orders: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
        listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
        queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsOrdersResponse>;
        createManual: (projectIdOrExternalId: string, payload: AyPaymentsCreateManualOrderPayload) => Promise<AyPaymentsOrderResponse & {
            created: boolean;
            checkoutUrl?: string;
        }>;
    };
    customers: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
        create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsCustomerResponse>;
        delete: (customerId: string) => Promise<AyPaymentsDeleteResponse>;
    };
    clients: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
        query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsCustomersResponse>;
        create: (payload: AyPaymentsCreateCustomerPayload) => Promise<AyPaymentsCustomerResponse>;
        delete: (customerId: string) => Promise<AyPaymentsDeleteResponse>;
    };
    admins: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsAdminsResponse>;
        create: (payload: AyPaymentsCreateAdminPayload) => Promise<{
            admin: AyPaymentsAdmin;
        }>;
        delete: (adminId: string) => Promise<AyPaymentsDeleteResponse>;
    };
    merchants: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsTenantsResponse>;
        create: (payload: AyPaymentsCreateTenantPayload) => Promise<unknown>;
        delete: (tenantId: string, options?: {
            cascade?: boolean;
        }) => Promise<AyPaymentsDeleteResponse>;
    };
    tenants: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsTenantsResponse>;
        create: (payload: AyPaymentsCreateTenantPayload) => Promise<unknown>;
        delete: (tenantId: string, options?: {
            cascade?: boolean;
        }) => Promise<AyPaymentsDeleteResponse>;
    };
    apiKeys: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsApiKeysResponse>;
        create: (payload: AyPaymentsCreateApiKeyPayload) => Promise<AyPaymentsCreateApiKeyResponse>;
        revoke: (apiKeyId: string) => Promise<AyPaymentsApiKeyResponse>;
        setStatus: (apiKeyId: string, status: "active" | "revoked") => Promise<AyPaymentsApiKeyResponse>;
        delete: (apiKeyId: string) => Promise<AyPaymentsDeleteResponse>;
    };
    commissions: {
        get: () => Promise<AyPaymentsPlatformCommissionResponse>;
        update: (payload: AyPaymentsUpdateCommissionPayload) => Promise<AyPaymentsPlatformCommissionResponse>;
    };
    analytics: {
        overview: () => Promise<unknown>;
    };
    logs: {
        list: (pagination?: AyPaymentsPaginationQuery) => Promise<AyPaymentsLogsResponse>;
        clear: (category: "login" | "general" | "webhook" | "order" | string) => Promise<{
            category: string;
            deleted: number;
        }>;
    };
    isAuthenticated(): boolean;
}
export declare function createAYPaymentsClient(options?: AyPaymentsClientOptions): AYPaymentsClient;
//# sourceMappingURL=client.d.ts.map