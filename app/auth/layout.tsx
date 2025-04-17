"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";

function AuthContent({ children }: { children: React.ReactNode }) {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const [userGroups, setUserGroups] = useState<string[]>([]);

  // Helper function to check if user is in a specific group
  const isUserInGroup = (group: string) => userGroups.includes(group);

  // Effect for fetching user info and groups
  useEffect(() => {
    async function getUserInfo() {
      if (authStatus === "authenticated" && user) {
        try {
          // Get detailed session information
          const session = await fetchAuthSession();

          // Get user groups from access token
          const accessTokenPayload = session.tokens?.accessToken?.payload || {};
          const rawGroups = accessTokenPayload["cognito:groups"];
          const groups = Array.isArray(rawGroups)
            ? rawGroups.map((g) => String(g))
            : [];
          // console.log("Raw groups from token:", rawGroups);
          // console.log("Processed groups:", groups);
          setUserGroups(groups);

          // Log other user details
          // const attributes = await fetchUserAttributes();
          // console.log("User attributes:", attributes);
          // console.log("Access Token Claims:", accessTokenPayload);
          // console.log("ID Token Claims:", session.tokens?.idToken?.payload);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }

    getUserInfo();
  }, [user, authStatus]);

  // Separate effect for checking group membership after userGroups is updated
  useEffect(() => {
    console.log("Current user groups:", userGroups);
  }, [userGroups]);

  return <>{children}</>;
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator>
      <AuthContent>{children}</AuthContent>
    </Authenticator>
  );
}
