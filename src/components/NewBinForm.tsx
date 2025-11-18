"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBinForm() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  async function createBin(formData: FormData) {
    const res = await fetch("/api/bins", {
      method: "POST",
      body: JSON.stringify({ name, notes }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/bin/${data.slug}`);
    }
  }

  return (
    <form action={createBin} className="space-y-3">
      <input className="w-full rounded border px-3 py-2" placeholder="Bin name (e.g., Garage Shelf A)" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea className="w-full rounded border px-3 py-2" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button disabled={!name} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        Create
      </button>
    </form>
  );
}
