"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { Profile } from "@/types/content";

export function AboutRealtime() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    const q = query(collection(db, "profiles"), limit(1));
    const unsub = onSnapshot(q, async (snap) => {
      const doc = snap.docs[0];
      if (!doc) {
        setProfile(null);
        return;
      }
      const data = doc.data() as Profile;
      setProfile(data);
      if (data.avatar) {
        const url = await getDownloadURL(ref(storage, data.avatar));
        setAvatarUrl(url);
      } else {
        setAvatarUrl(undefined);
      }
    });
    return () => unsub();
  }, []);

  if (!profile) {
    return (
      <p className="mt-6 text-gray-600">Add a document to the <code>profiles</code> collection and upload the avatar image to Firebase Storage.</p>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-start gap-6">
        {avatarUrl && (
          <Image src={avatarUrl} alt={profile.name} width={120} height={120} className="rounded-xl" />
        )}
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
    </div>
  );
}


