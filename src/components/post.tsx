"use client";
import { formatDate } from "~/lib/utils";

import { api } from "~/trpc/react";
import Link from "next/link";
import { Link2, Reply } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Post() {
  const [posts] = api.post.getPosts.useSuspenseQuery();

  if (!posts) return <div>None Found</div>;

  return (
    <div className="w-full max-w-3xl pb-24">
      <div className="grid grid-cols-1 gap-2 p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full rounded-xl border p-10 md:px-10 md:py-8"
          >
            <div className="mb-2 flex items-center">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <div className="mt-2 text-xs opacity-40">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
              <div className="gap-2 ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white">
                <Link href={`/`}>
                  <Reply className="text-foreground" />
                </Link>
                <Link href={`/`}>
                  <Link2 className="text-foreground" />
                </Link>
              </div>
            </div>
            <div className="inline-block w-full whitespace-pre-wrap break-words text-left leading-[1.3] opacity-80">
              {post.name}
            </div>
            <div className="mt-2 text-xs">
              <Badge variant="secondary">
                {post.isAdmin ? "USER" : "ADMIN"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
