import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function toSlug(s: string) {
  const base = s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return base || Math.random().toString(36).slice(2, 8);
}

export async function GET() {
  const bins = await prisma.bin.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bins);
}

export async function POST(req: Request) {
  const body = await req.json();
  const name: string = body.name?.toString() ?? "Untitled";
  const notes: string | undefined = body.notes?.toString();

  // ensure unique slug with suffix if needed
  let slug = toSlug(name);
  let tryCount = 0;
  while (await prisma.bin.findUnique({ where: { slug } })) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 5)}`;
    if (++tryCount > 5) break;
  }

  const created = await prisma.bin.create({ data: { name, notes, slug } });
  return NextResponse.json({ id: created.id, slug: created.slug });
}