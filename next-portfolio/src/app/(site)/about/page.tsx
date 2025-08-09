import { AboutRealtime } from "@/components/about/about-realtime";

export default async function AboutPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">About</h1>
      <AboutRealtime />
    </main>
  );
}


