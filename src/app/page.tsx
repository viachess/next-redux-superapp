import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/todo">To-do list</Link>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>{" "}
    </main>
  );
}
