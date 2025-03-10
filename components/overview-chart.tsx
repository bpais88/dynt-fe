"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { name: "Jan", Actual: 4000, "AI Forecast": 4400 },
  { name: "Feb", Actual: 3000, "AI Forecast": 3200 },
  { name: "Mar", Actual: 2000, "AI Forecast": 2800 },
  { name: "Apr", Actual: 2780, "AI Forecast": 3000 },
  { name: "May", Actual: 1890, "AI Forecast": 2300 },
  { name: "Jun", Actual: 2390, "AI Forecast": 2600 },
];

const pieData = [
  { name: "Actual", value: 16060 },
  { name: "AI Forecast", value: 18300 },
];

const COLORS = ["#0088FE", "#00C49F"];

export function Overview() {
  return (
    <Tabs defaultValue="bar">
      {/* <CardTitle>Revenue Overview</CardTitle>
      <CardDescription>Actual vs AI Forecast</CardDescription> */}
      <TabsList className="mb-4 mt-2">
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        <TabsTrigger value="line">Line Chart</TabsTrigger>
        <TabsTrigger value="pie">Pie Chart</TabsTrigger>
      </TabsList>
      <TabsContent value="bar">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
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
            <Legend />
            <Bar
              dataKey="Actual"
              fill="rgba(0, 146, 255, 0.7)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="AI Forecast"
              fill="rgba(172, 127, 244, 0.7)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="line">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="Actual"
              stroke="rgba(0, 146, 255, 0.7)"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="AI Forecast"
              stroke="rgba(172, 127, 244, 0.7)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </TabsContent>
      <TabsContent value="pie">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(0, 0, 0, 0.8)",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </TabsContent>
    </Tabs>
  );
}
