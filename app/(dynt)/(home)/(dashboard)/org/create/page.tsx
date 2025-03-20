"use client";

import LoadingSpin from "@/components/LoadingSpin";
import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useOrganization } from "@/context/OrganizationContext";
import { useUser } from "@/context/UserContext";
import { countries } from "@/lib/countries";
import { mccList } from "@/lib/mccList";
import { CreateOrganization, UpdateOrganization } from "@/types/validation";
import { formatLabel } from "@/utils/helper";
import { api } from "@/utils/trpc";
import useForm from "@/utils/useForm";
import { useRouter } from "next/navigation";
import React, { memo, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { BiCheck } from "react-icons/bi";
import { CgAsterisk } from "react-icons/cg";

// Required fields based on CreateOrganization validation schema
const requiredFields = [
  "name",
  "type",
  "mcc",
  "defaultCurrency",
  "countryId",
  "phone",
  "email",
  "address",
];

// Split base fields into separate components
const FormField = memo(
  ({
    name,
    title,
    placeholder,
    value,
    onChange,
    error,
    required = false,
  }: {
    name: string;
    title: string;
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    error?: string;
    required?: boolean;
  }) => (
    <div key={name}>
      <Label className="flex items-center">
        {title}
        {required && (
          <CgAsterisk
            className="ml-1 text-red-500 w-2 h-2"
            aria-hidden="true"
          />
        )}
      </Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
);
FormField.displayName = "FormField";

const employeeCounts = [
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "501-1000",
  "1001-5000",
  "5001+",
];

const types: UpdateOrganization["type"][] = [
  "company",
  "government_entity",
  "individual",
  "non_profit",
];

const baseFields = [
  { name: "name", title: "Business Name", placeholder: "Enter business name" },
  {
    name: "business_tax_number",
    title: "Business Tax Number",
    placeholder: "Enter business tax number",
  },
  {
    name: "business_number",
    title: "Business Number",
    placeholder: "Enter business number",
  },
  { name: "address", title: "Address", placeholder: "Enter company address" },
  {
    name: "email",
    title: "Email Address",
    placeholder: "Enter business email",
  },
  { name: "city", title: "City", placeholder: "Enter city" },
  { name: "state", title: "State", placeholder: "Enter state" },
  { name: "postCode", title: "Postal Code", placeholder: "Enter postal code" },
  { name: "website", title: "Website", placeholder: "Enter website" },
  {
    name: "policyURL",
    title: "Privacy Policy URL",
    placeholder: "Enter privacy policy URL",
  },
];

const MemoizedSelectItem = memo(SelectItem);

// Memoize expensive lists
const MccSelect = memo(
  ({
    onValueChange,
    error,
  }: {
    onValueChange: (value: string) => void;
    error?: string;
  }) => (
    <div className="md:col-span-2">
      <Label className="flex items-center">
        MCC
        <CgAsterisk className="ml-1 text-red-500 w-2 h-2" aria-hidden="true" />
      </Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="Select MCC" />
        </SelectTrigger>
        <SelectContent>
          {mccList.map((mcc) => (
            <MemoizedSelectItem key={mcc.code} value={mcc.code}>
              {`${mcc.category} (${mcc.code})`}
            </MemoizedSelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
);
MccSelect.displayName = "MccSelect";

export default function CreateOrganizationPage() {
  const { userId } = useUser<true>();
  const { handleChange, inputs, setValue, errors, setErrors } = useForm<
    Partial<CreateOrganization>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const utils = api.useUtils();
  const createOrg = api.organizations.create.useMutation();

  const { organizations, setOrganization } = useOrganization();
  const router = useRouter();

  // Function to check if a field is required
  const isFieldRequired = (fieldName: string) =>
    requiredFields.includes(fieldName);

  // Memoize form fields
  const basicInfoFields = useMemo(
    () =>
      baseFields
        .slice(0, 6)
        .map(({ name, title, placeholder }) => (
          <FormField
            key={name}
            name={name}
            title={title}
            placeholder={placeholder}
            onChange={handleChange(name as keyof CreateOrganization)}
            value={inputs[name as keyof CreateOrganization] || ""}
            error={errors[name as keyof CreateOrganization]}
            required={isFieldRequired(name)}
          />
        )),
    [inputs, handleChange, errors]
  );

  const additionalInfoFields = useMemo(
    () =>
      baseFields
        .slice(6)
        .map(({ name, title, placeholder }) => (
          <FormField
            key={name}
            name={name}
            title={title}
            placeholder={placeholder}
            value={inputs[name as keyof CreateOrganization] || ""}
            onChange={handleChange(name as keyof CreateOrganization)}
            error={errors[name as keyof CreateOrganization]}
            required={isFieldRequired(name)}
          />
        )),
    [inputs, handleChange, errors]
  );

  const validateForm = () => {
    const validationResult = CreateOrganization.safeParse(inputs);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;

      // Create custom user-friendly error messages for required fields
      const enhancedErrors: Record<string, string> = {};

      for (const field of requiredFields) {
        if (!inputs[field as keyof CreateOrganization] && fieldErrors[field]) {
          const fieldName =
            baseFields.find((f) => f.name === field)?.title ||
            formatLabel(field);
          enhancedErrors[field] = `${fieldName} is required`;
        }
      }

      // Merge with other validation errors
      setErrors({
        ...fieldErrors,
        ...enhancedErrors,
      });

      return false;
    }

    return true;
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const validatedData = CreateOrganization.parse(inputs);
      const res = await createOrg.mutateAsync({
        ...validatedData,
        userId: userId,
      });

      utils.organizations.myOrganizations.setData(userId, (p = []) =>
        p.map((o) => (o.id === res.id ? { ...o, ...res } : o))
      );

      console.log("Organization created", res, res.id);
      console.log(organizations, "&&&");
      if (res.id) {
        setOrganization(res);
        // router.push(`/organizations/${res.id}`);
        router.push("/");
      }
    } catch (error: any) {
      console.error("Failed to create organization", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create Organization</h2>
        <div className="text-sm text-gray-500 flex items-center">
          <CgAsterisk className="mr-1 text-red-500 w-2 h-2" />
          <span>Required field</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicInfoFields}
          <div>
            <Label className="flex items-center">
              Phone Number
              <CgAsterisk
                className="ml-1 text-red-500 w-2 h-2"
                aria-hidden="true"
              />
            </Label>
            <PhoneInput
              onChange={(e) => setValue("phone", e)}
              value={inputs.phone}
              isError={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <Label className="flex items-center">
              Business Type
              <CgAsterisk
                className="ml-1 text-red-500 w-2 h-2"
                aria-hidden="true"
              />
            </Label>
            <Select onValueChange={(e) => setValue("type", e)}>
              <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <MemoizedSelectItem key={type} value={type}>
                    {formatLabel(type)}
                  </MemoizedSelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>

          <MccSelect
            onValueChange={(e) => setValue("mcc", e)}
            error={errors.mcc}
          />

          <div>
            <Label className="flex items-center">
              Default Currency
              <CgAsterisk
                className="ml-1 text-red-500 w-2 h-2"
                aria-hidden="true"
              />
            </Label>
            <Select onValueChange={(e) => setValue("defaultCurrency", e)}>
              <SelectTrigger
                className={errors.defaultCurrency ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {["EUR", "GBP"].map((currency) => (
                  <MemoizedSelectItem key={currency} value={currency}>
                    {currency}
                  </MemoizedSelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.defaultCurrency && (
              <p className="text-red-500 text-sm mt-1">
                {errors.defaultCurrency}
              </p>
            )}
          </div>

          <div>
            <Label className="flex items-center">
              Country
              <CgAsterisk
                className="ml-1 text-red-500 w-2 h-2"
                aria-hidden="true"
              />
            </Label>
            <Select onValueChange={(e) => setValue("countryId", +e)}>
              <SelectTrigger
                className={errors.countryId ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <MemoizedSelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </MemoizedSelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.countryId && (
              <p className="text-red-500 text-sm mt-1">{errors.countryId}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalInfoFields}
        </CardContent>
      </Card>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleSave}
          className="w-fit"
          disabled={isSubmitting || createOrg.isLoading}
        >
          <BiCheck className="mr-2" /> Save
          <LoadingSpin loading={isSubmitting || createOrg.isLoading} />
        </Button>
      </div>
    </div>
  );
}
