import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await prisma.item.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}