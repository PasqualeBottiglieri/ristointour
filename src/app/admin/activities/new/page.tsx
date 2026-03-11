import AdminShell from "@/components/admin/AdminShell";
import ListingForm from "@/components/admin/ListingForm";
import { createListing } from "../actions";

export default function NewActivityPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Nuova Attività</h1>
        <p className="text-stone-500 font-display mt-1">
          Aggiungi un nuovo ristorante, caseificio o altra attività
        </p>
      </div>
      <ListingForm action={createListing} />
    </AdminShell>
  );
}
