import Link from "next/link";
import { getSession } from "@/lib/auth";
import { AdminLogout } from "./AdminLogout";

const navItems = [
  { href: "/admin/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/admin/activities", icon: "store", label: "Attività" },
  { href: "/admin/artists", icon: "music_note", label: "Artisti" },
];

export default async function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-emerald-900">
          <Link href="/admin/dashboard" className="text-xl font-black font-serif">
            Ristointour
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-orange-500 font-bold mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-300 hover:bg-emerald-900 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-900">
          <div className="flex items-center justify-between">
            <div className="text-xs text-stone-400">
              {session?.email}
            </div>
            <AdminLogout />
          </div>
          <Link
            href="/"
            className="mt-3 flex items-center gap-2 text-xs text-stone-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            Vedi sito
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
