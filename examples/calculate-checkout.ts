import { createAYPaymentsClient, isApiError } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  apiKey: process.env.AYP_API_KEY,
});

const result = await ay.checkouts.calculate({
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
});

if (isApiError(result)) {
  console.error(result.error);
  process.exit(1);
}

console.log(result.summary);
