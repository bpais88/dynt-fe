export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      _mapping_category: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_mapping_category_A_fkey";
            columns: ["A"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_mapping_category_B_fkey";
            columns: ["B"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          }
        ];
      };
      _mapping_subcategory: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
        Relationships: [
          {
            foreignKeyName: "_mapping_subcategory_A_fkey";
            columns: ["A"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "_mapping_subcategory_B_fkey";
            columns: ["B"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          }
        ];
      };
      AccountInfo: {
        Row: {
          ACCOUNT_NUMBER: string | null;
          bankAddress: string | null;
          BBAN: string | null;
          countryCode: string;
          createdAt: string;
          currency: string;
          IBAN: string | null;
          id: string;
          name: string;
          ROUTING_NUMBER: string | null;
          SORT_CODE: string | null;
          SWIFT: string | null;
          type: string | null;
          updatedAt: string;
        };
        Insert: {
          ACCOUNT_NUMBER?: string | null;
          bankAddress?: string | null;
          BBAN?: string | null;
          countryCode: string;
          createdAt?: string;
          currency: string;
          IBAN?: string | null;
          id: string;
          name: string;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt: string;
        };
        Update: {
          ACCOUNT_NUMBER?: string | null;
          bankAddress?: string | null;
          BBAN?: string | null;
          countryCode?: string;
          createdAt?: string;
          currency?: string;
          IBAN?: string | null;
          id?: string;
          name?: string;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      AccountingApp: {
        Row: {
          createdAt: string;
          description: string | null;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          description?: string | null;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          description?: string | null;
          id?: string;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "AccountingApp_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      AccountSnapshot: {
        Row: {
          bankAccountId: string;
          date: string;
          EUR: number;
          GBP: number;
          id: string;
          merchantCompletionPercentage: number | null;
          USD: number;
        };
        Insert: {
          bankAccountId: string;
          date: string;
          EUR: number;
          GBP: number;
          id: string;
          merchantCompletionPercentage?: number | null;
          USD: number;
        };
        Update: {
          bankAccountId?: string;
          date?: string;
          EUR?: number;
          GBP?: number;
          id?: string;
          merchantCompletionPercentage?: number | null;
          USD?: number;
        };
        Relationships: [
          {
            foreignKeyName: "AccountSnapshot_bankAccountId_fkey";
            columns: ["bankAccountId"];
            isOneToOne: false;
            referencedRelation: "BankAccount";
            referencedColumns: ["id"];
          }
        ];
      };
      Bank: {
        Row: {
          authorizedOn: string;
          consent: string;
          countryId: number;
          createdAt: string;
          id: string;
          institution_id: string;
          institution_logo: string;
          institution_name: string;
          isActive: boolean;
          isSyncError: boolean;
          lastSyncedAt: string | null;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          authorizedOn?: string;
          consent: string;
          countryId: number;
          createdAt?: string;
          id: string;
          institution_id: string;
          institution_logo: string;
          institution_name: string;
          isActive?: boolean;
          isSyncError?: boolean;
          lastSyncedAt?: string | null;
          name: string;
          organizationId: string;
          updatedAt?: string;
        };
        Update: {
          authorizedOn?: string;
          consent?: string;
          countryId?: number;
          createdAt?: string;
          id?: string;
          institution_id?: string;
          institution_logo?: string;
          institution_name?: string;
          isActive?: boolean;
          isSyncError?: boolean;
          lastSyncedAt?: string | null;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Bank_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bank_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      BankAccount: {
        Row: {
          ACCOUNT_NUMBER: string | null;
          balance: number;
          bankAddress: string | null;
          bankId: string;
          BBAN: string | null;
          createdAt: string;
          currency: string;
          IBAN: string | null;
          id: string;
          isActive: boolean;
          name: string;
          rawJSON: Json | null;
          ROUTING_NUMBER: string | null;
          SORT_CODE: string | null;
          SWIFT: string | null;
          type: string | null;
          updatedAt: string;
        };
        Insert: {
          ACCOUNT_NUMBER?: string | null;
          balance: number;
          bankAddress?: string | null;
          bankId: string;
          BBAN?: string | null;
          createdAt?: string;
          currency: string;
          IBAN?: string | null;
          id: string;
          isActive?: boolean;
          name: string;
          rawJSON?: Json | null;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt: string;
        };
        Update: {
          ACCOUNT_NUMBER?: string | null;
          balance?: number;
          bankAddress?: string | null;
          bankId?: string;
          BBAN?: string | null;
          createdAt?: string;
          currency?: string;
          IBAN?: string | null;
          id?: string;
          isActive?: boolean;
          name?: string;
          rawJSON?: Json | null;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "BankAccount_bankId_fkey";
            columns: ["bankId"];
            isOneToOne: false;
            referencedRelation: "Bank";
            referencedColumns: ["id"];
          }
        ];
      };
      Bill: {
        Row: {
          accountInfoId: string | null;
          accountingStatus: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId: string | null;
          bill_number: number;
          categoryId: string | null;
          createdAt: string;
          currency: string;
          customId: string | null;
          documents: string[] | null;
          dueDate: string;
          id: string;
          isComplete: boolean;
          message: string | null;
          organizationId: string;
          status: Database["public"]["Enums"]["BillStatus"];
          subCategoryId: string | null;
          terms: number | null;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId: string | null;
          vendorId: string;
        };
        Insert: {
          accountInfoId?: string | null;
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId?: string | null;
          bill_number?: number;
          categoryId?: string | null;
          createdAt?: string;
          currency: string;
          customId?: string | null;
          documents?: string[] | null;
          dueDate: string;
          id: string;
          isComplete?: boolean;
          message?: string | null;
          organizationId: string;
          status?: Database["public"]["Enums"]["BillStatus"];
          subCategoryId?: string | null;
          terms?: number | null;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId?: string | null;
          vendorId: string;
        };
        Update: {
          accountInfoId?: string | null;
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId?: string | null;
          bill_number?: number;
          categoryId?: string | null;
          createdAt?: string;
          currency?: string;
          customId?: string | null;
          documents?: string[] | null;
          dueDate?: string;
          id?: string;
          isComplete?: boolean;
          message?: string | null;
          organizationId?: string;
          status?: Database["public"]["Enums"]["BillStatus"];
          subCategoryId?: string | null;
          terms?: number | null;
          total?: number;
          totalAmount?: number;
          totalVat?: number;
          updatedAt?: string;
          userId?: string | null;
          vendorId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Bill_accountInfoId_fkey";
            columns: ["accountInfoId"];
            isOneToOne: false;
            referencedRelation: "AccountInfo";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_bankAccountId_fkey";
            columns: ["bankAccountId"];
            isOneToOne: false;
            referencedRelation: "BankAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Bill_vendorId_fkey";
            columns: ["vendorId"];
            isOneToOne: false;
            referencedRelation: "Vendor";
            referencedColumns: ["id"];
          }
        ];
      };
      BillingPlan: {
        Row: {
          createdAt: string;
          id: string;
          organizationId: string;
          period: Database["public"]["Enums"]["Period"];
          type: Database["public"]["Enums"]["BillingType"];
        };
        Insert: {
          createdAt?: string;
          id: string;
          organizationId: string;
          period: Database["public"]["Enums"]["Period"];
          type: Database["public"]["Enums"]["BillingType"];
        };
        Update: {
          createdAt?: string;
          id?: string;
          organizationId?: string;
          period?: Database["public"]["Enums"]["Period"];
          type?: Database["public"]["Enums"]["BillingType"];
        };
        Relationships: [
          {
            foreignKeyName: "BillingPlan_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Card: {
        Row: {
          brand: string;
          cardHolderId: string;
          createdAt: string;
          currency: string;
          exp_month: number;
          exp_year: number;
          id: string;
          last4: string;
          livemode: boolean;
          spending_controls: Json | null;
          status: Database["public"]["Enums"]["StripeCardStatus"];
          type: Database["public"]["Enums"]["StripeCardType"];
        };
        Insert: {
          brand: string;
          cardHolderId: string;
          createdAt?: string;
          currency: string;
          exp_month: number;
          exp_year: number;
          id: string;
          last4: string;
          livemode: boolean;
          spending_controls?: Json | null;
          status: Database["public"]["Enums"]["StripeCardStatus"];
          type: Database["public"]["Enums"]["StripeCardType"];
        };
        Update: {
          brand?: string;
          cardHolderId?: string;
          createdAt?: string;
          currency?: string;
          exp_month?: number;
          exp_year?: number;
          id?: string;
          last4?: string;
          livemode?: boolean;
          spending_controls?: Json | null;
          status?: Database["public"]["Enums"]["StripeCardStatus"];
          type?: Database["public"]["Enums"]["StripeCardType"];
        };
        Relationships: [
          {
            foreignKeyName: "Card_cardHolderId_fkey";
            columns: ["cardHolderId"];
            isOneToOne: false;
            referencedRelation: "CardHolder";
            referencedColumns: ["id"];
          }
        ];
      };
      CardHolder: {
        Row: {
          accountId: string;
          createdAt: string;
          id: string;
          spending_controls: Json | null;
          team_member_id: string;
        };
        Insert: {
          accountId: string;
          createdAt?: string;
          id: string;
          spending_controls?: Json | null;
          team_member_id: string;
        };
        Update: {
          accountId?: string;
          createdAt?: string;
          id?: string;
          spending_controls?: Json | null;
          team_member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "CardHolder_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "StripeAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "CardHolder_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          }
        ];
      };
      Category: {
        Row: {
          accountingAppId: string | null;
          color: string;
          createdAt: string;
          description: string | null;
          group: Database["public"]["Enums"]["CategoryGroup"];
          id: string;
          name: string;
          organizationId: string | null;
          updatedAt: string;
        };
        Insert: {
          accountingAppId?: string | null;
          color: string;
          createdAt?: string;
          description?: string | null;
          group: Database["public"]["Enums"]["CategoryGroup"];
          id: string;
          name: string;
          organizationId?: string | null;
          updatedAt: string;
        };
        Update: {
          accountingAppId?: string | null;
          color?: string;
          createdAt?: string;
          description?: string | null;
          group?: Database["public"]["Enums"]["CategoryGroup"];
          id?: string;
          name?: string;
          organizationId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Category_accountingAppId_fkey";
            columns: ["accountingAppId"];
            isOneToOne: false;
            referencedRelation: "AccountingApp";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Category_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Country: {
        Row: {
          continent: string | null;
          id: number;
          iso2: string;
          iso3: string;
          local_name: string | null;
          name: string;
        };
        Insert: {
          continent?: string | null;
          id?: number;
          iso2: string;
          iso3: string;
          local_name?: string | null;
          name: string;
        };
        Update: {
          continent?: string | null;
          id?: number;
          iso2?: string;
          iso3?: string;
          local_name?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      CurrencyExchange: {
        Row: {
          base: string;
          currency: string;
          date: string;
          id: string;
          rate: number;
        };
        Insert: {
          base: string;
          currency: string;
          date: string;
          id: string;
          rate: number;
        };
        Update: {
          base?: string;
          currency?: string;
          date?: string;
          id?: string;
          rate?: number;
        };
        Relationships: [];
      };
      Customer: {
        Row: {
          address: string;
          business_number: string | null;
          business_tax_number: string | null;
          city: string;
          countryId: number;
          createdAt: string;
          email: string;
          id: string;
          name: string;
          organizationId: string;
          phone: string;
          photo: string | null;
          postCode: string;
          updatedAt: string;
        };
        Insert: {
          address: string;
          business_number?: string | null;
          business_tax_number?: string | null;
          city: string;
          countryId: number;
          createdAt?: string;
          email: string;
          id: string;
          name: string;
          organizationId: string;
          phone: string;
          photo?: string | null;
          postCode: string;
          updatedAt?: string;
        };
        Update: {
          address?: string;
          business_number?: string | null;
          business_tax_number?: string | null;
          city?: string;
          countryId?: number;
          createdAt?: string;
          email?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          phone?: string;
          photo?: string | null;
          postCode?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Customer_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Customer_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      DataRow: {
        Row: {
          amount: number;
          billId: string | null;
          createdAt: string;
          description: string | null;
          expenseId: string | null;
          id: string;
          invoiceId: string | null;
          quantity: number;
          subTotal: number;
          updatedAt: string;
          vat: number;
        };
        Insert: {
          amount: number;
          billId?: string | null;
          createdAt?: string;
          description?: string | null;
          expenseId?: string | null;
          id: string;
          invoiceId?: string | null;
          quantity: number;
          subTotal: number;
          updatedAt: string;
          vat: number;
        };
        Update: {
          amount?: number;
          billId?: string | null;
          createdAt?: string;
          description?: string | null;
          expenseId?: string | null;
          id?: string;
          invoiceId?: string | null;
          quantity?: number;
          subTotal?: number;
          updatedAt?: string;
          vat?: number;
        };
        Relationships: [
          {
            foreignKeyName: "DataRow_billId_fkey";
            columns: ["billId"];
            isOneToOne: false;
            referencedRelation: "Bill";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "DataRow_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "DataRow_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          }
        ];
      };
      Department: {
        Row: {
          appId: string | null;
          createdAt: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          appId?: string | null;
          createdAt?: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          appId?: string | null;
          createdAt?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Department_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      EnabledProduct: {
        Row: {
          enabledAt: string;
          id: string;
          name: Database["public"]["Enums"]["Product"];
          organizationId: string;
        };
        Insert: {
          enabledAt?: string;
          id: string;
          name: Database["public"]["Enums"]["Product"];
          organizationId: string;
        };
        Update: {
          enabledAt?: string;
          id?: string;
          name?: Database["public"]["Enums"]["Product"];
          organizationId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EnabledProduct_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Expense: {
        Row: {
          accountingStatus: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus: Database["public"]["Enums"]["ApprovalStatus"];
          categoryId: string | null;
          comment: string | null;
          createdAt: string;
          currency: string;
          customId: string | null;
          date: string;
          documents: string[] | null;
          eventId: string | null;
          expense_number: number;
          externalGuest: boolean;
          id: string;
          isComplete: boolean;
          merchantId: string;
          organizationId: string;
          status: Database["public"]["Enums"]["ExpenseStatus"];
          subCategoryId: string | null;
          team_member_id: string;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          categoryId?: string | null;
          comment?: string | null;
          createdAt?: string;
          currency: string;
          customId?: string | null;
          date: string;
          documents?: string[] | null;
          eventId?: string | null;
          expense_number?: number;
          externalGuest: boolean;
          id: string;
          isComplete?: boolean;
          merchantId: string;
          organizationId: string;
          status?: Database["public"]["Enums"]["ExpenseStatus"];
          subCategoryId?: string | null;
          team_member_id: string;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          categoryId?: string | null;
          comment?: string | null;
          createdAt?: string;
          currency?: string;
          customId?: string | null;
          date?: string;
          documents?: string[] | null;
          eventId?: string | null;
          expense_number?: number;
          externalGuest?: boolean;
          id?: string;
          isComplete?: boolean;
          merchantId?: string;
          organizationId?: string;
          status?: Database["public"]["Enums"]["ExpenseStatus"];
          subCategoryId?: string | null;
          team_member_id?: string;
          total?: number;
          totalAmount?: number;
          totalVat?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Expense_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_eventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "ExpenseEvent";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_merchantId_fkey";
            columns: ["merchantId"];
            isOneToOne: false;
            referencedRelation: "ExpenseMerchant";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      ExpenseEvent: {
        Row: {
          createdAt: string;
          endDate: string;
          id: string;
          name: string;
          organizationId: string;
          startDate: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          endDate: string;
          id: string;
          name: string;
          organizationId: string;
          startDate: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          endDate?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          startDate?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ExpenseEvent_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      ExpenseMerchant: {
        Row: {
          createdAt: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ExpenseMerchant_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      File: {
        Row: {
          createdAt: string;
          description: string | null;
          folderId: string | null;
          id: string;
          invoiceId: string | null;
          link: string;
          mimeType: string;
          name: string;
          organizationId: string;
          readOnly: boolean;
          size: string;
          type: Database["public"]["Enums"]["FileType"] | null;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          description?: string | null;
          folderId?: string | null;
          id: string;
          invoiceId?: string | null;
          link: string;
          mimeType: string;
          name: string;
          organizationId: string;
          readOnly?: boolean;
          size: string;
          type?: Database["public"]["Enums"]["FileType"] | null;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          description?: string | null;
          folderId?: string | null;
          id?: string;
          invoiceId?: string | null;
          link?: string;
          mimeType?: string;
          name?: string;
          organizationId?: string;
          readOnly?: boolean;
          size?: string;
          type?: Database["public"]["Enums"]["FileType"] | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "File_folderId_fkey";
            columns: ["folderId"];
            isOneToOne: false;
            referencedRelation: "Folder";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "File_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "File_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Folder: {
        Row: {
          createdAt: string;
          id: string;
          name: string;
          organizationId: string;
          parentId: string | null;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          name: string;
          organizationId: string;
          parentId?: string | null;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          parentId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Folder_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Folder_parentId_fkey";
            columns: ["parentId"];
            isOneToOne: false;
            referencedRelation: "Folder";
            referencedColumns: ["id"];
          }
        ];
      };
      History: {
        Row: {
          endDate: string;
          id: string;
          startDate: string;
          team_member_id: string | null;
        };
        Insert: {
          endDate: string;
          id: string;
          startDate: string;
          team_member_id?: string | null;
        };
        Update: {
          endDate?: string;
          id?: string;
          startDate?: string;
          team_member_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "History_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          }
        ];
      };
      Integration: {
        Row: {
          apiKey: string | null;
          appName: Database["public"]["Enums"]["IntegrationApp"];
          createdAt: string;
          errorDescription: string | null;
          id: string;
          isError: boolean;
          lastSyncedAt: string | null;
          organizationId: string;
          startDate: string;
          subdomain: string | null;
          updatedAt: string;
        };
        Insert: {
          apiKey?: string | null;
          appName: Database["public"]["Enums"]["IntegrationApp"];
          createdAt?: string;
          errorDescription?: string | null;
          id: string;
          isError?: boolean;
          lastSyncedAt?: string | null;
          organizationId: string;
          startDate?: string;
          subdomain?: string | null;
          updatedAt: string;
        };
        Update: {
          apiKey?: string | null;
          appName?: Database["public"]["Enums"]["IntegrationApp"];
          createdAt?: string;
          errorDescription?: string | null;
          id?: string;
          isError?: boolean;
          lastSyncedAt?: string | null;
          organizationId?: string;
          startDate?: string;
          subdomain?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Integration_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      InvitedMember: {
        Row: {
          acceptedAt: string | null;
          email: string;
          id: string;
          invitedAt: string;
          isAccepted: boolean;
          organizationId: string;
          role: Database["public"]["Enums"]["team_member_roles"];
        };
        Insert: {
          acceptedAt?: string | null;
          email: string;
          id: string;
          invitedAt?: string;
          isAccepted?: boolean;
          organizationId: string;
          role: Database["public"]["Enums"]["team_member_roles"];
        };
        Update: {
          acceptedAt?: string | null;
          email?: string;
          id?: string;
          invitedAt?: string;
          isAccepted?: boolean;
          organizationId?: string;
          role?: Database["public"]["Enums"]["team_member_roles"];
        };
        Relationships: [
          {
            foreignKeyName: "InvitedMember_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Invoice: {
        Row: {
          accountInfoId: string;
          accountingStatus: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId: string | null;
          categoryId: string | null;
          createdAt: string;
          currency: string;
          customerId: string;
          customId: string | null;
          documentURL: string | null;
          dueDate: string;
          id: string;
          invoice_number: number;
          isComplete: boolean;
          organizationId: string;
          paymentLinkEnabled: boolean;
          sentAt: string | null;
          status: Database["public"]["Enums"]["InvoiceStatus"];
          subCategoryId: string | null;
          terms: number | null;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId: string | null;
        };
        Insert: {
          accountInfoId: string;
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId?: string | null;
          categoryId?: string | null;
          createdAt?: string;
          currency: string;
          customerId: string;
          customId?: string | null;
          documentURL?: string | null;
          dueDate: string;
          id: string;
          invoice_number?: number;
          isComplete?: boolean;
          organizationId: string;
          paymentLinkEnabled?: boolean;
          sentAt?: string | null;
          status?: Database["public"]["Enums"]["InvoiceStatus"];
          subCategoryId?: string | null;
          terms?: number | null;
          total: number;
          totalAmount: number;
          totalVat: number;
          updatedAt: string;
          userId?: string | null;
        };
        Update: {
          accountInfoId?: string;
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          approvalStatus?: Database["public"]["Enums"]["ApprovalStatus"];
          bankAccountId?: string | null;
          categoryId?: string | null;
          createdAt?: string;
          currency?: string;
          customerId?: string;
          customId?: string | null;
          documentURL?: string | null;
          dueDate?: string;
          id?: string;
          invoice_number?: number;
          isComplete?: boolean;
          organizationId?: string;
          paymentLinkEnabled?: boolean;
          sentAt?: string | null;
          status?: Database["public"]["Enums"]["InvoiceStatus"];
          subCategoryId?: string | null;
          terms?: number | null;
          total?: number;
          totalAmount?: number;
          totalVat?: number;
          updatedAt?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Invoice_accountInfoId_fkey";
            columns: ["accountInfoId"];
            isOneToOne: false;
            referencedRelation: "AccountInfo";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_bankAccountId_fkey";
            columns: ["bankAccountId"];
            isOneToOne: false;
            referencedRelation: "BankAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_customerId_fkey";
            columns: ["customerId"];
            isOneToOne: false;
            referencedRelation: "Customer";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Invoice_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      InvoiceSendLog: {
        Row: {
          date: string;
          id: string;
          invoiceId: string;
          recipientEmail: string;
          team_member_id: string;
        };
        Insert: {
          date?: string;
          id: string;
          invoiceId: string;
          recipientEmail: string;
          team_member_id: string;
        };
        Update: {
          date?: string;
          id?: string;
          invoiceId?: string;
          recipientEmail?: string;
          team_member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "InvoiceSendLog_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "InvoiceSendLog_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          }
        ];
      };
      ManualAccount: {
        Row: {
          ACCOUNT_NUMBER: string | null;
          bankAddress: string;
          BBAN: string | null;
          countryId: number;
          createdAt: string;
          currency: string;
          IBAN: string | null;
          id: string;
          name: string;
          organizationId: string | null;
          ROUTING_NUMBER: string | null;
          SORT_CODE: string | null;
          SWIFT: string | null;
          type: string | null;
          updatedAt: string;
          vendorId: string | null;
        };
        Insert: {
          ACCOUNT_NUMBER?: string | null;
          bankAddress: string;
          BBAN?: string | null;
          countryId: number;
          createdAt?: string;
          currency: string;
          IBAN?: string | null;
          id: string;
          name: string;
          organizationId?: string | null;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt: string;
          vendorId?: string | null;
        };
        Update: {
          ACCOUNT_NUMBER?: string | null;
          bankAddress?: string;
          BBAN?: string | null;
          countryId?: number;
          createdAt?: string;
          currency?: string;
          IBAN?: string | null;
          id?: string;
          name?: string;
          organizationId?: string | null;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
          type?: string | null;
          updatedAt?: string;
          vendorId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ManualAccount_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ManualAccount_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ManualAccount_vendorId_fkey";
            columns: ["vendorId"];
            isOneToOne: false;
            referencedRelation: "Vendor";
            referencedColumns: ["id"];
          }
        ];
      };
      Merchant: {
        Row: {
          category: string | null;
          category_code: string | null;
          createdAt: string;
          creditCategoryId: string | null;
          creditSubCategoryId: string | null;
          debitCategoryId: string | null;
          debitSubCategoryId: string | null;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          category?: string | null;
          category_code?: string | null;
          createdAt?: string;
          creditCategoryId?: string | null;
          creditSubCategoryId?: string | null;
          debitCategoryId?: string | null;
          debitSubCategoryId?: string | null;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          category?: string | null;
          category_code?: string | null;
          createdAt?: string;
          creditCategoryId?: string | null;
          creditSubCategoryId?: string | null;
          debitCategoryId?: string | null;
          debitSubCategoryId?: string | null;
          id?: string;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Merchant_creditCategoryId_fkey";
            columns: ["creditCategoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Merchant_creditSubCategoryId_fkey";
            columns: ["creditSubCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Merchant_debitCategoryId_fkey";
            columns: ["debitCategoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Merchant_debitSubCategoryId_fkey";
            columns: ["debitSubCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Merchant_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Notification: {
        Row: {
          actionLink: string;
          actionTitle: string;
          createdAt: string;
          id: string;
          message: string;
          organizationId: string;
          read: boolean;
          team_member_id: string;
          title: string;
          userId: string | null;
        };
        Insert: {
          actionLink: string;
          actionTitle: string;
          createdAt?: string;
          id: string;
          message: string;
          organizationId: string;
          read?: boolean;
          team_member_id: string;
          title: string;
          userId?: string | null;
        };
        Update: {
          actionLink?: string;
          actionTitle?: string;
          createdAt?: string;
          id?: string;
          message?: string;
          organizationId?: string;
          read?: boolean;
          team_member_id?: string;
          title?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Notification_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Organization: {
        Row: {
          address: string | null;
          business_number: string | null;
          business_tax_number: string;
          city: string | null;
          countryId: number;
          createdAt: string;
          defaultCurrency: string;
          email: string;
          emailAlias: string;
          employeeCount: string | null;
          id: string;
          logo: string | null;
          mcc: string | null;
          name: string;
          phone: string;
          policyURL: string | null;
          postCode: string | null;
          state: string | null;
          type: Database["public"]["Enums"]["BusinessType"] | null;
          updatedAt: string;
          userId: string;
          website: string | null;
        };
        Insert: {
          address?: string | null;
          business_number?: string | null;
          business_tax_number: string;
          city?: string | null;
          countryId: number;
          createdAt?: string;
          defaultCurrency: string;
          email: string;
          emailAlias: string;
          employeeCount?: string | null;
          id: string;
          logo?: string | null;
          mcc?: string | null;
          name: string;
          phone: string;
          policyURL?: string | null;
          postCode?: string | null;
          state?: string | null;
          type?: Database["public"]["Enums"]["BusinessType"] | null;
          updatedAt: string;
          userId: string;
          website?: string | null;
        };
        Update: {
          address?: string | null;
          business_number?: string | null;
          business_tax_number?: string;
          city?: string | null;
          countryId?: number;
          createdAt?: string;
          defaultCurrency?: string;
          email?: string;
          emailAlias?: string;
          employeeCount?: string | null;
          id?: string;
          logo?: string | null;
          mcc?: string | null;
          name?: string;
          phone?: string;
          policyURL?: string | null;
          postCode?: string | null;
          state?: string | null;
          type?: Database["public"]["Enums"]["BusinessType"] | null;
          updatedAt?: string;
          userId?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Organization_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Organization_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      OrganizationSnapshot: {
        Row: {
          date: string;
          id: string;
          numberOfMerchants: number;
          numberOfTransactions: number;
          organizationId: string;
          transactionsWithCategory: number;
        };
        Insert: {
          date: string;
          id: string;
          numberOfMerchants: number;
          numberOfTransactions: number;
          organizationId: string;
          transactionsWithCategory: number;
        };
        Update: {
          date?: string;
          id?: string;
          numberOfMerchants?: number;
          numberOfTransactions?: number;
          organizationId?: string;
          transactionsWithCategory?: number;
        };
        Relationships: [
          {
            foreignKeyName: "OrganizationSnapshot_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Payment: {
        Row: {
          amount: number;
          billId: string | null;
          consent: string;
          createdAt: string;
          currency: string;
          expenseId: string | null;
          id: string;
          invoiceId: string | null;
          payeeId: string | null;
          payerId: string | null;
          rawJSON: Json | null;
          scheduledOn: string | null;
        };
        Insert: {
          amount: number;
          billId?: string | null;
          consent: string;
          createdAt?: string;
          currency: string;
          expenseId?: string | null;
          id: string;
          invoiceId?: string | null;
          payeeId?: string | null;
          payerId?: string | null;
          rawJSON?: Json | null;
          scheduledOn?: string | null;
        };
        Update: {
          amount?: number;
          billId?: string | null;
          consent?: string;
          createdAt?: string;
          currency?: string;
          expenseId?: string | null;
          id?: string;
          invoiceId?: string | null;
          payeeId?: string | null;
          payerId?: string | null;
          rawJSON?: Json | null;
          scheduledOn?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Payment_billId_fkey";
            columns: ["billId"];
            isOneToOne: false;
            referencedRelation: "Bill";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Payment_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Payment_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Payment_payeeId_fkey";
            columns: ["payeeId"];
            isOneToOne: false;
            referencedRelation: "PaymentCounterparty";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Payment_payerId_fkey";
            columns: ["payerId"];
            isOneToOne: false;
            referencedRelation: "PaymentCounterparty";
            referencedColumns: ["id"];
          }
        ];
      };
      PaymentCounterparty: {
        Row: {
          ACCOUNT_NUMBER: string | null;
          createdAt: string;
          IBAN: string | null;
          id: string;
          name: string;
          ROUTING_NUMBER: string | null;
          SORT_CODE: string | null;
          SWIFT: string | null;
        };
        Insert: {
          ACCOUNT_NUMBER?: string | null;
          createdAt?: string;
          IBAN?: string | null;
          id: string;
          name: string;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
        };
        Update: {
          ACCOUNT_NUMBER?: string | null;
          createdAt?: string;
          IBAN?: string | null;
          id?: string;
          name?: string;
          ROUTING_NUMBER?: string | null;
          SORT_CODE?: string | null;
          SWIFT?: string | null;
        };
        Relationships: [];
      };
      PaymentISOStatus: {
        Row: {
          code: string;
          createdAt: string;
          id: string;
          name: string;
          paymentId: string;
          rawJSON: Json | null;
          statusUpdateDate: string;
        };
        Insert: {
          code: string;
          createdAt?: string;
          id: string;
          name: string;
          paymentId: string;
          rawJSON?: Json | null;
          statusUpdateDate: string;
        };
        Update: {
          code?: string;
          createdAt?: string;
          id?: string;
          name?: string;
          paymentId?: string;
          rawJSON?: Json | null;
          statusUpdateDate?: string;
        };
        Relationships: [
          {
            foreignKeyName: "PaymentISOStatus_paymentId_fkey";
            columns: ["paymentId"];
            isOneToOne: false;
            referencedRelation: "Payment";
            referencedColumns: ["id"];
          }
        ];
      };
      PaymentStatus: {
        Row: {
          createdAt: string;
          id: string;
          paymentId: string;
          rawJSON: Json | null;
          status: string;
          statusUpdateDate: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          paymentId: string;
          rawJSON?: Json | null;
          status: string;
          statusUpdateDate: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          paymentId?: string;
          rawJSON?: Json | null;
          status?: string;
          statusUpdateDate?: string;
        };
        Relationships: [
          {
            foreignKeyName: "PaymentStatus_paymentId_fkey";
            columns: ["paymentId"];
            isOneToOne: false;
            referencedRelation: "Payment";
            referencedColumns: ["id"];
          }
        ];
      };
      PayRun: {
        Row: {
          amount: number;
          createdAt: string;
          currency: string;
          description: string | null;
          id: string;
          month: number;
          organizationId: string;
          staffId: string;
          year: number;
        };
        Insert: {
          amount: number;
          createdAt?: string;
          currency: string;
          description?: string | null;
          id: string;
          month: number;
          organizationId: string;
          staffId: string;
          year: number;
        };
        Update: {
          amount?: number;
          createdAt?: string;
          currency?: string;
          description?: string | null;
          id?: string;
          month?: number;
          organizationId?: string;
          staffId?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: "PayRun_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "PayRun_staffId_fkey";
            columns: ["staffId"];
            isOneToOne: false;
            referencedRelation: "Staff";
            referencedColumns: ["id"];
          }
        ];
      };
      Proof: {
        Row: {
          billId: string | null;
          createdAt: string;
          expenseId: string | null;
          fileId: string | null;
          id: string;
          invoiceId: string | null;
          transactionId: string | null;
        };
        Insert: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          fileId?: string | null;
          id: string;
          invoiceId?: string | null;
          transactionId?: string | null;
        };
        Update: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          fileId?: string | null;
          id?: string;
          invoiceId?: string | null;
          transactionId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Proof_billId_fkey";
            columns: ["billId"];
            isOneToOne: false;
            referencedRelation: "Bill";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Proof_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Proof_fileId_fkey";
            columns: ["fileId"];
            isOneToOne: false;
            referencedRelation: "File";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Proof_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Proof_transactionId_fkey";
            columns: ["transactionId"];
            isOneToOne: false;
            referencedRelation: "Transaction";
            referencedColumns: ["id"];
          }
        ];
      };
      Role: {
        Row: {
          appId: string | null;
          createdAt: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          appId?: string | null;
          createdAt?: string;
          id: string;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          appId?: string | null;
          createdAt?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Role_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Rule: {
        Row: {
          accountingStatus: string | null;
          approvalStatus: string | null;
          assign: string[] | null;
          categorize: string | null;
          conditions: Json[] | null;
          createdAt: string;
          email: string[] | null;
          id: string;
          lastRun: string | null;
          name: string;
          notify: string[] | null;
          organizationId: string;
          product: Database["public"]["Enums"]["ProductType"];
          status: string | null;
          subCategorize: string | null;
          updatedAt: string;
        };
        Insert: {
          accountingStatus?: string | null;
          approvalStatus?: string | null;
          assign?: string[] | null;
          categorize?: string | null;
          conditions?: Json[] | null;
          createdAt?: string;
          email?: string[] | null;
          id: string;
          lastRun?: string | null;
          name: string;
          notify?: string[] | null;
          organizationId: string;
          product: Database["public"]["Enums"]["ProductType"];
          status?: string | null;
          subCategorize?: string | null;
          updatedAt: string;
        };
        Update: {
          accountingStatus?: string | null;
          approvalStatus?: string | null;
          assign?: string[] | null;
          categorize?: string | null;
          conditions?: Json[] | null;
          createdAt?: string;
          email?: string[] | null;
          id?: string;
          lastRun?: string | null;
          name?: string;
          notify?: string[] | null;
          organizationId?: string;
          product?: Database["public"]["Enums"]["ProductType"];
          status?: string | null;
          subCategorize?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Rule_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      ScheduleInvoice: {
        Row: {
          createdAt: string;
          dueDate: string;
          id: string;
          invoiceId: string;
          isComplete: boolean;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          dueDate: string;
          id: string;
          invoiceId: string;
          isComplete?: boolean;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          dueDate?: string;
          id?: string;
          invoiceId?: string;
          isComplete?: boolean;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ScheduleInvoice_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          }
        ];
      };
      Staff: {
        Row: {
          appId: string | null;
          contractType: Database["public"]["Enums"]["ContractType"] | null;
          createdAt: string;
          currency: string | null;
          departmentId: string | null;
          email: string;
          gross_monthly_salary: number | null;
          id: string;
          name: string;
          organizationId: string;
          phone: string | null;
          roleId: string | null;
          updatedAt: string;
        };
        Insert: {
          appId?: string | null;
          contractType?: Database["public"]["Enums"]["ContractType"] | null;
          createdAt?: string;
          currency?: string | null;
          departmentId?: string | null;
          email: string;
          gross_monthly_salary?: number | null;
          id: string;
          name: string;
          organizationId: string;
          phone?: string | null;
          roleId?: string | null;
          updatedAt: string;
        };
        Update: {
          appId?: string | null;
          contractType?: Database["public"]["Enums"]["ContractType"] | null;
          createdAt?: string;
          currency?: string | null;
          departmentId?: string | null;
          email?: string;
          gross_monthly_salary?: number | null;
          id?: string;
          name?: string;
          organizationId?: string;
          phone?: string | null;
          roleId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Staff_departmentId_fkey";
            columns: ["departmentId"];
            isOneToOne: false;
            referencedRelation: "Department";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Staff_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Staff_roleId_fkey";
            columns: ["roleId"];
            isOneToOne: false;
            referencedRelation: "Role";
            referencedColumns: ["id"];
          }
        ];
      };
      StaffOnExpense: {
        Row: {
          createdAt: string;
          expenseId: string;
          id: string;
          staffId: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          expenseId: string;
          id: string;
          staffId: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          expenseId?: string;
          id?: string;
          staffId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "StaffOnExpense_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StaffOnExpense_staffId_fkey";
            columns: ["staffId"];
            isOneToOne: false;
            referencedRelation: "Staff";
            referencedColumns: ["id"];
          }
        ];
      };
      StripeAccount: {
        Row: {
          createdAt: string;
          id: string;
          organizationId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          organizationId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          organizationId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "StripeAccount_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      StripeAuthorization: {
        Row: {
          accountId: string;
          amount: number;
          approved: boolean;
          cardholderId: string | null;
          cardId: string;
          createdAt: string;
          currency: string;
          id: string;
          merchant_amount: number;
          merchant_currency: string;
          merchantId: string | null;
          method: string;
          status: string;
        };
        Insert: {
          accountId: string;
          amount: number;
          approved: boolean;
          cardholderId?: string | null;
          cardId: string;
          createdAt: string;
          currency: string;
          id: string;
          merchant_amount: number;
          merchant_currency: string;
          merchantId?: string | null;
          method: string;
          status: string;
        };
        Update: {
          accountId?: string;
          amount?: number;
          approved?: boolean;
          cardholderId?: string | null;
          cardId?: string;
          createdAt?: string;
          currency?: string;
          id?: string;
          merchant_amount?: number;
          merchant_currency?: string;
          merchantId?: string | null;
          method?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "StripeAuthorization_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "StripeAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeAuthorization_cardholderId_fkey";
            columns: ["cardholderId"];
            isOneToOne: false;
            referencedRelation: "CardHolder";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeAuthorization_cardId_fkey";
            columns: ["cardId"];
            isOneToOne: false;
            referencedRelation: "Card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeAuthorization_merchantId_fkey";
            columns: ["merchantId"];
            isOneToOne: false;
            referencedRelation: "Merchant";
            referencedColumns: ["id"];
          }
        ];
      };
      StripePerson: {
        Row: {
          accountId: string;
          id: string;
          team_member_id: string;
        };
        Insert: {
          accountId: string;
          id: string;
          team_member_id: string;
        };
        Update: {
          accountId?: string;
          id?: string;
          team_member_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "StripePerson_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "StripeAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripePerson_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          }
        ];
      };
      StripeTransaction: {
        Row: {
          accountId: string;
          amount: number;
          authorizationId: string | null;
          cardholderId: string | null;
          cardId: string;
          createdAt: string;
          currency: string;
          id: string;
          merchant_amount: number;
          merchant_currency: string;
          merchantId: string | null;
          type: string;
        };
        Insert: {
          accountId: string;
          amount: number;
          authorizationId?: string | null;
          cardholderId?: string | null;
          cardId: string;
          createdAt: string;
          currency: string;
          id: string;
          merchant_amount: number;
          merchant_currency: string;
          merchantId?: string | null;
          type: string;
        };
        Update: {
          accountId?: string;
          amount?: number;
          authorizationId?: string | null;
          cardholderId?: string | null;
          cardId?: string;
          createdAt?: string;
          currency?: string;
          id?: string;
          merchant_amount?: number;
          merchant_currency?: string;
          merchantId?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "StripeTransaction_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "StripeAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeTransaction_authorizationId_fkey";
            columns: ["authorizationId"];
            isOneToOne: false;
            referencedRelation: "StripeAuthorization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeTransaction_cardholderId_fkey";
            columns: ["cardholderId"];
            isOneToOne: false;
            referencedRelation: "CardHolder";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeTransaction_cardId_fkey";
            columns: ["cardId"];
            isOneToOne: false;
            referencedRelation: "Card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "StripeTransaction_merchantId_fkey";
            columns: ["merchantId"];
            isOneToOne: false;
            referencedRelation: "Merchant";
            referencedColumns: ["id"];
          }
        ];
      };
      SubCategory: {
        Row: {
          categoryId: string;
          color: string;
          createdAt: string;
          description: string | null;
          id: string;
          name: string;
          updatedAt: string;
        };
        Insert: {
          categoryId: string;
          color: string;
          createdAt?: string;
          description?: string | null;
          id: string;
          name: string;
          updatedAt: string;
        };
        Update: {
          categoryId?: string;
          color?: string;
          createdAt?: string;
          description?: string | null;
          id?: string;
          name?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SubCategory_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanAccount: {
        Row: {
          ACCOUNT_NUMBER: string;
          availableBalance: number | null;
          bankDetails: string | null;
          blockSDD: boolean | null;
          bookedBalance: number | null;
          cashAccountType: Database["public"]["Enums"]["SwanCashAccountType"];
          country: Database["public"]["Enums"]["SwanAccountCountry"];
          createdAt: string;
          currency: string;
          holderId: string;
          IBAN: string | null;
          id: string;
          name: string;
          partnershipStatus:
            | Database["public"]["Enums"]["SwanPartnershipStatus"]
            | null;
          paymentAccountType: Database["public"]["Enums"]["SwanPaymentAccountType"];
          paymentLevel: Database["public"]["Enums"]["SwanPaymentLevel"];
          pendingBalance: number | null;
          requiredConsentToFetchNewTransactions: boolean;
          reservedBalance: number | null;
          status: Database["public"]["Enums"]["SwanAccountStatus"];
          SWIFT: string;
          updatedAt: string;
          upgradedAt: string | null;
        };
        Insert: {
          ACCOUNT_NUMBER: string;
          availableBalance?: number | null;
          bankDetails?: string | null;
          blockSDD?: boolean | null;
          bookedBalance?: number | null;
          cashAccountType: Database["public"]["Enums"]["SwanCashAccountType"];
          country: Database["public"]["Enums"]["SwanAccountCountry"];
          createdAt: string;
          currency: string;
          holderId: string;
          IBAN?: string | null;
          id: string;
          name: string;
          partnershipStatus?:
            | Database["public"]["Enums"]["SwanPartnershipStatus"]
            | null;
          paymentAccountType: Database["public"]["Enums"]["SwanPaymentAccountType"];
          paymentLevel: Database["public"]["Enums"]["SwanPaymentLevel"];
          pendingBalance?: number | null;
          requiredConsentToFetchNewTransactions: boolean;
          reservedBalance?: number | null;
          status: Database["public"]["Enums"]["SwanAccountStatus"];
          SWIFT: string;
          updatedAt: string;
          upgradedAt?: string | null;
        };
        Update: {
          ACCOUNT_NUMBER?: string;
          availableBalance?: number | null;
          bankDetails?: string | null;
          blockSDD?: boolean | null;
          bookedBalance?: number | null;
          cashAccountType?: Database["public"]["Enums"]["SwanCashAccountType"];
          country?: Database["public"]["Enums"]["SwanAccountCountry"];
          createdAt?: string;
          currency?: string;
          holderId?: string;
          IBAN?: string | null;
          id?: string;
          name?: string;
          partnershipStatus?:
            | Database["public"]["Enums"]["SwanPartnershipStatus"]
            | null;
          paymentAccountType?: Database["public"]["Enums"]["SwanPaymentAccountType"];
          paymentLevel?: Database["public"]["Enums"]["SwanPaymentLevel"];
          pendingBalance?: number | null;
          requiredConsentToFetchNewTransactions?: boolean;
          reservedBalance?: number | null;
          status?: Database["public"]["Enums"]["SwanAccountStatus"];
          SWIFT?: string;
          updatedAt?: string;
          upgradedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "SwanAccount_holderId_fkey";
            columns: ["holderId"];
            isOneToOne: false;
            referencedRelation: "SwanAccountHolder";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanAccountHolder: {
        Row: {
          createdAt: string;
          id: string;
          name: string;
          onboardingId: string;
          status: Database["public"]["Enums"]["SwanAccountHolderStatus"] | null;
          updatedAt: string;
          verificationStatus: Database["public"]["Enums"]["SwanVerificationStatus"];
        };
        Insert: {
          createdAt: string;
          id: string;
          name: string;
          onboardingId: string;
          status?:
            | Database["public"]["Enums"]["SwanAccountHolderStatus"]
            | null;
          updatedAt: string;
          verificationStatus: Database["public"]["Enums"]["SwanVerificationStatus"];
        };
        Update: {
          createdAt?: string;
          id?: string;
          name?: string;
          onboardingId?: string;
          status?:
            | Database["public"]["Enums"]["SwanAccountHolderStatus"]
            | null;
          updatedAt?: string;
          verificationStatus?: Database["public"]["Enums"]["SwanVerificationStatus"];
        };
        Relationships: [
          {
            foreignKeyName: "SwanAccountHolder_onboardingId_fkey";
            columns: ["onboardingId"];
            isOneToOne: false;
            referencedRelation: "SwanAccountOnboarding";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanAccountMembership: {
        Row: {
          accountId: string | null;
          canInitiatePayments: boolean;
          canManageAccountMembership: boolean;
          canManageBeneficiaries: boolean;
          canManageCards: boolean;
          canViewAccount: boolean;
          createdAt: string;
          disabledAt: string | null;
          email: string;
          id: string;
          legalRepresentative: boolean;
          limitAmount: number;
          limitPeriod: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          status: Database["public"]["Enums"]["SwanAccountMembershipStatus"];
          taxIdentificationNumber: string | null;
          team_member_id: string;
          updatedAt: string;
          userId: string | null;
        };
        Insert: {
          accountId?: string | null;
          canInitiatePayments: boolean;
          canManageAccountMembership: boolean;
          canManageBeneficiaries: boolean;
          canManageCards: boolean;
          canViewAccount: boolean;
          createdAt: string;
          disabledAt?: string | null;
          email: string;
          id: string;
          legalRepresentative: boolean;
          limitAmount: number;
          limitPeriod: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          status: Database["public"]["Enums"]["SwanAccountMembershipStatus"];
          taxIdentificationNumber?: string | null;
          team_member_id: string;
          updatedAt: string;
          userId?: string | null;
        };
        Update: {
          accountId?: string | null;
          canInitiatePayments?: boolean;
          canManageAccountMembership?: boolean;
          canManageBeneficiaries?: boolean;
          canManageCards?: boolean;
          canViewAccount?: boolean;
          createdAt?: string;
          disabledAt?: string | null;
          email?: string;
          id?: string;
          legalRepresentative?: boolean;
          limitAmount?: number;
          limitPeriod?: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          status?: Database["public"]["Enums"]["SwanAccountMembershipStatus"];
          taxIdentificationNumber?: string | null;
          team_member_id?: string;
          updatedAt?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "SwanAccountMembership_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "SwanAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SwanAccountMembership_team_member_id_fkey";
            columns: ["team_member_id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SwanAccountMembership_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "SwanUser";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanAccountOnboarding: {
        Row: {
          accountCountry: Database["public"]["Enums"]["SwanAccountCountry"];
          accountName: string | null;
          createdAt: string;
          email: string | null;
          finalizedAt: string | null;
          id: string;
          onboardingURL: string;
          organizationId: string;
          state: Database["public"]["Enums"]["SwanOnboardingState"];
          status: Database["public"]["Enums"]["SwanOnboardingStatus"];
          updatedAt: string;
        };
        Insert: {
          accountCountry: Database["public"]["Enums"]["SwanAccountCountry"];
          accountName?: string | null;
          createdAt: string;
          email?: string | null;
          finalizedAt?: string | null;
          id: string;
          onboardingURL: string;
          organizationId: string;
          state: Database["public"]["Enums"]["SwanOnboardingState"];
          status: Database["public"]["Enums"]["SwanOnboardingStatus"];
          updatedAt: string;
        };
        Update: {
          accountCountry?: Database["public"]["Enums"]["SwanAccountCountry"];
          accountName?: string | null;
          createdAt?: string;
          email?: string | null;
          finalizedAt?: string | null;
          id?: string;
          onboardingURL?: string;
          organizationId?: string;
          state?: Database["public"]["Enums"]["SwanOnboardingState"];
          status?: Database["public"]["Enums"]["SwanOnboardingStatus"];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SwanAccountOnboarding_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanCard: {
        Row: {
          accountId: string;
          cardContractExpiryDate: string | null;
          cardMaskedNumber: string;
          createdAt: string;
          currency: string;
          eCommerce: boolean;
          expiryDate: string | null;
          id: string;
          international: boolean;
          limitAmount: number;
          limitPeriod: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          membershipId: string;
          name: string | null;
          nonMainCurrencyTransactions: boolean;
          status: Database["public"]["Enums"]["SwanCardStatus"];
          type: Database["public"]["Enums"]["SwanCardType"];
          updatedAt: string;
          withdrawal: boolean;
        };
        Insert: {
          accountId: string;
          cardContractExpiryDate?: string | null;
          cardMaskedNumber: string;
          createdAt: string;
          currency: string;
          eCommerce: boolean;
          expiryDate?: string | null;
          id: string;
          international: boolean;
          limitAmount: number;
          limitPeriod: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          membershipId: string;
          name?: string | null;
          nonMainCurrencyTransactions: boolean;
          status?: Database["public"]["Enums"]["SwanCardStatus"];
          type: Database["public"]["Enums"]["SwanCardType"];
          updatedAt: string;
          withdrawal: boolean;
        };
        Update: {
          accountId?: string;
          cardContractExpiryDate?: string | null;
          cardMaskedNumber?: string;
          createdAt?: string;
          currency?: string;
          eCommerce?: boolean;
          expiryDate?: string | null;
          id?: string;
          international?: boolean;
          limitAmount?: number;
          limitPeriod?: Database["public"]["Enums"]["SwanSpendingLimitPeriod"];
          membershipId?: string;
          name?: string | null;
          nonMainCurrencyTransactions?: boolean;
          status?: Database["public"]["Enums"]["SwanCardStatus"];
          type?: Database["public"]["Enums"]["SwanCardType"];
          updatedAt?: string;
          withdrawal?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "SwanCard_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "SwanAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SwanCard_membershipId_fkey";
            columns: ["membershipId"];
            isOneToOne: false;
            referencedRelation: "SwanAccountMembership";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanMerchant: {
        Row: {
          categoryCode: string;
          categoryDescription: string;
          city: string;
          country: string | null;
          createdAt: string;
          id: string;
          name: string;
          postalCode: string | null;
          updatedAt: string;
        };
        Insert: {
          categoryCode: string;
          categoryDescription: string;
          city: string;
          country?: string | null;
          createdAt?: string;
          id: string;
          name: string;
          postalCode?: string | null;
          updatedAt: string;
        };
        Update: {
          categoryCode?: string;
          categoryDescription?: string;
          city?: string;
          country?: string | null;
          createdAt?: string;
          id?: string;
          name?: string;
          postalCode?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      SwanTransaction: {
        Row: {
          accountId: string;
          amount: number;
          authorizationType:
            | Database["public"]["Enums"]["SwanAuthorizationType"]
            | null;
          bookedBalanceAfter: number | null;
          cardId: string | null;
          category: Database["public"]["Enums"]["SwanCategory"] | null;
          counterParty: string;
          createdAt: string;
          currency: string;
          currencyExchange: Json[] | null;
          executionDate: string;
          externalReference: string | null;
          id: string;
          label: string;
          maskedPan: string | null;
          merchantId: string | null;
          originalAmount: number | null;
          originalCurrency: string | null;
          originTransactionId: string | null;
          paymentMethodIdentifier: string;
          paymentProduct: Database["public"]["Enums"]["SwanPaymentProduct"];
          reference: string;
          requestedExecutionAt: string | null;
          side: Database["public"]["Enums"]["SwanTransactionSide"];
          status: Database["public"]["Enums"]["SwanTransactionStatus"];
          terminalId: string | null;
          type: Database["public"]["Enums"]["SwanTransactionTypeEnum"];
          updatedAt: string;
        };
        Insert: {
          accountId: string;
          amount: number;
          authorizationType?:
            | Database["public"]["Enums"]["SwanAuthorizationType"]
            | null;
          bookedBalanceAfter?: number | null;
          cardId?: string | null;
          category?: Database["public"]["Enums"]["SwanCategory"] | null;
          counterParty: string;
          createdAt: string;
          currency: string;
          currencyExchange?: Json[] | null;
          executionDate: string;
          externalReference?: string | null;
          id: string;
          label: string;
          maskedPan?: string | null;
          merchantId?: string | null;
          originalAmount?: number | null;
          originalCurrency?: string | null;
          originTransactionId?: string | null;
          paymentMethodIdentifier: string;
          paymentProduct: Database["public"]["Enums"]["SwanPaymentProduct"];
          reference: string;
          requestedExecutionAt?: string | null;
          side: Database["public"]["Enums"]["SwanTransactionSide"];
          status: Database["public"]["Enums"]["SwanTransactionStatus"];
          terminalId?: string | null;
          type: Database["public"]["Enums"]["SwanTransactionTypeEnum"];
          updatedAt: string;
        };
        Update: {
          accountId?: string;
          amount?: number;
          authorizationType?:
            | Database["public"]["Enums"]["SwanAuthorizationType"]
            | null;
          bookedBalanceAfter?: number | null;
          cardId?: string | null;
          category?: Database["public"]["Enums"]["SwanCategory"] | null;
          counterParty?: string;
          createdAt?: string;
          currency?: string;
          currencyExchange?: Json[] | null;
          executionDate?: string;
          externalReference?: string | null;
          id?: string;
          label?: string;
          maskedPan?: string | null;
          merchantId?: string | null;
          originalAmount?: number | null;
          originalCurrency?: string | null;
          originTransactionId?: string | null;
          paymentMethodIdentifier?: string;
          paymentProduct?: Database["public"]["Enums"]["SwanPaymentProduct"];
          reference?: string;
          requestedExecutionAt?: string | null;
          side?: Database["public"]["Enums"]["SwanTransactionSide"];
          status?: Database["public"]["Enums"]["SwanTransactionStatus"];
          terminalId?: string | null;
          type?: Database["public"]["Enums"]["SwanTransactionTypeEnum"];
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SwanTransaction_accountId_fkey";
            columns: ["accountId"];
            isOneToOne: false;
            referencedRelation: "SwanAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SwanTransaction_cardId_fkey";
            columns: ["cardId"];
            isOneToOne: false;
            referencedRelation: "SwanCard";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "SwanTransaction_merchantId_fkey";
            columns: ["merchantId"];
            isOneToOne: false;
            referencedRelation: "SwanMerchant";
            referencedColumns: ["id"];
          }
        ];
      };
      SwanUser: {
        Row: {
          accessToken: string | null;
          birthDate: string | null;
          createdAt: string;
          expert_verified: boolean | null;
          firstName: string | null;
          id: string;
          identificationStatus:
            | Database["public"]["Enums"]["SwanIdentificationStatus"]
            | null;
          idVerified: boolean;
          joinedAt: string;
          lastName: string | null;
          phone: string;
          PVID_verified: boolean | null;
          QES_verified: boolean | null;
          updatedAt: string;
        };
        Insert: {
          accessToken?: string | null;
          birthDate?: string | null;
          createdAt: string;
          expert_verified?: boolean | null;
          firstName?: string | null;
          id: string;
          identificationStatus?:
            | Database["public"]["Enums"]["SwanIdentificationStatus"]
            | null;
          idVerified: boolean;
          joinedAt: string;
          lastName?: string | null;
          phone: string;
          PVID_verified?: boolean | null;
          QES_verified?: boolean | null;
          updatedAt: string;
        };
        Update: {
          accessToken?: string | null;
          birthDate?: string | null;
          createdAt?: string;
          expert_verified?: boolean | null;
          firstName?: string | null;
          id?: string;
          identificationStatus?:
            | Database["public"]["Enums"]["SwanIdentificationStatus"]
            | null;
          idVerified?: boolean;
          joinedAt?: string;
          lastName?: string | null;
          phone?: string;
          PVID_verified?: boolean | null;
          QES_verified?: boolean | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "SwanUser_phone_fkey";
            columns: ["phone"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["phone"];
          }
        ];
      };
      Task: {
        Row: {
          completedAt: string | null;
          count: number;
          createdAt: string;
          description: string | null;
          dueDate: string;
          id: string;
          isComplete: boolean;
          link: string | null;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Insert: {
          completedAt?: string | null;
          count: number;
          createdAt?: string;
          description?: string | null;
          dueDate: string;
          id: string;
          isComplete?: boolean;
          link?: string | null;
          name: string;
          organizationId: string;
          updatedAt: string;
        };
        Update: {
          completedAt?: string | null;
          count?: number;
          createdAt?: string;
          description?: string | null;
          dueDate?: string;
          id?: string;
          isComplete?: boolean;
          link?: string | null;
          name?: string;
          organizationId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Task_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
      Team_member: {
        Row: {
          createdAt: string;
          id: string;
          isActive: boolean;
          lastJoined: string | null;
          organizationId: string;
          role: Database["public"]["Enums"]["team_member_roles"];
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          isActive?: boolean;
          lastJoined?: string | null;
          organizationId: string;
          role: Database["public"]["Enums"]["team_member_roles"];
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          isActive?: boolean;
          lastJoined?: string | null;
          organizationId?: string;
          role?: Database["public"]["Enums"]["team_member_roles"];
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Team_member_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Team_member_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Team_member_assignment: {
        Row: {
          billId: string | null;
          createdAt: string;
          expenseId: string | null;
          id: string;
          invoiceId: string | null;
          taskId: string | null;
          team_member_Id: string;
          updatedAt: string;
        };
        Insert: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          id: string;
          invoiceId?: string | null;
          taskId?: string | null;
          team_member_Id: string;
          updatedAt: string;
        };
        Update: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          id?: string;
          invoiceId?: string | null;
          taskId?: string | null;
          team_member_Id?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Team_member_assignment_billId_fkey";
            columns: ["billId"];
            isOneToOne: false;
            referencedRelation: "Bill";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Team_member_assignment_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Team_member_assignment_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Team_member_assignment_taskId_fkey";
            columns: ["taskId"];
            isOneToOne: false;
            referencedRelation: "Task";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Team_member_assignment_team_member_Id_fkey";
            columns: ["team_member_Id"];
            isOneToOne: false;
            referencedRelation: "Team_member";
            referencedColumns: ["id"];
          }
        ];
      };
      Transaction: {
        Row: {
          accountingStatus: Database["public"]["Enums"]["AccountingStatus"];
          amount: number;
          bankAccountId: string;
          bill: string | null;
          billStatus: Database["public"]["Enums"]["TransactionBillStatus"];
          bookingDateTime: string;
          categoryId: string | null;
          createdAt: string;
          currency: string;
          date: string;
          description: string;
          hash: string;
          id: string;
          isHidden: boolean;
          isoBankTransactionCode: Json;
          isRecurring: boolean;
          merchantId: string | null;
          proofStatus: Database["public"]["Enums"]["ProofStatus"];
          proprietaryCode: string | null;
          proprietaryIssuer: string | null;
          rawJSON: Json | null;
          recurringType:
            | Database["public"]["Enums"]["TransactionRecurringType"]
            | null;
          status: string;
          subCategoryId: string | null;
          updatedAt: string;
        };
        Insert: {
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          amount: number;
          bankAccountId: string;
          bill?: string | null;
          billStatus?: Database["public"]["Enums"]["TransactionBillStatus"];
          bookingDateTime: string;
          categoryId?: string | null;
          createdAt?: string;
          currency: string;
          date: string;
          description: string;
          hash: string;
          id: string;
          isHidden?: boolean;
          isoBankTransactionCode: Json;
          isRecurring?: boolean;
          merchantId?: string | null;
          proofStatus?: Database["public"]["Enums"]["ProofStatus"];
          proprietaryCode?: string | null;
          proprietaryIssuer?: string | null;
          rawJSON?: Json | null;
          recurringType?:
            | Database["public"]["Enums"]["TransactionRecurringType"]
            | null;
          status: string;
          subCategoryId?: string | null;
          updatedAt: string;
        };
        Update: {
          accountingStatus?: Database["public"]["Enums"]["AccountingStatus"];
          amount?: number;
          bankAccountId?: string;
          bill?: string | null;
          billStatus?: Database["public"]["Enums"]["TransactionBillStatus"];
          bookingDateTime?: string;
          categoryId?: string | null;
          createdAt?: string;
          currency?: string;
          date?: string;
          description?: string;
          hash?: string;
          id?: string;
          isHidden?: boolean;
          isoBankTransactionCode?: Json;
          isRecurring?: boolean;
          merchantId?: string | null;
          proofStatus?: Database["public"]["Enums"]["ProofStatus"];
          proprietaryCode?: string | null;
          proprietaryIssuer?: string | null;
          rawJSON?: Json | null;
          recurringType?:
            | Database["public"]["Enums"]["TransactionRecurringType"]
            | null;
          status?: string;
          subCategoryId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Transaction_bankAccountId_fkey";
            columns: ["bankAccountId"];
            isOneToOne: false;
            referencedRelation: "BankAccount";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_merchantId_fkey";
            columns: ["merchantId"];
            isOneToOne: false;
            referencedRelation: "Merchant";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_subCategoryId_fkey";
            columns: ["subCategoryId"];
            isOneToOne: false;
            referencedRelation: "SubCategory";
            referencedColumns: ["id"];
          }
        ];
      };
      Transaction_mapping: {
        Row: {
          billId: string | null;
          createdAt: string;
          expenseId: string | null;
          id: string;
          invoiceId: string | null;
          transactionId: string;
          updatedAt: string;
        };
        Insert: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          id: string;
          invoiceId?: string | null;
          transactionId: string;
          updatedAt: string;
        };
        Update: {
          billId?: string | null;
          createdAt?: string;
          expenseId?: string | null;
          id?: string;
          invoiceId?: string | null;
          transactionId?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Transaction_mapping_billId_fkey";
            columns: ["billId"];
            isOneToOne: false;
            referencedRelation: "Bill";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_mapping_expenseId_fkey";
            columns: ["expenseId"];
            isOneToOne: false;
            referencedRelation: "Expense";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_mapping_invoiceId_fkey";
            columns: ["invoiceId"];
            isOneToOne: false;
            referencedRelation: "Invoice";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transaction_mapping_transactionId_fkey";
            columns: ["transactionId"];
            isOneToOne: false;
            referencedRelation: "Transaction";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          address: string | null;
          city: string | null;
          countryId: number | null;
          createdAt: string;
          dateOfBirth: string | null;
          email: string;
          firstName: string;
          id: string;
          isApproved: boolean;
          lastName: string;
          name: string;
          passportURL: string | null;
          phone: string;
          photo: string | null;
          postCode: string | null;
          SSN: string | null;
          state: string | null;
          updatedAt: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          countryId?: number | null;
          createdAt?: string;
          dateOfBirth?: string | null;
          email: string;
          firstName: string;
          id: string;
          isApproved?: boolean;
          lastName: string;
          name: string;
          passportURL?: string | null;
          phone: string;
          photo?: string | null;
          postCode?: string | null;
          SSN?: string | null;
          state?: string | null;
          updatedAt: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          countryId?: number | null;
          createdAt?: string;
          dateOfBirth?: string | null;
          email?: string;
          firstName?: string;
          id?: string;
          isApproved?: boolean;
          lastName?: string;
          name?: string;
          passportURL?: string | null;
          phone?: string;
          photo?: string | null;
          postCode?: string | null;
          SSN?: string | null;
          state?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "User_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "User_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      Vendor: {
        Row: {
          address: string;
          business_number: string | null;
          business_tax_number: string | null;
          city: string;
          countryId: number;
          createdAt: string;
          email: string;
          id: string;
          name: string;
          organizationId: string;
          phone: string;
          photo: string | null;
          postCode: string;
          updatedAt: string;
        };
        Insert: {
          address: string;
          business_number?: string | null;
          business_tax_number?: string | null;
          city: string;
          countryId: number;
          createdAt?: string;
          email: string;
          id: string;
          name: string;
          organizationId: string;
          phone: string;
          photo?: string | null;
          postCode: string;
          updatedAt?: string;
        };
        Update: {
          address?: string;
          business_number?: string | null;
          business_tax_number?: string | null;
          city?: string;
          countryId?: number;
          createdAt?: string;
          email?: string;
          id?: string;
          name?: string;
          organizationId?: string;
          phone?: string;
          photo?: string | null;
          postCode?: string;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Vendor_countryId_fkey";
            columns: ["countryId"];
            isOneToOne: false;
            referencedRelation: "Country";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Vendor_organizationId_fkey";
            columns: ["organizationId"];
            isOneToOne: false;
            referencedRelation: "Organization";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      AccountingStatus: "needs_review" | "ready_to_export" | "synced";
      ApprovalStatus: "pending" | "approved" | "rejected" | "not_needed";
      BillingType: "starter" | "pro";
      BillStatus:
        | "draft"
        | "received"
        | "paid"
        | "cancelled"
        | "overdue"
        | "scheduled";
      BusinessType:
        | "company"
        | "government_entity"
        | "individual"
        | "non_profit";
      CategoryGroup: "revenue" | "cost" | "internal";
      ContractType:
        | "FULL_TIME"
        | "PART_TIME"
        | "CONTRACTOR"
        | "CONSULTANT"
        | "FREELANCE"
        | "INTERNSHIP"
        | "APPRENTICESHIP";
      ExpenseStatus:
        | "pending"
        | "processing"
        | "reimbursed"
        | "cancelled"
        | "rejected"
        | "draft"
        | "sent";
      FileType:
        | "invoice"
        | "bill"
        | "expense"
        | "transaction"
        | "receipt"
        | "contract"
        | "agreement"
        | "other";
      IntegrationApp:
        | "Nmbrs"
        | "KiwiHR"
        | "BambooHR"
        | "NetSuite"
        | "XERO"
        | "QuickBooks";
      InvoiceStatus:
        | "draft"
        | "sent"
        | "paid"
        | "cancelled"
        | "overdue"
        | "scheduled";
      Period: "monthly" | "yearly";
      Product:
        | "INVOICE"
        | "BILL"
        | "EXPENSE"
        | "BANK_INTEGRATION"
        | "CARD_ISSUING_US"
        | "CARD_ISSUING_EU";
      ProductType: "INVOICE" | "BILL" | "EXPENSE" | "TRANSACTION";
      ProofStatus: "missing" | "complete" | "not_needed";
      StripeCardStatus: "active" | "inactive" | "canceled";
      StripeCardType: "physical" | "virtual";
      SwanAccountCountry: "FRA" | "DEU" | "ESP" | "NLD";
      SwanAccountHolderStatus: "Enabled" | "Suspended" | "Canceled";
      SwanAccountMembershipStatus:
        | "ConsentPending"
        | "InvitationSent"
        | "BindingUserError"
        | "Enabled"
        | "Suspended"
        | "Disabled";
      SwanAccountStatus: "Opened" | "Suspended" | "Closing" | "Closed";
      SwanAuthorizationType: "Classic" | "PreAuthorization" | "DataRequest";
      SwanCardStatus:
        | "ConsentPending"
        | "Processing"
        | "Enabled"
        | "Canceled"
        | "Canceling";
      SwanCardType: "Virtual" | "VirtualAndPhysical" | "SingleUseVirtual";
      SwanCashAccountType:
        | "Current"
        | "CashPayment"
        | "Charges"
        | "CashIncome"
        | "Commission"
        | "ClearingParticipantSettlementAccount"
        | "LimitedLiquiditySavingsAccount"
        | "Loan"
        | "MarginalLending"
        | "MoneyMarket"
        | "NonResidentExternal"
        | "Overdraft"
        | "OverNightDeposit"
        | "OtherAccount"
        | "Settlement"
        | "Salary"
        | "Savings"
        | "Tax"
        | "TransactingAccount"
        | "CashTrading";
      SwanCategory:
        | "InStore"
        | "eCommerce"
        | "eCommerceWith3DS"
        | "Withdrawal"
        | "Other";
      SwanIdentificationStatus:
        | "Uninitiated"
        | "Processing"
        | "ReadyToSign"
        | "ValidIdentity"
        | "InsufficientDocumentQuality"
        | "InvalidIdentity";
      SwanOnboardingState: "Ongoing" | "Completed";
      SwanOnboardingStatus: "Finalized" | "Invalid" | "Valid";
      SwanPartnershipStatus: "Accepted" | "Canceling" | "Canceled";
      SwanPaymentAccountType: "EMoney" | "PaymentService";
      SwanPaymentLevel: "Limited" | "Unlimited";
      SwanPaymentProduct:
        | "InternalCreditTransfer"
        | "SEPACreditTransfer"
        | "SEPADirectDebit"
        | "Card"
        | "Fees"
        | "InternalDirectDebit"
        | "Check"
        | "InternationalCreditTransfer";
      SwanSpendingLimitPeriod: "Monthly" | "Weekly" | "Daily" | "Always";
      SwanSpendingLimitType: "AccountHolder" | "Partner";
      SwanTransactionSide: "Debit" | "Credit";
      SwanTransactionStatus:
        | "Booked"
        | "Rejected"
        | "Pending"
        | "Canceled"
        | "Upcoming"
        | "Released";
      SwanTransactionTypeEnum:
        | "InternalCreditTransferOut"
        | "InternalCreditTransferOutReturn"
        | "InternalCreditTransferOutRecall"
        | "InternalCreditTransferIn"
        | "InternalCreditTransferInReturn"
        | "InternalCreditTransferInRecall"
        | "SepaCreditTransferOut"
        | "SepaInstantCreditTransferOut"
        | "SepaInstantCreditTransferIn"
        | "SepaCreditTransferOutReturn"
        | "SepaInstantCreditTransferOutRecall"
        | "SepaInstantCreditTransferInRecall"
        | "SepaCreditTransferOutRecall"
        | "SepaCreditTransferIn"
        | "SepaCreditTransferInReturn"
        | "SepaCreditTransferInRecall"
        | "FeesOut"
        | "FeesIn"
        | "SepaDirectDebitIn"
        | "SepaDirectDebitInReturn"
        | "SepaDirectDebitInReversal"
        | "SepaDirectDebitOut"
        | "SepaDirectDebitOutReturn"
        | "SepaDirectDebitOutReversal"
        | "CardOutAuthorization"
        | "CardOutDebit"
        | "CardOutDebitReversal"
        | "CardOutCredit"
        | "CardOutCreditReversal"
        | "InternalDirectDebitIn"
        | "InternalDirectDebitInReturn"
        | "InternalDirectDebitOut"
        | "InternalDirectDebitOutReturn"
        | "CheckIn"
        | "CheckInReturn"
        | "InternationalCreditTransferIn"
        | "InternationalCreditTransferOut"
        | "InternationalCreditTransferInReturn"
        | "InternationalCreditTransferOutReturn";
      SwanVerificationStatus:
        | "NotStarted"
        | "WaitingForInformation"
        | "Pending"
        | "Verified"
        | "Refused";
      team_member_roles: "viewer" | "employee" | "admin";
      TransactionBillStatus: "missing" | "complete" | "not_needed";
      TransactionRecurringType: "monthly" | "yearly";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
