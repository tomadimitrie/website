import { Cpu, Github, Linkedin, Mail, Shield } from "lucide-react";
import { AboutSection } from "@/components/sections/about";
import { CvesSection } from "@/components/sections/cves";
import { CertificationsSection } from "@/components/sections/certifications";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ProjectsSection } from "@/components/sections/projects";

export const CONFIG = {
  navItems: [
    {
      title: "About",
      Component: AboutSection,
    },
    {
      title: "CVEs",
      Component: CvesSection,
    },
    {
      title: "Certifications",
      Component: CertificationsSection,
    },
    {
      title: "Projects",
      Component: ProjectsSection,
    },
    {
      title: "Experience",
      Component: ExperienceSection,
    },
    {
      title: "Education",
      Component: EducationSection,
    },
  ],
  name: "Dimitrie-Toma Furdui",
  subtitle: "Kernel Developer - Security Researcher",
  about:
    "I am dedicated to low-level programming (drivers, operating systems, embedded systems), and cybersecurity, mainly binary exploitation and reverse engineering. As a hobby, I am also a web and mobile developer.",
  shellText: {
    variants: [
      "toma@linux:~$ whoami",
      "PS C:\\Users\\toma> whoami",
      "toma@mac ~ % whoami",
    ],
    typeSpeed: 40,
    switchSpeed: 2000,
  },
  socials: [
    {
      Icon: Linkedin,
      url: "https://linkedin.com/in/tomadimitrie",
    },
    {
      Icon: Github,
      url: "https://github.com/tomadimitrie",
    },
    {
      Icon: Mail,
      url: "mailto:contact@tomadimitrie.dev",
    },
  ],
  backgrounds: {
    main: {
      minWidth: 400,
      maxWidth: 3000,
      minFont: 15,
      maxFont: 35,
      radius: 100,
      backgroundAlpha: 0.3,
      maxTicks: 100,
      maxMove: 10,
      moveDelay: 25,
      amountToFreeze: 2000,
      color: ["emerald", 700] as const,
    },
    cubes: {
      cols: 20,
      color: ["green", 800, 30] as const,
    },
    matrixRain: {
      fontSize: 16,
      chars: "01".split(""),
      color: ["green", 500, 40] as const,
    },
    lines: {
      spacing: 75,
      color: ["green", 500, 20] as const,
      width: 1,
    },
    grid: {
      gridSize: 40,
      mouseRadius: 20,
      diffusion: 0.25,
      decay: 0.9,
    },
  },
  sections: {
    experience: {
      items: [
        {
          from: "2021",
          to: "Present",
          position: "Kernel Developer",
          company: "Bitdefender",
          features: ["AAAAAAAAAA", "BBBBBBBBBBBBBB"],
          tags: ["C", "Assembly"],
        },
        {
          from: "2021",
          to: "Present",
          position: "Kernel Developer",
          company: "Bitdefender1",
          features: ["AAAAAAAAAA", "BBBBBBBBBBBBBB"],
          tags: ["C", "Assembly"],
        },
        {
          from: "2021",
          to: "Present",
          position: "Kernel Developer",
          company: "Bitdefender2",
          features: ["AAAAAAAAAA", "BBBBBBBBBBBBBB"],
          tags: ["C", "Assembly"],
        },
        {
          from: "2021",
          to: "Present",
          position: "Kernel Developer",
          company: "Bitdefender3",
          features: ["AAAAAAAAAA", "BBBBBBBBBBBBBB"],
          tags: ["C", "Assembly"],
        },
      ],
    },
    education: {
      items: [
        {
          university: "Tehnical University of Cluj-Napoca",
          type: "Master’s Degree",
          domain: "Cybersecurity",
          from: "Aug. 2023",
          to: "Oct. 2025",
          features: [
            "Windows Driver Development",
            "Penetration Testing",
            "Network Security",
          ],
          tags: ["C", "Assembly"],
        },
        {
          university: "Babes-Bolyai University of Cluj-Napoca",
          type: "Bachelor’s Degree",
          domain: "Computer Science",
          from: "Oct. 2020",
          to: "July 2023",
          features: ["Operating Systems", "Cybersecurity", "Embedded Graphics"],
          tags: ["C", "Assembly"],
        },
      ],
    },
    cves: {
      items: [
        {
          url: "https://nvd.nist.gov/vuln/detail/CVE-2022-48481",
          cve: "CVE-2022-48481",
          title: "Dylib injection in macOS JetBrains Toolbox application",
          description:
            "JetBrains Toolbox before version 1.28 is vulnerable to dylib injection, allowing attackers to abuse TCC permissions (Transparency, Consent and Control) granted to the application.",
          cvss: 7.8,
        },
      ],
    },
    certifications: {
      items: [
        {
          title: "OSCP",
          fullTitle: "Offensive Security Certified Professional",
          authority: "OffSec",
          year: 2022,
          url: "https://www.credly.com/badges/458085a7-1466-4990-a6d9-fe08a160914c/linked_in?t=srzdkb",
          skills: [
            "Buffer Overflows",
            "Web Exploitation",
            "Antivirus Evasion",
            "Privilege Escalation",
            "Active Directory Attacks",
          ],
        },
        {
          title: "OSCP2",
          fullTitle: "Offensive Security Certified Professional",
          authority: "OffSec",
          year: 2022,
          url: "https://www.credly.com/badges/458085a7-1466-4990-a6d9-fe08a160914c/linked_in?t=srzdkb",
          skills: [
            "Buffer Overflows",
            "Web Exploitation",
            "Antivirus Evasion",
            "Privilege Escalation",
            "Active Directory Attacks",
          ],
        },
      ],
    },
    projects: {
      items: [
        {
          title: "Project",
          shortDescription: "EDR",
          description: "an awesome app yes yes very",
          features: ["AAAAA", "BBBB", "CCCCC"],
          tags: ["AAA", "BBB", "CCC"],
          link: "https://github.com",
          Icon: Shield,
          color: "red",
        },
        {
          title: "Project2",
          shortDescription: "EDR",
          description: "an awesome app yes yes very",
          features: ["AAAAA", "BBBB", "CCCCC"],
          tags: ["AAA", "BBB", "CCC"],
          link: "https://github.com",
          Icon: Cpu,
          color: "orange",
        },
        {
          title: "Project3",
          shortDescription: "EDR",
          description: "an awesome app yes yes very",
          features: ["AAAAA", "BBBB", "CCCCC"],
          tags: ["AAA", "BBB", "CCC"],
          link: "https://github.com",
          Icon: Shield,
          color: "red",
        },
        {
          title: "Project4",
          shortDescription: "EDR",
          description: "an awesome app yes yes very",
          features: ["AAAAA", "BBBB", "CCCCC"],
          tags: ["AAA", "BBB", "CCC"],
          link: "https://github.com",
          Icon: Cpu,
          color: "orange",
        },
      ],
    },
  },
};
