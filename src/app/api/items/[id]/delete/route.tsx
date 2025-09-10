import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params; // 👈 await the Promise
  await prisma.item.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}