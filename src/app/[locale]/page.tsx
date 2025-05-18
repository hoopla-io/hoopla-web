import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import OurStory from "@/components/OurStory";
import Partners from "@/components/Partners";
import { Suspense } from "react";
import { getSubscriptions } from "@/lib/utils";

export default function Home() {
  const subscriptionsPromise = getSubscriptions();

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionPlans subscriptionsPromise={subscriptionsPromise} />
      </Suspense>
      <Partners />
      <OurStory />
    </main>
  );
}
