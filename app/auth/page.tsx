"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "../app.css";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  const { signOut } = useAuthenticator();

  return (
    <main>
      <h1>Validation Ledger</h1>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}
