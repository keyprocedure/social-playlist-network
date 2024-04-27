// src > app > otheruser > page.js

import React from "react";
import { useRouter } from "next/navigation"
import OtherUserProfile from "./[id]/page";

export default function OtherUserPage() {
  const router = useRouter();
  const { id } = router.query;

  return <OtherUserProfile params={{ id }} />;
}
