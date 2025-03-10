import { FC, ReactNode } from "react";
import { OrganizationContextProvider } from "./OrganizationContext";
import TrpcContext from "./TrpcContext";
import { UserContextProvider } from "./UserContext";

type Props = {
  children: ReactNode;
};

const ContextProviders: FC<Props> = ({ children }) => {
  return (
    <>
      <TrpcContext>
        <UserContextProvider>
          <OrganizationContextProvider>{children}</OrganizationContextProvider>
        </UserContextProvider>
      </TrpcContext>
    </>
  );
};

export default ContextProviders;
