"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrganization } from "@/context/OrganizationContext";
import { api } from "@/utils/trpc";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function ConnectBankSidebar({ open, onClose }) {
  const [country, setCountry] = useState("NL");
  const [search, setSearch] = useState("");

  const { organizationId } = useOrganization();

  // Fetch available banks based on country
  const { data = [], isLoading } =
    api.gocardless.institution.list.useQuery(country);

  // Authorize bank connection mutation
  const authorize = api.gocardless.authorize.useMutation();

  // Filter and sort banks based on search input
  const banks = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) return data;

    return data
      .filter((bank) => bank.name.toLowerCase().includes(searchTerm))
      .sort((a, b) => {
        // Prioritize banks that start with the search term
        const aStartsWith = a.name.toLowerCase().startsWith(searchTerm);
        const bStartsWith = b.name.toLowerCase().startsWith(searchTerm);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [data, search]);

  // Handle bank selection
  const handleBankSelectAuthorize = async (bank) => {
    try {
      const res = await authorize.mutateAsync({
        institution: bank,
        organizationId,
        country,
        redirectUrl: `${window.location.origin}/accounts`,
      });

      // Redirect to authentication page
      if (res.link) {
        window.location.href = res.link;
      }
    } catch (error) {
      console.error("Failed to authorize bank:", error);
    }
  };

  // Reset search when country changes
  useEffect(() => {
    setSearch("");
  }, [country]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4 pt-2 pb-10">
        <SheetHeader className="mb-6">
          <SheetTitle>Connect New Bank</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Country tabs */}
          <Tabs defaultValue="NL" value={country} onValueChange={setCountry}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="NL"
                className={country !== "NL" ? "cursor-pointer" : ""}
              >
                Netherlands
              </TabsTrigger>
              <TabsTrigger
                value="PT"
                className={country !== "PT" ? "cursor-pointer" : ""}
              >
                Portugal
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search for your bank"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Banks list */}
          <div className="space-y-2">
            {isLoading ? (
              // Loading skeleton
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md"
                  />
                ))
            ) : banks.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No banks found for your search
              </p>
            ) : (
              banks.map((bank) => (
                <Button
                  key={bank.id}
                  variant="outline"
                  className="w-full justify-start h-14 px-4 cursor-pointer"
                  onClick={() => handleBankSelectAuthorize(bank)}
                  disabled={authorize.isLoading}
                >
                  {bank.logo && (
                    <div className="w-8 h-8 mr-3 flex-shrink-0 relative">
                      <Image
                        src={bank.logo}
                        alt={`${bank.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="truncate">{bank.name}</span>
                  {authorize.isLoading &&
                    authorize.variables?.institution.id === bank.id && (
                      <div className="ml-auto">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
                      </div>
                    )}
                </Button>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
