"use client";

import PhoneInput from "@/components/PhoneInput";
import { useUser } from "@/context/UserContext";
import { countries } from "@/lib/countries";
import { mccList } from "@/lib/mccList";
import { CreateOrganization, UpdateOrganization } from "@/types/validation";
import { formatLabel } from "@/utils/helper";
import { api } from "@/utils/trpc";
import useForm from "@/utils/useForm";
import { toast } from "react-hot-toast";
import { BiCheck } from "react-icons/bi";

import LoadingSpin from "@/components/LoadingSpin";
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
import React, { memo, useMemo } from "react";

// Split base fields into separate components
const FormField = memo(
  ({
    name,
    title,
    placeholder,
    value,
    onChange,
    error,
  }: {
    name: string;
    title: string;
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    error?: string;
  }) => (
    <div key={name}>
      <Label>{title}</Label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
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
  ({ onValueChange }: { onValueChange: (value: string) => void }) => (
    <div className="md:col-span-2">
      <Label>MCC</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
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
    </div>
  )
);

MccSelect.displayName = "MccSelect";

export default function CreateOrganizationPage() {
  const { userId } = useUser<true>();
  const { handleChange, inputs, setValue, errors, setErrors } = useForm<
    Partial<CreateOrganization>
  >({});

  const utils = api.useUtils();
  const createOrg = api.organizations.create.useMutation();

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
          />
        )),
    [inputs, handleChange, errors]
  );

  const handleSave = async () => {
    const validate = CreateOrganization.safeParse(inputs);
    if (!validate.success) {
      setErrors(validate.error.formErrors.fieldErrors);
      console.log("validation Failed::", validate.error.formErrors.fieldErrors);
      return toast.error("Please fix the validation errors");
    }

    try {
      const res = await createOrg.mutateAsync({
        ...validate.data,
        userId: userId,
      });

      utils.organizations.myOrganizations.setData(userId, (p = []) =>
        p.map((o) => (o.id === res.id ? { ...o, ...res } : o))
      );

      console.log("Organization created successfully. Response:", res);
      toast.success("Organization created successfully");
    } catch (error) {
      toast.error("Failed to create organization");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Create Organization</h2>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {basicInfoFields}

          <PhoneInput
            onChange={(e) => setValue("phone", e)}
            value={inputs.phone}
            isError={!!errors.phone}
          />

          <div>
            <Label>Business Type</Label>
            <Select onValueChange={(e) => setValue("type", e)}>
              <SelectTrigger>
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
          </div>

          <MccSelect onValueChange={(e) => setValue("mcc", e)} />

          <div>
            <Label>Default Currency</Label>
            <Select onValueChange={(e) => setValue("defaultCurrency", e)}>
              <SelectTrigger>
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
          </div>

          <div>
            <Label>Country</Label>
            <Select onValueChange={(e) => setValue("countryId", +e)}>
              <SelectTrigger>
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

      <Button onClick={handleSave} className="ml-auto w-fit">
        <BiCheck className="mr-2" /> Save
        <LoadingSpin loading={createOrg.isLoading} />
      </Button>
    </div>
  );
}
