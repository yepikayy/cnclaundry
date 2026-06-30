"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Waves } from "lucide-react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/pricing", label: "Harga" },
  { href: "/order", label: "Pesan" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent" : "glass shadow-sm shadow-sky-100/50"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300 }}>
            <Waves className={`w-7 h-7 transition-colors duration-300 ${transparent ? "text-white" : "text-sky-500"}`} />
          </motion.div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${transparent ? "text-white" : "text-gradient"}`}>
            CNC Laundry
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    transparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : active
                      ? "text-sky-600 bg-sky-50"
                      : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  {label}
                  {active && !transparent && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-sky-50 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link href="/order">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                transparent
                  ? "bg-white text-sky-600 hover:bg-sky-50"
                  : "bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-200"
              }`}
            >
              Pesan Sekarang
            </motion.button>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          className={`md:hidden p-2 rounded-xl transition-colors ${
            transparent ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-sky-50"
          }`}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass border-t border-sky-100/40 overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === href
                        ? "text-sky-600 bg-sky-50"
                        : "text-slate-600 hover:text-sky-600 hover:bg-sky-50"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/order" className="block">
                  <button className="w-full px-4 py-3 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors">
                    Pesan Sekarang
                  </button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
