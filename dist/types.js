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
//# sourceMappingURL=types.js.map