"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import type { ProgressItem, TimelineItem } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ResumeRealtime() {
  const [languages, setLanguages] = useState<ProgressItem[] | null>(null);
  const [techSkills, setTechSkills] = useState<ProgressItem[] | null>(null);
  const [educations, setEducations] = useState<TimelineItem[] | null>(null);
  const [experiences, setExperiences] = useState<TimelineItem[] | null>(null);

  useEffect(() => {
    const unsubs = [
      onSnapshot(query(collection(db, "languages")), (snap) => {
        setLanguages(snap.docs.map((d) => d.data() as ProgressItem));
      }),
      onSnapshot(query(collection(db, "techSkills")), (snap) => {
        setTechSkills(snap.docs.map((d) => d.data() as ProgressItem));
      }),
      onSnapshot(query(collection(db, "educations")), (snap) => {
        setEducations(snap.docs.map((d) => d.data() as TimelineItem));
      }),
      onSnapshot(query(collection(db, "experiences")), (snap) => {
        setExperiences(snap.docs.map((d) => d.data() as TimelineItem));
      }),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Languages</CardTitle></CardHeader>
          <CardContent>
            {languages ? (
              <ul className="space-y-2 text-foreground">
                {languages.map((l) => (
                  <li key={l.title} className="flex justify-between"><span>{l.title}</span><span className="text-muted-foreground">{l.value}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Add docs to <code>languages</code>.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>My Skills</CardTitle></CardHeader>
          <CardContent>
            {techSkills ? (
              <ul className="space-y-2 text-foreground">
                {techSkills.map((s) => (
                  <li key={s.title} className="flex justify-between"><span>{s.title}</span><span className="text-muted-foreground">{s.value}</span></li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Add docs to <code>techSkills</code>.</p>
            )}
          </CardContent>
        </Card>
      </section>
      <section className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
          <CardContent>
            {experiences ? (
              <ul className="space-y-3 text-foreground">
                {experiences.map((e) => (
                  <li key={e.title}>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.timeline}</div>
                    <p className="text-sm mt-1 text-muted-foreground">{e.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Add docs to <code>experiences</code>.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Education</CardTitle></CardHeader>
          <CardContent>
            {educations ? (
              <ul className="space-y-3 text-foreground">
                {educations.map((e) => (
                  <li key={e.title}>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.timeline}</div>
                    <p className="text-sm mt-1 text-muted-foreground">{e.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">Add docs to <code>educations</code>.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


