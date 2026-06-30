import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PricingPreview } from "@/components/home/PricingPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { getServices, getPricingPlans, getTestimonials, getFAQs } from "@/lib/db";

export default async function HomePage() {
  const [services, pricing, testimonials, faqs] = await Promise.all([
    getServices(),
    getPricingPlans(),
    getTestimonials(),
    getFAQs(),
  ]);

  return (
    <>
      <Hero />
      <Features />
      <ServicesPreview data={services} />
      <HowItWorks />
      <PricingPreview data={pricing} />
      <Testimonials data={testimonials} />
      <FAQ data={faqs} />
      <CTA />
    </>
  );
}
