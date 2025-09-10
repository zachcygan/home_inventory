"use client"
import { useState } from "react";

export default function ItemEditor({ binId }: { binId: string }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  async function onSubmit() {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ binId, name, quantity, notes }),
    });
    if (res.ok) {
      setName(""); setQuantity(1); setNotes("");
      location.reload(); // simplest refresh; can be optimized with SWR later
    }
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">Add item</h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
        <input className="rounded border px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="rounded border px-3 py-2" placeholder="Quantity" type="number" min={1} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value || "1", 10))} />
        <input className="rounded border px-3 py-2 sm:col-span-2" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button disabled={!name} onClick={onSubmit} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">Add</button>
    </div>
  );
}