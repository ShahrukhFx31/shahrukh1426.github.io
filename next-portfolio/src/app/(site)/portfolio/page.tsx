import { fetchJsonFromStorage, getStorageUrl } from "@/lib/storage";
import type { ProjectItem } from "@/types/content";
import { ProjectsGrid } from "@/components/portfolio/projects-grid";

export default async function PortfolioPage() {
  const projects = await fetchJsonFromStorage<ProjectItem[]>(
    "content/projects.json"
  );
  const withUrls = await Promise.all(
    projects.map(async (p) => ({ ...p, imageUrl: await getStorageUrl(p.image) }))
  );

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <ProjectsGrid projects={withUrls} />
    </main>
  );
}


