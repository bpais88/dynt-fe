"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganization } from "@/context/OrganizationContext";
import { useUser } from "@/context/UserContext";
import {
  Building,
  ChevronRight,
  CreditCard,
  Edit,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { logout, user } = useUser<true>();
  const { organization } = useOrganization();

  const [activeTab, setActiveTab] = useState("profile");

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const displayValue = (value) => {
    return value || "Not provided";
  };

  if (!user) return <></>;

  console.log("++++", user, organization);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2 gap-2">
            <TabsTrigger
              value="profile"
              className={activeTab !== "profile" ? "cursor-pointer" : ""}
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="organization"
              className={activeTab !== "organization" ? "cursor-pointer" : ""}
            >
              <Building className="h-4 w-4" />
              Organization
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <Avatar className="h-24 w-24 text-2xl bg-gray-200 font-semibold  text-black">
                    <AvatarFallback>
                      {getInitialsFromName(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-xl">
                      {displayValue(user?.name)}
                    </h3>
                    <p className="text-muted-foreground">
                      {displayValue(user?.email)}
                    </p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p className="font-medium">
                      {displayValue(user?.firstName)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p className="font-medium">
                      {displayValue(user?.lastName)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{displayValue(user?.phone)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="font-medium">
                      {user?.dateOfBirth
                        ? formatDate(user.dateOfBirth)
                        : "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-medium">{formatDate(user?.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Status
                    </p>
                    <p className="font-medium flex items-center">
                      <span
                        className={`mr-2 h-2 w-2 rounded-full ${
                          user?.isApproved ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></span>
                      {user?.isApproved ? "Approved" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{displayValue(user?.address)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{displayValue(user?.city)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{displayValue(user?.state)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Postal Code</p>
                  <p className="font-medium">{displayValue(user?.postCode)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">
                    {displayValue(
                      user?.countryId ? `ID: ${user.countryId}` : null
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SSN</p>
                  <p className="font-medium">{displayValue(user?.SSN)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Banking Information
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Banking Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Bank Account</p>
                  <p className="font-medium">
                    {displayValue(user?.bankAccount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Swan User</p>
                  <p className="font-medium">{displayValue(user?.swanUser)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Passport Information
                  </p>
                  <p className="font-medium">
                    {user?.passportURL ? "Provided" : "Not provided"}
                  </p>
                </div>
              </div>
              {!user?.bankAccount && !user?.swanUser && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                  No banking information has been set up yet. Add your banking
                  details to load financial transactions.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Organization Details</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Organization
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center md:items-start gap-3">
                  <div className="h-24 w-24 rounded-md bg-muted flex items-center justify-center text-2xl font-bold">
                    {organization?.name?.charAt(0)}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-xl">
                      {displayValue(organization?.name)}
                    </h3>
                    <p className="text-muted-foreground">
                      {displayValue(organization?.email)}
                    </p>
                    <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {organization?.billingPlan?.toUpperCase() || "FREE"} PLAN
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Organization Type
                    </p>
                    <p className="font-medium capitalize">
                      {displayValue(organization?.type)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Employee Count
                    </p>
                    <p className="font-medium">
                      {displayValue(organization?.employeeCount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">
                      {displayValue(organization?.phone)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <p className="font-medium">
                      {displayValue(organization?.website)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Default Currency
                    </p>
                    <p className="font-medium">
                      {displayValue(organization?.defaultCurrency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Role</p>
                    <p className="font-medium capitalize">
                      {displayValue(organization?.role)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Business Number</p>
                <p className="font-medium">
                  {displayValue(organization?.business_number)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tax Number</p>
                <p className="font-medium">
                  {displayValue(organization?.business_tax_number)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">MCC</p>
                <p className="font-medium">{displayValue(organization?.mcc)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Alias</p>
                <p className="font-medium">
                  {displayValue(organization?.emailAlias)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Approval
                </p>
                <p className="font-medium">
                  {organization?.requiredApprovalToTransferPayment
                    ? "Required"
                    : "Not required"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">
                  {displayValue(organization?.address)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">
                  {displayValue(organization?.city)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium">
                  {displayValue(organization?.state)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Postal Code</p>
                <p className="font-medium">
                  {displayValue(organization?.postCode)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <p className="font-medium">
                  {displayValue(
                    organization?.countryId
                      ? `ID: ${organization.countryId}`
                      : null
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Accounting App */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center text-blue-700">
                    X
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {organization?.accountingApp?.name || "No accounting app"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Accounting Integration
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  Manage <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Stripe */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded bg-purple-100 flex items-center justify-center text-purple-700">
                    S
                  </div>
                  <div>
                    <h4 className="font-medium">Stripe</h4>
                    <p className="text-sm text-muted-foreground">
                      {organization?.stripeAccount
                        ? "Connected"
                        : "Not connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  Manage <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Swan */}
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center text-green-700">
                    S
                  </div>
                  <div>
                    <h4 className="font-medium">Swan</h4>
                    <p className="text-sm text-muted-foreground">
                      {organization?.swanAccount
                        ? "Connected"
                        : "Not connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  Manage <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col py-10">
        <div className="border-t border-gray-300 w-full mb-4"></div>
        <Button
          onClick={logout}
          variant="destructive"
          className="flex items-center gap-2 w-fit my-3 mx-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function getInitialsFromName(name: string) {
  const parts = name?.trim().split(" ") || ["?"];
  return parts.length > 1
    ? (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
    : parts[0].charAt(0).toUpperCase();
}
