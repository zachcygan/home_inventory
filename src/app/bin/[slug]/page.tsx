import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ItemEditor from "@/components/ItemEditor";
import DeleteItemButton from "@/components/DeleteItemButton";
import QRBlock from "@/components/QRBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BinPage({ params }: Props) {
  const { slug } = await params;
  const bin = await prisma.bin.findUnique({
    where: { slug },
    include: { items: { orderBy: { createdAt: "desc" } } },
  });
  if (!bin) return notFound();

  return (
    <main>
      <div className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <Link href="/" className="btn-ghost mb-4 inline-flex items-center gap-2 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to bins
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">{bin.name}</h1>
              {bin.notes && <p className="mt-2 text-[var(--color-text-muted)]">{bin.notes}</p>}
              <p className="mt-1 text-xs text-[var(--color-text-subtle)]">{bin.slug}</p>
            </div>
            <QRBlock slug={bin.slug} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <section className="card p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]">
              <Package className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Items</h2>
          </div>

          {bin.items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[var(--color-border)] py-8 text-center text-[var(--color-text-muted)]">No items yet. Add one below.</p>
          ) : (
            <ul className="mb-8 divide-y divide-[var(--color-border)]">
              {bin.items.map((it) => (
                <li key={it.id} className="flex items-start justify-between gap-4 py-4 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[var(--color-text)]">
                      {it.name}
                      <span className="ml-1.5 text-sm font-normal text-[var(--color-text-muted)]">×{it.quantity}</span>
                    </p>
                    {it.notes && <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{it.notes}</p>}
                    <p className="mt-1 text-xs text-[var(--color-text-subtle)]">Status: {it.status}</p>
                  </div>
                  <DeleteItemButton itemId={it.id} />
                </li>
              ))}
            </ul>
          )}

          <ItemEditor binId={bin.id} />
        </section>
      </div>
    </main>
  );
}
