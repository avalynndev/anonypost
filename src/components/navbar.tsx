"use client";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "~/components/ui/credenza";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

import { api } from "~/trpc/react";
import { Github, SquarePlus } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ToggleTheme } from "~/components/toogle-theme";

export const Navbar = () => {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });
  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center space-y-1 px-4 py-2 text-lg font-bold"
        >
          <img className="size-6" src="/logo.png" alt="gemini logo" />
        </Link>
        <Credenza>
          <CredenzaTrigger asChild>
            <Button size="sm" variant="ghost">
              <SquarePlus className="h-4 w-4" />
              <div className="px-2 text-sm">New Post</div>
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Anonymous Post</CredenzaTitle>
              <CredenzaDescription>
                Type out a new post and make sure to keep it a secret 🔐
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createPost.mutate({ name });
                }}
                className="flex flex-col gap-2"
              >
                <Textarea
                  placeholder="i eat broccoli"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md px-4 py-2"
                />
                <Button type="submit" disabled={createPost.isPending}>
                  {createPost.isPending ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </CredenzaBody>
            <CredenzaFooter>
              <span className="text-sm text-muted-foreground">
                Crafted with ❤️
              </span>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </div>

      <div className="flex">
        <ToggleTheme />

        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/nobruf/shadcn-landing-page.git"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
