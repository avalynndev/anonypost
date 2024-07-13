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
import { Button } from "~/components/ui/button";
import { formatDate } from "~/lib/utils";
import { Input } from "~/components/ui/input";

import { api } from "~/trpc/react";

export function Post() {
  const [posts] = api.post.getPosts.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
      <div className="w-full max-w-3xl pb-24">
        <div className="flex items-center justify-center pb-4">
          <Credenza>
            <CredenzaTrigger asChild>
              <Button>New Post</Button>
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
                  <Input
                    type="text"
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
                <span className="text-muted-foreground text-sm">
                  Crafted with ❤️
                </span>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
        </div>
        <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="to-muted/30 mb-1 rounded-lg border bg-gradient-to-b from-transparent p-6 text-lg shadow-md"
            >
              <div className="">{post.name}</div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-xs">{formatDate(post.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
