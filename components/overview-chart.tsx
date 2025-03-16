import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/utils/helper";
import { RouterOutputs } from "@/utils/trpc";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewChartsProps {
  data: RouterOutputs["reports"]["barChart"];
  currency: string;
  loading: boolean;
}

export function OverviewCharts({
  data,
  currency,
  loading,
}: OverviewChartsProps) {
  const months = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 1 },
    { name: "Mar", value: 2 },
    { name: "Apr", value: 3 },
    { name: "May", value: 4 },
    { name: "Jun", value: 5 },
    { name: "Jul", value: 6 },
    { name: "Aug", value: 7 },
    { name: "Sep", value: 8 },
    { name: "Oct", value: 9 },
    { name: "Nov", value: 10 },
    { name: "Dec", value: 11 },
  ];

  const balancesByMonth = useMemo(() => {
    const monthlyBalances = new Array(12).fill(0);
    data.balances.forEach(([date, balance]) => {
      const month = new Date(date).getMonth();
      monthlyBalances[month] = balance;
    });
    return monthlyBalances;
  }, [data]);

  // Format data
  const formattedData = months.map((month) => ({
    month: month.name,
    name: month.name,
    debit: data.cashFlow.debits[month.value] || 0,
    credit: data.cashFlow.credits[month.value] || 0,
    spending: data.cashFlow.debits[month.value] || 0,
    balance: balancesByMonth[month.value],
  }));

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      name: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (!active || !payload || !payload.length) return null;

    console.log(loading);

    return (
      <div className="custom-tooltip rounded-md shadow-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <p className="font-medium text-slate-900 dark:text-slate-100 mb-2">
          {label}
        </p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center">
              <div
                className="w-3 h-3 mr-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-300">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}:
              </span>
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white ml-2">
              {formatCurrency(item.value, currency)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="cashflow">
      <TabsList className="mb-4 mt-2">
        <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        <TabsTrigger value="balance">Balance</TabsTrigger>
        <TabsTrigger value="spending">Spending</TabsTrigger>
      </TabsList>
      {/* CashFlow Chart */}
      <TabsContent value="cashflow">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={formattedData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Bar
              dataKey="debit"
              fill="rgba(239, 68, 68, 0.7)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="credit"
              fill="rgba(34, 197, 94, 0.7)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      {/* Balance Chart */}
      <TabsContent value="balance">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={formattedData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="rgba(0, 146, 255, 0.7)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      {/* Spending chart */}
      <TabsContent value="spending">
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={formattedData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value, currency)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Bar
              dataKey="spending"
              fill="rgba(0, 146, 255, 0.7)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="Forecast"
              stroke="rgba(172, 127, 244, 0.7)"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
