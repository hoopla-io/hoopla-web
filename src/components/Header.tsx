"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./Sheet";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { cn } from "@/lib/utils";
// import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/#our-story" },
    { name: t("nav.plans"), href: "/#plans" },
    { name: t("nav.partners"), href: "/#partners" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <motion.header
      className={`fixed w-full z-[9999]  transition-all duration-300 ${
        isScrolled ? "py-2 bg-[#f5f5f0]/50 backdrop-blur-md shadow-lg" : "py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="py-2">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`flex items-center space-x-2 text-primary`}
            >
              <span className={`text-xl font-bold font-eugusto`}>hoopla</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/");

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-main hover:text-main/80 transition-colors font-normal text-base",
                      {
                        "font-semibold": isActive,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <LocaleSwitcher className="hidden lg:flex" />

            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden text-main hover:text-primary transition-colors">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent>
                <LocaleSwitcher className="flex lg:hidden" />
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-main hover:text-primary transition-colors text-lg font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
