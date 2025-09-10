import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.item.create({
    data: {
      binId: body.binId,
      name: body.name,
      quantity: Number(body.quantity ?? 1),
      notes: body.notes ?? null,
    },
  });
  return NextResponse.json(created);
}