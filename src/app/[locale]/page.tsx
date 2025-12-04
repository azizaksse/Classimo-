import Image from "next/image";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductGallery from "@/components/ProductGallery";
import {
  featuredCollections,
  howItWorks,
  servicePillars,
  testimonials,
} from "@/lib/data";

// Use ISR to avoid re-rendering the whole page on every request.
export const revalidate = 120;

const marqueeTestimonials = Array.from({ length: 4 }, () => testimonials).flat();

const heroStats = [
  { label: "نقاط الخدمة", value: "12+ ولاية" },
  { label: "موديلات جاهزة", value: "85" },
  { label: "رضا الزبائن", value: "4.9/5" },
];

export default function Home() {
  return (
    <div className="space-y-16 lg:space-y-20">
      <section
        className="relative grid gap-10 rounded-[32px] border border-white/10 bg-[#07070f] p-8 lg:grid-cols-[1.4fr_1fr]"
        style={{
          backgroundImage: "url(/herobackgroud.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 rounded-[32px] bg-black/40" />
        <div className="relative space-y-7">
          <h1 className="liquid-glass inline-block rounded-[32px] px-6 py-4 text-4xl font-semibold leading-tight lg:text-5xl">
            Classimo – كراء و بيع كوستيم الأفراح في الجزائر
          </h1>
          <p className="text-lg">
            إطلالات فاخرة بلمسة جزائرية، نوفّر كراء وبيع كوستيم الأفراح مع تجربة
            قياس دقيقة، خدمة منزلية، وتفاصيل ذهبية تجعل سهرتك أكثر تميزاً.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="px-8">
              اكتشف خدمة الكراء
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              تصفح متجر البيع
            </Button>
          </div>
          <p className="text-sm">
            خدمة خاصة للعرسان والضيوف: ضبط المقاسات، صيانة قبل وبعد الحدث،
            وتوصيل عبر أغلب الولايات.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center"
              >
                <p className="text-2xl font-semibold text-[#d4af37]">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.35em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] rounded-[32px] border border-[#d4af37]/30 bg-black/40 p-6 backdrop-blur">
          <div className="flex h-full flex-col gap-6 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-[#d4af37]">
              Classimo Owner
            </p>
            <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] border border-white/15 bg-black/30 shadow-inner shadow-black/40">
              <Image
                src="/hero-popup.jpg"
                alt="Classimo owner showcase"
                fill
                sizes="(min-width: 1024px) 360px, 80vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8 lg:space-y-10">
        <SectionHeader
          eyebrow="Services"
          title="حلول Classimo للكراء والبيع"
          description="مسار لخدمة العرسان وضيوفهم: اختيار الموديل، تجربة خاصة، تعديل فوري، وخدمة ما بعد التسليم."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {servicePillars.map((pillar) => (
            <a
              key={pillar.title}
              href={pillar.href}
              className="glass-panel glow-border block h-full space-y-2.5 rounded-[24px] p-5 transition hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold">{pillar.title}</h3>
              <p className="text-sm">{pillar.description}</p>
              <p className="text-sm text-[#d4af37]">{pillar.cta}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-8 lg:space-y-10">
        <SectionHeader
          eyebrow="Collections"
          title="تشكيلات ذهبية بلمسة سينمائية"
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredCollections.map((collection) => (
            <div
              key={collection.name}
              className="glow-border flex h-full flex-col rounded-3xl border border-white/10 p-4 transition hover:-translate-y-2"
              style={{ background: collection.gradient }}
            >
              <div className="flex items-center justify-between text-sm">
                <Badge className="bg-white/15 text-white">
                  {collection.badge}
                </Badge>
                <span className="text-xs uppercase tracking-[0.3em]">
                  {collection.type}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{collection.name}</h3>
              <p className="mt-1 text-sm">{collection.price}</p>
              <Button
                variant="ghost"
                className="mt-auto justify-start px-0 text-[#f5e6c8]"
              >
                اكتشف التفاصيل
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10 lg:space-y-12">
        <SectionHeader
          eyebrow="Process"
          title="رحلة أنيقة بأربع خطوات"
          description="من أول اتصال إلى لحظة التسليم، كل خطوة محاطة بعناية، إدارتها رقمية لكن بروح حرفية."
          align="center"
        />
        <div className="glass-panel glow-border grid gap-4 rounded-[32px] p-6 md:grid-cols-4">
          {howItWorks.map((step, idx) => (
            <div
              key={step.title}
              className="space-y-4 text-center md:text-start"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/50 bg-white/5 text-lg font-semibold text-[#d4af37] md:mx-0">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-black via-[#0f0a05] to-[#050505]">
        <div className="pointer-events-none absolute -start-10 -top-10 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#d4af37,rgba(255,179,71,0.8),rgba(255,255,255,0.15))] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -end-16 top-24 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,179,71,0.8),#d4af37,rgba(255,255,255,0.18))] opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -start-12 bottom-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.18),rgba(212,175,55,0.9),rgba(15,10,5,0.9))] opacity-15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.2), transparent 30%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.2), transparent 35%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-[#d4af37]">
              Our Gallery
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Crafted pieces with a golden touch
            </h2>
            <p className="text-base text-white/80">
              Discover our curated selection, presented in a luxe glass-like grid.
            </p>
          </div>
          <div className="mt-10">
            <ProductGallery />
          </div>
        </div>
      </section>

      <section className="space-y-8 lg:space-y-10" dir="rtl" lang="ar">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-[#d4af37]">
            Testimonials
          </p>
          <div className="inline-block">
            <h2
              className="liquid-glass inline-flex items-center justify-center rounded-[24px] px-6 py-3 text-3xl font-semibold text-white font-sans"
              lang="ar"
            >
              آراء نقاط الخدمة لدينا Classimo
            </h2>
          </div>
          <p className="text-base text-white/80">
            هذي شهادات حقيقية من الشباب عن كراء و بيع كوستيم الأفراح مع Classimo.
          </p>
        </div>
        <div className="relative rounded-[36px] border border-white/10 bg-gradient-to-br from-black/80 via-[#0b0a0d]/80 to-black/85 p-6 shadow-2xl shadow-black/50">
          <div className="pointer-events-none absolute inset-y-0 start-0 w-28 bg-gradient-to-r from-[#050509] via-[#050509]/80 to-transparent blur-xl opacity-80" />
          <div className="pointer-events-none absolute inset-y-0 end-0 w-28 bg-gradient-to-l from-[#050509] via-[#050509]/80 to-transparent blur-xl opacity-80" />
          <div
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-xl shadow-inner shadow-black/40"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <div className="marquee-track flex gap-6 group-hover:[animation-play-state:paused]">
              {marqueeTestimonials.map((testimonial, idx) => (
                <div
                  key={`${testimonial.name}-${idx}`}
                  className="liquid-glass min-w-[280px] max-w-[340px] rounded-[24px] border border-white/10 px-6 py-5 text-start shadow-xl shadow-black/30 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[0_10px_40px_-18px_rgba(212,175,55,0.8)]"
                >
                  <p className="text-sm leading-relaxed text-white/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm font-semibold text-[#d4af37]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-white/70">{testimonial.event}</p>
                    <div className="mt-2 flex items-center gap-1 text-[#fbbf24] text-base">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <span key={starIdx}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[36px] border border-[#d4af37]/40 bg-gradient-to-br from-black to-[#0e101a] p-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="relative space-y-5">
          <p className="text-sm uppercase tracking-[0.4em] text-[#d4af37]">
            Final Call
          </p>
          <h2 className="text-3xl font-semibold">
            جاهز لسهرة فاخرة باللون الذهبي الداكن؟
          </h2>
          <p className="mx-auto max-w-2xl text-base">
            احجز بدلتك أو اطلب تجربة منزلية. فريق Classimo يرافقك في كل ولاية،
            مع متابعة رقمية فورية وضمان جودة في كل تفصيلة.
          </p>
          <Button size="lg" className="px-10">
            احجز بدلتك الآن
          </Button>
        </div>
      </section>
    </div>
  );
}













