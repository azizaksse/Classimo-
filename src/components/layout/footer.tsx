import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Music3,
  Phone,
  Mail,
} from "lucide-react";

const WHATSAPP_COMPACT = "213795443714";

const FOOTER_LINKS = [
  { label: "خدمة الكراء الخاصة", href: "/rentals" },
  { label: "مجموعة الكوستيم", href: "/shop" },
  { label: "أعمالنا", href: "/portfolio" },
  { label: "تواصل معنا", href: "/contact" },
];

const CUSTOMER_LINKS = [
  "سياسة الخصوصية",
  "الدفع و التوصيل",
  "الدعم عبر WhatsApp",
  "برنامج الإحالة",
];

const CONTACT_INFO = [
  { label: "alger , Sidi Aïssa, Algeria", icon: MapPin },
  {
    label: "213 795 44 37 14",
    icon: Phone,
    href: `https://wa.me/${WHATSAPP_COMPACT}`,
  },
  {
    label: "ganiislam452@gmail.com",
    icon: Mail,
    href: "mailto:ganiislam452@gmail.com",
  },
];

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_COMPACT}`,
    icon: MessageCircle,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/classimo_/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/classimoChaussures",
    icon: Facebook,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@_classimo?lang=ro-RO",
    icon: Music3,
  },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/5 bg-[#050509]/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="space-y-4">
          <p className="text-2xl font-semibold">Classimo</p>
          <p className="arabic-text text-sm">ألوان و قصّات جزائرية راقية</p>
          <p className="text-sm text-white/80">
            كوستيم أفراح بتفاصيل فاخرة، وخبرة في تنسيق المناسبات مع لمسة مغاربية
            حديثة.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            {CONTACT_INFO.map(({ label, icon: Icon, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#d4af37]"
                >
                  <Icon className="h-4 w-4 text-[#d4af37]" />
                  {label}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#d4af37]" />
                  {label}
                </div>
              ),
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            روابط سريعة
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block hover:text-[#d4af37]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            دعم العملاء
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            {CUSTOMER_LINKS.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            تابعنا
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <Icon className="h-4 w-4 text-[#d4af37]" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/70">
        © Classimo {new Date().getFullYear()} - كل الحقوق محفوظة.
      </div>
    </footer>
  );
};
