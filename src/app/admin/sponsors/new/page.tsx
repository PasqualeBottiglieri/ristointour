import AdminShell from "@/components/admin/AdminShell";
import SponsorForm from "@/components/admin/SponsorForm";
import { createSponsor } from "../actions";

export default function NewSponsorPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Nuovo Sponsor</h1>
        <p className="text-stone-500 font-display mt-1">
          Aggiungi un nuovo sponsor o partner
        </p>
      </div>
      <SponsorForm action={createSponsor} />
    </AdminShell>
  );
}
