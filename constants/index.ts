import { decodeBase64ToObject } from "@/utils/helper";
import { Session } from "@supabase/supabase-js";

export const SERVER_ADDRESS = process.env
  .NEXT_PUBLIC_VITE_SERVER_ADDRESS as string;

export const PAYMENT_HOST = process.env.VITE_PAYMENT_HOST as string;

export const SUPABASE_URL = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL as string;

export const SUPABASE_SERVICE_ROLE_KEY = process.env
  .VITE_SUPABASE_SERVICE_ROLE_KEY as string;

export const SUPABASE_ANON_KEY = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const TAGGUN_API_KEY = process.env.VITE_TAGGUN_API_KEY as string;

export const DEMO_SESSION_KEY = process.env.NEXT_PUBLIC_DEMO_SESSION;

export const DEMO_SESSION = DEMO_SESSION_KEY
  ? decodeBase64ToObject<Session>(DEMO_SESSION_KEY)
  : null;

export const ADMINS = ["hmshuvo314@gmail.com", "bruno.pais88@gmail.com"];

export const THEMES = {
  light: "pastel",
  dark: "night",
};

export const COLORS = {
  light: {
    primary: "#D1C1D7",
    secondary: "#F6CBD1",
    success: "#00A96E",
    error: "#FF5861",
    info: "#00B6FF",
    neutral: "#70ACC7",
  },
  dark: {
    primary: "#38BCF9",
    secondary: "#808CF9",
    success: "#2DD4BF",
    error: "#FB7085",
    info: "#0CA5E9",
    neutral: "#1E293B",
  },
} as const;
