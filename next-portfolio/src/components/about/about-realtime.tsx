"use client";
import { useState, useEffect } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { Profile, TechnicalExpertiseItem, SoftSkillItem, TechExperienceItem } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { 
  Code, Palette, Smartphone, Globe, Users, Target, 
  Lightbulb, Zap, Heart, Star,
  Database, Server, Cloud,
  Circle, FileText, Cpu,
  Database as Db, GitBranch, Layers,
  Coffee, Package
} from "lucide-react";

// Mock data for demonstration
const technicalExpertise: TechnicalExpertiseItem[] = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks like React, Angular, and Vue.js.",
    icon: Code
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing designs that enhance user experience and engagement.",
    icon: Palette
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications using React Native and Flutter for iOS and Android.",
    icon: Smartphone
  },
  {
    title: "Web Development",
    description: "Building scalable web applications with modern technologies and best practices.",
    icon: Globe
  }
];

const softSkills: SoftSkillItem[] = [
  {
    title: "Team Leadership",
    description: "Leading development teams and mentoring junior developers to achieve project goals.",
    icon: Users
  },
  {
    title: "Problem Solving",
    description: "Analyzing complex problems and implementing effective solutions with attention to detail.",
    icon: Target
  },
  {
    title: "Innovation",
    description: "Staying updated with latest technologies and bringing innovative ideas to projects.",
    icon: Lightbulb
  },
  {
    title: "Fast Learning",
    description: "Quickly adapting to new technologies and frameworks as project requirements evolve.",
    icon: Zap
  },
  {
    title: "Passion",
    description: "Maintaining high enthusiasm and dedication towards delivering quality software solutions.",
    icon: Heart
  },
  {
    title: "Excellence",
    description: "Striving for excellence in every project with focus on performance and user experience.",
    icon: Star
  }
];

const techExperience: TechExperienceItem[] = [
  { name: "React", icon: Circle },
  { name: "Angular", icon: Circle },
  { name: "Node.js", icon: Server },
  { name: "TypeScript", icon: FileText },
  { name: "Python", icon: Cpu },
  { name: "Java", icon: Coffee },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Db },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: Package },
  { name: "Git", icon: GitBranch },
  { name: "CI/CD", icon: Layers }
];

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

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <ProfileHeader showSocials={true} />

      {/* About Me Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">About Me</h2>
          <div className="text-gray-300 space-y-4">
            {profile?.presentation?.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            )) || (
              <>
                <p className="leading-relaxed">
                  I am a passionate Full Stack Developer with over 5 years of experience in building scalable web applications. 
                  I specialize in modern JavaScript frameworks, cloud technologies, and creating intuitive user experiences.
                </p>
                <p className="leading-relaxed">
                  My journey in software development started with a curiosity to understand how things work, 
                  which has evolved into a deep passion for creating solutions that make a difference. 
                  I believe in writing clean, maintainable code and staying updated with the latest industry trends.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* What I&apos;m Doing Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">What I&apos;m Doing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {technicalExpertise.map((expertise, index) => {
              const IconComponent = expertise.icon;
              return (
                <div key={index} className="text-center group">
                                     <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <IconComponent size={28} />
                   </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{expertise.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{expertise.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Soft Skills Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Soft Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-700 rounded-lg group hover:bg-gray-600 transition-colors">
                                     <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                     <IconComponent size={24} />
                   </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{skill.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tech Experience Section */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Tech Experience</h2>
          <div className="bg-gray-700 rounded-lg p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
              {techExperience.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center group">
                    <div className="text-yellow-500 mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                      <IconComponent size={20} />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 font-medium group-hover:text-yellow-500 transition-colors leading-tight">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


