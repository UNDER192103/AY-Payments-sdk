export class AyPaymentsApiError extends Error {
    status;
    payload;
    constructor(payload, status) {
        super(payload.error || "AY Payments API error");
        this.name = "AyPaymentsApiError";
        this.status = status;
        this.payload = payload;
    }
}
export function isApiError(response) {
    return !!response && typeof response === "object" && "error" in response;
}
export function isContextError(response) {
    return (!!response &&
        typeof response === "object" &&
        "error" in response &&
        "provider" in response &&
        "paymentMethod" in response &&
        "orderId" in response &&
        "path" in response);
}
export function isExternalProviderError(response) {
    return (!!response &&
        typeof response === "object" &&
        "error" in response &&
        "provider" in response &&
        "status" in response &&
        "details" in response);
}
//# sourceMappingURL=errors.js.map