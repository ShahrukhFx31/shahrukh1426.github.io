import Image from "next/image";
import { fetchJsonFromStorage, getStorageUrl } from "@/lib/storage";
import type { Profile } from "@/types/content";

export default async function AboutPage() {
  const profile = await fetchJsonFromStorage<Profile>("content/profile.json");
  const avatarUrl = await getStorageUrl(profile.avatar);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">About</h1>
      <div className="mt-6 flex items-start gap-6">
        <Image src={avatarUrl} alt={profile.name} width={120} height={120} className="rounded-xl" />
        <div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          {profile.title && <p className="text-gray-600">{profile.title}</p>}
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {profile.presentation?.map((p, i) => (
          <p key={i} className="text-gray-700">{p}</p>
        ))}
      </div>
    </main>
  );
}


