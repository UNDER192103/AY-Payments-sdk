import type { AyPaymentsCustomer, AyPaymentsOrder, AyPaymentsProject } from "../models.js";

export interface AyPaymentsOverviewResponse {
  totals: {
    clients: number;
    projects: number;
    products: number;
    sales: number;
    admins: number;
    apiKeys: number;
    grossRevenue: number;
    customerFeesTotal: number;
    commissionTotal: number;
    sellerNetTotal: number;
    approvedSales: number;
    pendingSales: number;
  };
  recentClients: AyPaymentsCustomer[];
  recentProjects: AyPaymentsProject[];
  recentOrders: AyPaymentsOrder[];
}
