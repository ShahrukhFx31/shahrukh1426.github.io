"use client";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase-client";

export function ContactMapRealtime() {
  const [mapUrl, setMapUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const q = query(collection(db, "profiles"), limit(1));
    const unsub = onSnapshot(q, (snap) => {
      const doc = snap.docs[0];
      const url = (doc?.data() as { googleMap?: string } | undefined)?.googleMap;
      setMapUrl(url);
    });
    return () => unsub();
  }, []);

  if (!mapUrl) {
    return <p className="text-gray-600">Add `googleMap` to your `profiles` document to show the map.</p>;
  }

  return (
    <div className="rounded-lg overflow-hidden border">
      <iframe
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      />
    </div>
  );
}


