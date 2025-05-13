"use client";

import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/users";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logoutAction();

    if (!errorMessage) {
      toast.success("Logged Out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
      router.push("/");
    }
    setLoading(false);
  };
  return (
    <Button
      className="w-24"
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}
