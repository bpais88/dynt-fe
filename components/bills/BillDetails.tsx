"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon, Loader2, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";

// import { scanDocument } from "@/lib/api/utils"; // Replace with your actual OCR API
import { cn } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import CurrencySelect from "./CurrencySelect";
import DataRows from "./DataRows";
import { FileUploader } from "./FileUploader";

// Types
export type CreateBillRow = {
  amount: number;
  vat: number;
  description: string | null;
  subTotal: number;
  quantity: number;
  id: string;
};

export type DataRowType = {
  amount: string;
  description: string | null;
  vat: string;
  quantity: number;
  confidence?: number;
};

export type CreateBillProps = {
  rows: CreateBillRow[];
  customId?: string | null;
  dueDate: Date;
  files: { name: string; mimeType: string; size: string; link: string }[];
  currency: string;
  terms: number | null;
};

type BillDetailsProps = {
  handleCreate: (arg: CreateBillProps) => Promise<void>;
  prevRows?: Record<string, DataRowType>;
  data?: {
    dueDate: Date;
    customId: string | null;
    currency: string;
    terms: number | null;
  };
  isSubmitting?: boolean;
};

const terms = [15, 30, 45, 60, 90];

const defaultRow: DataRowType = {
  amount: "",
  description: null,
  vat: "",
  quantity: 1,
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const BillDetails = ({
  handleCreate,
  prevRows = { [Date.now().toString()]: defaultRow },
  data = {
    dueDate: addDays(new Date(), 30),
    customId: null,
    currency: "EUR",
    terms: 30 as number | null,
  },
  isSubmitting = false,
}: BillDetailsProps) => {
  const [rows, setRows] = useState<Record<string, DataRowType>>(prevRows);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState<
    Partial<Record<keyof typeof data, number>>
  >({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState(data);
  const [useCustomDate, setUseCustomDate] = useState(!data.terms);

  const rowsArray = useMemo(() => Object.entries(rows), [rows]);

  const { subTotal, totalVat } = useMemo(() => {
    return rowsArray.reduce(
      (acc, el) => {
        const [_, { amount, vat, quantity }] = el;
        const amountNum = parseFloat(amount) || 0;
        const vatNum = parseFloat(vat) || 0;
        acc.subTotal += amountNum * quantity;
        acc.totalVat += amountNum * (vatNum / 100) * quantity;
        return acc;
      },
      { totalVat: 0, subTotal: 0 }
    );
  }, [rowsArray]);

  const formatDataRows = (
    rowsArray: [string, DataRowType][]
  ): {
    errors: Record<string, string | undefined>;
    formattedRows: CreateBillRow[];
  } => {
    const errors: Record<string, string | undefined> = {};
    const formattedRows: CreateBillRow[] = [];

    rowsArray.forEach(([id, row]) => {
      const { amount, vat, description, quantity } = row;

      if (!amount) {
        errors[`amount-${id}`] = "Required";
      }

      if (!vat && vat !== "0") {
        errors[`vat-${id}`] = "Required";
      }

      if (!errors[`amount-${id}`] && !errors[`vat-${id}`]) {
        const amountNum = parseFloat(amount);
        const vatNum = parseFloat(vat);

        formattedRows.push({
          id,
          amount: amountNum,
          vat: vatNum,
          description,
          quantity,
          subTotal: amountNum * quantity,
        });
      }
    });

    return { errors, formattedRows };
  };

  const handleSubmit = async () => {
    const { customId, dueDate, currency, terms } = formData;
    const { errors: validationErrors, formattedRows } =
      formatDataRows(rowsArray);

    const newErrors = { ...validationErrors };
    if (!dueDate) newErrors.dueDate = "Required";
    if (!currency) newErrors.currency = "Required";

    if (Object.keys(newErrors).length) {
      console.log("Please fill all the required fields");
      setErrors(newErrors);
      return;
    }

    try {
      // Mock file upload - replace with your actual upload logic
      const uploadPromises = files.map(async (file) => {
        // Replace with your actual file upload implementation
        const uploadedFile = await uploadFileMock(file);
        return {
          link: uploadedFile.url,
          name: file.name,
          mimeType: file.type,
          size: formatFileSize(file.size),
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      await handleCreate({
        rows: formattedRows,
        customId: customId || null,
        dueDate,
        files: uploadedFiles,
        currency,
        terms,
      });
    } catch (error) {
      console.error("Error during submission:", error);
      //   toast.error("Something went wrong, please try again");
    }
  };

  // Mock function for file upload - replace with your actual implementation
  const uploadFileMock = async (file: File) => {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    };
  };

  const handleMagicUpload = async (file?: File) => {
    if (!file) return;

    try {
      setIsOcrLoading(true);
      setFiles((prev) => [...prev, file]);

      const base64 = await fileToBase64(file);
      // Replace with your actual OCR scanning API
      const data = await scanDocument(base64);

      const { totalAmount, currency, customId, date, items, confidence } = data;

      setFormData((prev) => ({
        ...prev,
        currency: currency || prev.currency,
        customId: customId || prev.customId,
        dueDate: date ? new Date(date) : prev.dueDate,
      }));

      if (confidence) {
        setConfidenceLevel(confidence);
      }

      // Map OCR items to rows
      if (items && items.length > 0) {
        setRows(
          Object.fromEntries(
            items.map((el) => [
              createId(),
              {
                amount: el.unitPrice?.toString() || "",
                description: el.description || null,
                quantity: el.quantity || 1,
                vat: el.vat?.toString() || "",
                confidence: el.confidence,
              },
            ])
          )
        );
      }

      console.log("We have automatically filled the details for you!");
    } catch (error) {
      console.error("OCR Error:", error);
      console.log("Failed to process the document automatically");
    } finally {
      setIsOcrLoading(false);
    }
  };

  const handleTermsChange = (selectedTerms: number | null) => {
    if (selectedTerms === null) {
      setUseCustomDate(true);
    } else {
      setUseCustomDate(false);
      const newDueDate = addDays(new Date(), selectedTerms);
      setFormData((prev) => ({
        ...prev,
        terms: selectedTerms,
        dueDate: newDueDate,
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Section - Magic Upload & Currency Selection */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Choose Bill details or</span>
          <div className="relative">
            <Button
              variant="outline"
              className="relative"
              disabled={isOcrLoading}
            >
              <label className="absolute inset-0 cursor-pointer">
                <input
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleMagicUpload(e.target.files?.[0])}
                  accept="image/*,application/pdf"
                />
              </label>
              {isOcrLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <WandSparkles className="h-4 w-4 mr-2" />
              )}
              Magic Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="currency">Currency:</Label>
          <CurrencySelect
            value={formData.currency}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, currency: value }))
            }
          />
        </div>
      </div>

      {/* Data Rows */}
      <div className="border rounded-md">
        <DataRows
          rows={rowsArray}
          setRows={setRows}
          errors={errors}
          setErrors={setErrors}
          currency={formData.currency}
        />
      </div>

      {/* Due Date & Custom ID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>

          {!useCustomDate ? (
            <div className="flex flex-col space-y-2">
              <select
                id="terms"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.terms || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  handleTermsChange(value ? parseInt(value) : null);
                }}
              >
                {terms.map((term) => (
                  <option key={term} value={term}>
                    Net {term} days
                  </option>
                ))}
              </select>

              <div className="text-sm text-muted-foreground">
                Due date: {format(formData.dueDate, "PPP")}
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground",
                    errors.dueDate && "border-destructive"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? (
                    format(formData.dueDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) =>
                    date && setFormData((prev) => ({ ...prev, dueDate: date }))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="customDate"
              checked={useCustomDate}
              onCheckedChange={(checked) => {
                handleTermsChange(checked ? null : 30);
              }}
            />
            <label
              htmlFor="customDate"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Use custom date
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customId">Custom Identifier</Label>
          <div className="relative">
            {confidenceLevel.customId && (
              <div className="absolute -top-6 right-0 text-xs bg-accent text-accent-foreground rounded-full px-2 py-1">
                Confidence: {confidenceLevel.customId}%
              </div>
            )}
            <Input
              id="customId"
              placeholder="e.g. 1234/2021"
              value={formData.customId || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, customId: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label>Upload Bill</Label>
        <FileUploader files={files} setFiles={setFiles} />
      </div>

      {/* Summary & Submit */}
      <div className="flex flex-col space-y-6">
        <div className="ml-auto grid grid-cols-2 gap-4 text-sm">
          <div className="text-right">
            <p>Subtotal:</p>
            <p>VAT:</p>
            <p className="font-medium">Total (Inc. VAT):</p>
          </div>
          <div>
            <p>{formatCurrency(subTotal, formData.currency)}</p>
            <p>{formatCurrency(totalVat, formData.currency)}</p>
            <p className="font-medium">
              {formatCurrency(subTotal + totalVat, formData.currency)}
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="ml-auto w-full sm:w-52"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BillDetails;
