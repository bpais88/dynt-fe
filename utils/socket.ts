import { SERVER_ADDRESS } from "@/constants";
import { io } from "socket.io-client";

export const socket = io(SERVER_ADDRESS, { autoConnect: true });
