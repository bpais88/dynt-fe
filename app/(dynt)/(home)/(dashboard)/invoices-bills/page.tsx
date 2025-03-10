"use client";

import { InvoicesBills } from "@/components/invoices-bills";
import { InvoicesBillsView } from "@/components/invoices-bills-view";
import { MainNavSidebar } from "@/components/main-nav-sidebar";
import { useOrganization } from "@/context/OrganizationContext";
import { api } from "@/utils/trpc";
import endOfDay from "date-fns/endOfDay";
import startOfYear from "date-fns/startOfYear";
import { useMemo, useState } from "react";

export default function InvoicesBillsPage() {
  const { organizationId = "", organization } = useOrganization<true>();

  const [filters, setFilters] = useState<InvoiceFilter>(null);

  const [sorting, setSorting] = useState<Sorting>({
    createdAt: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState({
    startDate: startOfYear(new Date()),
    endDate: endOfDay(new Date()),
  });

  const showAccountingOverview = true;

  const params = { organizationId, currentPage, filters, sorting, period };

  // api fetch data

  const { data: invoices = [], isLoading } = api.invoices.invoices.useQuery(
    params,
    {
      enabled: !!organizationId,
    }
  );

  const { data: bills = [], isLoading: isLoadingBills } =
    api.bills.bills.useQuery(params, {
      enabled: !!organizationId,
    });

  const { data: filtersData } = api.invoices.filtersData.useQuery(
    {
      organizationId,
      filters,
      period,
      groupBy: showAccountingOverview ? "accountingStatus" : "status",
    },
    { enabled: !!organizationId }
  );

  const selectAll = api.invoices.selectAllInvoices.useMutation();
  const deleteInvoices = api.invoices.deleteInvoices.useMutation();
  const utils = api.useUtils();

  // api

  // const total = filtersData?.total ?? 0;

  // const selectedArray: string[] = useMemo(
  //   () => Object.values(selection).map((a) => a.id),
  //   [selection]
  // );

  // const fullListSelected = data.length
  //   ? selectedArray.length >= data.length
  //   : false;

  // const hasMoreToSelect = fullListSelected && total > selectedArray.length;

  // const allSelected = total > 0 && total === selectedArray.length;

  // const statusFilters = useMemo(() => {
  //   const invoiceStatus = ["paid", "sent", "scheduled", "overdue"] as const;
  //   return invoiceStatus
  //     .map((s) => ({
  //       status: s,
  //       totalAmount: 0,
  //       totalCount: 0,
  //       ...filtersData?.statusData[s],
  //     }))
  //     .sort((a, b) => b.totalCount - a.totalCount);
  // }, [filtersData?.statusData]);

  // const accountingStatusFilters = useMemo(() => {
  //   return accountingStatuses
  //     .map((s) => ({
  //       status: s,
  //       totalAmount: 0,
  //       totalCount: 0,
  //       ...filtersData?.statusData[s],
  //     }))
  //     .sort((a, b) => b.totalCount - a.totalCount);
  // }, [filtersData?.statusData]);

  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  console.log(invoices);
  console.log(bills);
  // console.log(data);
  // console.log(filtersData);
  // console.log(selectAll, deleteInvoices, utils);

  // const bills = filtersData
  // const invoices = []
  // const bills = [];

  return (
    <>
      {/* <InvoicesBillsView /> */}
      <div className="px-20 py-12">
        <h2 className="text-2xl font-bold">Invoices & Bills</h2>
        <InvoicesBills bills={bills} invoices={invoices} />
      </div>
    </>
  );
}
