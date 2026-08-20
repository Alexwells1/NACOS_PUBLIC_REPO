// constants/about.ts
import { Code, Shield, Database, Cpu } from "lucide-react";
import type { Departments, TabContents } from "@/types/ui";

export const departments: Departments = {
  computer: {
    name: "Computer Science",
    description:
      "The Computer Science department focuses on the core principles of computing, programming, and algorithms. Students gain a deep understanding of software development, artificial intelligence, data structures, and computer architecture, preparing them to solve complex computational problems.",
    icon: Cpu,
    color: "#168706",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  cyber: {
    name: "Cybersecurity & Data Science",
    description:
      "This department blends cybersecurity principles with data science techniques. Students learn to protect digital infrastructure while leveraging data analytics, machine learning, and ethical hacking to make informed, secure decisions in a data-driven world.",
    icon: Shield,
    color: "#168706",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  ict: {
    name: "ICT & Information Technology",
    description:
      "This department focuses on the integration of technology and communication systems to support organizations and individuals. Students explore areas such as networking, database systems, cloud computing, IT infrastructure, and communication technologies.",
    icon: Database,
    color: "#168706",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  },
  software: {
    name: "Software Engineering & Information Systems",
    description:
      "The Software Engineering & Information Systems department emphasizes the design, development, and management of software and digital systems. Students gain hands-on experience in programming, system design, user experience, and database integration to build efficient and scalable solutions.",
    icon: Code,
    color: "#168706",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
};

export const tabContent: TabContents = {
  story: {
    title: "Our Story",
    content: `The Nigeria Association of Computing Students (NACOS), FUNAAB Chapter is the recognized student body for all Computer Science and related technology students at the Federal University of Agriculture, Abeokuta. Established to foster excellence in technology education and innovation, NACOS FUNAAB has been at the forefront of nurturing the next generation of tech leaders.

Our journey began with a vision to create a platform where computing students could connect, collaborate, and grow together. Today, we stand as a vibrant community of passionate learners, innovators, and future technology experts.`,
  },
  vision: {
    title: "Our Vision",
    content: `To be the leading student association in Nigeria for computing and technology education, producing world-class professionals who drive innovation and technological advancement in Africa and beyond.

We envision a future where every computing student in FUNAAB is equipped with the skills, knowledge, and opportunities needed to excel in the global technology landscape.`,
  },
  mission: {
    title: "Our Mission",
    content: `To create an enabling environment for computing students to develop technical expertise, foster innovation, and build professional networks through comprehensive programs and activities.

We are committed to bridging the gap between academia and industry while promoting excellence and ethical computing practices among our members.`,
  },
};

export const STATS_DATA = [
  { value: "1500+", label: "Active Members" },
  { value: "4", label: "Departments" },
  { value: "5+", label: "Events Yearly" },
  { value: "20+", label: "Years Active" },
];
