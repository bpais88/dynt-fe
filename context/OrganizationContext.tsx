import { decodeBase64ToString, encodeToBase64 } from "@/utils/helper";
import { socket } from "@/utils/socket";
import { RouterOutputs, api } from "@/utils/trpc";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./UserContext";

export type Organization =
  RouterOutputs["organizations"]["myOrganizations"][number];

interface Props<S extends boolean> {
  setOrganization: Dispatch<SetStateAction<Organization | null>>;
  organization: S extends true ? Organization : null;
  organizationId: S extends true ? string : undefined;
  organizations: Organization[];
  isLoading: boolean;
  refetch: (a?: any) => Promise<any>;
}

const LocalStateContext = createContext<any>({});

const LocalStateProvider = LocalStateContext.Provider;

const OrganizationContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const { userId } = useUser<true>();
  const [loading, setLoading] = useState(true);

  const {
    data: organizations = [],
    isLoading,
    refetch,
  } = api.organizations.myOrganizations.useQuery(userId, { enabled: !!userId });

  console.log(organizations, "organizations");

  const handleOrganization = useCallback(() => {
    if (!organizations.length) return setOrganization(null);
    organizations.forEach((o) => socket.emit("join", o.id));
    const _orgId = localStorage.getItem("@organizationId");

    if (!_orgId) return setOrganization(organizations[0]);
    const orgId = decodeBase64ToString(_orgId);

    const _organization =
      organizations.find((o) => o.id === orgId) || organizations[0];

    setOrganization(_organization);
  }, [organizations, setOrganization]);

  useEffect(() => {
    if (!userId) return setLoading(false);
    if (isLoading) return;

    handleOrganization();
    setLoading(false);
  }, [isLoading, userId, organizations, handleOrganization]);

  useEffect(() => {
    if (!organization) return;

    localStorage.setItem("@organizationId", encodeToBase64(organization.id));
  }, [organization]);

  if (userId && loading) return <>{/* <p>loading....spinner</p> */}</>;

  return (
    <LocalStateProvider
      value={{
        organization,
        setOrganization,
        organizations,
        organizationId: organization?.id,
        isLoading: loading,
        refetch,
      }}
    >
      {children}
    </LocalStateProvider>
  );
};

const useOrganization = <S extends boolean>() =>
  useContext<Props<S>>(LocalStateContext);

export { OrganizationContextProvider, useOrganization };
