import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/lib/i18n";
import { LOCALE_COOKIE, type Locale, locales } from "@/lib/i18n/config";
import { registerSchema } from "@/lib/validations";

async function getMessages() {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale =
    value && locales.includes(value as Locale) ? (value as Locale) : "fa";
  return getDictionary(locale);
}

export async function POST(request: Request) {
  const dict = await getMessages();

  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: dict.service.invalidInput },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: dict.auth.emailExists },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: dict.auth.genericError },
      { status: 500 },
    );
  }
}
