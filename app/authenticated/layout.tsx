"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticator loginMechanisms={["email"]}>{children}</Authenticator>;
}
