import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import OurStory from "@/components/OurStory";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <SubscriptionPlans />
      <Partners />
      <OurStory />
    </main>
  );
}
