import { intervals } from "@/lib";
import { merchantCategories } from "@/lib/MerchantCategories";

import * as z from "zod";

export const ExpenseStatus = z.enum([
  "pending",
  "processing",
  "reimbursed",
  "cancelled",
  "rejected",
  "sent",
  "draft",
]);

export type ExpenseStatusType = z.infer<typeof ExpenseStatus>;

export const ExpenseFilters = z.object({
  total: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .nullable()
    .optional(),
  unCategorized: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  statuses: z.array(ExpenseStatus).optional(),
  team_members: z.string().optional(),
  eventId: z.string().optional(),
  assignedTo: z.string().optional(),
});

export type ExpenseFiltersType = z.infer<typeof ExpenseFilters>;

export const InvoiceStatus = z.enum([
  "draft",
  "sent",
  "paid",
  "cancelled",
  "overdue",
  "scheduled",
]);

export type InvoiceStatusType = z.infer<typeof InvoiceStatus>;

export const InvoiceFilters = z.object({
  total: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .nullable()
    .optional(),
  unCategorized: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  customers: z.string().optional(),
  statuses: z.array(InvoiceStatus).optional(),
  assignedTo: z.string().optional(),
});

export type InvoiceFiltersType = z.infer<typeof InvoiceFilters>;

export const BillStatus = z.enum([
  "draft",
  "paid",
  "cancelled",
  "overdue",
  "scheduled",
  "received",
]);

export type BillStatusType = z.infer<typeof BillStatus>;

export const BillFilters = z.object({
  total: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .nullable()
    .optional(),
  unCategorized: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  vendors: z.string().optional(),
  statuses: z.array(BillStatus).optional(),
  assignedTo: z.string().optional(),
});

export type BillFiltersType = z.infer<typeof BillFilters>;

export const TransactionFilters = z.object({
  amount: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .nullable()
    .optional(),
  missingAttachments: z.boolean().optional(),
  unCategorized: z.boolean().optional(),
  categories: z.array(z.string()).optional(),
  subCategories: z.array(z.string()).optional(),
  currencies: z.array(z.string()).optional(),
  accounts: z.array(z.string()).optional(),
  banks: z.array(z.string()).optional(),
  merchants: z.string().optional(),
  merchantsId: z.array(z.string()).optional(),
  showHidden: z.boolean().optional(),
  onlyRecurring: z.boolean().optional(),
});

export type TransactionFiltersType = z.infer<typeof TransactionFilters>;

export const CreateCard = z.object({
  team_member_id: z.string(),
  type: z.enum(["virtual", "physical"]),
  currency: z.string(),
});

export type CreateCardType = z.infer<typeof CreateCard>;

export const UpdateUser = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  name: z.string().min(3),
  phone: z.string().min(1),
  email: z.string().email().min(1),
  dateOfBirth: z.string().length(10),

  photo: z.string().optional().nullable(),
  IBAN: z.string().optional().nullable(),
  accountName: z.string().optional().nullable(),
  bankAddress: z.string().optional().nullable(),

  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postCode: z.string().optional().nullable(),
  SSN: z.string().optional().nullable(),
  countryId: z.number().optional().nullable(),
});

export type UpdateUser = z.infer<typeof UpdateUser>;
export const BusinessType = z.enum([
  "company",
  "government_entity",
  "individual",
  "non_profit",
]);

export const CreateStripePerson = z.object({
  team_member_id: z.string(),
  percent_ownership: z.number().min(0).max(100),
  title: z.string().min(1),
});

export type CreateStripePersonType = z.infer<typeof CreateStripePerson>;

export const UpdateStripePerson = z.object({
  percent_ownership: z.number().min(0).max(100),
  title: z.string().min(1),
});

export type UpdateStripePersonType = z.infer<typeof UpdateStripePerson>;

export const CreateExternalAccount = z.object({
  IBAN: z.string().min(1),
  country: z.string().length(2),
  currency: z.string().length(3),
});

export type CreateExternalAccountType = z.infer<typeof CreateExternalAccount>;

export const Categories = z.enum(merchantCategories);
export type CategoriesType = z.infer<typeof Categories>;

