"use client";
import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/sign-in");
        } else {
          alert("Error signing out");
        }
      }}
      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:text-red-700 dark:focus:text-red-300 cursor-pointer m-2 rounded-xl"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Log Out
    </DropdownMenuItem>
  );
}
