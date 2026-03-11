import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ListingForm from "@/components/admin/ListingForm";
import { getListingById } from "@/lib/queries";
import { updateListing } from "../../actions";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();

  const updateWithId = updateListing.bind(null, id);

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Modifica Attività</h1>
        <p className="text-stone-500 font-display mt-1">{listing.name}</p>
      </div>
      <ListingForm listing={listing} action={updateWithId} />
    </AdminShell>
  );
}
