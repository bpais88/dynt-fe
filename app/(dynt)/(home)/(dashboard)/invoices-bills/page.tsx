"use client";
import { InvoicesBillsList } from "@/components/invoices-bills-list";
import { Button } from "@/components/ui/button";
import { useOrganization } from "@/context/OrganizationContext";
import { api, RouterInputs } from "@/utils/trpc";
import { endOfYear, startOfYear, subYears } from "date-fns";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BillFilter = RouterInputs["bills"]["bills"]["filters"];
type InvoiceFilter = RouterInputs["invoices"]["invoices"]["filters"];

export default function InvoicesBillsPage() {
  const router = useRouter();
  const { organizationId = "" } = useOrganization<true>();
  const [filters, setFilters] = useState<InvoiceFilter | BillFilter>(null);
  const [sorting, setSorting] = useState<Sorting>({
    createdAt: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState({
    startDate: startOfYear(subYears(new Date(), 2)),
    endDate: endOfYear(new Date()),
  });

  const params = { organizationId, currentPage, filters, sorting, period };

  // api fetch data
  const { data: invoices = [], isLoading: isLoadingInvoices } =
    api.invoices.invoices.useQuery(params, {
      enabled: !!organizationId,
    });

  const { data: bills = [], isLoading: isLoadingBills } =
    api.bills.bills.useQuery(params, {
      enabled: !!organizationId,
    });

  console.log("+++++++++++++++++++++");
  console.log(invoices, bills, organizationId, params);

  const handleCreateBill = () => {
    router.push("/invoices-bills/bills/create");
  };

  const handleCreateInvoice = () => {
    router.push("/invoices-bills/invoices/create");
  };

  return (
    <>
      <div className="px-20 py-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Invoices & Bills</h2>
          <div className="flex gap-3">
            <Button
              onClick={handleCreateInvoice}
              variant="outline"
              className="flex items-center gap-1 cursor-pointer border-black text-black hover:bg-gray-50"
            >
              <PlusIcon size={14} />
              Create New Invoice
            </Button>
            <Button
              onClick={handleCreateBill}
              variant="outline"
              className="flex items-center gap-1 cursor-pointer border-black text-black hover:bg-gray-50"
            >
              <PlusIcon size={14} />
              Create New Bill
            </Button>
          </div>
        </div>

        {isLoadingInvoices || isLoadingBills ? (
          <div className="flex py-8 pt-36">
            <div className="animate-spin rounded-full h-8 w-8 m-auto border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <InvoicesBillsList invoices={invoices} bills={bills} />
        )}
      </div>
    </>
  );
}
