import { ModeToggle } from "~/app/_components/theme-toggle";

import { Post } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getPosts.prefetch();

  return (
    <HydrateClient>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <div className="relative flex w-full flex-col items-center justify-center">
          <span className="pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Anonymous Posts
          </span>
          <div className="bg-background fixed left-4 top-4 flex justify-center rounded-full shadow-lg">
            <ModeToggle />
          </div>
          <Post />
        </div>
      </div>
    </HydrateClient>
  );
}
