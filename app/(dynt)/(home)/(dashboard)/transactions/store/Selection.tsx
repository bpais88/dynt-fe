import { atom } from "jotai";
import { TransactionHistory } from "../page";

export const selectionAtom = atom<Record<string, TransactionHistory>>({});
