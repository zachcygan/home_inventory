import Link from "next/link";
import { prisma } from "@/lib/db";
import NewBinForm from "@/components/NewBinForm";


export default async function HomePage() {
  const bins = await prisma.bin.findMany({ orderBy: { createdAt: "desc" } });


  return (
    <main className="space-y-8">
      <section className="rounded-2xl bg-white p-5 shadow">
        <h2 className="mb-3 text-lg font-medium">Create a new bin</h2>
        <NewBinForm />
      </section>


      <section className="rounded-2xl bg-white p-5 shadow">
        <h2 className="mb-4 text-lg font-medium">Your bins</h2>
        {bins.length === 0 ? (
          <p className="text-sm text-slate-600">No bins yet. Create one above.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {bins.map((b) => (
              <Link className="text-blue-600" href={`/bin/${b.slug}`} key={b.id}>
                <li key={b.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{b.name}</h3>
                  </div>
                  {b.notes && <p className="text-sm text-slate-600 line-clamp-2">{b.notes}</p>}
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>


      <section className="rounded-2xl bg-white p-5 shadow">
        <h2 className="mb-2 text-lg font-medium">Scan a bin QR</h2>
        <p className="mb-3 text-sm text-slate-600">Use your phone or a webcam to jump straight to a bin.</p>
        <a href="/scan" className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50">Open Scanner</a>
      </section>
    </main>
  );
}