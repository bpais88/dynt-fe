import { createTRPCReact } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

// import type { AppRouter } from "../../../dynt-server/src/trpc/routers/index.router";
// import type { AppRouter } from "../../../dynt-server/src/trpc/routers/index.router";
import type { AppRouter } from "../../dynt-server/src/trpc/routers/index.router";
export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
