import { fetchJsonFromStorage } from "@/lib/storage";
import type { ProgressItem, TimelineItem } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResumePage() {
  let languages: ProgressItem[] | null = null;
  let techSkills: ProgressItem[] | null = null;
  let educations: TimelineItem[] | null = null;
  let experiences: TimelineItem[] | null = null;
  try {
    [languages, techSkills, educations, experiences] = await Promise.all([
      fetchJsonFromStorage<ProgressItem[]>("content/languages.json"),
      fetchJsonFromStorage<ProgressItem[]>("content/techSkills.json"),
      fetchJsonFromStorage<TimelineItem[]>("content/educations.json"),
      fetchJsonFromStorage<TimelineItem[]>("content/experiences.json"),
    ]);
  } catch {}

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      <h1 className="text-2xl font-semibold">Resume</h1>
      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Languages</CardTitle></CardHeader>
          <CardContent>
            {languages ? (
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.title} className="flex justify-between"><span>{l.title}</span><span>{l.value}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Upload <code>content/languages.json</code> to populate this section.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>My Skills</CardTitle></CardHeader>
          <CardContent>
            {techSkills ? (
              <ul className="space-y-2">
                {techSkills.map((s) => (
                  <li key={s.title} className="flex justify-between"><span>{s.title}</span><span>{s.value}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Upload <code>content/techSkills.json</code>.</p>
            )}
          </CardContent>
        </Card>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
          <CardContent>
            {experiences ? (
              <ul className="space-y-3">
                {experiences.map((e) => (
                  <li key={e.title}>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-gray-500">{e.timeline}</div>
                    <p className="text-sm mt-1 text-gray-700">{e.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Upload <code>content/experiences.json</code>.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Education</CardTitle></CardHeader>
          <CardContent>
            {educations ? (
              <ul className="space-y-3">
                {educations.map((e) => (
                  <li key={e.title}>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-gray-500">{e.timeline}</div>
                    <p className="text-sm mt-1 text-gray-700">{e.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Upload <code>content/educations.json</code>.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}


