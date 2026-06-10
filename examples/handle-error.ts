import {
  createAYPaymentsClient,
  isApiError,
  isExternalProviderError,
} from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  apiKey: process.env.AYP_API_KEY,
});

const result = await ay.orders.list();

if (isApiError(result)) {
  if (isExternalProviderError(result)) {
    console.error("Provider failed", result.provider, result.details.message);
  } else {
    console.error(result.error);
  }
  process.exit(1);
}

console.log(result.orders);
