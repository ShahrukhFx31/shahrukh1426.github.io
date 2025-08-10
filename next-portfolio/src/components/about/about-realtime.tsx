"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "@/lib/firebase-client";
import { getDownloadURL, ref } from "firebase/storage";
import type { Profile, TechnicalExpertiseItem, SoftSkillItem, TechExperienceItem } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, Calendar, MapPin, ChevronDown, Monitor, Code, Database, Network, 
  TestTube, Zap, Users, Settings, MessageCircle, Globe, Server, Shield, 
  GitBranch, Github, Gitlab, Cloud, Droplets, Building2, Ticket, Trello, 
  MousePointer, Bot, FileText, Atom, Smartphone, RotateCcw, Circle, Search
} from "lucide-react";

// Mock data for demonstration - these would come from Firestore in production
const technicalExpertise: TechnicalExpertiseItem[] = [
  {
    title: "Frontend Engineering",
    description: "Expert in crafting dynamic and responsive web interfaces using Angular, RxJS, HTML, CSS, JavaScript, and TypeScript. Adept at creating intuitive user experiences and ensuring cross-browser compatibility.",
    icon: Monitor
  },
  {
    title: "Backend Architecture",
    description: "Specializes in developing scalable server-side solutions with Node.js, Express.js, and NestJS. Proficient in using JavaScript, TypeScript, and Socket.io to build robust backend services and real-time applications.",
    icon: Server
  },
  {
    title: "Distributed Systems",
    description: "Experienced in implementing distributed technologies such as Redis, RabbitMQ, and Kafka for managing real-time data and ensuring high availability and scalability of applications.",
    icon: Network
  },
  {
    title: "Database Solutions",
    description: "Skilled in managing and optimizing databases including MongoDB, MySQL, and PostgreSQL. Expertise in designing efficient data models and ensuring reliable data storage and retrieval.",
    icon: Database
  },
  {
    title: "Testing And Quality Assurance",
    description: "Proficient in employing testing frameworks such as Jest, Mocha, Chai, Jasmine, and Karma to ensure code quality and reliability through comprehensive unit and integration testing.",
    icon: TestTube
  }
];

const softSkills: SoftSkillItem[] = [
  {
    title: "Fast Learner",
    description: "I have the ability to quickly acquire new knowledge and adapt to changing technological environments.",
    icon: Zap
  },
  {
    title: "Teamwork",
    description: "I collaborate effectively in multidisciplinary projects and communicate clearly with team members.",
    icon: Users
  },
  {
    title: "Problem Solving",
    description: "I am creative and efficient in identifying and solving technical problems.",
    icon: Settings
  },
  {
    title: "Effective Communication",
    description: "I have the skill to convey ideas clearly and concisely, both technically and non-technically.",
    icon: MessageCircle
  }
];

// Technology icons with Lucide React icons
const techExperience: TechExperienceItem[] = [
  { name: "HTML", icon: Globe },
  { name: "Express.js", icon: Code },
  { name: "Socket.io", icon: Zap },
  { name: "Jest", icon: TestTube },
  { name: "Mocha", icon: Circle },
  { name: "Chai", icon: Circle },
  { name: "Karma", icon: Circle },
  { name: "Jasmine", icon: Circle },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "CSS", icon: Shield },
  { name: "Redis", icon: Circle },
  { name: "RabbitMQ", icon: Circle },
  { name: "Kafka", icon: Circle },
  { name: "Elasticsearch", icon: Search },
  { name: "Logstash", icon: FileText },
  { name: "Kibana", icon: Circle },
  { name: "Docker", icon: Circle },
  { name: "Kubernetes", icon: Circle },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Github },
  { name: "JavaScript", icon: Circle },
  { name: "GitLab", icon: Gitlab },
  { name: "Bitbucket", icon: Circle },
  { name: "AWS", icon: Cloud },
  { name: "DigitalOcean", icon: Droplets },
  { name: "Azure", icon: Building2 },
  { name: "Jira", icon: Ticket },
  { name: "Basecamp", icon: Building2 },
  { name: "Trello", icon: Trello },
  { name: "Cursor", icon: MousePointer },
  { name: "Generative AI", icon: Bot },
  { name: "TypeScript", icon: FileText },
  { name: "Angular", icon: Circle },
  { name: "React", icon: Atom },
  { name: "Ionic", icon: Smartphone },
  { name: "RxJS", icon: RotateCcw },
  { name: "Node.js", icon: Circle }
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-sm sm:text-base text-gray-400">Add a document to the <code className="bg-gray-800 px-2 py-1 rounded text-xs sm:text-sm">profiles</code> collection and upload the avatar image to Firebase Storage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {avatarUrl && (
                <div className="relative flex-shrink-0">
                  <Image 
                    src={avatarUrl} 
                    alt={profile.name} 
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border-2 border-yellow-500" 
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate">{profile.name}</h1>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600 text-xs sm:text-sm mt-1">
                  {profile.title || "Technical Lead (Full Stack Development)"}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 text-xs sm:text-sm w-full sm:w-auto"
            >
              Show Contacts
            </Button>
          </div>
        </div>

        {/* About Me Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6 relative">
            About Me
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-0.5 sm:h-1 bg-yellow-500 rounded"></div>
          </h2>
          <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed sm:leading-loose">
              Results-driven Full Stack Developer with 8 years of experience building scalable web and mobile applications. 
              Proficient in front-end (Angular, React), back-end (Node.js, Express), and cross-platform mobile development (Ionic). 
              Skilled in working with MongoDB, PostgreSQL, RESTful APIs, and real-time features using Socket.io. 
              Experienced in DevOps with Docker, Kubernetes, and CI/CD. Leverage AI tools like Cursor and Generative AI assistants 
              to enhance productivity, code quality, and delivery speed. Strong collaborator with a focus on delivering high-quality solutions.
            </p>
          </div>
        </section>

        {/* What I'm Doing Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 relative">
            What I&apos;m Doing
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-0.5 sm:h-1 bg-yellow-500 rounded"></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {technicalExpertise.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors h-full">
                  <CardContent className="p-4 sm:p-6 h-full">
                    <div className="flex items-start gap-3 sm:gap-4 h-full">
                      <div className="text-yellow-500 flex-shrink-0">
                        <IconComponent size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base lg:text-lg">{item.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Soft Skills Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 relative">
            Soft Skills
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-0.5 sm:h-1 bg-yellow-500 rounded"></div>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {softSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors h-full">
                  <CardContent className="p-4 sm:p-6 h-full">
                    <div className="flex items-start gap-3 sm:gap-4 h-full">
                      <div className="text-yellow-500 flex-shrink-0">
                        <IconComponent size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{skill.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{skill.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tech Experience Section */}
        <section className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 relative">
            Tech Experience
            <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-0.5 sm:h-1 bg-yellow-500 rounded"></div>
          </h2>
          <div className="bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
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
        </section>
      </div>
    </div>
  );
}


