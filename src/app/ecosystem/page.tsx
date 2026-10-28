"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Network,
  FlaskConical,
  Truck,
  GraduationCap,
  Store,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  ChevronRight,
  Building2,
  HeartHandshake
} from "lucide-react";

// Ecosystem Pillars Data
const PILLARS = [
  {
    id: "laboratories",
    tag: "Recherche & Formulation",
    title: "ICG Laboratoires & R&D",
    desc: "Un pôle scientifique d'excellence développant des formules dermo-cosmétiques de pointe conformes aux normes européennes et internationales les plus exigeantes.",
    icon: FlaskConical,
    accent: "#41cdcf",
    stats: "45+ Formules Actives",
    highlights: [
      "Tests d'efficacité cliniques & dermatologiques",
      "Sélection d'actifs biomimétiques haute pureté",
      "Charte de formulation éco-responsable et végane",
      "Partenariats avec des instituts de recherche suisses et français"
    ],
    image: "/img/labo.png"
  },
  {
    id: "distribution",
    tag: "Logistique & Approvisionnement",
    title: "Réseau Logistique & Distribution Nationale",
    desc: "Une infrastructure de distribution omnicanale ultra-performante approvisionnant officines, instituts et cliniques esthétiques dans tout le Royaume.",
    icon: Truck,
    accent: "#f54f9a",
    stats: "24/48h Livraison Maroc",
    highlights: [
      "Plateforme logistique à température contrôlée à Casablanca",
      "Traçabilité numérique unitaire par lot et QR code",
      "+1 200 pharmacies & parapharmacies partenaires",
      "Processus certifié ISO & Bonnes Pratiques de Distribution"
    ],
    image: "/img/hands.jpg"
  },
  {
    id: "academy",
    tag: "Transmission & Savoir-faire",
    title: "ICG Academy & Formation Médicale",
    desc: "Un centre de formation continue dédié aux dermatologues, pharmaciens d'officine et esthéticiennes pour maîtriser les protocoles de soin avancés.",
    icon: GraduationCap,
    accent: "#8b1a8b",
    stats: "2 500+ Professionnels Formés",
    highlights: [
      "Masterclasses animées par des dermatologues experts",
      "Ateliers pratiques de diagnostic cutané haute précision",
      "Modules e-learning certifiants disponibles 24/7",
      "Colloques scientifiques annuels ICG Skin Science"
    ],
    image: "/img/hands_together_hero.png"
  },
  {
    id: "retail",
    tag: "Expérience Consommateur",
    title: "Boutiques & Espaces Conseil Jamali",
    desc: "Des écrins de beauté pensés comme des laboratoires vivants offrant un accompagnement sur-mesure et une expérience sensorielle inoubliable.",
    icon: Store,
    accent: "#e0296a",
    stats: "98% Satisfaction Client",
    highlights: [
      "Diagnostic de peau numérique personnalisé offert",
      "Prescriptions sur-mesure adaptées à chaque phototype",
      "Expérience d'achat fluide en boutique et en ligne",
      "Conseillères et facialistes expertes certifiées"
    ],
    image: "/img/brand_hero.png"
  }
];

// Partner Brands in the Ecosystem
const ECO_BRANDS = [
  { name: "Galby", logo: "/img/galby.png", desc: "Soins dermo-cosmétiques formulés pour les peaux sensibles" },
  { name: "Magiclear", logo: "/img/magiclear.png", desc: "Expert suisse en correction pigmentaire et éclat" },
  { name: "Soivre", logo: "/img/soivre.png", desc: "Cosmétique naturelle espagnole certifiée aux actifs purs" },
  { name: "Biomed", logo: "/img/biomed.png", desc: "Soins capillaires et dermo-technologiques avancés" },
  { name: "Capilift", logo: "/img/capilift.png", desc: "Nutricosmétique & traitements capillaires intensifs" },
  { name: "Volumax", logo: "/img/volumax.png", desc: "Spécialiste du comblement et du soin des lèvres" },
  { name: "Paul de Vartens", logo: "/img/pauldevartens.png", desc: "Haute parfumerie et rituels d'exception" },
  { name: "Cleare Institute", logo: "/img/cleare.png", desc: "Innovation capillaire pharmaceutique sans sulfates" },
];

// Interactive Flow Steps
const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Sourcing & R&D",
    desc: "Identification d'actifs brevetés rares et conception de formules haute tolérance dans nos laboratoires partenaires.",
    icon: FlaskConical
  },
  {
    step: "02",
    title: "Homologation Rigoureuse",
    desc: "Contrôle qualité strict, tests toxicologiques et validation par les autorités sanitaires marocaines et internationales.",
    icon: ShieldCheck
  },
  {
    step: "03",
    title: "Distribution Intelligente",
    desc: "Acheminement contrôlé garantissant l'intégrité physico-chimique de chaque flacon jusqu'au point de délivrance.",
    icon: Truck
  },
  {
    step: "04",
    title: "Accompagnement Expert",
    desc: "Conseil officinal et suivi personnalisé pour des résultats visibles et une confiance renouvelée.",
    icon: Sparkles
  }
];

