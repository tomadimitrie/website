import {
  Box,
  Calendar,
  CodeXml,
  Cpu,
  Flag,
  Github,
  Linkedin,
  Mail,
  Shield,
} from "lucide-react";
import { AboutSection } from "@/components/sections/about";
import { CvesSection } from "@/components/sections/cves";
import { CertificationsSection } from "@/components/sections/certifications";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ProjectsSection } from "@/components/sections/projects";
import { AchievementsSection } from "@/components/sections/achievements";

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
      title: "Achievements",
      Component: AchievementsSection,
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
  subtitle: "Low-Level Software Engineer",
  about:
    "Specialized in low-level engineering with a focus on driver development, OS internals, and embedded systems. " +
    "Expert in binary exploitation and reverse engineering, supported by a strong technical foundation in full-stack web and mobile application development.",
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
      radius: 150,
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
      gap: 16,
    },
    matrixRain: {
      fontSize: 16,
      chars: "01".split(""),
      color: ["green", 500, 40] as const,
    },
    lines: {
      spacing: 75,
      color: ["green", 500, 30] as const,
      width: 1,
    },
    grid: {
      gridSize: 40,
      mouseRadius: 20,
      diffusion: 0.25,
      decay: 0.9,
    },
    dots: {
      gap: 15,
      radius: 3,
      mouseRadius: 50,
      forceFactor: 1.5,
      returnSpeed: 0.1,
      friction: 0.6,
      color: ["green", 500, 30] as const,
    },
  },
  sections: {
    experience: {
      items: [
        {
          from: "2021",
          to: "Present",
          position: "Kernel Developer (Windows), Security Researcher",
          company: "Bitdefender",
          features: [
            "Contributing on the development of the anti-exploit module, " +
              "focusing on the integration between the kernel-mode driver and user-mode filter and " +
              "creating new detections to intercept advanced attack vectors",
            "Analyzing and authoring 0-day PoCs to validate detection efficacy and improve the EDR " +
              "against emerging exploits",
            "Refined antivirus detection capabilities using live threat telemetry, playing a key role " +
              "in achieving the maximum score at AV-Comparatives ATP 2025",
          ],
          tags: [
            "C/C++",
            "x86/ARM Assembly",
            "Windows Drivers",
            "Malware Analysis",
            "Reverse Engineering",
            "Binary Exploitation",
          ],
        },
        {
          from: "2025",
          to: "2026",
          position: "Teaching assistant",
          company: "Babes-Bolyai University of Cluj-Napoca",
          features: [
            "Instructed undergraduate students on x86 Assembly fundamentals and CPU internals, guiding " +
              "students through low-level memory management, register manipulation and instruction set architecture",
            "Designed and graded technical assignments focused on manual memory management, efficient register " +
              "usage and implementing algorithms at instruction level",
          ],
          tags: ["x86 Assembly", "CPU Internals", "Teaching"],
        },
        {
          from: "2020",
          to: "2022",
          position: "Penetration Tester, Software Developer",
          company:
            "Institute of Advanced Research in Artificial Intelligence (IARAI)",
          features: [
            "Served in dual capacity as a Security Researcher and Full-Stack Developer, engineering production-grade " +
              "software and internal tooling",
            "Conducted deep-dive white-box assessments, ensuring security considerations were integrated in the " +
              "development lifecycle",
          ],
          tags: ["White-box penetration testing", "PHP", "React"],
        },
        {
          from: "2020",
          to: "2022",
          position: "Penetration Tester, Software Developer",
          company: "Antimony (Startup)",
          features: [
            "Co-founded and led a startup, balancing mobile/web engineering with rigorous penetration testing",
            "Engineered production-level application and website, and implemented robust defensive strategies " +
              "based on findings from self-conducted vulnerability research",
          ],
          tags: [
            "White-box penetration testing",
            "Swift",
            "Kotlin",
            "Flutter",
            "Next.js",
          ],
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
            "OS Development",
            "Hypervisor Development",
            "Malware Analysis",
            "Forensic Analysis and Incident Response",
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
          features: ["Operating Systems", "Cybersecurity", "x86 Assembly"],
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
          title: "CPTS",
          fullTitle: "Hack The Box Certified Penetration Testing Specialist",
          authority: {
            name: "Hack The Box",
            website: "https://www.hackthebox.com/",
            color: ["green", 600] as const,
          },
          year: 2026,
          url: "https://www.credly.com/badges/bb1ffe66-4db7-4837-8a73-75dddc104434",
          skills: [
            "Web Application Exploitation",
            "Active Directory Security",
            "Privilege Escalation",
            "Pivoting & Tunneling",
            "Network Penetration Testing",
          ],
        },
        {
          title: "CDSA",
          fullTitle: "Hack The Box Certified Defensive Security Analyst",
          authority: {
            name: "Hack The Box",
            website: "https://www.hackthebox.com/",
            color: ["green", 600] as const,
          },
          year: 2025,
          url: "https://www.credly.com/badges/458085a7-1466-4990-a6d9-fe08a160914c",
          skills: [
            "Digital Forensics",
            "IDS/IPS Usage",
            "Incident Handling",
            "Malware Analysis",
            "SOC Operations",
            "Elastic Stack",
            "Splunk",
          ],
        },
        {
          title: "OSED",
          fullTitle: "OffSec Exploit Developer",
          authority: {
            name: "OffSec",
            website: "https://offsec.com",
            color: ["purple", 600] as const,
          },
          year: 2024,
          url: "https://www.credential.net/b3b9da71-8ad1-4b7e-bcb1-fc840e27df3e",
          skills: [
            "Reverse Engineering",
            "Stack-Based Buffer Overflows",
            "Return-Oriented Programming (ROP)",
            "Format String Specifier Attacks",
            "ASLR/DEP Bypasses",
            "WinDbg",
            "IDA Pro",
            "x86 Assembly",
          ],
        },
        {
          title: "OSMR",
          fullTitle: "OffSec macOS Researcher",
          authority: {
            name: "OffSec",
            website: "https://offsec.com",
            color: ["purple", 600] as const,
          },
          year: 2023,
          url: "https://www.credential.net/4fcbdec9-730e-4114-9130-a1b5612b17be",
          skills: [
            "Mach Injection",
            "Dylib Injection",
            "XPC Exploitation",
            "Sandbox Escape",
            "Privilege Escalation",
            "TCC Bypass",
            "ARM64 Assembly",
          ],
        },
        {
          title: "OSEP",
          fullTitle: "OffSec Experienced Penetration Tester",
          authority: {
            name: "OffSec",
            website: "https://offsec.com",
            color: ["purple", 600] as const,
          },
          year: 2022,
          url: "https://www.credential.net/4128a7f3-abd7-4dac-9c8b-f32eb6fc18ae",
          skills: [
            "Active Directory Exploitation",
            "Antivirus Evasion",
            "Lateral Movement",
            "Process Injection",
            "SQL Server Exploitation",
            "AppLocker/CLM Bypass",
          ],
        },
        {
          title: "OSCP",
          fullTitle: "OffSec Certified Professional",
          authority: {
            name: "OffSec",
            website: "https://offsec.com",
            color: ["purple", 600] as const,
          },
          year: 2022,
          url: "https://www.credential.net/2a387896-d614-433d-9aef-afa03fd28a9a",
          skills: [
            "Network Penetration Testing",
            "Web Application Exploitation",
            "Active Directory Exploitation",
            "Privilege Escalation",
          ],
        },
      ],
    },
    projects: {
      items: [
        {
          title: "Palisade",
          shortDescription: "Process Injection-based EDR",
          description:
            "Palisade is a real-time security agent built on top of Apple Endpoint Security Framework (ES) that performs " +
            "deep process introspection through dynamic dylib injection and API hooking. Beyond process-level monitoring, " +
            "the tool implements a policy engine that evaluates and denies unwanted system events based on user rules, and " +
            "shows live events in a structured activity table.",
          features: [
            "Dylib injection using entrypoint manipulation",
            "API hooking by patching instruction memory",
            "Detection engine based on API calling contexts",
            "Rule-based policy engine capable of blocking any ES event",
            "Granular event subscription feed",
          ],
          tags: ["Apple Endpoint Security", "Dylib Injection", "API Hooking"],
          source: {
            link: "https://github.com/tomadimitrie/palisade",
            Icon: Github,
            text: "Code (coming soon)",
          },
          Icon: Shield,
          color: "indigo",
        },
        {
          title: "Kestrel",
          shortDescription: "Behavioral Heuristic-based EDR",
          description:
            "Kestrel is an Apple Endpoint Security Framework client, capable of proactively identifying " +
            "and blocking malicious activity. It features a sophisticated behavioral detection engine based on modular " +
            "heuristics, filtering and chaining complex system events in real time.",
          features: [
            "Heuristic-based behavioral detection engine",
            "Interoperability with Sigma rules",
            "Over 95% detection rate against the Atomic Red Team test suite",
            "Capability of chaining multiple events and heuristics simultaneously",
          ],
          tags: ["Apple Endpoint Security", "Behavioral Detection Engine"],
          source: {
            link: "https://github.com/tomadimitrie/kestrel",
            Icon: Github,
            text: "Code (coming soon)",
          },
          Icon: Shield,
          color: "blue",
        },
        {
          title: "Ghost",
          shortDescription: "Hack The Box Machine",
          description:
            "Ghost is a retired Insane Windows Active Directory machine. It is currently rated 4.7/5 stars and has over 1000 system flag solves.",
          features: [
            "Source code review",
            "Linux and Windows joined workstations",
            "DNS Spoofing",
            "Active Directory Federation Services",
            "Bidirectional domain trust",
          ],
          tags: [
            "Hack The Box",
            "Insane Machine",
            "Windows",
            "Active Directory",
          ],
          source: {
            link: "https://app.hackthebox.com/machines/Ghost",
            Icon: Box,
            text: "Machine",
          },
          Icon: Box,
          color: "red",
        },
        {
          title: "Sorcery",
          shortDescription: "Hack The Box Machine",
          description:
            "Ghost is an active Insane Linux machine. It is currently rated 4.6/5 stars and has over 1000 system flag solves.",
          features: [
            "As per Hack The Box Rules, information about the attack path cannot be disclosed until its retirement.",
          ],
          tags: ["Hack The Box", "Insane Machine", "Linux"],
          source: {
            link: "https://app.hackthebox.com/machines/Sorcery",
            Icon: Box,
            text: "Machine",
          },
          Icon: Box,
          color: "orange",
        },
        {
          title: "MiniOS",
          shortDescription: "Operating System",
          description:
            "x86 64-bit operating system featuring a terminal console " +
            "and some external hardware support.",
          features: [
            "ATA PIO mode support",
            "Heap allocator",
            "Intel SMP support",
            "Synchronization primitives",
            "Scrollable console",
          ],
          tags: ["Operating System", "x86_64", "ATA", "SMP"],
          source: {
            link: "https://github.com/tomadimitrie/mini-os",
            Icon: Github,
            text: "Code (coming soon)",
          },
          Icon: Cpu,
          color: "green",
        },
        {
          title: "MiniHV",
          shortDescription: "Hypervisor",
          description:
            "Intel VT-X hypervisor capable of booting modern operating systems and " +
            "support for non-instructive guest introspection.",
          features: [
            "Capable of booting Windows through PXE",
            "Guest-host two way communication via VMCALL",
            "Guest introspection (e.g. process enumeration, process launch callback)",
          ],
          tags: ["Hypervisor", "Intel VT-X", "Introspection"],
          source: {
            link: "https://github.com/tomadimitrie/mini-os",
            Icon: Github,
            text: "Code (coming soon)",
          },
          Icon: Cpu,
          color: "emerald",
        },
        {
          title: "Portfolio",
          shortDescription: "This Website",
          description:
            "This is my personal website (that you are currently browsing). " +
            "It was built to showcase my security research, bug bounties and software projects. " +
            "It is open-source so anyone can see how it's put together, check my coding style, or fork it for personal use.",
          features: [
            "Built with the latest web technologies",
            "Interactive, physics-driven hover states",
          ],
          tags: ["Next.js", "TypeScript", "Canvas Animations"],
          source: {
            link: "https://github.com/tomadimitrie/portfolio",
            Icon: Github,
            text: "Code",
          },
          Icon: CodeXml,
          color: "yellow",
        },
        {
          title: "UBB Schedule",
          shortDescription: "UBB University Timetable",
          description:
            "UBB Schedule is an iOS timetable app for the Babes-Bolyai University. Because the university " +
            "website does not offer any API, the application parses the HTML tables and organizes them in the app.",
          features: [
            "iOS SwiftUI native application adhering to Apple Human Interface Guidelines",
            "Live timetable HTML parsing",
            "Ability to select year, group, semigroup",
            "Ability to cherry-pick courses shown in the UI",
            "Core Data for efficient caching",
          ],
          tags: ["iOS", "Swift", "SwiftUI", "Core Data"],
          source: {
            link: "https://github.com/tomadimitrie/ubb-app",
            Icon: Github,
            text: "Code",
          },
          Icon: Calendar,
          color: "purple",
        },
        {
          title: "TFC CTF 2021/2022",
          shortDescription: "CTF Infrastructure",
          description:
            "I created the infrastructure from scratch for TFC CTF 2021 and 2022, providing a robust alternative " +
            "to known services like CTFd. It successfully served over 1000 teams at each CTF edition. The source code is not " +
            "public due to licensing restrictions.",
          features: [
            "Individual challenge containers for each player with Windows support",
            "Built with the latest technologies at that time",
            "Support for custom challenge types, such as multiple answers",
          ],
          tags: ["Remix.js", "Prisma", "Docker"],
          Icon: Flag,
          color: "fuchsia",
        },
      ],
    },
    achievements: {
      items: [
        {
          title:
            "Part of the National Romanian cybersecurity team for ECSC 2022 and 2025",
          subtitle:
            "ECSC is a major annual cybersecurity CTF competition organized by ENISA, where I was selected as a member " +
            "of the national team to compete against other countries in Europe in advanced Attack/Defense and Jeopardy-style " +
            "hacking challenges.",
        },
        {
          title: "Part of > r0/dev/null CTF team",
          subtitle: (
            <>
              As a core member of
              <span className="font-mono">{"> r0/dev/null"}</span>, currently
              the #2 ranked CTF team in Romania, I contributed to major
              victories, including 1st place in World Wide CTF 2025, 3rd place
              in N0PSctf 2025 and 3rd place in D-CTF 2025.
            </>
          ),
          link: "https://ctftime.org/team/305658",
        },
        {
          title: "Null CTF 2025",
          subtitle: (
            <>
              Core organizer and challenge author for Null CTF 2025 with my team{" "}
              <span className="font-mono">{"> r0/dev/null"}</span>, a major
              cybersecurity event featuring over 1000 registered teams.
            </>
          ),
          link: "https://ctf.r0devnull.team/",
        },
        {
          title:
            "Former captain of the CTF team of Technical University of Cluj-Napoca",
          subtitle:
            "Managed the university's competitive cybersecurity program, " +
            "highlighting by securing 4th place in Hack The Box University CTF 2023.",
        },
        {
          title: "TFC CTF 2021 and 2022",
          subtitle:
            "Core organizer and infrastructure lead for TFC CTF 2021 and 2022, " +
            "authoring technical challenges and developing a custom competition platform " +
            "featuring on-demand challenge instances, scaling the event to over 1000 teams.",
        },
      ],
    },
  },
};
