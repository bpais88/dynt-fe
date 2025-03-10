import { DEMO_SESSION, SERVER_ADDRESS } from "@/constants";
import { api } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { FC, ReactNode, useState } from "react";

import { logError } from "@/utils/helper";
import toast from "react-hot-toast";
import superjson from "superjson";

const TrpcContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (e: any) => {
              logError(e);
              if (DEMO_SESSION) toast.error("Action not allowed in demo mode");
              else toast.error(e.message || "Something went wrong");
            },
          },
          queries: { onError: logError },
        },
      })
  );
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [httpBatchLink({ url: `${SERVER_ADDRESS}/v2` })],
      transformer: superjson,
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};

export default TrpcContext;
