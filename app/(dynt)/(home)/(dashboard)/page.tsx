"use client";

import { useOrganization } from "@/context/OrganizationContext";

import { CashFlow } from "@/components/cash-flow";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { InvoicesBillsList } from "@/components/invoices-bills-list";
import { OverviewCharts } from "@/components/overview-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatTime } from "@/utils/helper";
import { api } from "@/utils/trpc";
import endOfDay from "date-fns/endOfDay";
import endOfYear from "date-fns/endOfYear";
import isToday from "date-fns/isToday";
import startOfYear from "date-fns/startOfYear";
import { Clock, DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { organizationId, organization } = useOrganization<true>();
  const [accountId, setAccountId] = useState<string>();

  const pastThreeYears = [0, 1, 2].map((i) => new Date().getFullYear() - i);
  const [year, setYear] = useState(pastThreeYears[0]);
  const [period, setPeriod] = useState({
    startDate: startOfYear(new Date()),
    endDate: endOfDay(new Date()),
  });

  // api fetch data
  const { data: dashboardMetrics, isLoading } = api.reports.analytics.useQuery(
    { organizationId, ...period, isToday: isToday(period.endDate) },
    { enabled: !!organizationId }
  );

  const { data: accounts = [] } = api.account.list.useQuery(organizationId);

  const { data: chartData, isLoading: chartLoading } =
    api.reports.barChart.useQuery(
      {
        organizationId,
        endDate: endOfYear(new Date().setFullYear(year)),
        startDate: startOfYear(new Date().setFullYear(year)),
        accountId,
      },
      { enabled: !!organizationId }
    );

  // data fetch end

  const currency = organization?.defaultCurrency;

  if (!dashboardMetrics) return <div></div>;
  // return <p>DashboardMetricsAnalytics loading failed!!!!</p>;

  const bills = dashboardMetrics.bills;
  const invoices = dashboardMetrics.invoices;

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(isLoading, accounts, dashboardMetrics, chartLoading, chartData);

  return (
    <>
      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <CalendarDateRangePicker />
        </div>
        <TabsContent value="overview" className="space-y-4">
          {/* top dashboard/metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(dashboardMetrics.balance, currency, true)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                      +2.5% from last month
                    </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Expected Income
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,350.00</div>
                <p className="text-xs text-muted-foreground">
                  For next 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Expected Payments
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(dashboardMetrics.receivable, currency, true)}
                </div>
                <p className="text-xs text-muted-foreground">
                  For next 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Time Saved
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardMetrics.timeSaved &&
                    formatTime(dashboardMetrics.timeSaved)}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Overview Charts */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {chartData && (
                  <OverviewCharts
                    data={chartData}
                    currency={currency}
                    loading={chartLoading}
                  />
                )}
              </CardContent>
            </Card>
            {/* Invoices And Bills */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Invoices & Bills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InvoicesBillsList bills={bills} invoices={invoices} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <CashFlow />
        </TabsContent>
      </Tabs>
    </>
  );
}
