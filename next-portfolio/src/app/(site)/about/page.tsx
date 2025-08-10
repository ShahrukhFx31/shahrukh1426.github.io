import { AboutRealtime } from "@/components/about/about-realtime";
import { BottomNavLayout } from "@/components/layout/bottom-nav-layout";

export default async function AboutPage() {
  return (
    <BottomNavLayout>
      <AboutRealtime />
    </BottomNavLayout>
  );
}


