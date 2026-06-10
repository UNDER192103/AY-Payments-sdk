# AY Payments SDK

Documentacao completa: https://aypayments.undernouzen.com.br/docs/

SDK TypeScript/JavaScript para consumir a API do AY Payments.

O pacote não lê `.env`. A autenticação é passada na inicialização. Se você criar o client sem `apiKey`, ele continua funcionando como instância HTTP, mas as rotas protegidas vão depender de sessão/cookie ou retornar erro de autenticação da API.

## Instalação

```bash
npm install @undernouzen/ay-payments-sdk
```

Se o escopo `@ay-payments` não estiver disponível no npm, publique como `@undernouzen/ay-payments-sdk` ou outro escopo seu e mantenha os imports equivalentes.

## Criar o client

```ts
import { createAYPaymentsClient } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiKey: process.env.AYP_API_KEY,
});
```

Por padrão, o client usa:

```text
https://aypayments.undernouzen.com.br/api/v1
```

Você também pode passar a URL exata da API:

```ts
const ay = createAYPaymentsClient({
  apiUrl: "http://localhost:3489/api/v1",
  apiKey: "ayp_secret",
});
```

## Autenticação

Authorization Bearer é o padrão:

```ts
const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiKey: "ayp_secret",
});
```

Usando `x-api-key`:

```ts
const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiKey: "ayp_secret",
  authHeader: "x-api-key",
});
```

Usando Authorization sem `Bearer`:

```ts
const ay = createAYPaymentsClient({
  apiKey: "ayp_secret",
  authorizationPrefix: false,
});
```

Sem autenticação:

```ts
const ay = createAYPaymentsClient();
```

## Versionamento

A versão padrão é `v1`.

```ts
const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiVersion: "v1",
});

await ay.v1.projects.list();
```

Os atalhos abaixo apontam para `v1`:

```ts
await ay.projects.list();
await ay.products.list();
await ay.checkouts.create(payload);
```

## Raw Axios

Para rotas novas que ainda não foram mapeadas:

```ts
const response = await ay.raw<{ ok: boolean }>({
  method: "GET",
  url: "/minha-rota",
});
```

Você também pode usar a instância diretamente:

```ts
const response = await ay.api.get("/projects");
```

## Projects

Criar ou atualizar por `externalId`:

```ts
const { project, created } = await ay.projects.create({
  externalId: "832320430277918720",
  name: "Vagalumes",
  webhookUrl: "https://guildbuilders.example.com/webhooks/aypayments",
  metadata: {
    guildId: "832320430277918720",
  },
});
```

Listar:

```ts
const { projects, pagination } = await ay.projects.list({
  page: 1,
  limit: 50,
});
```

Buscar com query parcial, incluindo metadata:

```ts
const result = await ay.projects.query({
  metadata: {
    guildId: "832320430277918720",
  },
});
```

O identificador do projeto aceita `id` interno ou `externalId` nas rotas que usam `projectIdOrExternalId`.

## Contas conectadas

Gerar URL OAuth:

```ts
const oauth = await ay.projects.accounts.oauth({
  projectId: "832320430277918720",
  provider: "mercadopago",
  name: "Conta principal",
  redirectUrl: "https://guildbuilders.example.com/connect/result",
});

console.log(oauth.authorizationUrl);
```

Listar contas:

```ts
const { accounts } = await ay.projects.accounts.list("832320430277918720");
```

Editar nome/status:

```ts
await ay.projects.accounts.update("832320430277918720", "connection-id", {
  name: "Conta Pix principal",
  status: "active",
});
```

Remover:

```ts
await ay.projects.accounts.delete("832320430277918720", "connection-id");
```

## Products

Produtos usam `value`. Comissão não é calculada no produto; ela é calculada no checkout.

Criar produto:

```ts
const { product } = await ay.products.create("832320430277918720", {
  connectedAccountId: "330692399",
  name: "Cargo VIP",
  icon: "https://cdn.example.com/vip.png",
  description: "Acesso VIP no Discord",
  value: 19.9,
  fees: [
    {
      name: "Taxa operacional",
      kind: "fixed",
      value: 1.5,
      payer: "customer",
      active: true,
    },
  ],
  metadata: {
    discordRoleId: "123",
  },
});
```

Listar por projeto:

