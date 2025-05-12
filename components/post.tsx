"use client";

import { useEffect, useState } from "react";
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

type Reply = {
  id: number;
  body: string;
  createdAt: string;
};

type Post = {
  id: number;
  name: string;
  createdAt: string;
  isAdmin: boolean;
  replies: Reply[];
};

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async (postId: number) => {
    if (!newReply.trim()) return;

    await fetch("/api/reply", {
      method: "POST",
      body: JSON.stringify({ postId, reply: newReply }),
      headers: { "Content-Type": "application/json" },
    });

    setNewReply("");
    setSelectedPostId(null);
    await fetchPosts();
  };

  const copyLinkToClipboard = async () => {
    const link = window.location.href;
    await navigator.clipboard.writeText(link);
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
              className="w-full rounded-xl border p-10 md:px-10 md:py-8"
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
                {post.replies.length > 0 ? (
                  post.replies.map((reply, index) => (
                    <div
                      key={reply.id}
                      className={`mb-2 text-xs ${index === 0 ? "" : "pl-5"}`}
                    >
                      {index === 0 && (
                        <CornerBottomLeftIcon className="mr-1 inline h-4 w-4" />
                      )}
                      {reply.body}
                    </div>
                  ))
                ) : (
                  <div className="text-xs italic text-gray-500">
                    No replies yet.
                  </div>
                )}

                <div className="mt-4">
                  {selectedPostId === post.id && (
                    <div className="rounded-md p-4">
                      <Textarea
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Add a reply..."
                        className="mb-2 w-full resize-none rounded border px-3 py-2 text-xs"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleAddReply(post.id)}
                          className="mr-2"
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={() => setSelectedPostId(null)}
                          variant="outline"
                          size="icon"
                        >
                          <CrossCircledIcon className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="">
                    <Button
                      onClick={() =>
                        setSelectedPostId(
                          selectedPostId === post.id ? null : post.id
                        )
                      }
                      variant="outline"
                      className="mr-2"
                      size="icon"
                    >
                      <ChatBubbleIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      disabled
                      variant="outline"
                      className="mr-2"
                      size="icon"
                    >
                      <HeartIcon className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <PaperPlaneIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[190px]">
                        <DropdownMenuItem onClick={copyLinkToClipboard}>
                          Copy link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
