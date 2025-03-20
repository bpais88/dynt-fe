"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { DataRowType } from "./BillDetails";

type DataRowsProps = {
  rows: [string, DataRowType][];
  setRows: React.Dispatch<React.SetStateAction<Record<string, DataRowType>>>;
  errors: Record<string, string | undefined>;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  currency: string;
};

const formatCurrency = (amount: number | string, currency: string) => {
  const value = typeof amount === "string" ? parseFloat(amount) || 0 : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(value);
};

const DataRows = ({
  rows,
  setRows,
  errors,
  setErrors,
  currency,
}: DataRowsProps) => {
  useEffect(() => {
    // If there are no rows, add a default row
    if (rows.length === 0) {
      addRow();
    }
  }, []);

  const handleInputChange = (
    id: string,
    field: keyof DataRowType,
    value: string | number
  ) => {
    setRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    // Clear any errors for this field
    if (errors[`${field}-${id}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${field}-${id}`];
        return newErrors;
      });
    }
  };

  const addRow = () => {
    const newId = createId();
    setRows((prev) => ({
      ...prev,
      [newId]: {
        amount: "",
        description: null,
        vat: "",
        quantity: 1,
      },
    }));
  };

  const deleteRow = (id: string) => {
    setRows((prev) => {
      const newRows = { ...prev };
      delete newRows[id];
      return newRows;
    });

    // Also clear any errors for this row
    const rowErrorKeys = Object.keys(errors).filter((key) =>
      key.endsWith(`-${id}`)
    );
    if (rowErrorKeys.length > 0) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        rowErrorKeys.forEach((key) => {
          delete newErrors[key];
        });
        return newErrors;
      });
    }
  };

  const calculateSubtotal = (amount: string, quantity: number) => {
    const amountValue = parseFloat(amount) || 0;
    return amountValue * quantity;
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-24 text-right">Quantity</TableHead>
            <TableHead className="w-32 text-right">Amount</TableHead>
            <TableHead className="w-24 text-right">VAT %</TableHead>
            <TableHead className="w-32 text-right">Subtotal</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([id, row]) => {
            const { amount, description, vat, quantity, confidence } = row;
            const subtotal = calculateSubtotal(amount, quantity);

            return (
              <TableRow key={id}>
                <TableCell>
                  <Input
                    value={description || ""}
                    onChange={(e) =>
                      handleInputChange(id, "description", e.target.value)
                    }
                    placeholder="Item description"
                  />
                  {confidence && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Confidence: {confidence}%
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleInputChange(
                        id,
                        "quantity",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="text-right"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) =>
                      handleInputChange(id, "amount", e.target.value)
                    }
                    className={cn(
                      "text-right",
                      errors[`amount-${id}`] && "border-destructive"
                    )}
                    placeholder="0.00"
                  />
                  {errors[`amount-${id}`] && (
                    <p className="text-destructive text-xs mt-1">
                      {errors[`amount-${id}`]}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={vat}
                    onChange={(e) =>
                      handleInputChange(id, "vat", e.target.value)
                    }
                    className={cn(
                      "text-right",
                      errors[`vat-${id}`] && "border-destructive"
                    )}
                    placeholder="0"
                  />
                  {errors[`vat-${id}`] && (
                    <p className="text-destructive text-xs mt-1">
                      {errors[`vat-${id}`]}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(subtotal, currency)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRow(id)}
                    disabled={rows.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button
        type="button"
        variant="outline"
        className="flex items-center"
        onClick={addRow}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Row
      </Button>
    </div>
  );
};

export default DataRows;
