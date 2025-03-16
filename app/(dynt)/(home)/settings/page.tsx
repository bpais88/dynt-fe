"use client";
import { AccountingSettings } from "@/components/settings/accounting-settings";
import { CategoriesSettings } from "@/components/settings/categories-settings";
import { CompanySettings } from "@/components/settings/company-settings";
import { IntegrationsSettings } from "@/components/settings/integrations-settings";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { TaxCodeSettings } from "@/components/settings/tax-code-settings";
import { UsersSettings } from "@/components/settings/users-settings";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Building,
  Calculator,
  FileText,
  LinkIcon,
  LogOut,
  Tag,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const settingsOptions = [
  { id: "profile", label: "Profile", icon: User, component: ProfileSettings },
  {
    id: "company",
    label: "Company",
    icon: Building,
    component: CompanySettings,
  },
  { id: "users", label: "Users", icon: Users, component: UsersSettings },
  {
    id: "categories",
    label: "Categories",
    icon: Tag,
    component: CategoriesSettings,
  },
  {
    id: "taxcode",
    label: "Tax Code",
    icon: FileText,
    component: TaxCodeSettings,
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: Calculator,
    component: AccountingSettings,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: LinkIcon,
    component: IntegrationsSettings,
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const [activeSettings, setActiveSettings] = useState("profile");
  const ActiveComponent =
    settingsOptions.find((option) => option.id === activeSettings)?.component ||
    ProfileSettings;

  return (
    <>
      {/* setting navbar */}
      <div className="border w-64 bg-card/50 p-4 backdrop-blur-xl flex h-screen flex-col border-r border-border transition-all duration-300">
        <Button
          variant="ghost"
          className="justify-start mb-6"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <div className="flex-1 space-y-2">
          {settingsOptions.map((option) => (
            <Button
              key={option.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activeSettings === option.id && "bg-muted text-primary"
              )}
              onClick={() => setActiveSettings(option.id)}
            >
              <option.icon className="mr-2 h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>
        <Button variant="destructive" className="w-full justify-start mt-auto">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* settings main */}
      <main className="flex-1 overflow-auto ">
        <div className="space-y-6 p-8 px-24 py-12">
          <ActiveComponent />
        </div>
      </main>
    </>
  );
}
