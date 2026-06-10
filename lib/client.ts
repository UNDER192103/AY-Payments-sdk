import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";

import type {
  AyPaymentsAdmin,
  AyPaymentsAdminsResponse,
  AyPaymentsApiErrorPayload,
  AyPaymentsApiResult,
  AyPaymentsApiKeyResponse,
  AyPaymentsApiKeysResponse,
  AyPaymentsAuthAdminResponse,
  AyPaymentsAuthCustomerResponse,
  AyPaymentsAuthTenantResponse,
  AyPaymentsCalculateCheckoutPayload,
  AyPaymentsCheckoutCalculationResponse,
  AyPaymentsCheckoutPayload,
  AyPaymentsClientOptions,
  AyPaymentsConnectionResponse,
  AyPaymentsCreateAdminPayload,
  AyPaymentsCreateApiKeyPayload,
  AyPaymentsCreateApiKeyResponse,
  AyPaymentsCreateCheckoutResponse,
  AyPaymentsCreateConnectionPayload,
  AyPaymentsCreateCustomerPayload,
  AyPaymentsCustomerRegisterPayload,
  AyPaymentsCreateManualOrderPayload,
  AyPaymentsCreateProductPayload,
  AyPaymentsCreateProjectPayload,
  AyPaymentsCreateProjectResponse,
  AyPaymentsCreateTenantPayload,
  AyPaymentsCustomerResponse,
  AyPaymentsCustomersResponse,
  AyPaymentsDeleteResponse,
  AyPaymentsLogsResponse,
  AyPaymentsLoginPayload,
  AyPaymentsOAuthPayload,
  AyPaymentsOAuthResponse,
  AyPaymentsOrderResponse,
  AyPaymentsOrdersResponse,
  AyPaymentsOverviewResponse,
  AyPaymentsPaginationQuery,
  AyPaymentsPlatformCommissionResponse,
  AyPaymentsProductResponse,
  AyPaymentsProductsResponse,
  AyPaymentsProfileOrdersResponse,
  AyPaymentsProjectCommissionResponse,
  AyPaymentsProjectAccountsResponse,
  AyPaymentsProjectListResponse,
  AyPaymentsProjectResponse,
  AyPaymentsQuery,
  AyPaymentsTenant,
  AyPaymentsTenantRegisterPayload,
  AyPaymentsTenantsResponse,
  AyPaymentsUpdateCommissionPayload,
  AyPaymentsUpdateConnectionPayload,
  AyPaymentsUpdateProductPayload,
  AyPaymentsUpdateProjectCommissionPayload,
  AyPaymentsUpdateProjectPayload,
} from "./types.js";
import { AyPaymentsApiError } from "./types.js";

const DEFAULT_BASE_URL = "https://aypayments.undernouzen.com.br";
const DEFAULT_API_VERSION = "v1";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function normalizeApiUrl(options: AyPaymentsClientOptions) {
  if (options.apiUrl) return trimTrailingSlash(options.apiUrl);
  const baseUrl = trimTrailingSlash(options.baseUrl || DEFAULT_BASE_URL);
  const apiVersion = options.apiVersion || DEFAULT_API_VERSION;
  return `${baseUrl}/api/${apiVersion}`;
}

function withQuery(body?: AyPaymentsQuery | undefined, pagination?: AyPaymentsPaginationQuery) {
  if (body && "query" in body && ("pagination" in body || Object.keys(body).length <= 2)) {
    return body;
  }
  return { query: body || {}, pagination };
}

export class AYPaymentsClient {
  readonly api: AxiosInstance;
  readonly axios: AxiosInstance;
  readonly apiUrl: string;
  readonly options: Required<Pick<AyPaymentsClientOptions, "apiVersion" | "debug" | "timeout">> &
    AyPaymentsClientOptions;

