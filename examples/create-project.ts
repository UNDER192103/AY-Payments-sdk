import { createAYPaymentsClient, isApiError } from "@undernouzen/ay-payments-sdk";

const ay = createAYPaymentsClient({
  baseUrl: "https://aypayments.undernouzen.com.br",
  apiKey: process.env.AYP_API_KEY,
});

const result = await ay.projects.create({
  externalId: "832320430277918720",
  name: "Vagalumes",
  metadata: {
    guildId: "832320430277918720",
  },
});

if (isApiError(result)) {
  console.error(result.error);
  process.exit(1);
}

console.log(result.project);
