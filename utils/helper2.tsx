import { DataRowType } from "@/components/DataRow";
import { errMessage } from "@/lib";
import { Enums, ResponseFromTaggun } from "@/types";
import { createId } from "@paralleldrive/cuid2";
import * as Sentry from "@sentry/react";
import { Buffer } from "buffer";
import intervalToDuration from "date-fns/intervalToDuration";
import millify from "millify";
import * as PDFJS from "pdfjs-dist";
import { ToastType, toast } from "react-hot-toast";

PDFJS.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@4.6.82/build/pdf.worker.min.mjs";

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const formatCurrency = (
  value: number,
  currency = "EUR",
  noFraction = false
) => {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency,
    maximumFractionDigits:
      noFraction && value >= 1 ? 0 : value % 1 === 0 ? 0 : 2,
  }).format(value);
};

export const getCurrencyIcon = (currency: string) => {
  return formatCurrency(0, currency).slice(0, -1);
};

export const validatePhone = (phoneNumber: string) => {
  const pattern = /^$|^[0-9+\(\)\-]+$/;
  return pattern.test(phoneNumber);
};

export const formatLabel = (str?: string | null) => {
  if (!str) return "";
  return str
    .replace(/_|-/g, " ")
    .replace(/([a-z])([A-Z])|([A-Z])(?=[A-Z][a-z])/g, "$1$3 $2")
    .toLowerCase();
};

export const validateAlphaNumeric = (str: string) => {
  const pattern = /^[a-zA-Z0-9]*$/;
  return pattern.test(str);
};

export const logError = (error: any) => {
  console.log(error);
  Sentry.captureException(error);
};

export const encodeToBase64 = (str: string | Buffer | Uint8Array) => {
  return Buffer.from(str).toString("base64");
};

export const encodeObjectToBase64 = <A extends object>(obj: A) => {
  return encodeToBase64(JSON.stringify(obj));
};

export const decodeBase64ToString = (str: string) => {
  try {
    return Buffer.from(str, "base64").toString();
  } catch (error) {
    logError(error);
    return "";
  }
};

export const decodeBase64ToObject = <A extends object>(str: string): A => {
  return JSON.parse(decodeBase64ToString(str));
};

export const decodeBase64ToBuffer = (base64Data: string) => {
  return Buffer.from(base64Data, "base64");
};

export const formatId = (
  id: number | bigint,
  prefix: "INV" | "BILL" | "EXP"
) => {
  const _id = id.toString().padStart(7, "0");
  return `${prefix}-${_id}`;
};

export const copyToClipboard = (str = "", object = "") => {
  navigator.clipboard.writeText(str);
  return toast.success(object + " copied to clipboard");
};

