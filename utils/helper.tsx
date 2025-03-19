import intervalToDuration from "date-fns/intervalToDuration";

export const logError = (error: any) => {
  console.log(error);
  // Sentry.captureException(error);
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

export const formatTime = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  return `${duration.hours}h${duration.minutes}`;
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

export const formatLabel = (str?: string | null) => {
  if (!str) return "";
  return str
    .replace(/_|-/g, " ")
    .replace(/([a-z])([A-Z])|([A-Z])(?=[A-Z][a-z])/g, "$1$3 $2")
    .toLowerCase();
};

export const validatePhone = (phoneNumber: string) => {
  const pattern = /^$|^[0-9+\(\)\-]+$/;
  return pattern.test(phoneNumber);
};

export const validateAlphaNumeric = (str: string) => {
  const pattern = /^[a-zA-Z0-9]*$/;
  return pattern.test(str);
};
