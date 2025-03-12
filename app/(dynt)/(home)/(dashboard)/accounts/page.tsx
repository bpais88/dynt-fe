"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useOrganization } from "@/context/OrganizationContext";
import { api } from "@/utils/trpc";
import Image from "next/image";

export default function Accounts() {
  const { organizationId } = useOrganization();

  // Fetch banks data from API
  const { data: banks = [], isLoading } =
    api.gocardless.bank.list.useQuery(organizationId);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  console.log(banks, "*****");

  return (
    <div className="px-4 md:px-20 py-8">
      <h2 className="text-2xl font-bold mb-6">Connected Accounts</h2>
      {isLoading && <p className="text-gray-500">Loading bank data...</p>}

      {banks.length === 0 && !isLoading ? (
        <Card className="glass-card">
          <CardContent className="py-10 text-center">
            <p className="text-gray-500">
              No banks connected yet. Connect your first bank to get started.
            </p>
            <Button className="mt-4">Connect Bank</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {banks.map((bank) => (
            <Card key={bank.id} className="glass-card overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {bank.logo && (
                    <Image
                      src={bank.logo}
                      alt={`${bank.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                  <CardTitle>
                    {bank.name}
                    {bank.SWIFT && (
                      <span className="text-sm text-gray-500 px-2">
                        ({bank.SWIFT})
                      </span>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {bank.accounts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No accounts</p>
                ) : (
                  bank.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {account.ownerName || "Account"}
                        </p>
                        {/* {account.rawJSON?.details?.account?.cashAccountType && (
                        <p className="text-xs text-gray-500">
                          {account.rawJSON.details.account.cashAccountType}
                        </p>
                      )} */}
                        <p className="text-xs text-gray-500">
                          Last updated:{" "}
                          {new Date(account.updatedAt).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            account.availableBalance > 0
                              ? "text-green-500"
                              : account.availableBalance < 0
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
                          {formatCurrency(
                            account.availableBalance,
                            account.currency
                          )}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
