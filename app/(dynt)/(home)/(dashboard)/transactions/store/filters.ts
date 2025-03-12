import { Enums } from "@/types";
import endOfYear from "date-fns/endOfYear";
import startOfYear from "date-fns/startOfYear";
import { atom } from "jotai";

export type Filters = {
  period: {
    startDate: Date;
    endDate: Date;
  };
  accountId?: string;
  type?: "debit" | "credit";
  duplicatesOnly?: boolean;
  status?: Enums["SwanTransactionStatus"];
};
export const filterAtom = atom<Filters>({
  period: {
    startDate: startOfYear(new Date()),
    endDate: endOfYear(new Date()),
  },
});
