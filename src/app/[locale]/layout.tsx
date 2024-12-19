import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
    default: "Qahvazor | Premium Coffee Subscriptions",
    template: "%s - Qahvazor",
  },
  description:
    "Discover Qahvazor, your trusted coffee subscription service connecting you to the finest coffee roasters.",
  keywords: [
    "Coffee",
    "Subscriptions",
    "Qahvazor",
    "Ethical Coffee",
    "Premium Coffee",
  ],
  openGraph: {
    title: "Qahvazor | Premium Coffee Subscriptions",
    description:
      "Your trusted coffee subscription service connecting you to the finest coffee roasters.",
    url: "https://qahvazor.com",
    images: [
      {
        url: "https://qahvazor.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qahvazor",
      },
    ],
    site_name: "Qahvazor",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Qahvazor",
    title: "Qahvazor | Premium Coffee Subscriptions",
    description:
      "Discover Qahvazor, your trusted coffee subscription service connecting you to the finest coffee roasters.",
    images: ["https://qahvazor.com/images/og-image.jpg"],
  },
  robots: "index, follow",
};

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sofia selection:bg-primary selection:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
