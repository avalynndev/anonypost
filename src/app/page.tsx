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
      <div className="relative hidden h-[40vh] w-full max-w-12 md:flex">
        <ReloadIcon className="mr-2 mt-4 h-8 w-8 animate-spin" />
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
          Share your thoughts and experiences anonymously by posting on our
          platform — no sign-up needed!
        </span>
        <Post />
      </div>
    </HydrateClient>
  );
}