export const Intervals = z.enum(intervals);

export type IntervalsType = z.infer<typeof Intervals>;

export const SpendingLimit = z.object({
  amount: z.number(),
  categories: z.array(Categories).nullable().default(null),
  interval: Intervals,
});

export type SpendingLimitType = z.infer<typeof SpendingLimit>;

export const EditSpendingControls = z.object({
  allowed_categories: z.array(Categories).nullable(),
  blocked_categories: z.array(Categories).nullable(),
  spending_limits: z.array(SpendingLimit).nullable(),
});

export type EditSpendingControlsType = z.infer<typeof EditSpendingControls>;

export const ValidSignUp = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type ValidSignUpType = z.infer<typeof ValidSignUp>;

export const CreateProfile = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  name: z.string().min(3),
  phone: z.string().min(1),
  email: z.string().email(),
});

export type CreateProfile = z.infer<typeof CreateProfile>;

export const CreateOrganization = z.object({
  name: z.string().min(1),
  defaultCurrency: z.string().length(3),
  business_tax_number: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),

  countryId: z.number().min(1),
});

export type CreateOrganization = z.infer<typeof CreateOrganization>;

export const UpdateOrganization = z.object({
  ...CreateOrganization.shape,
  id: z.string(),

  requiredApprovalToTransferPayment: z.boolean().optional(),
  business_number: z.string().min(1).optional().nullable(),
  city: z.string().min(1).optional().nullable(),
  state: z.string().min(1).optional().nullable(),
  mcc: z.string().min(1).optional().nullable(),
  type: BusinessType.optional().nullable(),
  policyURL: z.string().url().optional().nullable(),

  address: z.string().min(1).optional().nullable(),
  postCode: z.string().min(1).optional().nullable(),
  website: z.string().min(1).optional().nullable(),

  employeeCount: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
});

export type UpdateOrganization = z.infer<typeof UpdateOrganization>;

export const InviteTeamMember = z.object({
  email: z.string().email().trim(),
  role: z.enum(["viewer", "employee", "admin"]),
});

export type InviteTeamMember = z.infer<typeof InviteTeamMember>;

export const UpsertPartner = z.object({
  id: z.string().optional().nullable(),

  name: z.string(),
  email: z.string(),
  phone: z.string(),

  photo: z.string().optional().nullable(),

  business_number: z.string().optional().nullable(),
  business_tax_number: z.string().optional().nullable(),

  address: z.string(),
  postCode: z.string(),
  city: z.string(),
  countryId: z.number(),
});

export type UpsertPartnerType = z.infer<typeof UpsertPartner>;

export const ContractType = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "CONTRACTOR",
  "CONSULTANT",
  "FREELANCE",
  "INTERNSHIP",
  "APPRENTICESHIP",
]);

export const UpsertStaff = z.object({
  id: z.string().optional().nullable(),

  name: z.string(),
  email: z.string().email(),
  phone: z.string(),

  gross_monthly_salary: z.number(),
  contractType: ContractType,
  currency: z.string(),

  roleId: z.string(),
  departmentId: z.string(),

  organizationId: z.string(),
});

export type UpsertStaffType = z.infer<typeof UpsertStaff>;

export const DatePeriod = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

export type DatePeriodType = z.infer<typeof DatePeriod>;

export const AuthorizeYapilyConnect = z.object({
  institution_name: z.string(),
  name: z.string(),
  institution_id: z.string(),
  institution_logo: z.string(),
  organizationId: z.string(),
  countryId: z.number(),
});

export type AuthorizeYapilyConnectType = z.infer<typeof AuthorizeYapilyConnect>;

export const UpdateConnectedAccount = z.object({
  id: z.string(),
  name: z.string().min(1),
  bankAddress: z.string().nullable(),
  isActive: z.boolean(),
});

export type UpdateConnectedAccountType = z.infer<typeof UpdateConnectedAccount>;

