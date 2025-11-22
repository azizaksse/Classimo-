"use client";

import { type FormEvent } from "react";
import { SectionHeader } from "@/components/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Music3, PhoneCall } from "lucide-react";

const WHATSAPP_NUMBER = "213795443714";

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: PhoneCall,
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

export default function ContactPage() {
  const sendToWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = data.get("fullName") ?? "غير محدد";
    const phone = data.get("phone") ?? "غير محدد";
    const email = data.get("email") ?? "غير محدد";
    const service = data.get("service") ?? "غير محدد";
    const message = data.get("message") ?? "بدون رسالة";

    const payload = `✉️ طلب جديد من نموذج الاتصال
الاسم: ${fullName}
الهاتف: ${phone}
البريد: ${email}
الخدمة المطلوبة: ${service}
التفاصيل: ${message}`;

    sendToWhatsApp(payload);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        eyebrow="Contact"
        title="تواصل معنا / Contact"
        description="فريق Classimo جاهز للإجابة عن أسئلتك، حجز جلسة قياس، أو إرسال مقترحات إطلالة عبر واتساب."
      />

      <div className="grid gap-8 md:grid-cols-2">
                <form className="space-y-4" onSubmit={handleContactSubmit}>
          <Input placeholder="الاسم الكامل" name="fullName" required />
          <Input placeholder="رقم الهاتف" name="phone" required />
          <Input placeholder="البريد الإلكتروني" name="email" type="email" />
          <select className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white" name="service">
            <option>خدمة مصممة حسب الطلب</option>
            <option>مواعيد القياس</option>
            <option>Styling فاخر</option>
          </select>
          <Textarea placeholder="اكتب تفاصيل طلبك أو المناسبة" name="message" />
          <Button className="w-full" type="submit">أرسل الطلب</Button>
        </form>

        <div className="space-y-6">
          <div className="glass-panel rounded-[26px] p-6 space-y-4">
            <h3 className="text-xl font-semibold">Business Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Categories
                </p>
                <p>Clothing store</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Address
                </p>
                <p>alger , Sidi Aissa, Algeria</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Mobile
                </p>
                <p>213 795 44 37 14</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                  Email
                </p>
                <p>ganiislam452@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-[26px] p-6 space-y-4">
            <h3 className="text-xl font-semibold">Service Highlights</h3>
            <div className="space-y-2 text-sm">
              <p>Basic info: Not yet rated (0 Reviews)</p>
              <p>Hours: Always open</p>
              <p>Services: Delivery</p>
            </div>
          </div>
          <div className="glass-panel rounded-[26px] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">تواصل اجتماعي</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                Social
              </p>
            </div>
            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-[#d4af37]/70 hover:text-[#d4af37]"
                >
                  <span className="flex items-center gap-3">
                    <span className="rounded-full border border-white/15 bg-black/40 p-2">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em]">
                    Visit
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="glass-panel rounded-[26px] border border-[#25d366]/40 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#25d366]">
                  WhatsApp
                </p>
                <p className="mt-1 text-sm text-white/80">
                  تواصل معنا فوراً عبر الواتساب لخدمات مخصصة وحجوزات سريعة.
                </p>
              </div>
              <span className="rounded-full border border-[#25d366]/40 bg-[#25d366]/10 p-3 text-[#25d366]">
                <PhoneCall className="h-5 w-5" />
              </span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1ea64b] via-[#25d366] to-[#1b7c3a] px-6 py-3 text-base font-semibold text-[#04100a] shadow-[0_15px_45px_rgba(37,211,102,0.35)] transition hover:opacity-95"
            >
              WhatsApp
            </a>
          </div>
          <div className="glass-panel rounded-[26px] p-4">
            <iframe
              src="https://www.google.com/maps?q=alger%20Sidi%20Aissa%20Algeria&output=embed"
              title="Classimo location"
              className="h-64 w-full rounded-[20px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}






