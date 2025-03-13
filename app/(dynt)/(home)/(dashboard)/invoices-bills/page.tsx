"use client";

import { InvoicesBillsList } from "@/components/invoices-bills-list";

import { useOrganization } from "@/context/OrganizationContext";
import { api, RouterInputs } from "@/utils/trpc";
import { endOfYear, startOfYear, subYears } from "date-fns";

import { useState } from "react";

type BillFilter = RouterInputs["bills"]["bills"]["filters"];
type InvoiceFilter = RouterInputs["invoices"]["invoices"]["filters"];

export default function InvoicesBillsPage() {
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

  return (
    <>
      <div className="px-20 py-12">
        <h2 className="text-2xl font-bold">Invoices & Bills</h2>
        {isLoadingInvoices || isLoadingBills ? (
          <div className="flex py-8 pt-36">
            <div className="animate-spin rounded-full h-8 w-8  m-auto border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <InvoicesBillsList invoices={invoices} bills={bills} />
        )}
      </div>
    </>
  );
}
