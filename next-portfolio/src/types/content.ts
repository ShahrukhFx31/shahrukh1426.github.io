export type ContactItem = {
  icon: string;
  title: string;
  value: string;
  link?: string;
  type?: 'link' | 'address' | 'date';
};

export type SocialItem = {
  link: string;
  icon: string;
};

export type Profile = {
  avatar: string; // Storage path
  name: string;
  title?: string;
  presentation: string[];
  googleMap?: string; // embed URL
  contacts?: ContactItem[];
  socials?: SocialItem[];
};

export type ProjectItem = {
  category: string;
  image: string; // Storage path
  title: string;
  url: string;
};

export type ProgressItem = {
  title: string;
  value: string; // e.g. "80%"
};

export type TimelineItem = {
  title: string;
  timeline: string;
  description: string;
};


