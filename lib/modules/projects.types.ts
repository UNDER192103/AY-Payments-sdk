import type { AyPaymentsPagination, AyPaymentsRecord, AyPaymentsStatus } from "../core.js";
import type {
  AyPaymentsCommissionRule,
  AyPaymentsProject,
  AyPaymentsProjectCommission,
  AyPaymentsProjectConnection,
} from "../models.js";
import type { AyPaymentsProvider } from "../core.js";

export interface AyPaymentsCreateProjectPayloadMin {
  externalId: string;
}

export interface AyPaymentsCreateProjectPayloadFull extends AyPaymentsCreateProjectPayloadMin {
  tenantId?: string | null;
  name?: string;
  status?: AyPaymentsStatus;
  webhookUrl?: string;
  webhook_url?: string;
  webhookSecret?: string;
  webhook_secret?: string;
  metadata?: AyPaymentsRecord;
}

export type AyPaymentsCreateProjectPayload =
  | AyPaymentsCreateProjectPayloadMin
  | AyPaymentsCreateProjectPayloadFull;

export type AyPaymentsUpdateProjectPayload =
  Partial<AyPaymentsCreateProjectPayloadMin> &
  Partial<AyPaymentsCreateProjectPayloadFull>;

export interface AyPaymentsProjectListResponse {
  projects: AyPaymentsProject[];
  pagination: AyPaymentsPagination;
}

export interface AyPaymentsProjectResponse {
  project: AyPaymentsProject;
}

export interface AyPaymentsCreateProjectResponse extends AyPaymentsProjectResponse {
  created: boolean;
}

export interface AyPaymentsOAuthPayloadMin {
  projectId: string;
  provider: AyPaymentsProvider;
}

export interface AyPaymentsOAuthPayloadFull {
  projectId?: string;
  externalId?: string;
  provider: AyPaymentsProvider;
  name?: string;
  redirectUrl?: string;
  redirect_url?: string;
}

export type AyPaymentsOAuthPayload = AyPaymentsOAuthPayloadMin | AyPaymentsOAuthPayloadFull;

export interface AyPaymentsOAuthResponse {
  provider: AyPaymentsProvider;
  authorizationUrl: string;
  redirectUri?: string;
  redirectUrl?: string | null;
  name?: string | null;
  project: Pick<AyPaymentsProject, "id" | "externalId" | "name">;
}

export interface AyPaymentsCreateConnectionPayloadMin {
  provider: AyPaymentsProvider;
  connectedAccountId: string;
}

export interface AyPaymentsCreateConnectionPayloadFull extends AyPaymentsCreateConnectionPayloadMin {
  name?: string;
  status?: AyPaymentsStatus;
}

export type AyPaymentsCreateConnectionPayload =
  | AyPaymentsCreateConnectionPayloadMin
  | AyPaymentsCreateConnectionPayloadFull;

export interface AyPaymentsUpdateConnectionPayload {
  name?: string;
  status?: AyPaymentsStatus;
}

export interface AyPaymentsConnectionResponse {
  project: AyPaymentsProject;
  account: AyPaymentsProjectConnection;
}

export interface AyPaymentsProjectAccountsResponse {
  accounts: AyPaymentsProjectConnection[];
  pagination?: AyPaymentsPagination;
}

export interface AyPaymentsProjectCommissionResponse {
  project: {
    id: string;
    externalId: string;
    name?: string;
    commission?: AyPaymentsProjectCommission;
  };
  platformCommission: {
    id?: string;
    name?: string;
    status?: AyPaymentsStatus;
    rules: AyPaymentsCommissionRule[];
    updatedDate?: number | string;
  };
}

export interface AyPaymentsUpdateProjectCommissionPayload {
  mode?: "inherit" | "override";
  rules?: AyPaymentsCommissionRule[];
  clearOverride?: boolean;
}
