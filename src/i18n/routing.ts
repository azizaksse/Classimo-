import { createNavigation } from "next-intl/navigation";

export const locales = ["fr", "ar"];
export const defaultLocale = "fr";
export const routing = { locales, defaultLocale };

// Lightweight wrappers around Next.js' navigation APIs
// that consider the locale configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
});
