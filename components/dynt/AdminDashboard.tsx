import Balances from "@/components/charts/Balances";
import CashFlow from "@/components/charts/CashFlow";
import Spending from "@/components/charts/Spending";
import NotFound from "@/components/utils/notfound";
import { useOrganization } from "@/context/OrganizationContext";
import { formatCurrency, formatTime, setTitle } from "@/utils/helper";
import { api } from "@/utils/trpc";
import { Chart, registerables } from "chart.js";

import DashboardSkeleton from "@/ui/skeletons/Dashboard";
import endOfDay from "date-fns/endOfDay";
import endOfYear from "date-fns/endOfYear";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import startOfDay from "date-fns/startOfDay";
import startOfYear from "date-fns/startOfYear";
import { ReactNode, useEffect, useState } from "react";
import { BsArrowDownLeft, BsArrowUpRight } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";
import { TbFileInvoice, TbReceiptTax } from "react-icons/tb";
import account from "../../../../dynt-server/src/services/account/account.queries";
import { RecentBills } from "./RecentBills";
import { RecentInvoices } from "./RecentInvoices";
import { RecentTransactions } from "./RecentTransactions";

const tabs = [
  {
    name: "invoices" as const,
    icon: <TbFileInvoice size="18" />,
  },
  {
    name: "bills" as const,
    icon: <TbReceiptTax size="18" />,
  },
];
type Tab = (typeof tabs)[number]["name"];

const charts = ["cash flow", "spending", "close balance"] as const;
type ChartType = (typeof charts)[number];

Chart.register(...registerables);

const pastThreeYears = [0, 1, 2].map((i) => new Date().getFullYear() - i);

const AdminDashboard = () => {
  useEffect(() => setTitle("Dashboard"), []);

  const { organizationId, organization } = useOrganization<true>();
  const [tab, setTab] = useState<Tab>("invoices");
  const [transactions, setTransactions] = useState<"regular" | "recurring">(
    "regular"
  );

  const [period, setPeriod] = useState({
    startDate: startOfYear(new Date()),
    endDate: endOfDay(new Date()),
  });

  const [year, setYear] = useState(pastThreeYears[0]);
  const [accountId, setAccountId] = useState<string>();

  const { data, isLoading } = api.reports.analytics.useQuery(
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

  if (!organizationId) return <NotFound title="Organization" />;

  if (isLoading) return <DashboardSkeleton />;
  if (!data) return <NotFound title="Data" />;

  const content: Record<Tab, ReactNode> = {
    bills: <RecentBills {...{ bills: data.bills }} />,
    invoices: <RecentInvoices {...{ invoices: data.invoices }} />,
  };

  const currency = organization.defaultCurrency;

  const handleSetYear = (y: number) => {
    setYear(y);

    const startDate = startOfYear(new Date().setFullYear(y));
    const endDate = endOfYear(new Date().setFullYear(y));

    setPeriod({
      endDate: isBefore(endDate, new Date()) ? endDate : endOfDay(new Date()),
      startDate: startOfDay(startDate),
    });
  };

  console.log(organizationId, accountId);

  console.log("----------------------------------------------");
  console.log(data, accounts, chartData);

  return (
    <div className="grid gap-12">
      <div className="stats   min-w-fit grid grid-rows-4 lg:grid-rows-2 2xl:grid-rows-1 w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <FaMoneyBillWave size={36} />
          </div>
          <div className="stat-title">Total Balanceeee</div>
          <div className="stat-value text-primary">
            {formatCurrency(data.balance, currency, true)}
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <BsArrowDownLeft size={36} />
          </div>
          <div className="stat-title">Expected Payments</div>
          <div className="stat-value text-success">
            {formatCurrency(data.receivable, currency, true)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-error">
            <BsArrowUpRight size={36} />
          </div>
          <div className="stat-title">Outgoing Bills</div>
          <div className="stat-value text-error">
            {formatCurrency(data.payable, currency, true)}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-accent">
            <GiEmptyHourglass size={36} />
          </div>
          <div className="stat-title">Time Saved</div>
          <div className="stat-value flex items-center  text-accent">
            {formatTime(data.timeSaved)}
          </div>
        </div>
      </div>

      <div className="w-full grid gap-4">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-4">
            <h2 className="label font-semibold text-xs sm:text-sm">Insights</h2>

            <select
              onChange={(e) => handleSetYear(+e.target.value)}
              value={year}
              name=""
              id=""
              className="select select-primary select-sm"
            >
              {pastThreeYears.map((t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="label font-semibold text-xs sm:text-sm">Account</h2>

            <select
              onChange={(e) => setAccountId(e.target.value || undefined)}
              value={accountId}
              name=""
              id=""
              className="select  max-w-32 select-primary select-sm"
            >
              <option value={""}>All</option>
              {accounts.map((account) => (
                <option value={account.id}>
                  {account.name} {account.IBAN || account.BBAN}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-10">
          <CashFlow
            {...{
              data: chartData?.cashFlow,
              currency: currency,
              loading: chartLoading,
            }}
          />
          <div className="grid gap-10 grid-cols-2">
            <Spending
              {...{
                data: chartData?.cashFlow,
                currency: currency,
                loading: chartLoading,
              }}
            />

            <Balances
              {...{
                data: chartData?.balances,
                currency: currency,
                loading: chartLoading,
                year,
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full gap-6 flex-col md:flex-row flex">
        <div className="flex-1 grid gap-4">
          <div className="tabs  w-fit tabs-boxed">
            {tabs.map((t) => (
              <button
                onClick={() => setTab(t.name)}
                key={t.name}
                className={`tab ${t.name == tab ? "tab-active" : ""}`}
              >
                {t.icon}
                Recent {t.name}
              </button>
            ))}
          </div>

          {content[tab]}
        </div>
        <div className="flex-1 content-start grid gap-4">
          <div className="tabs  w-fit tabs-boxed">
            {["regular", "recurring"].map((t) => (
              <button
                onClick={() => setTransactions(t)}
                key={t}
                className={`tab capitalize ${
                  transactions === t ? "tab-active" : ""
                }`}
              >
                {t} Transactions
              </button>
            ))}
          </div>
          <RecentTransactions
            {...{
              transactions:
                transactions === "regular" ? data.transactions : data.recurring,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
