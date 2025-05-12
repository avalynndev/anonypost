import { db } from "@/db";
import { post } from "@/schema";

const posts = await db.select().from(post);
console.log(posts)