export const UpsertManualAccount = z.object({
  id: z.string().optional(),

  name: z.string(),
  bankAddress: z.string().min(1),
  currency: z.string().length(3),
  countryId: z.number().min(1),

  type: z
    .string()
    .optional()
    .nullable()
    .transform((a) => a || null),
  IBAN: z
    .string()
    .optional()
    .nullable()
    .transform((a) => a || null),
  SWIFT: z
    .string()
    .optional()
    .nullable()
    .transform((a) => a || null),
  ACCOUNT_NUMBER: z
    .string()
    .optional()
    .nullable()
    .transform((a) => a || null),
  SORT_CODE: z
    .string()
    .optional()
    .nullable()
    .transform((a) => a || null),
  ROUTING_NUMBER: z
    .string()

    .optional()
    .nullable()
    .transform((a) => a || null),
});

export type UpsertManualAccountType = z.infer<typeof UpsertManualAccount>;

export const RuleCondition = z.record(
  z.string(),
  z.object({
    fact: z.string().min(1),
    operator: z.string().min(1),
    value: z.union([
      z.string().min(1),
      z.number().min(1),
      z.array(z.string()).min(1),
    ]),
  })
);

export type RuleConditionType = z.infer<typeof RuleCondition>;

export const RuleAction = z.record(
  z.string().min(1),
  z.union([z.string().min(1), z.array(z.string()).min(1)])
);

export type RuleActionType = z.infer<typeof RuleAction>;

export const DocumentType = z.enum([
  "invoice",
  "bill",
  "expense",
  "transaction",
  "receipt",
  "contract",
  "agreement",
  "other",
]);

export type DocumentTypesType = z.infer<typeof DocumentType>;

export const CreateDocument = z.object({
  name: z.string().min(1),
  link: z.string().min(1),
  type: DocumentType.nullish(),
  mimeType: z.string().min(3),
  size: z.string().min(1),
  description: z.string().optional().nullable(),
});

export type CreateDocumentType = z.infer<typeof CreateDocument>;

export const EditFile_v = z.object({
  name: z.string().min(1),
  description: z.string().nullish(),
  type: DocumentType.nullish(),
});

export type EditFileType = z.infer<typeof EditFile_v>;

export const IntegrationApp = z.enum([
  "Nmbrs",
  "KiwiHR",
  "BambooHR",
  "NetSuite",
  "XERO",
  "QuickBooks",
]);

export type IntegrationAppType = z.infer<typeof IntegrationApp>;

export const CreateIntegration = z.object({
  appName: IntegrationApp,
  apiKey: z.string().min(1).trim(),
  subdomain: z.string().min(1).trim(),
});

export type CreateIntegrationType = z.infer<typeof CreateIntegration>;

export const CreatePayRun = z.object({
  employeeId: z.number(),
  employeeName: z.string(),
  description: z.string().optional().nullable(),
  currency: z.string(),
  amount: z.number(),
});

export type CreatePayRunType = z.infer<typeof CreatePayRun>;

export const UpdateIntegration = z.object({
  apiKey: z.string().min(1),
  subdomain: z.string().min(1),
});

export type UpdateIntegration = z.infer<typeof UpdateIntegration>;

export const SwanLimitPeriod = z.enum(["Monthly", "Weekly", "Daily", "Always"]);

export const AddCard = z.object({
  name: z.string().min(1),
  withdrawal: z.boolean(),
  international: z.boolean(),
  nonMainCurrencyTransactions: z.boolean(),
  eCommerce: z.boolean(),
  membershipId: z.string().min(1),
  limitPeriod: SwanLimitPeriod,
  limitAmount: z.number().min(1),
});

export type AddCard = z.infer<typeof AddCard>;

export const AddMembership = z.object({
  canViewAccount: z.boolean(),
  canManageBeneficiaries: z.boolean(),
  canInitiatePayments: z.boolean(),
  canManageAccountMembership: z.boolean(),
  canManageCards: z.boolean(),
  team_member_id: z.string().min(1),
});

export type AddMembership = z.infer<typeof AddMembership>;

export const TaxCode = z.object({
  name: z.string().min(1),
  code: z.string().optional().nullable(),
  rate: z.string().min(1),
});

export type TaxCode = z.infer<typeof TaxCode>;
