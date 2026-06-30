import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview />
      <HowItWorks />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
