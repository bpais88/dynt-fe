export const currencies = ["EUR", "GBP"] as const;
export const selectCurrency = currencies.map((c) => ({ label: c, value: c }));

export const errMessage = "This field is required";

export const billStatuses = [
  "draft",
  "received",
  "overdue",
  "scheduled",
  "paid",
  "cancelled",
] as const;

export type BillStatusType = (typeof billStatuses)[number];

export const invoiceStatuses = [
  "draft",
  "scheduled",
  "sent",
  "overdue",
  "paid",
  "cancelled",
] as const;

export type InvoiceStatusType = (typeof invoiceStatuses)[number];

export const approvalStatuses = ["pending", "approved", "rejected"] as const;

export const expenseStatuses = [
  "draft",
  "sent",
  "pending",
  "processing",
  "reimbursed",
  "cancelled",
  "rejected",
] as const;

export type ExpenseStatusType = (typeof expenseStatuses)[number];

export const accountingStatuses = [
  "needs_review",
  "ready_to_export",
  "synced",
  "not_needed",
] as const;

export type AccountingStatusType = (typeof accountingStatuses)[number];

export const contractTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACTOR",
  "CONSULTANT",
  "FREELANCE",
  "INTERNSHIP",
  "APPRENTICESHIP",
] as const;

export const contractColors = {
  full_time: "bg-full_time",
  part_time: "bg-part_time",
  contractor: "bg-contractor",
  consultant: "bg-consultant",
  freelance: "bg-freelance",
  internship: "bg-internship",
  apprenticeship: "bg-apprenticeship",
} as const;