  constructor(options: AyPaymentsClientOptions = {}) {
    this.apiUrl = normalizeApiUrl(options);
    this.options = {
      apiVersion: options.apiVersion || DEFAULT_API_VERSION,
      debug: options.debug ?? false,
      timeout: options.timeout ?? 30000,
      ...options,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (options.apiKey) {
      if (options.authHeader === "x-api-key") {
        headers["x-api-key"] = options.apiKey;
      } else {
        const prefix = options.authorizationPrefix === undefined ? "Bearer" : options.authorizationPrefix;
        headers.Authorization = prefix ? `${prefix} ${options.apiKey}` : options.apiKey;
      }
    }

    this.api = axios.create({
      baseURL: this.apiUrl,
      timeout: this.options.timeout,
      withCredentials: true,
      ...(options.axios || {}),
      headers: {
        ...(options.axios?.headers || {}),
        ...headers,
      },
    });
    this.axios = this.api;

    if (this.options.debug) {
      this.api.interceptors.request.use((request) => {
        console.log("[AY Payments SDK] request", {
          method: request.method,
          url: request.url,
          params: request.params,
          data: request.data,
        });
        return request;
      });
    }
  }

  private async request<T>(config: AxiosRequestConfig): Promise<AyPaymentsApiResult<T>> {
    try {
      const response = await this.api.request<T>(config);
      return response.data;
    } catch (error) {
      const apiError = this.toApiError(error);
      if (this.options.onError) this.options.onError(apiError);
      if (this.options.debug) console.error("[AY Payments SDK] error", apiError);
      return apiError.payload;
    }
  }

  private toApiError(error: unknown): AyPaymentsApiError {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<AyPaymentsApiErrorPayload>;
      const payload = axiosError.response?.data || {
        error: axiosError.message || "Erro ao chamar a API AY Payments.",
      };
      return new AyPaymentsApiError(payload, axiosError.response?.status);
    }

    return new AyPaymentsApiError({
      error: error instanceof Error ? error.message : "Erro desconhecido.",
    });
  }

  raw = <T = unknown>(config: AxiosRequestConfig) => this.request<T>(config);
  get = <T = unknown>(url: string, config?: AxiosRequestConfig) => this.request<T>({ ...config, url, method: "GET" });
  post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    this.request<T>({ ...config, url, data, method: "POST" });
  put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    this.request<T>({ ...config, url, data, method: "PUT" });
  patch = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    this.request<T>({ ...config, url, data, method: "PATCH" });
  delete = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    this.request<T>({ ...config, url, method: "DELETE" });

