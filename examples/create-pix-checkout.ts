import { createAYPaymentsClient, isApiError } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  apiKey: process.env.AYP_API_KEY,
});

const result = await ay.checkouts.create({
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
});

if (isApiError(result)) {
  console.error(result.error);
  process.exit(1);
}

console.log(result.order.id);
console.log(result.payment?.qrCode);
