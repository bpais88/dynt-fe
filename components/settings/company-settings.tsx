"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
import {
  Building,
  Check,
  CreditCard,
  FileCode,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { useState } from "react";

export function CompanySettings() {
  // State for form fields
  const [company, setCompany] = useState({
    businessName: "Product Builders Academy",
    vatNumber: "NL003594687B09",
    registrationNumber: "344492990B01",
    address: "Koeriestersplein 18",
    email: "bruno.pais88@gmail.com",
    city: "Amsterdam",
    phone: "+31 64 1119538",
    postalCode: "1011MR",
    website: "https://dynt.ai",
    privacyPolicyUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  // const { toast } = useToast();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      // toast({
      //   title: "Company information updated",
      //   description: "Your company information has been updated successfully.",
      // });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Company Settings</h2>
      <div className="flex items-center justify-between">
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Company Info</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Logo</CardTitle>
          <CardDescription>
            Your company logo will be displayed on invoices, reports, and other
            business documents
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Company Logo"
            />
            <AvatarFallback className="text-2xl bg-primary/10">
              PBA
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" disabled={!isEditing}>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Logo
            </Button>
            <p className="text-xs text-muted-foreground">
              Recommended: Square image, at least 300x300px
            </p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Your company&apos;s core business information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                value={company.businessName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vatNumber" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  VAT Number
                </Label>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  value={company.vatNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="registrationNumber"
                  className="flex items-center gap-1"
                >
                  <FileCode className="h-4 w-4" />
                  Business Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={company.registrationNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Business Address
              </Label>
              <Input
                id="address"
                name="address"
                value={company.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Business Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={company.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Business Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={company.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={company.city}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Additional Information
            </CardTitle>
            <CardDescription>
              Additional details about your company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={company.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <p className="text-xs text-muted-foreground">
                  Note: This field is duplicated from above
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={company.postalCode}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Website URL
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={company.website}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="privacyPolicyUrl"
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                Privacy Policy URL
              </Label>
              <Input
                id="privacyPolicyUrl"
                name="privacyPolicyUrl"
                type="url"
                placeholder="Enter privacy policy URL"
                value={company.privacyPolicyUrl}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
        {isEditing && (
          <CardFooter className="flex justify-end border-t px-6 py-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </form>
    </div>
  );
}