export const saveFile = async (file: Blob, name: string) => {
  const fileURL = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileURL;
  link.setAttribute("download", name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const openFile = (file: Blob) => {
  const fileURL = URL.createObjectURL(file);
  console.log(fileURL);
  const res = window.open(fileURL, "_blank");
  console.log(res);
};

export const blobToBase64 = async (blob: Blob) => {
  const buffer = await blob.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
};

export const base64ToBlob = async (str: string) => {
  const buffer = decodeBase64ToBuffer(str);
  return new Blob([buffer], { type: "application/pdf" });
};

export const processOCRData = (data: ResponseFromTaggun) => {
  const rows: Record<string, DataRowType> = {};

  const { totalAmount, taxAmount, entities, text } = data;

  if (entities.productLineItems?.length) {
    entities.productLineItems.forEach(({ data, confidenceLevel }) => {
      const amount = data.unitPrice.data;
      const description = data.name.data || null;
      const quantity = data.quantity.data;

      const tax = data.totalPrice.data - amount;
      const vat = (tax / amount) * 100 || 0;

      rows[createId()] = {
        amount,
        description,
        quantity,
        vat: vat.toFixed(vat % 1 === 0 ? 0 : 2),
        confidence: ~~(confidenceLevel * 100),
      };
    });
  } else {
    const total = totalAmount?.data || 0;
    const tax = taxAmount?.data || 0;

    const amount = total - tax;
    const vat = (tax / amount) * 100 || 0;

    const textArray = text.text?.split("\n");
    const matchingLine = textArray?.find((t) =>
      t.replace(/[^0-9]/g, "").includes(total.toString())
    );
    const desc = matchingLine?.match(/([^0-9\s]+(?:\s+[^0-9\s]+)*)/);

    rows[createId()] = {
      amount,
      quantity: 1,
      vat: vat.toFixed(vat % 1 === 0 ? 0 : 2),
      description: desc ? desc[0] : null,
      confidence: ~~(totalAmount?.confidenceLevel * 100),
    };
  }
  return rows;
};

export const formatDataRows = (rows: [string, DataRowType][]) => {
  const errors: Record<string, string> = {};

  const formattedRows = rows.map(
    ([id, { amount, vat, description, quantity }]) => {
      if (isNaN(parseFloat(amount as string)))
        errors[id + "amount"] = errMessage;
      if (isNaN(parseFloat(vat as string))) errors[id + "vat"] = errMessage;
      if (!description) errors[id + "description"] = errMessage;
      if (!quantity) errors[id + "quantity"] = errMessage;

      const _vat = +amount * (+vat / 100);
      return {
        amount: +amount,
        vat: _vat,
        description: description || null,
        quantity: +quantity,
        subTotal: (+amount + _vat) * +quantity,
        id,
      };
    }
  );

  return { formattedRows, errors };
};

export function catchError<A extends any[], R extends any>(
  fn: (...arg: A) => Promise<R>
) {
  return async (...arg: A): Promise<R | void> => {
    return fn(...arg)
      .then((res: R) => res)
      .catch((e) => {
        logError(e);
        toast.error(e.message || "Something went wrong");
      });
  };
}

export const promiseHandler = async <A extends any[], R extends any>(
  fn: (...arg: A) => Promise<R>,
  ...args: A
) => {
  return fn(...args)
    .then((res: R) => res)
    .catch((e) => {
      logError(e);
      toast.error(e.message || "Something went wrong");
    });
};

export const handleSelectFromList =
  (data: any, list: any[], totalSelected: number) =>
  (prevSelections: Record<string, any>) => {
    let prev = { ...prevSelections };

    if (totalSelected > list.length) {
      prev = list.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
    }
    if (prev[data.id]) {
      const { [data.id]: _, ...rest } = prev;
      return rest;
    } else return { ...prev, [data.id]: data };
  };

export const isEditableInvoice = (status: Enums["InvoiceStatus"]) => {
  return !["sent", "paid", "overdue"].includes(status);
};

export const isEditableBill = (status: Enums["BillStatus"]) => {
  return !["paid", "received", "overdue"].includes(status);
};

export const isEditableExpense = (status: Enums["ExpenseStatus"]) => {
  return ["draft", "rejected"].includes(status);
};

export const generateColor = (userName: string) => {
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = "#" + (hash & 0x00ffffff).toString(16).slice(-6);

  return color;
};

export const fileToBase64 = (file: File) => {
  if (file.type === "application/pdf") return pdfToImageBase64(file);
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") reject("Failed to read file");
      else resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });
};

const typeClass: Record<ToastType, string> = {
  success: "btn-success",
  error: "btn-error",
  blank: "btn-neutral",
  custom: "btn-neutral",
  loading: "btn-info",
};

export const TOAST = (msg: string, type: ToastType = "blank") => {
  toast.custom((t) => (
    <button
      onClick={() => toast.dismiss(t.type)}
      className={`btn text-start w-full   max-w-sm flex justify-between btn- ${
        t.visible ? "animate-enter" : "animate-leave"
      } ${typeClass[type]} `}
    >
      {msg}
    </button>
  ));
};

export const setTitle = (title: string) => {
  document.title = "Dynt.ai | " + title;
};

export const getTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatFileSize = (size: number) => {
  return millify(size, {
    units: ["B", "KB", "MB", "GB", "TB"],
    space: true,
  });
};

export const swanOAuthLink = (redirectUri: string, state = "123456789") => {
  return `https://oauth.swan.io/oauth2/auth?response_type=code&client_id=SANDBOX_e4d7c77d-6c48-45e1-8ee5-03d2a3b1f75a&redirect_uri=${redirectUri}&scope=openid%20offline&state=${state}`;
};

export const openWindowPopup = (url: string, width = 500, height = 800) => {
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  const windowFeatures = `
    toolbar=no,
    location=no,
    directories=no,
    status=no,
    menubar=no,
    scrollbars=yes,
    resizable=yes,
    width=${width},
    height=${height},
    top=${top},
    left=${left}
  `;

  return window.open(url, "_blank", windowFeatures);
};

export const calculateTax = (amount: number, rate: number) => {
  return amount - amount / (1 + rate / 100);
};

export const pdfToImageBase64 = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async () => {
      const pdf = await PDFJS.getDocument(reader.result as ArrayBuffer).promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      resolve(canvas.toDataURL("image/jpeg"));
    };
    reader.onerror = (error) => reject(error);
  });
};

export const formatTime = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  return `${duration.hours}h${duration.minutes}`;
};