export const allCurrencies = [
  { code: "AED", name: "United Arab Emirates dirham", symbol: "" },
  { code: "AFN", name: "Afghan afghani", symbol: "" },
  { code: "ALL", name: "Albanian lek", symbol: "" },
  { code: "AMD", name: "Armenian dram", symbol: "" },
  { code: "ANG", name: "Netherlands Antillean guilder", symbol: "" },
  { code: "AOA", name: "Angolan kwanza", symbol: "" },
  { code: "ARS", name: "Argentine peso", symbol: "" },
  { code: "AUD", name: "Australian dollar", symbol: "" },
  { code: "AWG", name: "Aruban florin", symbol: "" },
  { code: "AZN", name: "Azerbaijani manat", symbol: "" },
  { code: "BAM", name: "Bosnia and Herzegovina convertible mark", symbol: "" },
  { code: "BBD", name: "Barbados dollar", symbol: "" },
  { code: "BDT", name: "Bangladeshi taka", symbol: "" },
  { code: "BGN", name: "Bulgarian lev", symbol: "" },
  { code: "BHD", name: "Bahraini dinar", symbol: "" },
  { code: "BIF", name: "Burundian franc", symbol: "" },
  { code: "BMD", name: "Bermudian dollar", symbol: "" },
  { code: "BND", name: "Brunei dollar", symbol: "" },
  { code: "BOB", name: "Boliviano", symbol: "" },
  { code: "BRL", name: "Brazilian real", symbol: "" },
  { code: "BSD", name: "Bahamian dollar", symbol: "" },
  { code: "BTN", name: "Bhutanese ngultrum", symbol: "" },
  { code: "BWP", name: "Botswana pula", symbol: "" },
  { code: "BYN", name: "New Belarusian ruble", symbol: "" },
  { code: "BYR", name: "Belarusian ruble", symbol: "" },
  { code: "BZD", name: "Belize dollar", symbol: "" },
  { code: "CAD", name: "Canadian dollar", symbol: "" },
  { code: "CDF", name: "Congolese franc", symbol: "" },
  { code: "CHF", name: "Swiss franc", symbol: "" },
  { code: "CLF", name: "Unidad de Fomento", symbol: "" },
  { code: "CLP", name: "Chilean peso", symbol: "" },
  { code: "CNY", name: "Renminbi|Chinese yuan", symbol: "" },
  { code: "COP", name: "Colombian peso", symbol: "" },
  { code: "CRC", name: "Costa Rican colon", symbol: "₡" },
  { code: "CUC", name: "Cuban convertible peso", symbol: "" },
  { code: "CUP", name: "Cuban peso", symbol: "" },
  { code: "CVE", name: "Cape Verde escudo", symbol: "" },
  { code: "CZK", name: "Czech koruna", symbol: "" },
  { code: "DJF", name: "Djiboutian franc", symbol: "" },
  { code: "DKK", name: "Danish krone", symbol: "" },
  { code: "DOP", name: "Dominican peso", symbol: "" },
  { code: "DZD", name: "Algerian dinar", symbol: "" },
  { code: "EGP", name: "Egyptian pound", symbol: "" },
  { code: "ERN", name: "Eritrean nakfa", symbol: "" },
  { code: "ETB", name: "Ethiopian birr", symbol: "" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "FJD", name: "Fiji dollar", symbol: "" },
  { code: "FKP", name: "Falkland Islands pound", symbol: "" },
  { code: "GBP", name: "Pound sterling", symbol: "£" },
  { code: "GEL", name: "Georgian lari", symbol: "" },
  { code: "GHS", name: "Ghanaian cedi", symbol: "" },
  { code: "GIP", name: "Gibraltar pound", symbol: "" },
  { code: "GMD", name: "Gambian dalasi", symbol: "" },
  { code: "GNF", name: "Guinean franc", symbol: "" },
  { code: "GTQ", name: "Guatemalan quetzal", symbol: "" },
  { code: "GYD", name: "Guyanese dollar", symbol: "" },
  { code: "HKD", name: "Hong Kong dollar", symbol: "" },
  { code: "HNL", name: "Honduran lempira", symbol: "" },
  { code: "HRK", name: "Croatian kuna", symbol: "" },
  { code: "HTG", name: "Haitian gourde", symbol: "" },
  { code: "HUF", name: "Hungarian forint", symbol: "" },
  { code: "IDR", name: "Indonesian rupiah", symbol: "" },
  { code: "ILS", name: "Israeli new shekel", symbol: "₪" },
  { code: "INR", name: "Indian rupee", symbol: "₹" },
  { code: "IQD", name: "Iraqi dinar", symbol: "" },
  { code: "IRR", name: "Iranian rial", symbol: "" },
  { code: "ISK", name: "Icelandic króna", symbol: "" },
  { code: "JMD", name: "Jamaican dollar", symbol: "" },
  { code: "JOD", name: "Jordanian dinar", symbol: "" },
  { code: "JPY", name: "Japanese yen", symbol: "¥" },
  { code: "KES", name: "Kenyan shilling", symbol: "" },
  { code: "KGS", name: "Kyrgyzstani som", symbol: "" },
  { code: "KHR", name: "Cambodian riel", symbol: "" },
  { code: "KMF", name: "Comoro franc", symbol: "" },
  { code: "KPW", name: "North Korean won", symbol: "" },
  { code: "KRW", name: "South Korean won", symbol: "₩" },
  { code: "KWD", name: "Kuwaiti dinar", symbol: "" },
  { code: "KYD", name: "Cayman Islands dollar", symbol: "" },
  { code: "KZT", name: "Kazakhstani tenge", symbol: "" },
  { code: "LAK", name: "Lao kip", symbol: "" },
  { code: "LBP", name: "Lebanese pound", symbol: "" },
  { code: "LKR", name: "Sri Lankan rupee", symbol: "" },
  { code: "LRD", name: "Liberian dollar", symbol: "" },
  { code: "LSL", name: "Lesotho loti", symbol: "" },
  { code: "LYD", name: "Libyan dinar", symbol: "" },
  { code: "MAD", name: "Moroccan dirham", symbol: "" },
  { code: "MDL", name: "Moldovan leu", symbol: "" },
  { code: "MGA", name: "Malagasy ariary", symbol: "" },
  { code: "MKD", name: "Macedonian denar", symbol: "" },
  { code: "MMK", name: "Myanmar kyat", symbol: "" },
  { code: "MNT", name: "Mongolian tögrög", symbol: "" },
  { code: "MOP", name: "Macanese pataca", symbol: "" },
  { code: "MRO", name: "Mauritanian ouguiya", symbol: "" },
  { code: "MUR", name: "Mauritian rupee", symbol: "" },
  { code: "MVR", name: "Maldivian rufiyaa", symbol: "" },
  { code: "MWK", name: "Malawian kwacha", symbol: "" },
  { code: "MXN", name: "Mexican peso", symbol: "" },
  { code: "MXV", name: "Mexican Unidad de Inversion", symbol: "" },
  { code: "MYR", name: "Malaysian ringgit", symbol: "" },
  { code: "MZN", name: "Mozambican metical", symbol: "" },
  { code: "NAD", name: "Namibian dollar", symbol: "" },
  { code: "NGN", name: "Nigerian naira", symbol: "₦" },
  { code: "NIO", name: "Nicaraguan córdoba", symbol: "" },
  { code: "NOK", name: "Norwegian krone", symbol: "" },
  { code: "NPR", name: "Nepalese rupee", symbol: "" },
  { code: "NZD", name: "New Zealand dollar", symbol: "" },
  { code: "OMR", name: "Omani rial", symbol: "" },
  { code: "PAB", name: "Panamanian balboa", symbol: "" },
  { code: "PEN", name: "Peruvian Sol", symbol: "" },
  { code: "PGK", name: "Papua New Guinean kina", symbol: "" },
  { code: "PHP", name: "Philippine peso", symbol: "₱" },
  { code: "PKR", name: "Pakistani rupee", symbol: "" },
  { code: "PLN", name: "Polish złoty", symbol: "zł" },
  { code: "PYG", name: "Paraguayan guaraní", symbol: "₲" },
  { code: "QAR", name: "Qatari riyal", symbol: "" },
  { code: "RON", name: "Romanian leu", symbol: "" },
  { code: "RSD", name: "Serbian dinar", symbol: "" },
  { code: "RUB", name: "Russian ruble", symbol: "" },
  { code: "RWF", name: "Rwandan franc", symbol: "" },
  { code: "SAR", name: "Saudi riyal", symbol: "" },
  { code: "SBD", name: "Solomon Islands dollar", symbol: "" },
  { code: "SCR", name: "Seychelles rupee", symbol: "" },
  { code: "SDG", name: "Sudanese pound", symbol: "" },
  { code: "SEK", name: "Swedish krona", symbol: "" },
  { code: "SGD", name: "Singapore dollar", symbol: "" },
  { code: "SHP", name: "Saint Helena pound", symbol: "" },
  { code: "SLL", name: "Sierra Leonean leone", symbol: "" },
  { code: "SOS", name: "Somali shilling", symbol: "" },
  { code: "SRD", name: "Surinamese dollar", symbol: "" },
  { code: "SSP", name: "South Sudanese pound", symbol: "" },
  { code: "STD", name: "São Tomé and Príncipe dobra", symbol: "" },
  { code: "SVC", name: "Salvadoran colón", symbol: "" },
  { code: "SYP", name: "Syrian pound", symbol: "" },
  { code: "SZL", name: "Swazi lilangeni", symbol: "" },
  { code: "THB", name: "Thai baht", symbol: "฿" },
  { code: "TJS", name: "Tajikistani somoni", symbol: "" },
  { code: "TMT", name: "Turkmenistani manat", symbol: "" },
  { code: "TND", name: "Tunisian dinar", symbol: "" },
  { code: "TOP", name: "Tongan paʻanga", symbol: "" },
  { code: "TRY", name: "Turkish lira", symbol: "" },
  { code: "TTD", name: "Trinidad and Tobago dollar", symbol: "" },
  { code: "TWD", name: "New Taiwan dollar", symbol: "" },
  { code: "TZS", name: "Tanzanian shilling", symbol: "" },
  { code: "UAH", name: "Ukrainian hryvnia", symbol: "₴" },
  { code: "UGX", name: "Ugandan shilling", symbol: "" },
  { code: "USD", name: "United States dollar", symbol: "$" },
  { code: "UYI", name: "Uruguay Peso en Unidades Indexadas", symbol: "" },
  { code: "UYU", name: "Uruguayan peso", symbol: "" },
  { code: "UZS", name: "Uzbekistan som", symbol: "" },
  { code: "VEF", name: "Venezuelan bolívar", symbol: "" },
  { code: "VND", name: "Vietnamese đồng", symbol: "₫" },
  { code: "VUV", name: "Vanuatu vatu", symbol: "" },
  { code: "WST", name: "Samoan tala", symbol: "" },
  { code: "XAF", name: "Central African CFA franc", symbol: "" },
  { code: "XCD", name: "East Caribbean dollar", symbol: "" },
  { code: "XOF", name: "West African CFA franc", symbol: "" },
  { code: "XPF", name: "CFP franc", symbol: "" },
  { code: "XXX", name: "No currency", symbol: "" },
  { code: "YER", name: "Yemeni rial", symbol: "" },
  { code: "ZAR", name: "South African rand", symbol: "" },
  { code: "ZMW", name: "Zambian kwacha", symbol: "" },
  { code: "ZWL", name: "Zimbabwean dollar", symbol: "" },
];

