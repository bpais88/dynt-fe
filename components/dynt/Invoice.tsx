import Drawer from "@/components/drawer/Drawer";
import NotFound from "@/components/utils/notfound";
import { useOrganization } from "@/context/OrganizationContext";
import { accountingStatuses } from "@/lib";
import LoadingSpin from "@/ui/LoadingSpin";
import Pagination from "@/ui/Pagination";
import Rows from "@/ui/skeletons/Rows";
import { formatCurrency, formatLabel, isEditableInvoice } from "@/utils/helper";
import { RouterInputs, api } from "@/utils/trpc";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { DatePeriod } from "../../components/PaymentsWrapper";
import SelectInvoiceFilters from "./InvoiceFilters";
import InvoiceHeaders, { Sorting } from "./InvoiceHeaders";
import InvoiceListing from "./InvoiceListing";

type Props = {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setSelection: Dispatch<SetStateAction<Record<string, any>>>;
  selection: Record<string, any>;
  period: DatePeriod | null;
  showAccountingOverview?: boolean;
};

export type InvoiceFilter = RouterInputs["invoices"]["invoices"]["filters"];

const Invoices: FC<Props> = ({
  setShowFilters,
  showFilters,
  selection,
  setSelection,
  period,
  showAccountingOverview,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { organizationId = "", organization } = useOrganization();

  const [filters, setFilters] = useState<InvoiceFilter>(null);

  const [sorting, setSorting] = useState<Sorting>({
    createdAt: "desc",
  });

  const params = { organizationId, currentPage, filters, sorting, period };

  const { data = [], isLoading } = api.invoices.invoices.useQuery(params, {
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

  const total = filtersData?.total ?? 0;

  const selectAll = api.invoices.selectAllInvoices.useMutation();
  const deleteInvoices = api.invoices.deleteInvoices.useMutation();
  const utils = api.useUtils();

  const selectedArray: string[] = useMemo(
    () => Object.values(selection).map((a) => a.id),
    [selection]
  );

  const handleSelectAll = async () => {
    if (allSelected) {
      setSelection({});
      return;
    }
    const res = await selectAll.mutateAsync({
      organizationId,
      filters,
      sorting,
      period,
    });

    setSelection(res.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}));
  };

  const fullListSelected = data.length
    ? selectedArray.length >= data.length
    : false;

  const hasMoreToSelect = fullListSelected && total > selectedArray.length;

  const allSelected = total > 0 && total === selectedArray.length;

  const handleBulkDelete = async () => {
    const invoices: typeof data = Object.values(selection);

    const _confirm = confirm(
      `Are you sure you want to delete ${invoices.length} invoices?`
    );

    if (!_confirm) return;

    if (invoices.some((i) => !i.status || !isEditableInvoice(i.status))) {
      toast.error(
        "You can not delete invoices that are in sent, paid, or overdue status"
      );
      return;
    }

    await deleteInvoices.mutateAsync(selectedArray);
    setSelection({});
    await utils.invoices.invoices.invalidate();
  };

  const statusFilters = useMemo(() => {
    const invoiceStatus = ["paid", "sent", "scheduled", "overdue"] as const;
    return invoiceStatus
      .map((s) => ({
        status: s,
        totalAmount: 0,
        totalCount: 0,
        ...filtersData?.statusData[s],
      }))
      .sort((a, b) => b.totalCount - a.totalCount);
  }, [filtersData?.statusData]);

  const accountingStatusFilters = useMemo(() => {
    return accountingStatuses
      .map((s) => ({
        status: s,
        totalAmount: 0,
        totalCount: 0,
        ...filtersData?.statusData[s],
      }))
      .sort((a, b) => b.totalCount - a.totalCount);
  }, [filtersData?.statusData]);

  return (
    <div className="overflow-auto flex-1 h-full flex flex-col">
      <Drawer
        isOpen={showFilters}
        onClose={setShowFilters}
        title={"Filters"}
        content={
          <SelectInvoiceFilters
            {...{
              ranges: filtersData?.ranges ?? { max: 0, min: 0 },
              setFilters,
              setShowFilters,
              showFilters,
              unCategorized: filtersData?.unCategorized ?? 0,
            }}
          />
        }
      />

      {!showAccountingOverview ? (
        <div className="lg:flex hidden gap-2 items-center my-4">
          <button
            onClick={() =>
              setFilters((p) => (p ? { ...p, statuses: [] } : { statuses: [] }))
            }
            className={`btn btn-outline ${
              filters?.statuses?.length ? "" : "btn-primary"
            } `}
          >
            <p>All</p>
            <p>{filtersData?.total}</p>
          </button>
          {statusFilters.map((s) => (
            <button
              onClick={() =>
                setFilters((p) =>
                  p ? { ...p, statuses: [s.status] } : { statuses: [s.status] }
                )
              }
              className={`btn btn-outline btn-ghost h-full ${
                !filters?.statuses?.includes(s.status) ? "" : "btn-primary "
              } `}
            >
              <p className="capitalize flex items-center gap-2">
                {s.status}
                <span className="text-xs">
                  (
                  {formatCurrency(s.totalAmount, organization?.defaultCurrency)}
                  )
                </span>
              </p>
              <p>{s.totalCount}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="lg:flex hidden gap-2 items-center my-4">
          <button
            onClick={() =>
              setFilters((p) =>
                p
                  ? { ...p, accountingStatus: null }
                  : { accountingStatus: null }
              )
            }
            className={`btn btn-outline ${
              filters?.accountingStatus ? "" : "btn-primary"
            } `}
          >
            <p>All</p>
            <p>{filtersData?.total}</p>
          </button>
          {accountingStatusFilters.map((s) => (
            <button
              onClick={() =>
                setFilters((p) =>
                  p
                    ? { ...p, accountingStatus: s.status }
                    : { accountingStatus: s.status }
                )
              }
              className={`btn btn-outline btn-ghost h-full ${
                filters?.accountingStatus !== s.status ? "" : "btn-primary "
              } `}
            >
              <p className="capitalize flex items-center gap-2">
                {formatLabel(s.status)}
                <span className="text-xs">
                  (
                  {formatCurrency(s.totalAmount, organization?.defaultCurrency)}
                  )
                </span>
              </p>
              <p>{s.totalCount}</p>
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 h-12">
        <button
          className={`btn-sm btn-outline btn btn-secondary text-xs ${
            hasMoreToSelect || allSelected ? "" : "hidden"
          } `}
          onClick={handleSelectAll}
        >
          <LoadingSpin loading={selectAll.isLoading} />
          {allSelected ? (
            <p>All {total} invoices selected</p>
          ) : (
            <p>Select all {total} invoices</p>
          )}
        </button>

        <button
          className={`btn btn-sm text-xs btn-error btn-outline  ${
            selectedArray.length ? "" : "hidden"
          } `}
          onClick={handleBulkDelete}
        >
          <LoadingSpin
            loading={deleteInvoices.isLoading || selectAll.isLoading}
          />

          <p>Delete all {selectedArray.length} invoices</p>
        </button>
      </div>

      <div className="overflow-x-auto overflow-auto h-full">
        <table className="table bg-base-200">
          <InvoiceHeaders
            {...{
              setSorting,
              sorting,
              data: data,
              setSelection,
              selectedArray,
              showAccountingOverview,
            }}
          />

          <InvoiceListing
            {...{
              list: data,
              params,
              isLoading,
              setSelection,
              selection,
              totalSelected: selectedArray.length,
              showAccountingOverview,
            }}
          />
        </table>
        {isLoading && <Rows />}
        {!isLoading && !data.length && <NotFound title="Invoices" />}
        <Pagination
          {...{
            currentPage,
            setCurrentPage,
            total: total,
          }}
        />
      </div>
    </div>
  );
};

export default Invoices;
