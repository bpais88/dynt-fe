"use client";

import BillDetails from "@/components/bills/BillDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrganization } from "@/context/OrganizationContext";
import { Vendor } from "@/types";
import { CreateBillProps } from "@/types/bills";
import { api } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Note: Replace with your actual API calls
// import { createBill } from "@/lib/api/bills";

export default function CreateBillPage() {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const create = api.bills.createBill.useMutation();
  const { organizationId } = useOrganization();

  const handleCreate = async ({
    rows,
    customId,
    dueDate,
    currency,
    files,
    terms,
  }: CreateBillProps) => {
    setIsSubmitting(true);

    try {
      const { totalAmount, totalVat } = rows.reduce(
        (acc, { amount, vat, quantity }) => {
          acc.totalVat += vat * quantity;
          acc.totalAmount += amount * quantity;
          return acc;
        },
        { totalAmount: 0, totalVat: 0 }
      );

      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

      if (!organizationId) return;

      const bill = await create.mutateAsync({
        vendorId: selectedVendor?.id,
        rows,
        dueDate,
        terms,
        total: totalAmount + totalVat,
        totalAmount,
        files,
        totalVat,
        customId,
        currency,
        accountInfo,
        organizationId,
      });

      console.log("Bill created successfully");
      router.push(`/bills/${bill.id}`);
    } catch (error) {
      console.error("Error creating bill:", error);
      // toast.error("Failed to create bill. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create Bill</h1>

      {/* Vendor selection section - to be implemented later */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {!selectedVendor
              ? "Choose a Vendor"
              : `Selected Vendor: ${selectedVendor.name}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Vendor selection will be implemented later */}
          <p className="text-sm text-muted-foreground">
            Vendor selection component will be placed here
          </p>
        </CardContent>
      </Card>

      {/* Bank account selection - to be implemented later */}
      {selectedVendor && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {!accountInfo
                ? "Choose a bank account"
                : `Selected account: ${accountInfo?.name} (${accountInfo?.currency})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Account selection will be implemented later */}
            <p className="text-sm text-muted-foreground">
              Account selection component will be placed here
            </p>
          </CardContent>
        </Card>
      )}

      {/* Bill details section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bill Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BillDetails
            handleCreate={handleCreate}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
