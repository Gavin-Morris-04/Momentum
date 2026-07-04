import type { Metadata } from "next";
import Link from "next/link";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Providers } from "@/components/Providers";
import { SITE_NAME, TAGLINE, FOOTER_LINE } from "@/data/home";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${TAGLINE}`,
  description:
    "A 60-day guide and lifelong tool for training, eating, sleeping, and living well. Evidence-backed, no ads, no upsells.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Providers>
          <Nav />
          <main className="mx-auto w-full max-w-content flex-1 px-4 py-8">
            {children}
          </main>
          <footer className="border-t border-line py-6">
            <div className="mx-auto max-w-content px-4">
              <p className="max-w-read text-sm leading-relaxed text-graphite">
                {FOOTER_LINE}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs text-graphite">
                  {SITE_NAME}
                </p>
                <Link
                  href="/references"
                  className="font-mono text-xs text-cobalt underline-offset-2 hover:underline focus-ring rounded-sm"
                >
                  The science behind Fit 60
                </Link>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
