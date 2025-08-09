import { PortfolioRealtime } from "@/components/portfolio/portfolio-realtime";

export default async function PortfolioPage() {

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <PortfolioRealtime />
    </main>
  );
}


