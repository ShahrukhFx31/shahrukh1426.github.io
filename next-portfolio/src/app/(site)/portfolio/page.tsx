import { fetchJsonFromStorage, getStorageUrl } from "@/lib/storage";
import type { ProjectItem } from "@/types/content";
import { ProjectsGrid } from "@/components/portfolio/projects-grid";

export default async function PortfolioPage() {
  let withUrls: (ProjectItem & { imageUrl: string })[] | null = null;
  try {
    const projects = await fetchJsonFromStorage<ProjectItem[]>(
      "content/projects.json"
    );
    withUrls = await Promise.all(
      projects.map(async (p) => ({ ...p, imageUrl: await getStorageUrl(p.image) }))
    );
  } catch {}

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      {withUrls ? (
        <ProjectsGrid projects={withUrls} />
      ) : (
        <p className="mt-6 text-gray-600">Upload <code>content/projects.json</code> and referenced images in Firebase Storage.</p>
      )}
    </main>
  );
}


