"use client";
import Image from "next/image";
import { useMemo, useState } from "react";

type Project = {
  category: string;
  title: string;
  url: string;
  imageUrl: string;
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>(projects.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [selected, setSelected] = useState<string>(categories[0] ?? "All");

  const filtered = useMemo(() => {
    if (selected === "All") return projects;
    return projects.filter((p) => p.category === selected);
  }, [projects, selected]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`px-3 py-1 rounded-full border text-sm ${
              selected === c ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <li key={p.title} className="rounded-lg border overflow-hidden">
            <Image
              src={p.imageUrl}
              alt={p.title}
              width={600}
              height={400}
              className="aspect-video object-cover"
            />
            <div className="p-3">
              <div className="font-medium text-foreground">{p.title}</div>
              <div className="text-xs text-muted-foreground">{p.category}</div>
              <a className="text-sm text-primary underline" href={p.url} target="_blank" rel="noreferrer">Visit</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


