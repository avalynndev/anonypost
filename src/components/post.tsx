// components/Post.tsx
"use client";
import { useState } from "react";
import { formatDate } from "~/lib/utils";
import { api } from "~/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  CrossCircledIcon,
  ChatBubbleIcon,
  HeartIcon,
  CornerBottomLeftIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Badge } from "./ui/badge";
import { Button } from "~/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

export default function Post() {
  const copyLinkToClipboard = async () => {
    const url = window.location.origin;
    const link = `${url}`;

    await navigator.clipboard.writeText(link);
  };
  const [posts, { refetch }] = api.post.getPosts.useSuspenseQuery();
  const addReplyMutation = api.post.addReply.useMutation();

  const [newReply, setNewReply] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Add a state for search term

  const handleAddReply = async (postId: number) => {
    if (!newReply.trim()) return;

    await addReplyMutation.mutateAsync({ postId, reply: newReply });

    setNewReply("");
    setSelectedPostId(null);
    refetch();
  };

  const filteredPosts = posts?.filter((post) => {
    const searchTermLowercase = searchTerm.toLowerCase();
    const postNameLowercase = post.name.toLowerCase();

    return postNameLowercase.includes(searchTermLowercase);
  }); // Filter posts based on search term

  if (!posts) return <div>None Found</div>;

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
        {searchTerm
           ? filteredPosts.map((post) => (
              <div
                key={post.id}
                className="w-full rounded-xl border p-10 md:px-10 md:py-8"
              >
                <div className="mb-2 flex items-center whitespace-pre-line">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="mt-2 text-xs opacity-40">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex h-8 w-8 items-center justify-center gap-2 rounded-full text-white">
                    {post.isAdmin ? (
                      <div className="mt-2 text-xs">
                        <Badge variant="secondary">ADMIN</Badge>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="inline-block w-full whitespace-pre-wrap break-words text-left leading-[1.3] opacity-80">
                  {post.name}
                </div>
                <div className="mb-4 mt-4 text-xs">
                  {post.replies && post.replies.length > 0 ? (
                    post.replies.map((reply, index) => (
                      <div
                        key={index}
                        className={`mb-2 text-xs ${index === 0 ? "" : "pl-5"}`}
                      >
                        {index === 0 && (
                          <CornerBottomLeftIcon className="mr-1 inline h-4 w-4" />
                        )}
                        {reply}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs italic text-gray-500">
                      No replies yet.
                    </div>
                  )}

                  <div className="mt-4">
                    {selectedPostId === post.id ? (
                      <div className="rounded-md p-4 shadow-md">
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
                    ) : (
                      <></>
                    )}{" "}
                    <div className="">
                      <Button
                        onClick={() =>
                          setSelectedPostId(!selectedPostId ? post.id : null)
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
                          <Button
                            disabled
                            onClick={() => setSelectedPostId(post.id)}
                            variant="outline"
                            size="icon"
                          >
                            <PaperPlaneIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[190px] rounded-2xl bg-background p-0 shadow-xl dark:bg-[#181818]"
                        >
                          <DropdownMenuItem
                            onClick={copyLinkToClipboard}
                            className="cursor-pointer select-none rounded-none px-4 py-3 text-[15px] font-semibold tracking-normal focus:bg-transparent active:bg-primary-foreground"
                          >
                            Copy link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-0 h-[1.2px]" />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            )) 
          : posts.map((post) => (
              <div
                key={post.id}
                className="w-full rounded-xl border p-10 md:px-10 md:py-8"
              >
                <div className="mb-2 flex items-center whitespace-pre-line">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="mt-2 text-xs opacity-40">
                        {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto flex h-8 w-8 items-center justify-center gap-2 rounded-full text-white">
                    {post.isAdmin ? (
                      <div className="mt-2 text-xs">
                        <Badge variant="secondary">ADMIN</Badge>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="inline-block w-full whitespace-pre-wrap break-words text-left leading-[1.3] opacity-80">
                  {post.name}
                </div>
                <div className="mb-4 mt-4 text-xs">
                  {post.replies && post.replies.length > 0 ? (
                    post.replies.map((reply, index) => (
                      <div
                        key={index}
                        className={`mb-2 text-xs ${index === 0 ? "" : "pl-5"}`}
                      >
                        {index === 0 && (
                          <CornerBottomLeftIcon className="mr-1 inline h-4 w-4" />
                        )}
                        {reply}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs italic text-gray-500">
                      No replies yet.
                    </div>
                  )}

                  <div className="mt-4">
                    {selectedPostId === post.id ? (
                      <div className="rounded-md p-4 shadow-md">
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
                    ) : (
                      <></>
                    )}{" "}
                    <div className="">
                      <Button
                        onClick={() =>
                          setSelectedPostId(!selectedPostId ? post.id : null)
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
                          <Button
                            disabled
                            onClick={() => setSelectedPostId(post.id)}
                            variant="outline"
                            size="icon"
                          >
                            <PaperPlaneIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-[190px] rounded-2xl bg-background p-0 shadow-xl dark:bg-[#181818]"
                        >
                          <DropdownMenuItem
                            onClick={copyLinkToClipboard}
                            className="cursor-pointer select-none rounded-none px-4 py-3 text-[15px] font-semibold tracking-normal focus:bg-transparent active:bg-primary-foreground"
                          >
                            Copy link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-0 h-[1.2px]" />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
