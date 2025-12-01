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
  { label: "┘å┘é╪º╪╖ ╪º┘ä╪«╪»┘à╪⌐", value: "12+ ┘ê┘ä╪º┘è╪⌐" },
  { label: "┘à┘ê╪»┘è┘ä╪º╪¬ ╪¼╪º┘ç╪▓╪⌐", value: "85" },
  { label: "╪▒╪╢╪º ╪º┘ä╪▓╪¿╪º╪ª┘å", value: "4.9/5" },
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
            Classimo ΓÇô ┘â╪▒╪º╪í ┘ê ╪¿┘è╪╣ ┘â┘ê╪│╪¬┘è┘à ╪º┘ä╪ú┘ü╪▒╪º╪¡ ┘ü┘è ╪º┘ä╪¼╪▓╪º╪ª╪▒
          </h1>
          <p className="text-lg">
            ╪Ñ╪╖┘ä╪º┘ä╪º╪¬ ┘ü╪º╪«╪▒╪⌐ ╪¿┘ä┘à╪│╪⌐ ╪¼╪▓╪º╪ª╪▒┘è╪⌐╪î ┘å┘ê┘ü┘æ╪▒ ┘â╪▒╪º╪í ┘ê╪¿┘è╪╣ ┘â┘ê╪│╪¬┘è┘à ╪º┘ä╪ú┘ü╪▒╪º╪¡ ┘à╪╣ ╪¬╪¼╪▒╪¿╪⌐
            ┘é┘è╪º╪│ ╪»┘é┘è┘é╪⌐╪î ╪«╪»┘à╪⌐ ┘à┘å╪▓┘ä┘è╪⌐╪î ┘ê╪¬┘ü╪º╪╡┘è┘ä ╪░┘ç╪¿┘è╪⌐ ╪¬╪¼╪╣┘ä ╪│┘ç╪▒╪¬┘â ╪ú┘â╪½╪▒ ╪¬┘à┘è╪▓╪º┘ï.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="px-8">
              ╪º┘â╪¬╪┤┘ü ╪«╪»┘à╪⌐ ╪º┘ä┘â╪▒╪º╪í
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              ╪¬╪╡┘ü╪¡ ┘à╪¬╪¼╪▒ ╪º┘ä╪¿┘è╪╣
            </Button>
          </div>
          <p className="text-sm">
            ╪«╪»┘à╪⌐ ╪«╪º╪╡╪⌐ ┘ä┘ä╪╣╪▒╪│╪º┘å ┘ê╪º┘ä╪╢┘è┘ê┘ü: ╪╢╪¿╪╖ ╪º┘ä┘à┘é╪º╪│╪º╪¬╪î ╪╡┘è╪º┘å╪⌐ ┘é╪¿┘ä ┘ê╪¿╪╣╪» ╪º┘ä╪¡╪»╪½╪î
            ┘ê╪¬┘ê╪╡┘è┘ä ╪╣╪¿╪▒ ╪ú╪║┘ä╪¿ ╪º┘ä┘ê┘ä╪º┘è╪º╪¬.
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
          title="╪¡┘ä┘ê┘ä Classimo ┘ä┘ä┘â╪▒╪º╪í ┘ê╪º┘ä╪¿┘è╪╣"
          description="┘à╪│╪º╪▒ ┘ä╪«╪»┘à╪⌐ ╪º┘ä╪╣╪▒╪│╪º┘å ┘ê╪╢┘è┘ê┘ü┘ç┘à: ╪º╪«╪¬┘è╪º╪▒ ╪º┘ä┘à┘ê╪»┘è┘ä╪î ╪¬╪¼╪▒╪¿╪⌐ ╪«╪º╪╡╪⌐╪î ╪¬╪╣╪»┘è┘ä ┘ü┘ê╪▒┘è╪î ┘ê╪«╪»┘à╪⌐ ┘à╪º ╪¿╪╣╪» ╪º┘ä╪¬╪│┘ä┘è┘à."
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
          title="╪¬╪┤┘â┘è┘ä╪º╪¬ ╪░┘ç╪¿┘è╪⌐ ╪¿┘ä┘à╪│╪⌐ ╪│┘è┘å┘à╪º╪ª┘è╪⌐"
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
                ╪º┘â╪¬╪┤┘ü ╪º┘ä╪¬┘ü╪º╪╡┘è┘ä
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10 lg:space-y-12">
        <SectionHeader
          eyebrow="Process"
          title="╪▒╪¡┘ä╪⌐ ╪ú┘å┘è┘é╪⌐ ╪¿╪ú╪▒╪¿╪╣ ╪«╪╖┘ê╪º╪¬"
          description="┘à┘å ╪ú┘ê┘ä ╪º╪¬╪╡╪º┘ä ╪Ñ┘ä┘ë ┘ä╪¡╪╕╪⌐ ╪º┘ä╪¬╪│┘ä┘è┘à╪î ┘â┘ä ╪«╪╖┘ê╪⌐ ┘à╪¡╪º╪╖╪⌐ ╪¿╪╣┘å╪º┘è╪⌐╪î ╪Ñ╪»╪º╪▒╪¬┘ç╪º ╪▒┘é┘à┘è╪⌐ ┘ä┘â┘å ╪¿╪▒┘ê╪¡ ╪¡╪▒┘ü┘è╪⌐."
          align="center"
        />
        <div className="glass-panel glow-border grid gap-4 rounded-[32px] p-6 md:grid-cols-4">
          {howItWorks.map((step, idx) => (
            <div
              key={step.title}
              className="space-y-4 text-center md:text-right"
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
        <div className="pointer-events-none absolute -left-10 -top-10 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_30%_30%,#d4af37,rgba(255,179,71,0.8),rgba(255,255,255,0.15))] opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-24 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,179,71,0.8),#d4af37,rgba(255,255,255,0.18))] opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.18),rgba(212,175,55,0.9),rgba(15,10,5,0.9))] opacity-15 blur-3xl" />
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
              className="liquid-glass inline-flex items-center justify-center rounded-[24px] px-6 py-3 text-3xl font-semibold text-white"
              lang="ar"
            >
              ???? ???? ????? ????? Classimo
            </h2>
          </div>
          <p className="text-base text-white/80">
            ┘ç╪º╪░┘è ╪┤┘ç╪º╪»╪º╪¬ ╪¡┘é┘è┘é┘è╪⌐ ┘à┘å ╪º┘ä╪┤╪¿╪º╪¿ ╪╣┘å ┘â╪▒╪º╪í ┘ê ╪¿┘è╪╣ ┘â┘ê╪│╪¬┘è┘à ╪º┘ä╪ú┘ü╪▒╪º╪¡ ┘à╪╣ Classimo.
          </p>
        </div>
        <div className="relative rounded-[36px] border border-white/10 bg-gradient-to-br from-black/80 via-[#0b0a0d]/80 to-black/85 p-6 shadow-2xl shadow-black/50">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#050509] via-[#050509]/80 to-transparent blur-xl opacity-80" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#050509] via-[#050509]/80 to-transparent blur-xl opacity-80" />
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
                  className="liquid-glass min-w-[280px] max-w-[340px] rounded-[24px] border border-white/10 px-6 py-5 text-left shadow-xl shadow-black/30 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[0_10px_40px_-18px_rgba(212,175,55,0.8)]"
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
                        <span key={starIdx}>Γÿà</span>
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
            ╪¼╪º┘ç╪▓ ┘ä╪│┘ç╪▒╪⌐ ┘ü╪º╪«╪▒╪⌐ ╪¿╪º┘ä┘ä┘ê┘å ╪º┘ä╪░┘ç╪¿┘è ╪º┘ä╪»╪º┘â┘å╪ƒ
          </h2>
          <p className="mx-auto max-w-2xl text-base">
            ╪º╪¡╪¼╪▓ ╪¿╪»┘ä╪¬┘â ╪ú┘ê ╪º╪╖┘ä╪¿ ╪¬╪¼╪▒╪¿╪⌐ ┘à┘å╪▓┘ä┘è╪⌐. ┘ü╪▒┘è┘é Classimo ┘è╪▒╪º┘ü┘é┘â ┘ü┘è ┘â┘ä ┘ê┘ä╪º┘è╪⌐╪î
            ┘à╪╣ ┘à╪¬╪º╪¿╪╣╪⌐ ╪▒┘é┘à┘è╪⌐ ┘ü┘ê╪▒┘è╪⌐ ┘ê╪╢┘à╪º┘å ╪¼┘ê╪»╪⌐ ┘ü┘è ┘â┘ä ╪¬┘ü╪╡┘è┘ä╪⌐.
          </p>
          <Button size="lg" className="px-10">
            ╪º╪¡╪¼╪▓ ╪¿╪»┘ä╪¬┘â ╪º┘ä╪ó┘å
          </Button>
        </div>
      </section>
    </div>
  );
}
















