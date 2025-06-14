"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/db";
import { post, reply } from "@/schema";
import { eq } from "drizzle-orm";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from 'next/link';

export default function PostDetailPage() {
  const { id } = useParams();
  const session = useSession();
  const username = session.data?.user?.username ?? undefined;
  const [postData, setPostData] = useState<any | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    const data = await db
      .select()
      .from(post)
      .where(eq(post.id, Number(id)));
    const replyData = await db
      .select()
      .from(reply)
      .where(eq(reply.postId, Number(id)));
    setPostData(data[0]);
    setReplies(replyData);
    setLoading(false);
  };

  const handleReply = async () => {
    if (!newReply.trim()) return;

    await db.insert(reply).values({
      body: newReply,
      postId: Number(id),
      username,
    });

    setNewReply("");
    fetchPost();
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading || !postData)
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="animate-spin text-muted-foreground">
          <Spinner size="lg" className="bg-black dark:bg-white" />
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 pt-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Post</h1>
      <div className="rounded-lg border p-4 mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          {formatDate(postData.createdAt)} by{" "}
          {postData.username ? (
            <Link href={`/profile/${postData.username}`} className="underline">
              {postData.username}
            </Link>
          ) : (
            "anonymous"
          )}
        </div>
        <div className="whitespace-pre-wrap break-words">{postData.name}</div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Replies</h2>
      <div className="space-y-4 mb-6">
        {replies.length > 0 ? (
          replies.map((r) => (
            <div key={r.id} className="border rounded-md p-3 text-sm">
              <div className="text-xs text-muted-foreground mb-1">
                {formatDate(r.createdAt)} by {r.username || "anonymous"}
              </div>
              {r.body}
            </div>
          ))
        ) : (
          <div className="text-sm italic text-muted-foreground">
            No replies yet.
          </div>
        )}
      </div>

      <div>
        <Textarea
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Write your reply..."
          className="mb-2"
        />
        <Button onClick={handleReply}>Submit Reply</Button>
      </div>
    </div>
  );
}
