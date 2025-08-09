import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeRealtime } from "@/components/resume/resume-realtime";

export default async function ResumePage() {

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
      <h1 className="text-2xl font-semibold">Resume</h1>
      <ResumeRealtime />
    </main>
  );
}


