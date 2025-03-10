"use client";

import { DEMO_SESSION } from "@/constants";
import { socket } from "@/utils/socket";
import { supabase } from "@/utils/supabase";
import { api, RouterOutputs } from "@/utils/trpc";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type User = NonNullable<RouterOutputs["users"]["userById"]>;

interface Props<S extends boolean> {
  session: Session | null;
  userId: S extends true ? string : undefined;
  logout: () => Promise<void>;
  user: S extends true ? User : null;
  refetch: () => Promise<any>;
}

const LocalStateContext = createContext<any>({});
const LocalStateProvider = LocalStateContext.Provider;

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const userId = session?.user.id || "";
  const prevSessionRef = useRef<Session | null>(null);

  const {
    data: user,
    isLoading,
    remove,
    refetch,
  } = api.users.userById.useQuery(userId, {
    enabled: !!userId,
  });

  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    if (DEMO_SESSION) {
      console.log("Using DEMO_SESSION");
      setSession(DEMO_SESSION);
      return;
    }

    const authListener = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (
          newSession &&
          prevSessionRef.current?.user.id !== newSession.user.id
        ) {
          setSession(newSession);
          socket.emit("join", newSession.user.id);
        } else if (!newSession) {
          setSession(null);
          utils.users.userById.setData(userId, null);
        }
        prevSessionRef.current = newSession;
      }
    );

    return () => {
      authListener.data?.subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    console.log("LOGOUT------------------------------------------------");
    if (DEMO_SESSION) return;
    await supabase.auth.signOut();
    router.push("/login");
    remove();
    setSession(null);
  };

  const scaleRef = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animateLogo = () => {
      let start: number | null = null;
      const duration = 1500;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = ((timestamp - start) % duration) / duration;
        const newScale = 0.85 + 0.3 * Math.sin(progress * Math.PI * 2);

        scaleRef.current = newScale;
        animationFrameRef.current = window.requestAnimationFrame(step);
      };

      animationFrameRef.current = window.requestAnimationFrame(step);

      return () => {
        if (animationFrameRef.current) {
          window.cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };

    return animateLogo();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full grid place-content-center">
        <div
          className="flex flex-col items-center justify-center gap-4"
          style={{
            transform: `scale(${scaleRef.current})`,
            transition: "transform 50ms ease-in-out",
          }}
        >
          <img
            src="https://api.dynt.ai/static/logo-192.png"
            alt="Dynt"
            className="w-16 rounded-lg"
          />
        </div>
      </div>
    );
  }

  console.log(session);
  console.log(userId);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@UserContext");
  console.log(user);

  return (
    <LocalStateProvider
      value={{
        session,
        userId: session?.user.id,
        logout,
        user,
        refetch,
      }}
    >
      {children}
    </LocalStateProvider>
  );
};

const useUser = <S extends boolean>() => {
  const context = useContext<Props<S>>(LocalStateContext);
  console.log(context, "useUser*************************");
  return context;
};

export { UserContextProvider, useUser };
