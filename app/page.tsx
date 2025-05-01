import Post from "@/components/post";

export default async function Home() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <span className="tracking-tight pointer-events-none mt-8 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text py-8 text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Anonymous Posts
      </span>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text p-4 pb-4 text-center">
        Share your thoughts and experiences anonymously by posting on our
        platform — no sign-up needed!
      </span>
      <Post />
    </div>
  );
}