export default function EcosystemPage() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <main className="bg-[#FAF9F7] min-h-screen text-[#1a1a2e] overflow-hidden selection:bg-[#41cdcf]/20 selection:text-[#1a1a2e]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 lg:pt-36 pb-20 lg:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Glows & Gradients Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#41cdcf]/15 via-[#f54f9a]/10 to-[#8b1a8b]/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#41cdcf]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#f54f9a]/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#1a1a2e_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/80 shadow-sm backdrop-blur-md mb-6"
          >
            <Network className="w-4 h-4 text-[#41cdcf] animate-[spin_10s_linear_infinite]" />
            <span className="navbar-font text-[11px] font-bold tracking-[0.25em] uppercase text-[#1a1a2e]">
              L&apos;Écosystème Intégré ICG
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="logo-font text-4xl sm:text-6xl lg:text-7xl font-light text-[#1a1a2e] mb-6 leading-[1.1]"
          >
            Une Synergie Unique au Service de la{" "}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#e4006d] via-[#7071b1] to-[#41cdcf]">
              Santé Cutanée
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="navbar-font text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal"
          >
            De la recherche moléculaire jusqu&apos;à la délivrance en pharmacie, 
            <strong> Intelligence Cosmétique Group</strong> orchestre un univers interconnecté 
            qui allie science de pointe, logistique certifiée et transmission du savoir médical.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#pillars"
              className="group px-7 py-3.5 rounded-full bg-[#1a1a2e] text-white navbar-font text-xs uppercase tracking-widest font-semibold hover:bg-[#41cdcf] hover:text-[#1a1a2e] transition-all duration-300 shadow-md flex items-center gap-2"
            >
              <span>Explorer les 4 Piliers</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-full bg-white border border-gray-200 text-gray-800 navbar-font text-xs uppercase tracking-widest font-semibold hover:border-[#f54f9a] hover:text-[#f54f9a] transition-all duration-300 shadow-sm"
            >
              Découvrir nos Produits
            </Link>
          </motion.div>

          {/* Key Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { val: "1 200+", label: "Officines Partenaires", icon: Building2 },
              { val: "100%", label: "Traçabilité & Qualité", icon: ShieldCheck },
              { val: "12+", label: "Marques Internationales", icon: Award },
              { val: "24/48h", label: "Livraison Nationale", icon: Zap },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md border border-white/60 p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-8 h-8 mx-auto mb-2.5 rounded-full bg-[#41cdcf]/10 text-[#41cdcf] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="logo-font text-2xl lg:text-3xl font-bold text-[#1a1a2e] mb-1">
                  {stat.val}
                </div>
                <div className="navbar-font text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── THE 4 PILLARS INTERACTIVE SHOWCASE ── */}
      <section id="pillars" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="navbar-font text-[10px] uppercase tracking-[0.35em] text-[#41cdcf] font-bold block mb-3">
              Architecture de l&apos;Écosystème
            </span>
            <h2 className="logo-font text-3xl sm:text-5xl text-[#1a1a2e] mb-4">
              Quatre Piliers Interdépendants
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#41cdcf] to-[#f54f9a] mx-auto" />
            <p className="navbar-font text-sm text-gray-500 mt-4 leading-relaxed">
              Chaque division renforce l&apos;autre afin de créer une boucle vertueuse 
              dédiée à l&apos;innovation, la formation et la satisfaction patient.
            </p>
          </div>

          {/* Pillar Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 navbar-font ${
                    isActive
                      ? "bg-[#1a1a2e] text-white shadow-lg scale-105"
                      : "bg-[#FAF9F7] text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <Icon className="w-4 h-4" style={{ color: isActive ? pillar.accent : "currentColor" }} />
                  <span>{pillar.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FAF9F7] border border-gray-200/70 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Text & Features */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-gray-200 text-xs font-semibold tracking-wider uppercase text-gray-700 navbar-font">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PILLARS[activePillar].accent }} />
                    {PILLARS[activePillar].stats}
                  </div>

                  <h3 className="logo-font text-3xl sm:text-4xl text-[#1a1a2e] leading-snug">
                    {PILLARS[activePillar].title}
                  </h3>

                  <p className="navbar-font text-sm sm:text-base text-gray-600 leading-relaxed font-light">
                    {PILLARS[activePillar].desc}
                  </p>

                  <div className="space-y-3 pt-2">
                    {PILLARS[activePillar].highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: PILLARS[activePillar].accent }}
                        />
                        <span className="navbar-font text-xs sm:text-sm text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href="/aboutUs#contact"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a2e] hover:text-[#e0296a] transition-colors navbar-font group"
                    >
                      <span>Collaborer avec ce pôle</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right: Media / Visual Card */}
                <div className="lg:col-span-5">
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3] bg-gray-100">
                    <Image
                      src={PILLARS[activePillar].image}
                      alt={PILLARS[activePillar].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="navbar-font text-[10px] uppercase tracking-widest text-[#41cdcf] font-bold block mb-1">
                        Pôle d&apos;expertise
                      </span>
                      <p className="logo-font text-xl font-light">
                        {PILLARS[activePillar].tag}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── FLOW / VALUE CHAIN SECTION ── */}
      <section className="py-24 bg-[#FAF9F7] relative border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="navbar-font text-[10px] uppercase tracking-[0.35em] text-[#f54f9a] font-bold block mb-3">
              Cycle de Valeur Intégré
            </span>
            <h2 className="logo-font text-3xl sm:text-5xl text-[#1a1a2e] mb-4">
              De la Molécule au Visage
            </h2>
            <div className="w-16 h-[2px] bg-[#f54f9a] mx-auto" />
            <p className="navbar-font text-sm text-gray-500 mt-4 leading-relaxed">
              Comment chaque étape de notre écosystème garantit pureté, efficacité et conformité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFECYCLE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="logo-font text-3xl font-light text-gray-300 group-hover:text-[#41cdcf] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] flex items-center justify-center text-[#1a1a2e] group-hover:bg-[#41cdcf]/10 group-hover:text-[#41cdcf] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="logo-font text-xl text-[#1a1a2e] mb-2 font-medium">
                      {step.title}
                    </h4>
                    <p className="navbar-font text-xs text-gray-500 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#f54f9a] transition-colors navbar-font">
                    <span>Étape certifiée</span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM BRANDS DIRECTORY ── */}
      <section id="partners" className="py-24 bg-white border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="navbar-font text-[10px] uppercase tracking-[0.35em] text-[#41cdcf] font-bold block mb-3">
                Marques Réunies
              </span>
              <h2 className="logo-font text-3xl sm:text-5xl text-[#1a1a2e]">
                Le Portefeuille ICG
              </h2>
            </div>
            <p className="navbar-font text-sm text-gray-500 max-w-md leading-relaxed">
              Des marques de renommée mondiale intégrées dans notre chaîne d&apos;approvisionnement et sélectionnées selon un cahier des charges dermo-scientifique strict.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ECO_BRANDS.map((b, i) => (
              <div
                key={i}
                className="bg-[#FAF9F7] border border-gray-200/70 p-6 rounded-2xl flex flex-col items-center text-center justify-between hover:bg-white hover:shadow-xl hover:border-[#41cdcf]/40 transition-all duration-300 group"
              >
                <div className="h-16 w-full flex items-center justify-center p-2 mb-4">
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={110}
                    height={40}
                    className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <div>
                  <h4 className="logo-font text-lg font-bold text-[#1a1a2e] mb-1">
                    {b.name}
                  </h4>
                  <p className="navbar-font text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
                <Link
                  href="/products"
                  className="mt-4 text-[10px] uppercase font-bold tracking-widest text-[#41cdcf] group-hover:text-[#e0296a] transition-colors navbar-font"
                >
                  Voir les soins ›
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION / PARTNERSHIP BANNER ── */}
      <section className="py-20 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#41cdcf]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f54f9a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="w-12 h-12 rounded-full bg-white/10 text-[#41cdcf] mx-auto flex items-center justify-center mb-6">
            <HeartHandshake className="w-6 h-6" />
          </div>

          <span className="navbar-font text-[10px] uppercase tracking-[0.35em] text-[#41cdcf] font-bold block mb-3">
            Rejoignez l&apos;Écosystème
          </span>

          <h2 className="logo-font text-3xl sm:text-5xl font-light mb-6">
            Vous Êtes Professionnel de Santé ou Distributeur ?
          </h2>

          <p className="navbar-font text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Intégrez le réseau officiel ICG et profitez d&apos;un accès prioritaire à nos marques, 
            nos formations continues certifiantes et notre support logistique dédié.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/aboutUs#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#41cdcf] to-[#2fb6b8] text-[#1a1a2e] navbar-font text-xs uppercase tracking-widest font-bold hover:scale-105 transition-all shadow-lg shadow-[#41cdcf]/20"
            >
              Demander un Partenariat
            </Link>
            <a
              href="tel:+212665474087"
              className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white navbar-font text-xs uppercase tracking-widest font-bold hover:bg-white/20 transition-all"
            >
              Parler à un Conseiller
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
