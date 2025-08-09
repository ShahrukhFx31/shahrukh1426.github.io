import { AboutRealtime } from "@/components/about/about-realtime";

export default async function AboutPage() {
  return (
    <main className="py-10">
      <div className="inline-block bg-gradient-to-r from-primary/80 to-accent/70 h-1 w-12 rounded mb-4"></div>
      <h1 className="text-3xl font-semibold tracking-tight">About Me</h1>
      <AboutRealtime />
    </main>
  );
}


