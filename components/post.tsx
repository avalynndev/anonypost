"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import {
  CornerBottomLeftIcon,
  CrossCircledIcon,
  ChatBubbleIcon,
  HeartIcon,
  PaperPlaneIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { db } from "@/db";
import { post, reply } from "@/schema";
import { desc, eq } from "drizzle-orm";
import { useSession } from "@/lib/auth-client";

type Reply = {
  id: number;
  postId: number;
  body: string;
};

type Post = {
  id: number;
  name: string;
  createdAt: Date;
  isAdmin: boolean;
  replies?: Reply[];
};

export default function Post() {
  const router = useRouter();
  const session = useSession();
  const username = session.data?.user?.username ?? undefined;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await db
        .select()
        .from(post)
        .orderBy(desc(post.createdAt));
      const allReplies = await db.select().from(reply);

      // Map replies to postId
      const postWithReplies = allPosts.map((p) => ({
        ...p,
        replies: allReplies.filter((r) => r.postId === p.id),
      }));

      setPosts(postWithReplies);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const visiblePosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl pb-24">
      <div className="grid grid-cols-1 gap-2 p-4">
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="mb-4 w-full rounded-md text-sm"
        />
        {loading ? (
          <div className="relative flex h-[40vh] items-center justify-center">
            <ReloadIcon className="h-8 w-8 animate-spin" />
          </div>
        ) : visiblePosts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          visiblePosts.map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/post/${post.id}`)}
              className="w-full cursor-pointer rounded-xl border p-10 transition hover:bg-muted/50 md:px-10 md:py-8"
            >
              <div className="mb-2 flex items-center whitespace-pre-line">
                <div className="flex flex-col">
                  <div className="mt-2 text-xs opacity-40">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
                <div className="ml-auto">
                  {post.isAdmin && (
                    <div className="mt-2 text-xs">
                      <Badge variant="secondary">ADMIN</Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="inline-block w-full whitespace-pre-wrap break-words text-left leading-[1.3] opacity-80">
                {post.name}
              </div>
              <div className="mb-4 mt-4 text-xs">
                {post.replies && post.replies.length > 0 ? (
                  post.replies.map((r, index) => (
                    <div
                      key={r.id}
                      className={`mb-2 text-xs ${
                        index === 0 ? "" : "pl-5"
                      } text-muted-foreground`}
                    >
                      {index === 0 && (
                        <CornerBottomLeftIcon className="mr-1 inline h-4 w-4" />
                      )}
                      {r.body}
                    </div>
                  ))
                ) : (
                  <div className="text-xs italic text-gray-500">
                    No replies yet.
                  </div>
                )}
              </div>

              <div className="mt-2 flex gap-2">
                <Button
                  disabled
                  variant="outline"
                  size="icon"
                >
                  <ChatBubbleIcon className="h-4 w-4" />
                </Button>
                <Button disabled variant="outline" size="icon">
                  <HeartIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
