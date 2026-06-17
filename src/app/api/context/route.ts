import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractProductContext } from "@/lib/extractContext";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { rawInput } = await req.json();

    if (!rawInput || typeof rawInput !== "string" || rawInput.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide at least a couple of sentences about your product." },
        { status: 400 }
      );
    }

    const extracted = await extractProductContext(rawInput);

    const context = await prisma.productContext.create({
      data: {
        name: extracted.name,
        rawInput,
        icp: extracted.icp,
        valueProps: extracted.valueProps,
        objections: extracted.objections,
        differentiators: extracted.differentiators,
      },
    });

    return NextResponse.json({ context });
  } catch (err) {
    console.error("Context extraction failed:", err);
    return NextResponse.json(
      { error: "Failed to analyze product context. Check server logs." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const contexts = await prisma.productContext.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      icp: true,
      valueProps: true,
      objections: true,
      differentiators: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ contexts });
}
