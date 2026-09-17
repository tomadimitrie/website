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
import Link from "next/link";
import { AboutSection } from "@/components/sections/about";
import { AchievementsSection } from "@/components/sections/achievements";
import { CertificationsSection } from "@/components/sections/certifications";
import { CvesSection } from "@/components/sections/cves";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { PublicationsSection } from "@/components/sections/publications";

export const CONFIG = {
  navItems: [
    {
      title: "About",
      Component: AboutSection,
    },
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "CVEs",
      Component: CvesSection,
    },
    {
      title: "Publications",
      Component: PublicationsSection,
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
    "Specialized in low-level engineering with a focus on driver development and OS internals. " +
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
  socials: {
    linkedin: {
      Icon: Linkedin,
      url: "https://linkedin.com/in/tomadimitrie",
      handle: "tomadimitrie",
    },
    github: {
      Icon: Github,
      url: "https://github.com/tomadimitrie",
      handle: "tomadimitrie",
    },
    mail: {
      Icon: Mail,
      url: "mailto:contact@tomadimitrie.dev",
      handle: "contact@tomadimitrie.dev",
    },
    website: {
      Icon: Mail,
      url: "https://tomadimitrie.dev",
      handle: "tomadimitrie.dev",
      hidden: true,
    },
  },
  backgrounds: {
    main: {
      minWidth: 400,
      maxWidth: 3000,
      minFont: 15,
      maxFont: 35,
      radius: 150,
      backgroundAlpha: 0.3,
      amountToFreeze: 2000,
      color: ["emerald", 700] as const,
      easing: 0.1,
      roamSpeed: 3,
    },
    cubes: {
      cols: 20,
      color: ["green", 800, 30] as const,
      gap: 16,
      minSquareSize: 40,
    },
    matrixRain: {
      fontSize: 16,
      chars: "01".split(""),
      color: ["green", 500, 40] as const,
    },
    trail: {
      minFont: 10,
      maxFont: 16,
      chars: "01".split(""),
      color: ["green", 500, 40] as const,
      distance: 20,
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
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Developing the <b>anti-exploit module</b>, focusing on the
              integration between the kernel-mode driver and user-mode filter.
            </>,
            <>
              Refining antivirus detection capabilities using{" "}
              <b>live threat telemetry</b>, achieving a{" "}
              <b>perfect 15/15 score</b> at AV-Comparatives ATP 2025.
            </>,
            <>
              Created or improved <b>10+ detections</b> to intercept attack
              vectors and contributed <b>100+</b> features and fixes.
            </>,
            <>
              Analyzed or authored <b>20+ 0-day PoCs</b> to validate detection
              efficacy and improve the EDR against emerging exploits.
            </>,
          ],
          tags: [
            "C/C++",
            "x86/ARM Assembly",
            "Windows Drivers",
            "Malware Analysis",
            "Reverse Engineering",
            "Binary Exploitation",
          ],
          type: "work",
        },
        {
          from: "2025",
          to: "Present",
          position: "Research Engineer",
          company: "Technical University of Cluj-Napoca",
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Contributed to{" "}
              <Link href="https://cybersecurityseminars.utcluj.ro/">
                Cybersecurity Seminars
              </Link>
              , a <b>Google-funded</b> initiative to build students'
              cybersecurity skills.
            </>,
            <>
              Hosted a <b>CTF competition</b> for 100+ students and authored 10+
              challenges as part of the program.
            </>,
          ],
          tags: ["Cybersecurity Education", "CTF"],
          type: "academic",
        },
        {
          from: "2025",
          to: "2026",
          position: "Teaching Assistant",
          company: "Babeș-Bolyai University of Cluj-Napoca",
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Taught <b>x86 Assembly fundamentals</b> and <b>CPU internals</b>{" "}
              to 80+ undergraduate students, covering memory management,
              register manipulation, and instruction set architecture.
            </>,
            <>
              Designed and graded 6 <b>technical assignments</b> requiring
              students to implement algorithms directly at the instruction
              level.
            </>,
          ],
          tags: ["x86 Assembly", "CPU Internals"],
          type: "academic",
        },
        {
          from: "2020",
          to: "2022",
          position: "Penetration Tester, Software Developer",
          company:
            "Institute of Advanced Research in Artificial Intelligence (IARAI)",
          location: "Vienna, Austria",
          features: [
            <>
              Built and maintained the organization's competition <b>website</b>
              , <b>test infrastructure</b>, and internal <b>DevOps tooling</b>.
            </>,
            <>
              Conducted <b>white-box security assessments</b> of internally
              developed codebases, integrating security considerations into the
              development lifecycle.
            </>,
            <>
              Contributed to the organization of 4 machine learning contests (
              <Link href="https://github.com/iarai/NeurIPS2020-traffic4cast">
                Traffic4Cast
              </Link>
              ,{" "}
              <Link href="https://github.com/iarai/weather4cast-2022">
                Weather4Cast
              </Link>
              ,{" "}
              <Link href="https://github.com/iarai/science4cast">
                Science4Cast
              </Link>
              ,{" "}
              <Link href="https://github.com/iarai/Landslide4Sense-2022">
                Landslide4Sense
              </Link>
              ), with the latest gathering <b>7000+ submissions</b>.
            </>,
          ],
          tags: ["White-box security assessments", "PHP", "React"],
          type: "work",
        },
        {
          from: "2020",
          to: "2023",
          position: "Co-founder",
          company: "Antimony (Startup)",
          location: "Bucharest, Romania",
          features: [
            <>
              Co-founded and led a startup building a{" "}
              <b>collaboration platform</b> for event organizers, combined with{" "}
              <b>event discovery</b> for attendees.
            </>,
            <>
              Developed the mobile and web application, and hardened it against
              vulnerabilities identified through self-conducted penetration
              testing.
            </>,
          ],
          tags: [
            "White-box penetration testing",
            "Swift",
            "Kotlin",
            "Flutter",
            "Next.js",
          ],
          type: "work",
        },
      ],
    },
    education: {
      items: [
        {
          university: "Technical University of Cluj-Napoca",
          type: "Master's Degree",
          domain: "Cybersecurity",
          from: "2023",
          to: "2025",
          features: [
            <>
              Thesis title:{" "}
              <b>
                Behavioral macOS EDR Using Apple Endpoint Security Framework
              </b>
            </>,
          ],
          tags: [
            "Windows Driver Development",
            "OS Development",
            "Hypervisor Development",
            "Malware Analysis",
            "Forensic Analysis and Incident Response",
            "Penetration Testing",
            "Network Security",
          ],
        },
        {
          university: "Babes-Bolyai University of Cluj-Napoca",
          type: "Bachelor's Degree",
          domain: "Computer Science",
          from: "2020",
          to: "2023",
          features: [
            <>
              Thesis title:{" "}
              <b>
                Fortifying macOS: Empowering Binary Exploit Resistance through
                Function Hooking and Process Injection with Apple's Endpoint
                Security Framework
              </b>
            </>,
          ],
          tags: ["Operating Systems", "Cybersecurity", "x86 Assembly"],
        },
      ],
    },
    cves: {
      items: [
        {
          url: "https://nvd.nist.gov/vuln/detail/CVE-2026-54424",
          cve: "CVE-2026-54424",
          title:
            "Remote Code Execution / Arbitrary File Read / NTLM Hash Capture as SYSTEM",
          features: [
            <>
              Parsec for Windows before version 150-104a has multiple Elevation
              of Privilege vulnerabilities, enabling attackers to perform
              actions as NT AUTHORITY\SYSTEM.{" "}
              <Link href="https://www.tomadimitrie.dev/blog/CVE-2026-54424">
                Write-up
              </Link>
            </>,
          ],
          cvss: 8.4,
        },
        {
          url: "https://nvd.nist.gov/vuln/detail/CVE-2022-48481",
          cve: "CVE-2022-48481",
          title: "Dylib injection in macOS JetBrains Toolbox",
          features: [
            <>
              JetBrains Toolbox before version 1.28 is vulnerable to dylib
              injection, allowing attackers to abuse TCC permissions granted to
              the application.{" "}
              <Link href="https://www.tomadimitrie.dev/blog/CVE-2022-48481">
                Write-up
              </Link>
            </>,
          ],
          cvss: 7.8,
        },
      ],
    },
    publications: {
      items: [
        {
          title: "Behavioral Detection Using Apple Endpoint Security Framework",
          authors: [
            "Dimitrie-Toma Furdui",
            "Radu-Marian Portase",
            "Andrei-Marius Muntea",
            "Adrian-Viorel Coleșa",
          ],
          url: "https://ieeexplore.ieee.org/document/11577948",
          publishedIn:
            "2026 IEEE International Conference on Automation, Quality and Testing, Robotics (AQTR)",
          abstract:
            "Traditional endpoint security on macOS has relied on third-party kernel extensions, which Apple is increasingly restricting. " +
            "Apple's Endpoint Security (ES) framework offers a supported alternative by providing user-space access to security-relevant events, " +
            "such as process execution and file activity, and by allowing or denying certain operations. This paper assesses whether ES telemetry is sufficient " +
            "for building an Endpoint Detection and Response (EDR) system. We introduce a prototype user-space EDR that correlates ES events into process and " +
            "process-tree activity, applies a points-based heuristic engine, and supports translating a subset of macOS Sigma rules into ES-compatible detections. " +
            "Detection coverage is evaluated using Atomic Red Team. With Sigma-derived rules and custom heuristics, the prototype detects 95.13 % of the evaluated macOS " +
            "Atomic Red Team tests, demonstrating that ES can enable practical behavioral detection without third-party kernel extensions.",
        },
      ],
    },
    certifications: {
      items: [
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
      ],
    },
    projects: {
      items: [
        {
          title: "ES-EDR-Inject",
          shortDescription: "Process Injection-based EDR",
          description: (
            <>
              ES-EDR-Inject is a <b>real-time security solution</b> built on top
              of <b>Apple Endpoint Security Framework (ES)</b> that performs{" "}
              <b>deep process introspection</b> through dynamic dylib injection
              and API hooking. Beyond process-level monitoring, the tool
              implements a <b>policy engine</b> that evaluates and denies
              unwanted system events based on user rules, and shows live events
              in a structured activity table.
            </>
          ),
          features: [
            "Dylib injection using entrypoint manipulation",
            "API hooking by patching instruction memory",
            "Detection engine based on API calling contexts",
            "Rule-based policy engine capable of blocking any ES event",
            "Granular event subscription feed",
          ],
          tags: ["Apple Endpoint Security", "Dylib Injection", "API Hooking"],
          source: {
            link: "https://github.com/tomadimitrie/es-edr-inject",
            Icon: Github,
            text: "Code",
          },
          Icon: Shield,
          color: "indigo",
        },
        {
          title: "ES-EDR-Behavior",
          shortDescription: "Behavioral Heuristic-based EDR",
          description: (
            <>
              ES-EDR-Behavior is an{" "}
              <b>Apple Endpoint Security Framework client</b>, capable of
              proactively <b>identifying and blocking malicious activity</b>. It
              features a sophisticated <b>behavioral detection engine</b> based
              on modular heuristics, filtering and chaining complex system
              events in real time. It features <b>50+ custom heuristics</b> and{" "}
              <b>50+ Sigma-converted heuristics</b>.
            </>
          ),
          features: [
            "Heuristic-based behavioral detection engine",
            "Interoperability with Sigma rules",
            "Over 95% detection rate against the Atomic Red Team test suite",
            "Capability of chaining multiple events and heuristics simultaneously",
          ],
          tags: ["Apple Endpoint Security", "Behavioral Detection Engine"],
          source: {
            link: "https://github.com/tomadimitrie/es-edr-behavior",
            Icon: Github,
            text: "Code",
          },
          Icon: Shield,
          color: "blue",
        },
        {
          title: "Ghost",
          shortDescription: "Hack The Box Machine",
          description: (
            <>
              Ghost is a retired Insane Windows Active Directory machine I
              authored. It is currently rated <b>4.7/5 stars</b> and has{" "}
              <b>1000+ system flag solves</b>.
            </>
          ),
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
          description: (
            <>
              Sorcery is a retired Insane Linux machine I authored. It is
              currently rated <b>4.6/5 stars</b> and has{" "}
              <b>1000+ system flag solves</b>.
            </>
          ),
          features: [
            "Passkey stealing",
            "Phishing with certificates",
            "Reverse engineering protocols (e.g. Kafka)",
            "Docker Registry",
            "FreeIPA",
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
          description: (
            <>
              x86-64 operating system featuring a terminal console and some
              external hardware support. Originally written in C, it is now
              undergoing a rewrite in Zig, and not all features have been ported
              yet.
            </>
          ),
          features: [
            "ATA PIO mode support",
            "Heap allocator",
            "Intel SMP support",
            "Synchronization primitives",
            "Scrollable console",
          ],
          tags: ["Operating System", "x86_64", "ATA", "SMP"],
          source: {
            link: "https://github.com/tomadimitrie/minios",
            Icon: Github,
            text: "Code",
          },
          Icon: Cpu,
          color: "green",
        },
        {
          title: "MiniHV",
          shortDescription: "Hypervisor",
          description: (
            <>
              Intel VT-X hypervisor capable of booting modern operating systems
              and support for non-intrusive guest introspection.
            </>
          ),
          features: [
            "Capable of booting Windows through PXE",
            "Guest-host two way communication via VMCALL",
            "Guest introspection (e.g. process enumeration, process launch callback)",
          ],
          tags: ["Hypervisor", "Intel VT-X", "Introspection"],
          source: {
            link: "https://github.com/tomadimitrie/minihv",
            Icon: Github,
            text: "Code (coming soon)",
            comingSoon: true,
          },
          Icon: Cpu,
          color: "emerald",
        },
        {
          title: "Portfolio",
          shortDescription: "My Website",
          description: (
            <>
              This is my personal website. It was built to showcase my security
              research, bug bounties and software projects. It is open-source so
              anyone can see how it's put together, check my coding style, or
              fork it for personal use.
            </>
          ),
          features: [
            "Built with the latest web technologies",
            "Interactive, physics-driven hover states",
          ],
          tags: ["Next.js", "TypeScript", "Canvas Animations"],
          source: {
            link: "https://github.com/tomadimitrie/website",
            Icon: Github,
            text: "Code",
          },
          Icon: CodeXml,
          color: "yellow",
        },
        {
          title: "UBB Schedule",
          shortDescription: "UBB University Timetable",
          description: (
            <>
              UBB Schedule is an iOS timetable app for the Babes-Bolyai
              University. Because the university website does not offer any API,
              the application parses the HTML tables and organizes them in the
              app.
            </>
          ),
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
          description: (
            <>
              I created the infrastructure from scratch for TFC CTF 2021 and
              2022, providing a robust alternative to known services like CTFd.
              It successfully served <b>1000+ teams</b> at each CTF edition. The
              source code is not public due to licensing restrictions.
            </>
          ),
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
          subtitle: (
            <>
              ECSC is a major annual cybersecurity CTF competition organized by
              ENISA, where I was selected as a{" "}
              <b>member of the national team</b> to compete against other
              countries in Europe in advanced Attack/Defense and Jeopardy-style
              hacking challenges.
            </>
          ),
        },
        {
          title: "Part of > r0/dev/null CTF team",
          subtitle: (
            <>
              As a core member of{" "}
              <span className="font-mono">{" > r0/dev/null"}</span>, I
              contributed to major victories, including <b>1st place</b> in
              World Wide CTF 2025, <b>3rd place</b> in N0PSctf 2025 and{" "}
              <b>3rd place</b> in D-CTF 2025.
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
              cybersecurity event featuring <b>1000+ registered teams</b>.
            </>
          ),
          link: "https://ctf.r0devnull.team/",
        },
        {
          title: "IoT Hunt 2025",
          subtitle: (
            <>
              Collaborated on organizing IoT Hunt, a CTF-style treasure hunt
              focused on <b>IoT devices</b>, where <b>100+ participants</b>{" "}
              solved challenges involving routers, smart cameras, lightbulbs and
              locks.
            </>
          ),
          link: "https://def.camp/competitions/iot-hunt/",
        },
        {
          title:
            "Former captain of the CTF team of Technical University of Cluj-Napoca",
          subtitle: (
            <b>
              Managed the university's competitive cybersecurity program,
              highlighted by securing <b>4th place</b> in Hack The Box
              University CTF 2023.
            </b>
          ),
        },
        {
          title: "TFC CTF 2021 and 2022",
          subtitle: (
            <>
              Core organizer and infrastructure lead for TFC CTF 2021 and 2022,
              authoring technical challenges and developing a custom competition
              platform featuring on-demand challenge instances, scaling the
              event to <b>1000+ teams</b>.
            </>
          ),
        },
      ],
    },
    skills: {
      items: [
        [
          "Driver Development",
          "OS Internals",
          "Binary Exploitation",
          "Reverse Engineering",
          "Malware Analysis",
        ],
        ["C/C++", "x86/ARM Assembly", "Rust", "Zig"],
        ["Swift", "Kotlin", "Next.js", "Flutter"],
      ],
    },
  },
  blog: {
    subtitle:
      "Write-ups on OS internals, vulnerability research, reverse engineering and other stuff I find interesting",
  },
};
