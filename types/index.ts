import { RouterOutputs } from "@/utils/trpc";
import { Database } from "./schema";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Enums = Database["public"]["Enums"];

interface Base {
  id: string;
  name: string;
}

export type BaseType<T extends {} = Base> = Base & T;

export type Customer = RouterOutputs["partners"]["customersByOrgId"][number];

export type Vendor = RouterOutputs["partners"]["vendorsByOrgId"][number];

export type Category = RouterOutputs["invoices"]["invoiceById"]["category"];

export type Subcategory =
  RouterOutputs["invoices"]["invoiceById"]["subCategory"];

interface Continent {
  code: string;
  geoname_id: number;
  names: Record<string, string>;
}

interface Country {
  geoname_id: number;
  iso_code: string;
  names: Record<string, string>;
}

interface Location {
  accuracy_radius: number;
  latitude: number;
  longitude: number;
}

interface TotalAmount {
  confidenceLevel: number;
  index: number;
  data: number;
  text: string;
  currencyCode: string;
}

interface TaxAmount {
  data: number;
  confidenceLevel: number;
  text: string;
  index: number;
  keyword: string;
  currencyCode: string;
}

interface DateInfo {
  data: string;
  confidenceLevel: number;
  text: string;
  index: number;
}

interface Amount {
  data: number;
  index: number;
  text: string;
  currencyCode: string;
}

interface NumberInfo {
  data: number;
  text: string;
  index: number;
  classifyResult?: string;
}

interface EntityInfo {
  data: string;
  confidenceLevel: number;
  text: string;
}

interface MultiTaxLineItem {
  data: {
    taxAmount: TaxAmount;
  };
  confidenceLevel: number;
  index: number;
}

interface MerchantInfo {
  data: string;
  confidenceLevel: number;
  text: string;
  index: number;
}

interface MerchantTypes {
  confidenceLevel: number;
}

interface MerchantPostalCode {
  confidenceLevel: number;
}

type ProductLineItemInfo<T extends string | number> = {
  data: T;
  regions: string[];
  text: string;
};

interface ProductLineItem {
  data: {
    name: ProductLineItemInfo<string>;
    quantity: ProductLineItemInfo<number>;
    unitPrice: ProductLineItemInfo<number>;
    totalPrice: ProductLineItemInfo<number>;
  };
  confidenceLevel: number;
  text: string;
  index: number;
  regions: string[];
}

export type ResponseFromTaggun = {
  location: {
    continent: Continent;
    country: Country;
    location: Location;
  };
  totalAmount: TotalAmount;
  taxAmount: TaxAmount;
  confidenceLevel: number;
  date: DateInfo;
  text: {
    text: string;
  };
  amounts: Amount[];
  numbers: NumberInfo[];
  lineAmounts: any[];
  itemsCount: {
    data: number;
    confidenceLevel: number;
  };
  entities: {
    invoiceNumber: EntityInfo;
    receiptNumber: EntityInfo;
    multiTaxLineItems: MultiTaxLineItem[];
    productLineItems?: ProductLineItem[];
  };
  merchantName: MerchantInfo;
  merchantAddress: MerchantInfo;
  merchantCity: MerchantInfo;
  merchantState: MerchantInfo;
  merchantCountryCode: MerchantInfo;
  merchantTypes: MerchantTypes;
  merchantPostalCode: MerchantPostalCode;
  elapsed: number;
};

export type Period = {
  startDate: Date;
  endDate: Date;
};

// test
