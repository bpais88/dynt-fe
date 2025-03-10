"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Brain,
  Calculator,
  CreditCardIcon as CardIcon,
  CheckSquare,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  Receipt,
  Settings,
  Sparkles,
  UserIcon,
  Users,
} from "lucide-react";
// import { useTheme } from "next-themes";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { OnboardingChecklist } from "./onboarding-checklist";
import { SettingsSidebar } from "./settings-sidebar";

export function MainNavSidebar() {
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  //   const pathname = usePathname();
  //   const { theme, setTheme } = useTheme();

  //   const toggleTheme = () => {
  //     setTheme(theme === "dark" ? "light" : "dark");
  //   };

  const { user } = useUser();

  return showSettings ? (
    <>
      <p>Settings sidebar</p>
      <SettingsSidebar onClose={() => setShowSettings(false)} />
    </>
  ) : (
    <>
      <div
        className={cn(
          "group flex h-screen flex-col bg-card/50 backdrop-blur-xl border-r border-border transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex py-4 items-center border-b border-border">
          <div className="flex flex-col w-full">
            {/* Logo and app name */}
            <div className="flex justify-between w-full px-2">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <div className="p-1 rounded-lg backdrop-blur-sm">
                  <img
                    src="https://api.dynt.ai/static/logo-192.png"
                    alt="Dynt"
                    className="w-8 rounded"
                  />
                </div>
                {!isCollapsed && (
                  <span className="gradient-text text-lg">Dynt.ai</span>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? "→" : "←"}
              </Button>
            </div>

            {/* User info - below logo and name */}
            {!isCollapsed && user && (
              <div className="mt-1 ml-2 px-2">
                <span className="text-xs font-medium block truncate">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground block truncate">
                  {user.email}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4 p-2 overflow-y-auto">
          <div className="space-y-1">
            <NavItem
              href="/"
              icon={Home}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/tasks"
              icon={CheckSquare}
              label="Tasks"
              isCollapsed={isCollapsed}
              badgeCount={3}
            />
            <NavItem
              href="/ai-insights"
              icon={Sparkles}
              label="AI Insights"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/agents"
              icon={Brain}
              label="Agents"
              isCollapsed={isCollapsed}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground px-2 py-1">
              Finances
            </div>
            <NavItem
              href="/transactions"
              icon={FileText}
              label="Transactions"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/expenses"
              icon={DollarSign}
              label="Expenses"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/invoices-bills"
              icon={Receipt}
              label="Invoices & Bills"
              isCollapsed={isCollapsed}
              // onClick={() => router.push("/invoices-bills")}
            />
            <NavItem
              href="/accounts"
              icon={CreditCard}
              label="Accounts"
              isCollapsed={isCollapsed}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground px-2 py-1">
              Business
            </div>
            <NavItem
              href="/accounting"
              icon={Calculator}
              label="Accounting"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/payroll"
              icon={UserIcon}
              label="Payroll"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/vendors"
              icon={Users}
              label="Vendors"
              isCollapsed={isCollapsed}
            />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground px-2 py-1">
              Reports
            </div>
            <NavItem
              href="/reports"
              icon={BarChart}
              label="Reports"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/cards"
              icon={CardIcon}
              label="Cards"
              isCollapsed={isCollapsed}
            />
          </div>
          {!isCollapsed && <OnboardingChecklist />}
          <div className="space-y-1">
            {/* <NavItem
              icon={theme === "dark" ? Sun : Moon}
              label={theme === "dark" ? "Light Mode" : "Dark Mode"}
              isCollapsed={isCollapsed}
              onClick={toggleTheme}
            /> */}
            <NavItem
              href="/settings"
              icon={Settings}
              label="Settings"
              isCollapsed={isCollapsed}
              // onClick={() => setShowSettings(true)}
            />
          </div>
          <div className="border-t border-border mt-auto pt-2" />
        </div>
      </div>
    </>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  isCollapsed,
  badgeCount,
}: {
  href: string;
  icon: any;
  label: string;
  isCollapsed: boolean;
  badgeCount?: number;
}) {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 text-muted-foreground",
        isActive && "bg-muted text-primary",
        isCollapsed && "justify-center"
      )}
      asChild
    >
      <Link href={href!}>
        {" "}
        <>
          <div className="relative">
            <Icon className="h-4 w-4" />
            {badgeCount !== undefined && badgeCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
              >
                {badgeCount}
              </Badge>
            )}
          </div>
          {!isCollapsed && label}
        </>
      </Link>
    </Button>
  );
}
