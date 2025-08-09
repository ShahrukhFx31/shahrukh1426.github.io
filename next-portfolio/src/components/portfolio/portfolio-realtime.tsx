"use client";
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { ProjectItem } from "@/types/content";
import { ProjectsGrid } from "./projects-grid";

type ProjectWithUrl = ProjectItem & { imageUrl: string };

export function PortfolioRealtime() {
  const [projects, setProjects] = useState<ProjectWithUrl[] | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "projects")), async (snap) => {
      const items = snap.docs.map((d) => d.data() as ProjectItem);
      const withUrls = await Promise.all(
        items.map(async (p) => ({ ...p, imageUrl: await getDownloadURL(ref(storage, p.image)) }))
      );
      setProjects(withUrls);
    });
    return () => unsub();
  }, []);

  if (!projects) return <p className="mt-6 text-gray-600">Add docs to <code>projects</code> and upload images to Storage.</p>;

  return <ProjectsGrid projects={projects} />;
}


