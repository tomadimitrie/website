import {
  Box,
  Calendar,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Shield,
} from "lucide-react";
import Link from "@/components/overrides/link";
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
  subtitle: "Security Engineer",
  about:
    "5+ years building kernel-mode anti-exploit protection at Bitdefender. PhD candidate in hypervisor security, with 2 CVEs, an IEEE publication and 6 certifications.",
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
          from: "Jun. 2021",
          to: "Present",
          position: "Kernel Developer (Windows), Security Researcher",
          company: <Link href="https://www.bitdefender.com">Bitdefender</Link>,
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Developing the <b>anti-exploit module</b> across the kernel driver
              and user-mode filter, shipped in Bitdefender's consumer and
              GravityZone products.
            </>,
            <>
              Refining antivirus detection capabilities, contributing to
              Bitdefender's <b>perfect 15/15 score</b> at{" "}
              <Link href="https://av-comparatives.org/tests/advanced-threat-protection-test-2025-enterprise/">
                AV-Comparatives ATP 2025
              </Link>
              .
            </>,
            <>
              Built a new <b>ROP chain detection</b> and improved 5+ existing{" "}
              <b>privilege escalation detections</b> against new techniques.
            </>,
            <>
              Authored <b>30+ n-day exploit PoCs</b> from minimal public
              details, including Windows DWM and Microsoft Exchange, to validate
              EDR detections.
            </>,
          ],
          tags: [
            "C++",
            "x86/ARM Assembly",
            "Kernel Drivers",
            "Malware Analysis",
          ],
          type: "work",
        },
        {
          from: "Oct. 2026",
          to: "Present",
          position: "Teaching Assistant (Penetration Testing)",
          company: (
            <Link href="https://ac.utcluj.ro/acasa.html">
              Technical University of Cluj-Napoca
            </Link>
          ),
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Teaching <b>Penetration Testing</b> to 50+ students, addressing
              web exploitation, buffer overflows and privilege escalation.
            </>,
            <>
              Co-authoring a <b>penetration testing book</b> for a full course
              redesign, modernizing labs and adding <b>Active Directory</b> and{" "}
              <b>Entra ID</b> modules.
            </>,
          ],
          tags: ["Penetration Testing", "Curriculum Design"],
          type: "academic",
        },
        {
          from: "Mar. 2026",
          to: "Present",
          position: "Research Engineer",
          company: (
            <Link href="https://ac.utcluj.ro/acasa.html">
              Technical University of Cluj-Napoca
            </Link>
          ),
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Co-organized a{" "}
              <Link href="https://cybersecurityseminars-utcluj.ctfd.io/">
                CTF
              </Link>{" "}
              for 100+ students within the{" "}
              <Link href="https://cybersecurityseminars.utcluj.ro/">
                Google.org Cybersecurity Seminars
              </Link>{" "}
              initiative.
            </>,
          ],
          tags: ["CTF Challenge Design"],
          type: "academic",
        },
        {
          from: "Oct. 2025",
          to: "Feb. 2026",
          position: "Teaching Assistant (x86 Assembly)",
          company: (
            <Link href="https://www.cs.ubbcluj.ro/">
              Babeș-Bolyai University of Cluj-Napoca
            </Link>
          ),
          location: "Cluj-Napoca, Romania",
          features: [
            <>
              Taught <b>x86 Assembly fundamentals</b> and <b>CPU internals</b>{" "}
              to 80+ undergraduate students, covering memory management,
              register manipulation, and instruction set architecture.
            </>,
            <>
              Designed and graded <b>technical assignments</b> requiring
              students to identify code issues and implement algorithms in x86
              assembly.
            </>,
          ],
          tags: ["x86 Assembly", "CPU Internals"],
          type: "academic",
        },
        {
          from: "Sep. 2020",
          to: "Sep. 2022",
          position: "Penetration Tester, Software Developer",
          company: (
            <Link href="https://web.archive.org/web/20231129014336/https://www.iarai.ac.at/">
              Institute of Advanced Research in Artificial Intelligence (IARAI)
            </Link>
          ),
          location: "Vienna, Austria (Freelance, Remote)",
          features: [
            <>
              Introduced security reviews into the release procedures, catching
              10+ issues before production deployment.
            </>,
            <>
              Built and maintained the organization's competition <b>website</b>{" "}
              (10,000+ participants), <b>test infrastructure</b>, and internal{" "}
              <b>DevOps tooling</b>.
            </>,
            <>
              Co-organized 4 <b>NeurIPS</b> competitions (
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
              ) with <b>7000+ submissions</b>.
            </>,
          ],
          tags: ["White-Box Security Assessments", "PHP", "React"],
          type: "work",
        },
        {
          from: "Nov. 2020",
          to: "Jul. 2023",
          position: "Co-founder (Startup)",
          company: (
            <Link href="https://www.instagram.com/theantimony">Antimony</Link>
          ),
          location: "Bucharest, Romania (Part-time, Remote)",
          features: [
            <>
              Co-founded a startup building an event management platform for
              organizers, with event discovery for participants.
            </>,
            <>
              Built the <b>iOS, Android and web apps</b> and shipped them to the
              App Store and Google Play.
            </>,
            <>
              Secured the platform through in-house penetration testing before
              launch.
            </>,
          ],
          tags: [
            "White-Box Pentesting",
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
          university: (
            <Link href="https://ac.utcluj.ro/acasa.html">
              Technical University of Cluj-Napoca
            </Link>
          ),
          type: "PhD",
          domain: "Cybersecurity",
          from: "2025",
          to: "Present",
          features: [
            <>
              Research topic:{" "}
              <b>Hypervisor-Based Methods for Detecting Exploits</b>
            </>,
          ],
          tags: [
            "Hypervisor Development",
            "Binary Exploitation",
            "Malware Analysis",
          ],
        },
        {
          university: (
            <Link href="https://ac.utcluj.ro/acasa.html">
              Technical University of Cluj-Napoca
            </Link>
          ),
          type: "Master's Degree",
          domain: "Cybersecurity",
          from: "2023",
          to: "2025",
          features: [
            <>
              Thesis title:{" "}
              <b>
                <Link href="https://github.com/tomadimitrie/ES-EDR-Behavior/blob/main/Master's%20Thesis.pdf">
                  Behavioral macOS EDR Using Apple Endpoint Security Framework
                </Link>
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
          university: (
            <Link href="https://www.cs.ubbcluj.ro/">
              Babeș-Bolyai University of Cluj-Napoca
            </Link>
          ),
          type: "Bachelor's Degree",
          domain: "Computer Science",
          from: "2020",
          to: "2023",
          features: [
            <>
              Thesis title:{" "}
              <b>
                <Link href="https://github.com/tomadimitrie/ES-EDR-Inject/blob/main/Bachelor's%20Thesis.pdf">
                  Fortifying macOS against Binary Exploits with Apple's Endpoint
                  Security Framework
                </Link>
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
              Discovered multiple privilege escalation vulnerabilities in Parsec
              for Windows (&lt; 150-104a), leading to NT AUTHORITY\SYSTEM
              privileges.{" "}
              <Link href="https://www.tomadimitrie.dev/blog/CVE-2026-54424">
                Write-up
              </Link>
              ,{" "}
              <Link href="https://github.com/tomadimitrie/CVE-2026-54424">
                PoC
              </Link>
              .
            </>,
          ],
          cvss: 8.4,
        },
        {
          url: "https://nvd.nist.gov/vuln/detail/CVE-2022-48481",
          cve: "CVE-2022-48481",
          title: "Dylib injection",
          features: [
            <>
              Discovered a dylib injection vulnerability in JetBrains Toolbox
              for macOS (&lt; 1.28), leading to TCC permissions abuse.{" "}
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
          title: "MiniHV",
          shortDescription: "Hypervisor (Intel VT-x)",
          description: (
            <>
              Intel VT-x hypervisor built for a master's project, capable of
              booting Windows with non-intrusive guest introspection. Now
              rewriting it from scratch as a <b>thin hypervisor</b> that
              virtualizes the running OS on the fly for PhD research on exploit
              detection.
            </>
          ),
          features: [],
          tags: ["Hypervisor", "Intel VT-X", "Introspection"],
          source: {
            link: "https://github.com/tomadimitrie/phd-hypervisor",
            Icon: Github,
            text: "Code",
          },
          Icon: Cpu,
          color: "emerald",
        },
        {
          title: "ES-EDR-Behavior",
          shortDescription: "macOS Behavioral EDR",
          description: (
            <>
              Apple Endpoint Security client that detects and blocks malicious
              activity on macOS through a modular behavioral engine with{" "}
              <b>50+</b> custom and <b>50+</b> Sigma-converted heuristics.
            </>
          ),
          features: [],
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
          title: "ES-EDR-Inject",
          shortDescription: "macOS Process Injection-based EDR",
          description: (
            <>
              Apple Endpoint Security client that performs deep process
              introspection through <b>dylib injection</b> and{" "}
              <b>API hooking</b>, with a rule-based policy engine that blocks
              unwanted system events.
            </>
          ),
          features: [],
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
          title: "Ghost & Sorcery",
          shortDescription: "Hack The Box Machine Author",
          description: (
            <>
              Authored two retired <b>Insane-difficulty</b> HTB machines: Ghost
              (Windows Active Directory, rated 4.7/5) and Sorcery (Linux, rated
              4.6/5), each with <b>1000+ system flag solves.</b>
            </>
          ),
          features: [],
          tags: [
            "Hack The Box",
            "Insane Machine",
            "Windows",
            "Active Directory",
          ],
          source: {
            link: "https://app.hackthebox.com/users/775445?tab=published-content&content-type=machine",
            Icon: Box,
            text: "Machine",
          },
          Icon: Box,
          color: "red",
        },
        {
          title: "MiniOS",
          shortDescription: "Operating System",
          description: (
            <>
              x86-64 operating system written from scratch in C++ for a master's
              project, with a terminal console and drivers for storage and
              keyboard.
            </>
          ),
          features: [],
          tags: ["Operating System", "x86_64", "ATA", "SMP"],
          Icon: Cpu,
          color: "green",
        },
        {
          title: "UBB Schedule",
          shortDescription: "UBB University Timetable",
          description: (
            <>
              iOS timetable app for Babeș-Bolyai University. Parses the
              university's HTML timetables, since no API exists. Published on
              the App Store.
            </>
          ),
          features: [],
          tags: ["iOS", "Swift", "SwiftUI", "Core Data"],
          source: {
            link: "https://github.com/tomadimitrie/ubb-app",
            Icon: Github,
            text: "Code",
          },
          Icon: Calendar,
          color: "purple",
        },
      ],
    },
    achievements: {
      items: [
        {
          title: "Romania's National Cybersecurity Team, ECSC 2022 and 2025",
          subtitle: (
            <>
              Selected for the <b>Romanian national team</b> at ENISA's European
              Cybersecurity Challenge in{" "}
              <Link href="https://www.facebook.com/story.php?story_fbid=1440122719824745&id=100064974182621">
                2022
              </Link>{" "}
              and{" "}
              <Link href="https://www.facebook.com/www.edu.ro/posts/-team-romania-locul-14-la-campionatul-european-de-securitate-cibernetic%C4%83-2025-la/1236388771859159/">
                2025
              </Link>
              , competing in Attack/Defense and Jeopardy CTFs against 30+ other
              national teams.
            </>
          ),
        },
        {
          title: <>Member, &gt; r0/dev/null CTF Team</>,
          subtitle: (
            <>
              <b>1st place</b> at{" "}
              <Link href="https://ctftime.org/event/2753/">
                World Wide CTF 2025
              </Link>
              , <b>3rd place</b> at{" "}
              <Link href="https://ctftime.org/event/2486">N0PSctf 2025</Link>{" "}
              and{" "}
              <Link href="https://youtu.be/EpmLvFx1zXk?t=2291">D-CTF 2025</Link>
              . Focused on binary exploitation and reverse engineering
              challenges.
            </>
          ),
          link: "https://ctftime.org/team/305658",
        },
        {
          title: "Co-organizer and Challenge Author, Null CTF 2025",
          subtitle: (
            <>
              Co-organized{" "}
              <Link href="https://ctf.r0devnull.team/">Null CTF 2025</Link> with{" "}
              <span className="font-mono">&gt; r0/dev/null</span> for{" "}
              <b>1000+ teams</b>, authoring{" "}
              <Link href="https://github.com/tomadimitrie/null-ctf-2025-challenges">
                7 challenges
              </Link>{" "}
              and running the infrastructure.
            </>
          ),
          link: "https://ctf.r0devnull.team/",
        },
        {
          title: "Co-organizer, IoT Hunt 2025",
          subtitle: (
            <>
              Co-organized{" "}
              <Link href="https://def.camp/competitions/iot-hunt/">
                IoT Hunt
              </Link>
              , a CTF-style treasure hunt at DefCamp 2025, where 100+
              participants exploited real routers, smart cameras, lightbulbs and
              locks.
            </>
          ),
          link: "https://def.camp/competitions/iot-hunt/",
        },
        {
          title:
            "Captain, Technical University of Cluj-Napoca CTF Team (2023-2025)",
          subtitle: (
            <>
              Recruited and trained students for competitions, leading the team
              to <b>4th place</b> at{" "}
              <Link href="https://www.hackthebox.com/blog/htb-university-ctf-2023-recap">
                Hack The Box University CTF 2023
              </Link>{" "}
              (300+ registered teams).
            </>
          ),
        },
        {
          title: "Co-organizer and Infrastructure Lead, TFC CTF (2021 & 2022)",
          subtitle: (
            <>
              Built a custom CTF platform from scratch for TFC CTF{" "}
              <Link href="https://ctftime.org/event/1501">2021</Link> and{" "}
              <Link href="https://ctftime.org/event/1647">2022</Link>, with{" "}
              <b>on-demand challenge instances</b>, serving <b>1000+ teams</b>,
              and authored 10+ challenges.
            </>
          ),
        },
      ],
    },
    skills: {
      items: [
        [
          "Windows Kernel Drivers",
          "macOS Endpoint Security",
          "Exploit Development",
          "Hypervisors (Intel VT-x)",
          "Reverse Engineering",
          "OS Internals",
        ],
        ["C/C++", "x86/ARM Assembly"],
        ["Swift", "Kotlin", "Next.js", "Flutter"],
      ],
    },
  },
  blog: {
    subtitle:
      "Write-ups on OS internals, vulnerability research, reverse engineering and other stuff I find interesting",
  },
};
