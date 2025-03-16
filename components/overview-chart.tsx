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

  // fromat data
  const formattedData = months.map((month) => ({
    month: month.name,
    name: month.name,
    debit: data.cashFlow.debits[month.value] || 0,
    credit: data.cashFlow.credits[month.value] || 0,
    spending: data.cashFlow.debits[month.value] || 0,
    balance: balancesByMonth[month.value],
  }));

  console.log(formattedData, "%%");

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
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={(value, name) => [`$${value}`, name]}
            />
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
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
            />
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
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
            />
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
