import dynamic from "next/dynamic";
import { ModeToggle } from "~/components/theme-toggle";
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
        <div className="mr-2 h-8 w-8 animate-spin container relative grid h-[125px] w-[250px] items-center gap-6 rounded-xl object-cover pb-8 pt-6 transition-all md:py-10" />
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
