import { db } from "@/db";
import { user, post } from "@/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

export default async function ProfilePage({ params }: any) {
  const { username } = await params;

  // Get user by username
  const [userInfo] = await db
    .select()
    .from(user)
    .where(eq(user.username, username));

  if (!userInfo) {
    notFound(); // Show 404 if user doesn't exist
  }

  // Get posts by this user
  const userPosts = await db
    .select()
    .from(post)
    .where(eq(post.username, username))
    .orderBy(post.createdAt);

  return (
    <main className="mx-auto max-w-3xl p-6 py-24">
      <h1 className="text-3xl font-bold mb-2">@{userInfo.username}</h1>
      {userInfo.displayUsername && (
        <p className="text-muted-foreground mb-4">
          Display name: {userInfo.displayUsername}
        </p>
      )}
      {userInfo.image && (
        <img
          src={userInfo.image}
          alt="User profile"
          className="w-20 h-20 rounded-full mb-4"
        />
      )}

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      {userPosts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {userPosts.map((p) => (
            <li key={p.id} className="rounded-lg border p-4 shadow-sm bg-card">
              <p>{p.name}</p>
              <div className="text-xs text-muted-foreground mt-2">
                Posted on {format(new Date(p.createdAt), "PPPp")}
              </div>
              <Link
                href={`/post/${p.id}`}
                className="text-sm underline mt-1 inline-block"
              >
                View Post
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
