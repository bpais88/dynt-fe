import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganization } from "@/context/OrganizationContext";

export function OrganizationSelector() {
  const { organization, organizations, setOrganization } = useOrganization();

  //   const handleCreateNewOrg = useCallback(() => {
  //     console.log("TODO:Create new organization");
  //   }, []);

  return (
    <div className="px-2 mt-2">
      <Select
        value={organization?.id}
        onValueChange={(value) => {
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
        </SelectContent>
      </Select>
    </div>
  );
}
