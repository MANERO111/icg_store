"use client";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useState } from "react";

const navLinks: Record<string, { label: string; href: string }[]> = {
  ICG: [
    { label: "À propos", href: "/aboutUs" },
    { label: "Notre histoire", href: "/aboutUs" },
    { label: "Mission & Vision", href: "/aboutUs" },
    { label: "Nos valeurs", href: "/aboutUs" },
  ],
  MARQUES: [
    { label: "Nos marques", href: "/products" },
    { label: "Innovation", href: "/ecosystem" },
    { label: "Boutique", href: "/products" }
  ],
  ÉCOSYSTÈME: [
    { label: "Écosystème ICG", href: "/ecosystem" },
    { label: "Partenaires", href: "/ecosystem#partners" },
    { label: "Formation", href: "/ecosystem#academy" },
    { label: "Distribution", href: "/ecosystem#distribution" },
  ],
  CONTACT: [
    { label: "Contact", href: "/aboutUs#contact" },
    { label: "Demande de partenariat", href: "/aboutUs#contact" }
  ],
};

const socialIcons = [
  {
    label: "Instagram",
    svg: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.226 7.149 2.163 8.415 2.105 8.795 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 1.977 2.051.6 3.429.084 5.271 0 7.126-.014 8.406 0 8.815 0 12c0 3.185.014 3.594.072 4.874.085 1.855.601 3.697 1.977 5.075C3.427 23.327 5.269 23.843 7.124 23.928 8.404 23.986 8.813 24 12 24s3.596-.014 4.876-.072c1.855-.085 3.697-.601 5.075-1.977 1.376-1.378 1.892-3.22 1.977-5.075C23.986 15.596 24 15.187 24 12s-.014-3.594-.072-4.874c-.085-1.855-.601-3.697-1.977-5.075C20.573.673 18.731.157 16.876.072 15.596.014 15.187 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a1.977 1.977 0 0 1-1.972-1.98 1.977 1.977 0 1 1 3.954 0 1.977 1.977 0 0 1-1.982 1.98zm1.706 13.019H3.63V9h3.414v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    svg: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(to right, #d72f70 , #7071b1 )",
      }}
    >
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute -right-10 bottom-12 h-56 w-56 rounded-full bg-white/[0.04]" />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-10 pt-14 lg:grid-cols-[300px_1fr] lg:gap-16">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-7">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/img/logo_white.png" alt="Logo" width={190} height={60} style={{ width: "auto", height: "auto" }} />
          </div>

          {/* Description */}
          <p className="max-w-[290px] text-sm leading-relaxed text-white/70">
            Intelligence Cosmétique Group (ICG) est un groupe marocain spécialisé
            dans le développement et la distribution de solutions
            dermocosmétiques innovantes.
          </p>

          {/* Email subscribe */}
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Saisissez votre adresse e-mail ici"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full rounded-full border border-white/25 bg-white/10 py-3 pl-5 pr-14 text-sm text-white placeholder-white/45 outline-none transition-all duration-300 focus:border-white/55 focus:bg-white/15"
            />
            <button
              onClick={handleSubmit}
              aria-label="S'inscrire"
              className="absolute right-1.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg text-white transition-all duration-200 hover:scale-105 hover:bg-white/35"
            >
              {submitted ? "✓" : "›"}
            </button>
          </div>

          {/* Social media */}
          <div className="flex items-center gap-4">
            <span
              className="text-xs font-medium uppercase tracking-widest text-white/55"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Social Media
            </span>
            <div className="flex gap-2">
              {socialIcons.map(({ label, svg }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/25"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-8">

          {/* Nav grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {Object.entries(navLinks).map(([heading, links]) => (
              <div key={heading}>
                <p
                  className="mb-4 text-[0.72rem] font-bold uppercase tracking-widest text-white"
                  style={{ fontFamily: " sans-serif" }}
                >
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-all duration-200 hover:pl-1 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="border-t border-white/15 pt-7">
            <p
              className="mb-5 text-[0.72rem] font-bold uppercase tracking-widest text-white"
              style={{ fontFamily: " sans-serif" }}
            >
              CONTACT
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4">

              {/* Phone */}
              <div className="flex items-center gap-2 text-sm text-white/75">
                <Phone className="w-4 h-4" />
                <a href="tel:+212612345678" className="transition-colors duration-200 hover:text-white">
                  +212 6 1234567
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2 text-sm text-white/75">
                {/* <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg> */}
                
                <a href="https://wa.me/212612345678" className="transition-colors duration-200 hover:text-white">
                  +212 6 1234567
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-white/75">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:hello@icg.com" className="transition-colors duration-200 hover:text-white">
                  hello@icg.com
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2 text-sm text-white/75">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <div className="flex flex-col leading-snug">
                  <span>horaires</span>
                  <span className="text-xs text-white/45">09:00 à 20:00</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="text-xs text-white/45">
            © 2026 Intelligence Cosmétique Group. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/50 transition-colors duration-200 hover:text-white">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-white/50 transition-colors duration-200 hover:text-white">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}