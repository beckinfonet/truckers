"use client";

import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);

export default function Status() {
  const { signOut } = useAuthenticator();

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <h1>Status Page</h1>
      <p>You can only see this if you're authenticated!</p>
    </div>
  );
}
