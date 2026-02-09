"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input className="w-full" placeholder="Bin name (e.g., Garage Shelf A)" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Button disabled={!name}>Create</Button>
    </form>
  );
}
