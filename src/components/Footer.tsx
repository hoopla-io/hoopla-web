import { Link } from "@/i18n/routing";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="bg-main text-white py-8 border-t-main border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.quick-links.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  {t("footer.quick-links.privacy-policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:underline">
                  {t("footer.quick-links.terms-of-service")}
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:underline">
                  {t("footer.quick-links.help-center")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.connect-with-us.title")}
            </h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/hoopla.uz/"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-primary transition-colors"
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.facebook.com/hoopla.uz/"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
              >
                <Facebook />
              </Link>
              <Link
                href="https://twitter.com/hoopla.uz/"
                target="_blank"
                aria-label="Twitter"
                className="hover:text-primary transition-colors"
              >
                <Twitter />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/3 mt-5 lg:mt-0 hidden md:block">
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <form className="flex">
              <input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="bg-white text-main px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md  hover:text-cream transition-colors"
              >
                {t("footer.newsletter.button")}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <p>
            &copy; {new Date().getFullYear()} Hoopla. All Rights Reserved.
            Elevate Your Coffee Experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
