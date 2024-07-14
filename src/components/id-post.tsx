"use client";
import { formatDate } from "~/lib/utils";

import { api } from "~/trpc/react";
import Link from "next/link";
import { Link2 } from "lucide-react";

export default function Post({id}:any) {
  const [posts] = api.post.getPostData.useSuspenseQuery();

  if (!posts) return <div>None Found</div>;

  return (
    <div className="w-full max-w-3xl pb-24">
      <div className="gap-2 p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-1 rounded-lg border bg-gradient-to-b from-transparent to-muted/30 p-6 text-lg shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl">{post.name}</h3>
              <p className="text-xs">
                <Link href={`/${post.id}`}>
                  <Link2 />
                </Link>
              </p>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
