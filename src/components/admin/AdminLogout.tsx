"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/admin/login/logout-action";

export function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-stone-500 hover:text-red-400 transition-colors"
    >
      Esci
    </button>
  );
}
