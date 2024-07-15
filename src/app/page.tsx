import dynamic from "next/dynamic";
import { api, HydrateClient } from "~/trpc/server";
import { ReloadIcon } from "@radix-ui/react-icons";

const Post = dynamic(() => import("~/components/post"), {
  ssr: false,
  loading: () => (
    <>
      <div className="relative flex h-[40vh] md:hidden">
        <ReloadIcon className="mr-2 mt-4 h-8 w-8 animate-spin" />
      </div>
      <div className="relative hidden h-[40vh] w-full md:flex">
        <div className="container relative mr-2 grid h-8 h-[125px] w-8 w-[250px] animate-spin items-center gap-6 rounded-xl object-cover pb-8 pt-6 transition-all md:py-10" />
      </div>
    </>
  ),
});

export default async function Home() {
  void api.post.getPosts.prefetch();

  return (
    <HydrateClient>
      <div className="relative flex w-full flex-col items-center justify-center">
        <span className="pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Anonymous Posts
        </span>
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text p-4 pb-4 text-center">
          A website where you can enter anonymous posts for others to read.
        </span>
        <Post />
      </div>
    </HydrateClient>
  );
}
