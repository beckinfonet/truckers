"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Todo App</h1>
      <p>This is a public page that doesn't require authentication.</p>
      <div>
        <Link href="/authenticated">Go to Todo App (requires login)</Link>
      </div>
    </main>
  );
}
