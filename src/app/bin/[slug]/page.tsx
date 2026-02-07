import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ItemEditor from "@/components/ItemEditor";
import QRBlock from "@/components/QRBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BinPage({ params }: Props) {
  const { slug } = await params;
  const bin = await prisma.bin.findUnique({ where: { slug }, include: { items: { orderBy: { createdAt: "desc" } } } });
  if (!bin) return notFound();

  return (
    <main className="space-y-6">
      <section className="rounded-2xl bg-white p-5 shadow">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{bin.name}</h2>
            {bin.notes && <p className="mt-1 max-w-prose text-sm text-slate-600">{bin.notes}</p>}
            <p className="mt-1 text-xs text-slate-500">Slug: {bin.slug}</p>
          </div>
          <QRBlock slug={bin.slug} />
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-medium">Items</h3>
        </div>
        {bin.items.length === 0 ? (
          <p className="mb-4 text-sm text-slate-600">No items yet.</p>
        ) : (
          <ul className="mb-6 divide-y">
            {bin.items.map((it) => (
              <li key={it.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {it.name} <span className="text-xs text-slate-500">×{it.quantity}</span>
                    </p>
                    {it.notes && <p className="text-sm text-slate-600">{it.notes}</p>}
                    <p className="text-xs text-slate-500">Status: {it.status}</p>
                  </div>
                  <form action={`/api/items/${it.id}/delete`} method="post">
                    <button className="text-sm text-red-600 hover:underline">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
        <ItemEditor binId={bin.id} />
      </section>
    </main>
  );
}
