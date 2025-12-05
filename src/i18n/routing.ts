import { createNavigation } from "next-intl/navigation";

export const locales = ["fr", "ar"];
export const defaultLocale = "fr";

// Lightweight wrappers around Next.js' navigation APIs
// that consider the locale configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
});
