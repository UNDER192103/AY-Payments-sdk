import axios, { isAxiosError } from "axios";
import { AyPaymentsApiError } from "./types.js";
const DEFAULT_BASE_URL = "https://aypayments.undernouzen.com.br";
const DEFAULT_API_VERSION = "v1";
function trimTrailingSlash(value) {
    return value.replace(/\/+$/, "");
}
function normalizeApiUrl(options) {
    if (options.apiUrl)
        return trimTrailingSlash(options.apiUrl);
    const baseUrl = trimTrailingSlash(options.baseUrl || DEFAULT_BASE_URL);
    const apiVersion = options.apiVersion || DEFAULT_API_VERSION;
    return `${baseUrl}/api/${apiVersion}`;
}
function withQuery(body, pagination) {
    if (body && "query" in body && ("pagination" in body || Object.keys(body).length <= 2)) {
        return body;
    }
    return { query: body || {}, pagination };
}
export class AYPaymentsClient {
    api;
    axios;
    apiUrl;
    options;
    constructor(options = {}) {
        this.apiUrl = normalizeApiUrl(options);
        this.options = {
            apiVersion: options.apiVersion || DEFAULT_API_VERSION,
            debug: options.debug ?? false,
            timeout: options.timeout ?? 30000,
            ...options,
        };
        const headers = {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        };
        if (options.apiKey) {
            if (options.authHeader === "x-api-key") {
                headers["x-api-key"] = options.apiKey;
            }
            else {
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
    async request(config) {
        try {
            const response = await this.api.request(config);
            return response.data;
        }
        catch (error) {
            const apiError = this.toApiError(error);
            if (this.options.onError)
                this.options.onError(apiError);
            if (this.options.debug)
                console.error("[AY Payments SDK] error", apiError);
            throw apiError;
        }
    }
    toApiError(error) {
        if (isAxiosError(error)) {
            const axiosError = error;
            const payload = axiosError.response?.data || {
                error: axiosError.message || "Erro ao chamar a API AY Payments.",
            };
            return new AyPaymentsApiError(payload, axiosError.response?.status);
        }
        return new AyPaymentsApiError({
            error: error instanceof Error ? error.message : "Erro desconhecido.",
        });
    }
    raw = (config) => this.request(config);
    get = (url, config) => this.request({ ...config, url, method: "GET" });
    post = (url, data, config) => this.request({ ...config, url, data, method: "POST" });
    put = (url, data, config) => this.request({ ...config, url, data, method: "PUT" });
    patch = (url, data, config) => this.request({ ...config, url, data, method: "PATCH" });
    delete = (url, config) => this.request({ ...config, url, method: "DELETE" });
    v1 = {
        auth: {
            admin: {
                me: () => this.get("/auth/admin"),
                login: (payload) => this.post("/auth/admin", payload),
                logout: () => this.post("/auth/admin/logout"),
                updateProfile: (payload) => this.put("/auth/admin/profile", payload),
                changePassword: (payload) => this.post("/auth/admin/change-password", payload),
            },
            tenant: {
                me: () => this.get("/auth/tenant"),
                login: (payload) => this.post("/auth/tenant", payload),
                logout: () => this.post("/auth/tenant/logout"),
                register: (payload) => this.post("/tenant/register", payload),
                updateProfile: (payload) => this.put("/auth/tenant/profile", payload),
                changePassword: (payload) => this.post("/auth/tenant/change-password", payload),
            },
            customer: {
                me: () => this.get("/client/auth"),
                login: (payload) => this.post("/client/auth", payload),
                logout: () => this.post("/client/logout"),
                register: (payload) => this.post("/client/register", payload),
                resetPassword: (email) => this.post("/reset-password", { email }),
            },
        },
        profile: {
            orders: (pagination) => this.get("/profile/orders", { params: pagination }),
            update: (payload) => this.post("/profile/update-profile", payload),
            changePassword: (payload) => this.post("/profile/change-password", payload),
            deleteAccount: () => this.delete("/profile/delete-account"),
        },
        projects: {
            list: (pagination) => this.get("/projects", { params: pagination }),
            query: (query, pagination) => this.post("/projects/query", withQuery(query, pagination)),
            get: (projectIdOrExternalId) => this.get(`/projects/${projectIdOrExternalId}`),
            create: (payload) => this.post("/projects", payload),
            update: (projectIdOrExternalId, payload) => this.put(`/projects/${projectIdOrExternalId}`, payload),
            delete: (projectIdOrExternalId) => this.delete(`/projects/${projectIdOrExternalId}`),
            commission: {
                get: (projectIdOrExternalId) => this.get(`/projects/${projectIdOrExternalId}/commission`),
                update: (projectIdOrExternalId, payload) => this.put(`/projects/${projectIdOrExternalId}/commission`, payload),
            },
            accounts: {
                oauth: (payload) => this.post("/projects/accounts/oauth", payload),
                list: (projectIdOrExternalId) => this.get(`/projects/${projectIdOrExternalId}/accounts`),
                create: (projectIdOrExternalId, payload) => this.post(`/projects/${projectIdOrExternalId}/accounts`, payload),
                update: (projectIdOrExternalId, connectionId, payload) => this.put(`/projects/${projectIdOrExternalId}/accounts/${connectionId}`, payload),
                delete: (projectIdOrExternalId, connectionId) => this.delete(`/projects/${projectIdOrExternalId}/accounts/${connectionId}`),
            },
        },
        products: {
            list: (pagination) => this.get("/products", { params: pagination }),
            query: (query, pagination) => this.post("/products/query", withQuery(query, pagination)),
            listByProject: (projectIdOrExternalId, pagination) => this.get(`/projects/${projectIdOrExternalId}/products`, { params: pagination }),
            queryByProject: (projectIdOrExternalId, query, pagination) => this.post(`/projects/${projectIdOrExternalId}/products/query`, withQuery(query, pagination)),
            create: (projectIdOrExternalId, payload) => this.post(`/projects/${projectIdOrExternalId}/products`, payload),
            createGlobal: (payload) => this.post("/products", { ...payload, subtotal: payload.value }),
            update: (projectIdOrExternalId, productId, payload) => this.put(`/projects/${projectIdOrExternalId}/products/${productId}`, payload),
            updateGlobal: (productId, payload) => this.put(`/products/${productId}`, payload.value === undefined ? payload : { ...payload, subtotal: payload.value }),
            delete: (projectIdOrExternalId, productId) => this.delete(`/projects/${projectIdOrExternalId}/products/${productId}`),
            deleteGlobal: (productId) => this.delete(`/products/${productId}`),
        },
        checkouts: {
            calculate: (payload) => this.post("/checkouts/calculate", payload),
            create: (payload) => this.post("/checkouts", payload),
        },
        orders: {
            list: (pagination) => this.get("/orders", { params: pagination }),
            query: (query, pagination) => this.post("/orders/query", withQuery(query, pagination)),
            listByProject: (projectIdOrExternalId, pagination) => this.get(`/projects/${projectIdOrExternalId}/orders`, { params: pagination }),
            queryByProject: (projectIdOrExternalId, query, pagination) => this.post(`/projects/${projectIdOrExternalId}/orders/query`, withQuery(query, pagination)),
            createManual: (projectIdOrExternalId, payload) => this.post(`/projects/${projectIdOrExternalId}/orders`, payload),
        },
        customers: {
            list: (pagination) => this.get("/clients", { params: pagination }),
            query: (query, pagination) => this.post("/clients/query", withQuery(query, pagination)),
            create: (payload) => this.post("/clients", payload),
            delete: (customerId) => this.delete(`/clients/${customerId}`),
        },
        admins: {
            list: (pagination) => this.get("/admins", { params: pagination }),
            create: (payload) => this.post("/admins", payload),
            delete: (adminId) => this.delete(`/admins/${adminId}`),
        },
        merchants: {
            list: (pagination) => this.get("/tenants", { params: pagination }),
            create: (payload) => this.post("/tenants", payload),
            delete: (tenantId, options) => this.delete(`/tenants/${tenantId}`, { params: { cascade: options?.cascade } }),
        },
        tenants: {
            list: (pagination) => this.get("/tenants", { params: pagination }),
            create: (payload) => this.post("/tenants", payload),
            delete: (tenantId, options) => this.delete(`/tenants/${tenantId}`, { params: { cascade: options?.cascade } }),
        },
        apiKeys: {
            list: (pagination) => this.get("/api-keys", { params: pagination }),
            create: (payload) => this.post("/api-keys", payload),
            revoke: (apiKeyId) => this.post(`/api-keys/${apiKeyId}/revoke`),
            setStatus: (apiKeyId, status) => this.patch(`/api-keys/${apiKeyId}/status`, { status }),
            delete: (apiKeyId) => this.delete(`/api-keys/${apiKeyId}`),
        },
        commissions: {
            get: () => this.get("/commissions"),
            update: (payload) => this.put("/commissions", payload),
        },
        analytics: {
            overview: () => this.get("/overview"),
        },
        logs: {
            list: (pagination) => this.get("/logs", { params: pagination }),
            clear: (category) => this.delete(`/logs/${category}`),
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
export function createAYPaymentsClient(options = {}) {
    return new AYPaymentsClient(options);
}
//# sourceMappingURL=client.js.map