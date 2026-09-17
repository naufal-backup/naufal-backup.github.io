import WavyText from "../components/WavyText";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/ScrollReveal";

const steps = [
  {
    no: "1",
    title: "Konsultasi Kebutuhan",
    desc: "Ceritakan kebutuhan via WhatsApp — fitur, referensi desain, dan budget kasar. Gratis, tanpa komitmen.",
  },
  {
    no: "2",
    title: "Desain / Draft",
    desc: "Saya buatkan draft tampilan dan rincian scope + timeline sebelum development dimulai.",
  },
  {
    no: "3",
    title: "Development",
    desc: "Pengerjaan bertahap dengan update progres berkala yang bisa dipantau.",
  },
  {
    no: "4",
    title: "Revisi & Serah Terima",
    desc: "Revisi sesuai kesepakatan, lalu serah terima source code + panduan deploy.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 px-6 md:px-12 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="fadeUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#f5f5f5]">
            <WavyText text="Proses Kerja" />
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <p className="text-center text-[#808080] mb-12 text-lg">
            Alur yang jelas dari awal sampai website live.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {steps.map((step) => (
            <StaggerItem key={step.no} animation="fadeUp">
              <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full">
                <div className="text-5xl font-bold text-[#2a2a2a] absolute top-4 right-5 select-none">
                  {step.no}
                </div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2 relative">
                  {step.title}
                </h3>
                <p className="text-sm text-[#a0a0a0] leading-relaxed relative">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
