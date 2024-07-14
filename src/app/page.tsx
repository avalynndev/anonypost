import dynamic from "next/dynamic";
import { ModeToggle } from "~/components/theme-toggle";
import { api, HydrateClient } from "~/trpc/server";
import { Skeleton } from "~/components/ui/skeleton";

const Post = dynamic(() => import("~/components/post"), {
  ssr: false,
  loading: () => (
    <>
      <div className="relative flex h-[70vh] md:hidden">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="relative mx-auto hidden h-[70vh] w-full md:flex">
        <Skeleton className="container relative grid h-[70vh] w-full items-center gap-6 rounded-xl object-cover pb-8 pt-6 transition-all md:py-10" />
      </div>
    </>
  ),
});

export default async function Home() {
  void api.post.getPosts.prefetch();

  return (
    <HydrateClient>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="relative flex w-full flex-col items-center justify-center">
        <span className="pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Anonymous Posts
        </span>
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text pb-4 text-center">
          A place for posting anonymous posts for others to read
        </span>
        <div className="fixed left-4 top-4 flex justify-center rounded-full bg-background shadow-lg">
          <ModeToggle />
        </div>
        <Post />
      </div>
    </HydrateClient>
  );
}
