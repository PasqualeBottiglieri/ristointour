import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SponsorForm from "@/components/admin/SponsorForm";
import { getSponsorById } from "@/lib/queries";
import { updateSponsor } from "../../actions";

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sponsor = await getSponsorById(id);
  if (!sponsor) notFound();

  const updateWithId = updateSponsor.bind(null, id);

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Modifica Sponsor</h1>
        <p className="text-stone-500 font-display mt-1">{sponsor.name}</p>
      </div>
      <SponsorForm sponsor={sponsor} action={updateWithId} />
    </AdminShell>
  );
}
