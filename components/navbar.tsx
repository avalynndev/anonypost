"use client";

import {
  Annu,
  AnnuBody,
  AnnuContent,
  AnnuDescription,
  AnnuFooter,
  AnnuHeader,
  AnnuTitle,
  AnnuTrigger,
} from "@/components/ui/annu";
import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Github, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () => {
  const [annuOpen, setAnnuOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreatePost = async () => {
    if (!name.trim()) return;

    await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setName("");
    setAnnuOpen(false);
    // Optionally, you can refetch posts here if needed
    // await fetchPosts();
  };

  return (
    <header className="sticky top-5 z-40 mx-auto flex w-[90%] items-center justify-between rounded-2xl border border-secondary bg-card bg-opacity-15 p-2 shadow-inner md:w-[70%] lg:w-[75%] lg:max-w-screen-xl">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center space-y-1 px-4 py-2 text-lg font-bold"
        >
          <div className="relative size-6">
            <Image fill src="/logo.png" alt="gemini logo" />
          </div>
        </Link>

        <Annu open={annuOpen} onOpenChange={setAnnuOpen}>
          <AnnuTrigger asChild>
            <Button size="sm" variant="ghost">
              <SquarePlus className="h-4 w-4" />
              <div className="px-2 text-sm">New Post</div>
            </Button>
          </AnnuTrigger>

          <AnnuContent>
            <AnnuHeader>
              <AnnuTitle>Anonymous Post</AnnuTitle>
              <AnnuDescription>
                Type out a new post and make sure to keep it a secret 🔐
              </AnnuDescription>
            </AnnuHeader>

            <AnnuBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await handleCreatePost();
                }}
                className="flex flex-col gap-2"
              >
                <Textarea
                  name="name"
                  placeholder="i eat broccoli"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md px-4 py-2"
                />
                <Button type="submit">Submit</Button>
              </form>
            </AnnuBody>

            <AnnuFooter>
              <span className="text-sm text-muted-foreground">
                Crafted with ❤️
              </span>
            </AnnuFooter>
          </AnnuContent>
        </Annu>
      </div>

      <div className="flex">
        <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/avalynndev/anonypost"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
};
