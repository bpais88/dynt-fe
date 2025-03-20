import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganization } from "@/context/OrganizationContext";
import { useRouter } from "next/navigation";

export function OrganizationSelector() {
  const { organization, organizations, setOrganization } = useOrganization();
  const router = useRouter();

  const handleCreateNewOrg = () => {
    router.push("/org/create");
  };

  return (
    <div className="px-2 mt-2">
      <Select
        value={organization?.id}
        onValueChange={(value) => {
          if (value === "create-new") {
            handleCreateNewOrg();
            return;
          }

          const selected = organizations?.find((org) => org.id === value);
          if (selected) setOrganization(selected);
        }}
      >
        <SelectTrigger className="w-full text-xs h-8">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations?.map((org) => (
            <SelectItem key={org.id} value={org.id} className="text-xs">
              {org?.name}
            </SelectItem>
          ))}
          <SelectItem
            value="create-new"
            className="text-xs border-t mt-1 pt-1 text-blue-600 font-medium"
          >
            + Create New Organization
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
