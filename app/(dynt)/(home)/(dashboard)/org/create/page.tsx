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

export default function CreateOrganizationPage() {
  const { userId } = useUser<true>();
  const { handleChange, inputs, setValue, errors, setErrors } =
    useForm<CreateOrganization>({
      phone: "",
      name: "",
      defaultCurrency: "",
      business_tax_number: "",
      email: "",
      countryId: 0,
    });

  const utils = api.useUtils();

  const createOrg = api.organizations.create.useMutation();

  const handleSave = async () => {
    const validate = CreateOrganization.safeParse(inputs);

    if (!validate.success) {
      setErrors(validate.error.formErrors.fieldErrors);
      console.log("validation Failed::", validate.error.formErrors.fieldErrors);
      return toast.error("Please fix the validation errors");
    }

    const res = await createOrg.mutateAsync({
      ...validate.data,
      userId: userId,
    });

    console.log("Organization created successfully. Response:", res);

    // utils.organizations.myOrganizations.setData(userId, (prev = []) => [
    //   ...prev,
    //   res,
    // ]);

    toast.success("Organization created successfully");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Create Organization</h2>
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {baseFields.slice(0, 6).map(({ name, title, placeholder }) => (
            <div key={name}>
              <Label>{title}</Label>
              <Input
                placeholder={placeholder}
                value={inputs[name as keyof CreateOrganization] || ""}
                onChange={handleChange(name as keyof CreateOrganization)}
              />
              {errors[name as keyof CreateOrganization] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof CreateOrganization]}
                </p>
              )}
            </div>
          ))}

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
                  <SelectItem key={type} value={type}>
                    {formatLabel(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>MCC</Label>
            <Select onValueChange={(e) => setValue("mcc", e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select MCC" />
              </SelectTrigger>
              <SelectContent>
                {mccList.map((mcc) => (
                  <SelectItem key={mcc.code} value={mcc.code}>
                    {`${mcc.category} (${mcc.code})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Default Currency</Label>
            <Select onValueChange={(e) => setValue("defaultCurrency", e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {["EUR", "GBP"].map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
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
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
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
          {baseFields.slice(6).map(({ name, title, placeholder }) => (
            <div key={name}>
              <Label>{title}</Label>
              <Input
                placeholder={placeholder}
                value={inputs[name as keyof CreateOrganization] || ""}
                onChange={handleChange(name as keyof CreateOrganization)}
              />
              {errors[name as keyof CreateOrganization] && (
                <p className="text-red-500 text-sm">
                  {errors[name as keyof CreateOrganization]}
                </p>
              )}
            </div>
          ))}

          <div>
            <Label>Employee Count</Label>
            <Select onValueChange={(e) => setValue("employeeCount", e)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee count" />
              </SelectTrigger>
              <SelectContent>
                {employeeCounts.map((count) => (
                  <SelectItem key={count} value={count}>
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Label>Require Approval to Transfer Payment</Label>
            <Switch
              checked={inputs.requiredApprovalToTransferPayment}
              onCheckedChange={(val) =>
                setValue("requiredApprovalToTransferPayment", val)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="ml-auto w-fit">
        <BiCheck className="mr-2" /> Save
        <LoadingSpin loading={createOrg.isLoading} />
      </Button>
    </div>
  );
}