  v1 = {
    auth: {
      admin: {
        me: () => this.get<{ admin: AyPaymentsAdmin }>("/auth/admin"),
        login: (payload: AyPaymentsLoginPayload) => this.post<AyPaymentsAuthAdminResponse>("/auth/admin", payload),
        logout: () => this.post<AyPaymentsDeleteResponse>("/auth/admin/logout"),
        updateProfile: (payload: { fullName: string }) => this.put<{ admin: AyPaymentsAdmin }>("/auth/admin/profile", payload),
        changePassword: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
          this.post<{ admin: AyPaymentsAdmin }>("/auth/admin/change-password", payload),
      },
      tenant: {
        me: () => this.get<{ tenant: AyPaymentsTenant }>("/auth/tenant"),
        login: (payload: AyPaymentsLoginPayload) => this.post<AyPaymentsAuthTenantResponse>("/auth/tenant", payload),
        logout: () => this.post<AyPaymentsDeleteResponse>("/auth/tenant/logout"),
        register: (payload: AyPaymentsTenantRegisterPayload) => this.post<AyPaymentsAuthTenantResponse>("/tenant/register", payload),
        updateProfile: (payload: { name?: string; fullName?: string; metadata?: Record<string, unknown> }) =>
          this.put<{ tenant: AyPaymentsTenant }>("/auth/tenant/profile", payload),
        changePassword: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
          this.post<{ tenant: AyPaymentsTenant }>("/auth/tenant/change-password", payload),
      },
      customer: {
        me: () => this.get<AyPaymentsAuthCustomerResponse>("/client/auth"),
        login: (payload: AyPaymentsLoginPayload) => this.post<AyPaymentsAuthCustomerResponse>("/client/auth", payload),
        logout: () => this.post<AyPaymentsDeleteResponse>("/client/logout"),
        register: (payload: AyPaymentsCustomerRegisterPayload) => this.post<AyPaymentsAuthCustomerResponse>("/client/register", payload),
        resetPassword: (email: string) => this.post<{ message: string }>("/reset-password", { email }),
      },
    },

    profile: {
      orders: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsProfileOrdersResponse>("/profile/orders", { params: pagination }),
      update: (payload: { fullName: string; bio?: string; website?: string; location?: string }) =>
        this.post<{ message: string }>("/profile/update-profile", payload),
      changePassword: (payload: { oldPassword: string; newPassword: string }) =>
        this.post<{ message: string }>("/profile/change-password", payload),
      deleteAccount: () => this.delete<AyPaymentsDeleteResponse>("/profile/delete-account"),
    },

    projects: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsProjectListResponse>("/projects", { params: pagination }),
      query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsProjectListResponse>("/projects/query", withQuery(query, pagination)),
      get: (projectIdOrExternalId: string) => this.get<AyPaymentsProjectResponse>(`/projects/${projectIdOrExternalId}`),
      create: (payload: AyPaymentsCreateProjectPayload) =>
        this.post<AyPaymentsCreateProjectResponse>("/projects", payload),
      update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectPayload) =>
        this.put<AyPaymentsProjectResponse>(`/projects/${projectIdOrExternalId}`, payload),
      delete: (projectIdOrExternalId: string) =>
        this.delete<AyPaymentsDeleteResponse>(`/projects/${projectIdOrExternalId}`),
      commission: {
        get: (projectIdOrExternalId: string) =>
          this.get<AyPaymentsProjectCommissionResponse>(`/projects/${projectIdOrExternalId}/commission`),
        update: (projectIdOrExternalId: string, payload: AyPaymentsUpdateProjectCommissionPayload) =>
          this.put<AyPaymentsProjectResponse>(`/projects/${projectIdOrExternalId}/commission`, payload),
      },
      accounts: {
        oauth: (payload: AyPaymentsOAuthPayload) => this.post<AyPaymentsOAuthResponse>("/projects/accounts/oauth", payload),
        list: (projectIdOrExternalId: string) =>
          this.get<AyPaymentsProjectAccountsResponse>(`/projects/${projectIdOrExternalId}/accounts`),
        create: (projectIdOrExternalId: string, payload: AyPaymentsCreateConnectionPayload) =>
          this.post<AyPaymentsConnectionResponse>(`/projects/${projectIdOrExternalId}/accounts`, payload),
        update: (projectIdOrExternalId: string, connectionId: string, payload: AyPaymentsUpdateConnectionPayload) =>
          this.put<AyPaymentsConnectionResponse>(`/projects/${projectIdOrExternalId}/accounts/${connectionId}`, payload),
        delete: (projectIdOrExternalId: string, connectionId: string) =>
          this.delete<AyPaymentsProjectResponse>(`/projects/${projectIdOrExternalId}/accounts/${connectionId}`),
      },
    },

    products: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsProductsResponse>("/products", { params: pagination }),
      query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsProductsResponse>("/products/query", withQuery(query, pagination)),
      listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsProductsResponse>(`/projects/${projectIdOrExternalId}/products`, { params: pagination }),
      queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsProductsResponse>(`/projects/${projectIdOrExternalId}/products/query`, withQuery(query, pagination)),
      create: (projectIdOrExternalId: string, payload: AyPaymentsCreateProductPayload) =>
        this.post<AyPaymentsProductResponse>(`/projects/${projectIdOrExternalId}/products`, payload),
      createGlobal: (payload: AyPaymentsCreateProductPayload & { projectId: string }) =>
        this.post<AyPaymentsProductResponse>("/products", { ...payload, subtotal: payload.value }),
      update: (projectIdOrExternalId: string, productId: string, payload: AyPaymentsUpdateProductPayload) =>
        this.put<AyPaymentsProductResponse>(`/projects/${projectIdOrExternalId}/products/${productId}`, payload),
      updateGlobal: (productId: string, payload: AyPaymentsUpdateProductPayload & { projectId?: string }) =>
        this.put<AyPaymentsProductResponse>(
          `/products/${productId}`,
          "value" in payload && payload.value !== undefined ? { ...payload, subtotal: payload.value } : payload,
        ),
      delete: (projectIdOrExternalId: string, productId: string) =>
        this.delete<AyPaymentsDeleteResponse>(`/projects/${projectIdOrExternalId}/products/${productId}`),
      deleteGlobal: (productId: string) => this.delete<AyPaymentsDeleteResponse>(`/products/${productId}`),
    },

    checkouts: {
      calculate: (payload: AyPaymentsCalculateCheckoutPayload) =>
        this.post<AyPaymentsCheckoutCalculationResponse>("/checkouts/calculate", payload),
      create: (payload: AyPaymentsCheckoutPayload) =>
        this.post<AyPaymentsCreateCheckoutResponse>("/checkouts", payload),
    },

    orders: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsOrdersResponse>("/orders", { params: pagination }),
      query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsOrdersResponse>("/orders/query", withQuery(query, pagination)),
      listByProject: (projectIdOrExternalId: string, pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsOrdersResponse>(`/projects/${projectIdOrExternalId}/orders`, { params: pagination }),
      queryByProject: (projectIdOrExternalId: string, query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsOrdersResponse>(`/projects/${projectIdOrExternalId}/orders/query`, withQuery(query, pagination)),
      createManual: (projectIdOrExternalId: string, payload: AyPaymentsCreateManualOrderPayload) =>
        this.post<AyPaymentsOrderResponse & { created: boolean; checkoutUrl?: string }>(
          `/projects/${projectIdOrExternalId}/orders`,
          payload,
        ),
    },

    customers: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsCustomersResponse>("/clients", { params: pagination }),
      query: (query: AyPaymentsQuery, pagination?: AyPaymentsPaginationQuery) =>
        this.post<AyPaymentsCustomersResponse>("/clients/query", withQuery(query, pagination)),
      create: (payload: AyPaymentsCreateCustomerPayload) => this.post<AyPaymentsCustomerResponse>("/clients", payload),
      delete: (customerId: string) => this.delete<AyPaymentsDeleteResponse>(`/clients/${customerId}`),
    },

    admins: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsAdminsResponse>("/admins", { params: pagination }),
      create: (payload: AyPaymentsCreateAdminPayload) => this.post<{ admin: AyPaymentsAdmin }>("/admins", payload),
      delete: (adminId: string) => this.delete<AyPaymentsDeleteResponse>(`/admins/${adminId}`),
    },

    merchants: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsTenantsResponse>("/tenants", { params: pagination }),
      create: (payload: AyPaymentsCreateTenantPayload) => this.post<{ tenant: AyPaymentsTenant }>("/tenants", payload),
      delete: (tenantId: string, options?: { cascade?: boolean }) =>
        this.delete<AyPaymentsDeleteResponse>(`/tenants/${tenantId}`, { params: { cascade: options?.cascade } }),
    },

    tenants: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsTenantsResponse>("/tenants", { params: pagination }),
      create: (payload: AyPaymentsCreateTenantPayload) => this.post<{ tenant: AyPaymentsTenant }>("/tenants", payload),
      delete: (tenantId: string, options?: { cascade?: boolean }) =>
        this.delete<AyPaymentsDeleteResponse>(`/tenants/${tenantId}`, { params: { cascade: options?.cascade } }),
    },

    apiKeys: {
      list: (pagination?: AyPaymentsPaginationQuery) =>
        this.get<AyPaymentsApiKeysResponse>("/api-keys", { params: pagination }),
      create: (payload: AyPaymentsCreateApiKeyPayload) =>
        this.post<AyPaymentsCreateApiKeyResponse>("/api-keys", payload),
      revoke: (apiKeyId: string) => this.post<AyPaymentsApiKeyResponse>(`/api-keys/${apiKeyId}/revoke`),
      setStatus: (apiKeyId: string, status: "active" | "revoked") =>
        this.patch<AyPaymentsApiKeyResponse>(`/api-keys/${apiKeyId}/status`, { status }),
      delete: (apiKeyId: string) => this.delete<AyPaymentsDeleteResponse>(`/api-keys/${apiKeyId}`),
    },

    commissions: {
      get: () => this.get<AyPaymentsPlatformCommissionResponse>("/commissions"),
      update: (payload: AyPaymentsUpdateCommissionPayload) =>
        this.put<AyPaymentsPlatformCommissionResponse>("/commissions", payload),
    },

    analytics: {
      overview: () => this.get<AyPaymentsOverviewResponse>("/overview"),
    },

    logs: {
      list: (pagination?: AyPaymentsPaginationQuery) => this.get<AyPaymentsLogsResponse>("/logs", { params: pagination }),
      clear: (category: "login" | "general" | "webhook" | "order" | string) =>
        this.delete<{ category: string; deleted: number }>(`/logs/${category}`),
    },
  };

  auth = this.v1.auth;
  profile = this.v1.profile;
  projects = this.v1.projects;
  products = this.v1.products;
  checkouts = this.v1.checkouts;
  orders = this.v1.orders;
  customers = this.v1.customers;
  clients = this.v1.customers;
  admins = this.v1.admins;
  merchants = this.v1.merchants;
  tenants = this.v1.tenants;
  apiKeys = this.v1.apiKeys;
  commissions = this.v1.commissions;
  analytics = this.v1.analytics;
  logs = this.v1.logs;

  isAuthenticated() {
    return !!this.options.apiKey;
  }
}

export function createAYPaymentsClient(options: AyPaymentsClientOptions = {}) {
  return new AYPaymentsClient(options);
}
