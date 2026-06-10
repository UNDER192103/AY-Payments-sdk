# AY Payments SDK

TypeScript/JavaScript SDK for the AY Payments API.

Full docs: https://aypayments.undernouzen.com.br/docs/

## Install

```bash
npm install @undernouzen/ay-payments-sdk
```

```bash
pnpm add @undernouzen/ay-payments-sdk
```

## Create a client

```ts
import { createAYPaymentsClient } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiKey: process.env.AYP_API_KEY,
});
```

The default API base is:

```txt
https://aypayments.undernouzen.com.br/api/v1
```

You can also pass the exact API URL:

```ts
const ay = createAYPaymentsClient({
  apiUrl: "http://localhost:3489/api/v1",
  apiKey: "ayp_secret",
});
```

## Authentication

Default:

```http
Authorization: Bearer ayp_secret
```

Use `x-api-key` instead:

```ts
const ay = createAYPaymentsClient({
  apiKey: "ayp_secret",
  authHeader: "x-api-key",
});
```

Send the raw key in `Authorization`:

```ts
const ay = createAYPaymentsClient({
  apiKey: "ayp_secret",
  authorizationPrefix: false,
});
```

The client can be created without an API key. Protected routes will then depend on session cookies or return an API auth error.

## Error handling

Mapped SDK methods return `ApiResult<T>`, which is either the expected response or an `ErrorResponse`.

```ts
import { createAYPaymentsClient, isApiError } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({ apiKey: "ayp_secret" });

const result = await ay.projects.accounts.list("project-id-or-external-id");

if (isApiError(result)) {
  console.log(result.error);
  return;
}

console.log(result.accounts);
```

Error shapes:

```ts
type ErrorResponse = CommunError | ContextError | ExternalProviderError;
```

## Versioning

`v1` is the default.

```ts
await ay.v1.projects.list();
```

Convenience aliases point to `v1`:

```ts
await ay.projects.list();
await ay.products.listByProject("project-id");
await ay.checkouts.create(payload);
```

## Raw requests

Use `raw` or the exposed Axios instance for endpoints not mapped yet.

```ts
const result = await ay.raw<{ ok: boolean }>({
  method: "GET",
  url: "/projects",
});
```

```ts
const response = await ay.api.get("/projects");
```

## Projects

```ts
const result = await ay.projects.create({
  externalId: "832320430277918720",
  name: "Vagalumes",
  webhookUrl: "https://guildbuilders.example.com/webhooks/aypayments",
  metadata: {
    guildId: "832320430277918720",
  },
});

if (!isApiError(result)) {
  console.log(result.project.id, result.created);
}
```

## Connected accounts

Generate an OAuth URL:

```ts
const oauth = await ay.projects.accounts.oauth({
  projectId: "832320430277918720",
  provider: "mercadopago",
  name: "Conta principal",
  redirectUrl: "https://guildbuilders.example.com/connect/result",
});

if (!isApiError(oauth)) {
  console.log(oauth.authorizationUrl);
}
```

List connected accounts:

```ts
const accounts = await ay.projects.accounts.list("832320430277918720");

if (!isApiError(accounts)) {
  console.log(accounts.accounts);
}
```

Public connected account responses never expose `accessToken` or `refreshToken`.

## Products

Products use `value`. Product routes do not calculate platform commission; commission is calculated by checkout routes.

```ts
const product = await ay.products.create("832320430277918720", {
  connectedAccountId: "330692399",
  name: "Cargo VIP",
  value: 19.9,
  icon: "https://cdn.example.com/vip.png",
  description: "Acesso VIP no Discord",
  fees: [
    {
      name: "Taxa operacional",
      kind: "fixed",
      value: 1.5,
      payer: "customer",
      active: true,
    },
  ],
});
```

## Checkouts

Calculate totals without creating an order/payment:

```ts
const calculation = await ay.checkouts.calculate({
  items: [{ productId: "product-id", quantity: 1 }],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
  },
  currency: "BRL",
});
```

Create a real checkout:

```ts
const checkout = await ay.checkouts.create({
  paymentMethod: "pix",
  items: [{ productId: "product-id", quantity: 1 }],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
    documentType: "CPF",
    document: "00000000000",
  },
  externalReference: "guild-832320430277918720-user-123",
  webhookUrl: "https://guildbuilders.example.com/webhooks/orders",
  metadata: {
    guildId: "832320430277918720",
    discordUserId: "123456789",
  },
});
```

Custom checkout without a registered product:

```ts
const checkout = await ay.checkouts.create({
  projectId: "832320430277918720",
  accountId: "330692399",
  paymentMethod: "checkout",
  items: [
    {
      name: "Cargo VIP",
      amount: 19.9,
      quantity: 1,
    },
  ],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
  },
});
```

## Typed imports

Everything is also available from `types`:

```ts
import type {
  AyPaymentsCreateProjectPayload,
  AyPaymentsCreateCheckoutResponse,
  ErrorResponse,
} from "@undernouzen/ay-payments-sdk/types";
```

Module-specific imports are supported:

```ts
import type { AyPaymentsCheckoutPayload } from "@undernouzen/ay-payments-sdk/modules/checkouts.types";
import { isApiError } from "@undernouzen/ay-payments-sdk/errors";
```