export const intervals = [
  "all_time",
  "daily",
  "monthly",
  "per_authorization",
  "weekly",
  "yearly",
] as const;

export const ProofStatuses = ["missing", "complete", "not_needed"] as const;

export type ProofStatusType = (typeof ProofStatuses)[number];

export const documentTypes = [
  "invoice",
  "bill",
  "expense",
  "transaction",
  "receipt",
  "contract",
  "agreement",
  "other",
];

export const IntegrationApps = [
  "Nmbrs",
  "KiwiHR",
  "BambooHR",
  "NetSuite",
  "XERO",
  "QuickBooks",
] as const;

export type IntegrationAppType = (typeof IntegrationApps)[number];

export type AvailableIntegrationType = {
  name: IntegrationAppType;
  description: string;
  logoUrl: string;
  isActive?: boolean;
};

export const availableIntegrations: {
  category: string;
  items: AvailableIntegrationType[];
}[] = [
  {
    category: "HR",
    items: [
      {
        name: "KiwiHR",
        description:
          "KiwiHR provides human resources software to simplify HR processes.",
        logoUrl:
          "https://culture-rh.com/wp-content/uploads/2023/02/kiwi-hr-tellent-avix-test-prix.jpg",
        isActive: true,
      },
      {
        name: "BambooHR",
        description:
          "BambooHR is a comprehensive HR software solution for small to medium-sized businesses.",
        logoUrl:
          "https://service.cougarmtn.com/wp-content/uploads/2019/05/BambooHR-420-246-01.jpg",
      },
    ],
  },
  {
    category: "Accounting",
    items: [
      {
        name: "Nmbrs",
        description:
          "Nmbrs offers HR and payroll software for the Dutch market.",
        logoUrl:
          "data:image/png;base64,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",
      },

      {
        name: "NetSuite",
        description:
          "NetSuite offers cloud-based business management software for enterprises.",
        logoUrl: "https://photos.prnewswire.com/prnfull/20090924/SF81218LOGO-b",
      },
      {
        name: "XERO",
        description:
          "Xero provides accounting software for small businesses and accountants.",
        logoUrl: "https://www.vectorlogo.zone/logos/xero/xero-ar21.png",
      },
      {
        name: "QuickBooks",
        description:
          "QuickBooks offers accounting software tailored to small and medium-sized businesses.",
        logoUrl:
          "https://logowik.com/content/uploads/images/intuit-quickbooks1505.jpg",
      },
    ],
  },
];

