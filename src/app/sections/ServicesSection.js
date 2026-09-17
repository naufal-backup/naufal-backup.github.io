import { FaGlobe, FaLaptopCode, FaPenNib, FaWrench } from "react-icons/fa";
import WavyText from "../components/WavyText";
import ScrollReveal, { StaggerContainer, StaggerItem } from "../components/ScrollReveal";

const WA_NUMBER = "628138187989";

const services = [
  {
    icon: <FaGlobe size={26} className="text-[#4a9eff]" />,
    title: "Landing Page / Company Profile",
    desc: "Halaman profil usaha yang cepat, responsif, dan SEO-friendly — cocok untuk promosi dan katalog online.",
    meta: "Estimasi: 1–2 minggu",
  },
  {
    icon: <FaLaptopCode size={26} className="text-[#22c55e]" />,
    title: "Web App (Laravel, Next.js)",
    desc: "Sistem web seperti dashboard, HRIS, atau inventory — dari database sampai deploy production.",
    meta: "Estimasi: 3–8 minggu",
  },
  {
    icon: <FaPenNib size={26} className="text-[#f97316]" />,
    title: "UI/UX Design",
    desc: "Desain Figma yang rapi dan siap development — wireframe, mockup, dan design system sederhana.",
    meta: "Estimasi: 1–3 minggu",
  },
  {
    icon: <FaWrench size={26} className="text-[#eab308]" />,
    title: "Maintenance & Revisi",
    desc: "Perbaikan bug, peningkatan kecepatan, dan update berkala untuk website yang sudah berjalan.",
    meta: "Skema: per task / bulanan",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-6 md:px-12 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="fadeUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#f5f5f5]">
            <WavyText text="Layanan" />
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fadeUp" delay={0.1}>
          <p className="text-center text-[#808080] mb-12 text-lg max-w-2xl mx-auto">
            Jasa pembuatan website untuk usaha dan kebutuhan profesional — harga
            pasti via konsultasi gratis.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service) => (
            <StaggerItem key={service.title} animation="popIn">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 h-full flex flex-col hover:border-[#4a9eff]/40 transition-colors">
                <div className="w-14 h-14 bg-[#0f0f0f] rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#a0a0a0] leading-relaxed flex-1">
                  {service.desc}
                </p>
                <p className="text-xs text-[#808080] mt-4 mb-4">{service.meta}</p>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    `Halo, saya tertarik dengan layanan: ${service.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#4a9eff] hover:text-white transition-colors"
                >
                  Tanya layanan ini →
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
