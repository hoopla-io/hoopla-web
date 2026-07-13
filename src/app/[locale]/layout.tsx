import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import DeepLink from "@/components/DeepLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    icons: [
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        url: "/favicon.ico",
      },
    ],
    title: {
      default: `Hoopla | ${t("hero.title")}`,
      template: `%s | ${t("hero.title")}`,
    },
    description: t("hero.subtitle"),
    openGraph: {
      type: "website",
      siteName: "Hoopla Uzbekistan",
      images: [
        {
          url: "/og-image.jpg",
          width: 1280,
          height: 720,
          alt: `Hoopla | ${t("hero.title")} | ${t("hero.subtitle")}`,
        },
      ],
    },
    creator: "Hoopla Uzbekistan",
    metadataBase: new URL("https://hoopla.uz"),
    generator: "Next.js",
    applicationName: "Hoopla",
    keywords: [
      "Coffee",
      "Hoopla",
      "Ethical Coffee",
      "Premium Coffee",
    ],
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        all: true,
      },
    },
    other: {
      "og:locale": "uz_UZ",
      "og:locale:alternate": ["ru_RU", "en_US"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Hoopla",
      title: "Hoopla | Premium Coffee shops",
      description: t("hero.subtitle"),
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await Promise.resolve(params);

  if (!["uz", "en", "ru"].includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-white bg-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
          <DeepLink />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