export type TransactionBillStatusType = (typeof ProofStatuses)[number];

export const months = [
  { name: "Jan", value: 0, fullName: "January" },
  { name: "Feb", value: 1, fullName: "February" },
  { name: "Mar", value: 2, fullName: "March" },
  { name: "Apr", value: 3, fullName: "April" },
  { name: "May", value: 4, fullName: "May" },
  { name: "Jun", value: 5, fullName: "June" },
  { name: "Jul", value: 6, fullName: "July" },
  { name: "Aug", value: 7, fullName: "August" },
  { name: "Sep", value: 8, fullName: "September" },
  { name: "Oct", value: 9, fullName: "October" },
  { name: "Nov", value: 10, fullName: "November" },
  { name: "Dec", value: 11, fullName: "December" },
];

export const pastThreeYears = Array.from(
  { length: 3 },
  (_, i) => new Date().getFullYear() - i
);

export const syncErrorMessages =
  "Some transactions might not be shown, click “Sync” again or contact us.";

export const reAuthErrorMessages =
  "You need to re authorize your account to see your transactions or make payments.";

export const colorPalette = [
  "#FF0000",
  "#FF4500",
  "#FF6347",
  "#FF7F50",
  "#DC143C",
  "#B22222",
  "#8B0000",
  "#FFA500",
  "#FF7F00",
  "#FFB90F",
  "#FFFF00",
  "#FFD700",
  "#FFBF00",
  "#FF8C00",
  "#008000",
  "#00FF00",
  "#32CD32",
  "#3CB371",
  "#2E8B57",
  "#228B22",
  "#006400",
  "#0000FF",
  "#00BFFF",
  "#1E90FF",
  "#87CEEB",
  "#4682B4",
  "#4169E1",
  "#000080",
  "#800080",
  "#8A2BE2",
  "#9400D3",
  "#9932CC",
  "#BA55D3",
  "#DA70D6",
  "#9370DB",
  "#FFC0CB",
  "#FFB6C1",
  "#FF69B4",
  "#FF1493",
  "#C71585",
  "#DB7093",
  "#8B4513",
  "#A52A2A",
  "#D2691E",
  "#CD853F",
  "#F4A460",
  "#D2B48C",
  "#B0C4DE",
  "#D3D3D3",
  "#A9A9A9",
  "#696969",
  "#708090",
  "#FFFFFF",
  "#000000",
];
