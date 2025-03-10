import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/constants";
import { Database } from "@/types/schema";
import { Provider, createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export const listAuthUsers = async (page: number) => {
  const { data, error } = await supabase.auth.admin.listUsers({
    perPage: 10,
    page,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/reset-password",
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const inviteUser = async (email: string) => {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: window.location.origin,
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data.user;
};

export const uploadFile = async (file: File, id = uuidV4()) => {
  const { data, error } = await supabase.storage
    .from("files")
    .upload(`${id}_${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    toast.error("Error uploading file");
    throw new Error(error.message);
  }

  return data.path;
};

export const downloadFile = async (
  path: string,
  bucket = "files",
  warnUser: boolean = true
) => {
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error) {
    if (warnUser) {
      toast.error("Error downloading file");
    }
    throw new Error(error.message);
  }

  return data;
};

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    toast.error(error.message || "Error signing up");
    throw new Error(error.message || "Error signing up");
  }

  return data;
};

export const logInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const loginWithOAuth = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin },
    // options: { redirectTo: "http://localhost:3000" },
  });

  if (error) throw new Error(error.message);

  return data;
};

export const signUpWithOAuth = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + `/register/personal-details/`,
      // redirectTo: "http://localhost:3000" + `/register/personal-details/`,
    },
  });

  if (error) throw new Error(error.message);

  return data;
};
