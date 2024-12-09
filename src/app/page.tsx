import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return <p>Main Page</p>;
}
