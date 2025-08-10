"use client";
import { useState, useEffect } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { Profile } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, Phone, Calendar, MapPin, Github, Linkedin, Instagram,
  ChevronDown, ChevronUp
} from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  showSocials?: boolean;
}

export function ProfileHeader({ showSocials = true }: ProfileHeaderProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [showContacts, setShowContacts] = useState(false);

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
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-700 rounded w-48"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 relative">
      <CardContent className="p-6">
        {/* Show Contacts Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowContacts(!showContacts)}
          className="absolute top-4 right-4 bg-yellow-500 text-gray-900 border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400"
        >
          {showContacts ? (
            <>
              Hide Contacts
              <ChevronUp size={16} className="ml-1" />
            </>
          ) : (
            <>
              Show Contacts
              <ChevronDown size={16} className="ml-1" />
            </>
          )}
        </Button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div className="relative">
            {avatarUrl ? (
              <Image 
                src={avatarUrl} 
                alt={profile.name} 
                width={80}
                height={80}
                className="w-20 h-20 rounded-full border-2 border-yellow-500 object-cover" 
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-2 border-yellow-500 bg-gray-700 flex items-center justify-center">
                <span className="text-2xl text-gray-400">👤</span>
              </div>
            )}
          </div>

          {/* Name and Title */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {profile.name}
            </h1>
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600 text-sm">
              {profile.title || "Technical Lead (Full Stack Development)"}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        {showContacts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {profile.contacts?.map((contact, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  {contact.icon === 'mail' && <Mail size={16} className="text-gray-900" />}
                  {contact.icon === 'phone' && <Phone size={16} className="text-gray-900" />}
                  {contact.icon === 'calendar' && <Calendar size={16} className="text-gray-900" />}
                  {contact.icon === 'map-pin' && <MapPin size={16} className="text-gray-900" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {contact.icon === 'mail' && 'EMAIL'}
                    {contact.icon === 'phone' && 'PHONE'}
                    {contact.icon === 'calendar' && 'BIRTHDAY'}
                    {contact.icon === 'map-pin' && 'LOCATION'}
                  </p>
                  <p className="text-sm text-white truncate">{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Media Links */}
        {showSocials && profile.socials && (
          <div className="flex gap-3">
            {profile.socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-700 text-yellow-500 hover:bg-gray-600 transition-colors"
              >
                {social.icon === 'github' && <Github size={20} />}
                {social.icon === 'linkedin' && <Linkedin size={20} />}
                {social.icon === 'instagram' && <Instagram size={20} />}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
