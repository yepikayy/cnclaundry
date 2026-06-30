import { supabase } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Service = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  turnaround: string;
  description: string;
  features: string[];
  badge: string;
  badge_color: string;
  gradient: string;
  light_bg: string;
  display_order: number;
};

export type PricingFeature = { text: string; included: boolean };

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: PricingFeature[];
  is_highlight: boolean;
  cta_text: string;
  href: string;
  display_order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar_initials: string;
  rating: number;
  content: string;
  gradient: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  display_order: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  display_order: number;
};

export type OrderInsert = {
  service_slug: string;
  service_name: string;
  pickup_date: string;
  time_slot: string;
  customer_name: string;
  phone: string;
  address: string;
  notes?: string;
};

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("display_order");
  if (error) { console.error("getServices:", error.message); return []; }
  return data ?? [];
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const { data, error } = await supabase
    .from("pricing")
    .select("*")
    .eq("active", true)
    .order("display_order");
  if (error) { console.error("getPricingPlans:", error.message); return []; }
  return data ?? [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("active", true)
    .order("created_at");
  if (error) { console.error("getTestimonials:", error.message); return []; }
  return data ?? [];
}

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from("faq")
    .select("*")
    .eq("active", true)
    .order("display_order");
  if (error) { console.error("getFAQs:", error.message); return []; }
  return data ?? [];
}

export async function getGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("active", true)
    .order("display_order");
  if (error) { console.error("getGallery:", error.message); return []; }
  return data ?? [];
}

export async function createOrder(order: OrderInsert): Promise<void> {
  const { error } = await supabase.from("orders").insert(order);
  if (error) throw new Error(error.message);
}
