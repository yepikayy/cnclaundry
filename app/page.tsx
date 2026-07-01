import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { services } from "@/lib/services-data";
import { getTestimonials, getFAQs } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [testimonials, faqs] = await Promise.all([
    getTestimonials(),
    getFAQs(),
  ]);

  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview data={services} />
      <HowItWorks />
      <PricingPreview data={services} />
      <Testimonials data={testimonials} />
      <FAQ data={faqs} />
      <CTA />
    </>
  );
}
