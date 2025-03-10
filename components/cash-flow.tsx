"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const cashFlowData = [
  { month: "Jan", income: 15000, expenses: 12000, projection: 16000 },
  { month: "Feb", income: 18000, expenses: 14000, projection: 19000 },
  { month: "Mar", income: 22000, expenses: 16000, projection: 23000 },
  { month: "Apr", income: 25000, expenses: 18000, projection: 26000 },
  { month: "May", income: 28000, expenses: 20000, projection: 29000 },
  { month: "Jun", income: 32000, expenses: 22000, projection: 33000 },
];

export function CashFlow() {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Cash Flow Projection
          </CardTitle>
          <CardDescription>
            6-month cash flow forecast with AI-powered projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#8884d8"
                name="Actual Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#82ca9d"
                name="Actual Expenses"
              />
              <Line
                type="monotone"
                dataKey="projection"
                stroke="#ffc658"
                name="AI Projection"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Cash Flow Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>
                  Projected 15% increase in revenue over the next 3 months
                </span>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>
                  Potential cash flow gap in August due to seasonal fluctuations
                </span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>Opportunity to optimize expenses by 7% in Q3</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Cash Flow Scenarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              AI-generated cash flow scenarios based on different business
              conditions:
            </p>
            <ul className="space-y-2">
              <li>1. Conservative Growth: 5% annual increase</li>
              <li>
                2. Aggressive Expansion: 20% annual increase, 15% expense
                increase
              </li>
              <li>
                3. Economic Downturn: 10% revenue decrease, 5% expense cut
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