```ts
const { products } = await ay.products.listByProject("832320430277918720");
```

Buscar produtos:

```ts
const result = await ay.products.query({
  metadata: {
    discordRoleId: "123",
  },
});
```

## Checkouts

### Calcular sem criar cobrança

Use `calculate` para exibir o resumo antes de gerar Pix, boleto ou Checkout Pro/Stripe Checkout.

```ts
const calculation = await ay.checkouts.calculate({
  items: [
    {
      productId: "product-id",
      quantity: 1,
    },
  ],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
  },
  currency: "BRL",
});

console.log(calculation.summary.amount);
```

### Criar checkout com produto cadastrado

```ts
const checkout = await ay.checkouts.create({
  paymentMethod: "pix",
  items: [
    {
      productId: "product-id",
      quantity: 1,
    },
  ],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
    documentType: "CPF",
    document: "00000000000",
  },
  externalReference: "guild-832320430277918720-user-123",
  webhookUrl: "https://guildbuilders.example.com/webhooks/orders",
  redirectUrls: {
    successUrl: "https://guildbuilders.example.com/payments/success",
    pendingUrl: "https://guildbuilders.example.com/payments/pending",
    failureUrl: "https://guildbuilders.example.com/payments/failure",
    cancelUrl: "https://guildbuilders.example.com/payments/cancel",
  },
  metadata: {
    guildId: "832320430277918720",
    discordUserId: "123456789",
  },
});

console.log(checkout.order.id);
console.log(checkout.payment?.qrCode);
console.log(checkout.checkout?.url);
```

### Criar checkout avulso

Para itens sem produto cadastrado, informe `projectId` e `accountId`. Todos os itens do mesmo checkout devem resolver para o mesmo projeto e a mesma conta conectada.

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
      description: "Acesso VIP no Discord",
    },
  ],
  customer: {
    email: "cliente@example.com",
    name: "Cliente Teste",
  },
  externalReference: "guild-832320430277918720-custom-001",
});
```

## Orders

Listar orders:

```ts
const { orders } = await ay.orders.list({ page: 1, limit: 100 });
```

Buscar por metadata:

```ts
const result = await ay.orders.query({
  metadata: {
    guildId: "832320430277918720",
  },
});
```

Listar por projeto:

```ts
const result = await ay.orders.listByProject("832320430277918720");
```

## Customers

A API atual usa `/clients`, mas a SDK expõe `customers` e o alias `clients`.

```ts
const { client } = await ay.customers.create({
  email: "cliente@example.com",
  password: "123456",
  fullName: "Cliente Teste",
  document: "00000000000",
});

const { clients } = await ay.customers.list();
```

## Merchants, Admins, API Keys

Essas rotas dependem do escopo da sessão/API key.

```ts
await ay.merchants.create({
  email: "merchant@example.com",
  password: "123456",
  name: "Minha Loja",
  fullName: "Responsavel",
});

const key = await ay.apiKeys.create({
  name: "Guild Builders",
  permissions: {
    projects: { list: true, create: true, edit: true, delete: false },
    products: { list: true, create: true, edit: true, delete: true },
    orders: { list: true, create: true },
  },
});
```

Revogar, habilitar/desabilitar ou deletar:

```ts
await ay.apiKeys.revoke("api-key-id");
await ay.apiKeys.setStatus("api-key-id", "active");
await ay.apiKeys.delete("api-key-id");
```

## Tratamento de erro

Métodos da SDK retornam `data` em caso de sucesso e lançam `AyPaymentsApiError` em caso de erro.

```ts
import { AyPaymentsApiError } from "@ay-payments/sdk";

try {
  await ay.projects.list();
} catch (error) {
  if (error instanceof AyPaymentsApiError) {
    console.log(error.status);
    console.log(error.payload.error);
  }
}
```

## Notas de contrato

- Produto usa `value`.
- Produto não calcula comissão.
- Comissão é calculada em `POST /checkouts/calculate` e `POST /checkouts`.
- `projectIdOrExternalId` aceita o `id` interno do AY Payments ou o `externalId` do projeto.
- `connectedAccountId` é o id da conta conectada no provedor, como `acct_...` na Stripe ou o user id do Mercado Pago.
- `connectionId` é o id interno da conexão dentro do projeto.
