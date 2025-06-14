"use client";

import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
      settingsURL="/settings"
      avatar
      signUpFields={[]}
      nameRequired={false}
      Link={Link}
      deleteUser
      username
    >
      {children}
    </AuthUIProvider>
  );
}
