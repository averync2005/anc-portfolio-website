/**
 * Work section content
 * - One entry per organization or project, newest first within each group
 * - Multiple roles at the same organization share one card (newest role first)
 * - Photos in public/assets/work/<id>/ are picked up automatically (alt text lives in `alts`)
 */




// ---------------------------------
// Types
// ---------------------------------

export type WorkMedia =
  | { type: "photo"; src: string; alt?: string; caption?: string }
  | { type: "photo-grid"; srcs: string[]; columns: number }
  | { type: "youtube"; videoId: string; caption?: string; timestamp?: number }
  | { type: "google-slides"; slideId: string; caption?: string; sidePhoto?: string }
  | { type: "link"; label: string; url: string }
  | { type: "photo-placeholder"; folder: string; label?: string };


export type WorkGroup = "experience" | "project";


export type WorkRole = {
  title?: string;  // Omitted for projects (card name already says it)
  date: string;
  oneliner: string;
  story: string[];  // One string per paragraph
  media?: WorkMedia[];  // Shown at the end of this role's section
};


export type WorkItem = {
  id: string;
  group: WorkGroup;
  name: string;  // Organization or project name
  subtitle: string;
  date: string;  // Full span across every role
  category: string;
  roles: WorkRole[];  // Newest first
  media?: WorkMedia[];  // Card-level links, shown after every role
  assetsFolder?: string;  // Only when the folder name differs from assets/work/<id>
  alts?: Record<string, string>;  // Photo filename -> alt text, for auto-discovered photos
};




// ---------------------------------
// Experience
// ---------------------------------

const experience: WorkItem[] = [
  {
    id: "dnv",
    group: "experience",
    name: "DNV",
    subtitle: "MLOps team · Houston, TX",
    date: "Jun 2026 – Aug 2026",
    category: "Internship",
    roles: [
      {
        title: "Software Engineer Intern, MLOps & LLM Systems",
        date: "Jun 2026 – Aug 2026",
        oneliner: "My tickets weren't toy intern projects. They shipped to production.",
        story: [
          "I spent ten weeks on DNV's MLOps team, a small and close-knit group running a production LLM platform. My work was all backend: tracking what the platform's models cost, making sure its chatbot could actually see the content it answered from, and shortening how long it took anyone to notice when something broke.",
          "The project I'm proudest of was a cost visibility system for the platform's LLM spend across 4 AI providers. I built it full-stack: an event-driven backend that aggregates usage against quotas, budget alerts that fire at multiple thresholds, and an admin dashboard where the team can track spend in real time.",
          "I also ran a coverage audit on the platform's Learning Center. I went through all 572 pages and found 28 that the RAG chatbot couldn't see at all, because an embedding pipeline was failing without raising any errors. I fixed the pipeline and built a monitoring service that checks coverage on a schedule, so the next gap shows up on its own. Separately, I added correlation ID tracing and failure notifications to a FastAPI AI engine spanning 3 microservices, which cut incident detection from hours to minutes.",
          "The most useful feedback I got came early. A couple of times I told my manager a feature was ready before I had tested it locally, and that slowed the whole review cycle down. I started running a checklist before every handoff and reviewing my own changes more thoroughly before calling anything done. Development and approvals both got faster after that."
        ]
      }
    ]
  },
  {
    id: "lusi",
    group: "experience",
    name: "Lehigh University Space Initiative",
    subtitle: "Campus engineering, space, and robotics club",
    date: "Apr 2024 – Present",
    category: "Robotics",
    roles: [
      {
        title: "President & Head of URC",
        date: "Apr 2026 – Present",
        oneliner: "LUSI had never made it past SAR. I spent the summer figuring out why.",
        story: [
          "When I became President, LUSI had never made it past the System Acceptance Review, the round that qualifies teams for the University Rover Challenge finals. I didn't think the problem was engineering talent. It was organization and recruiting.",
          "So I spent more than 30 hours over the summer meeting with leads, reorganizing club materials, and replanning how we recruit. Our first meeting of the fall drew nearly 55 people, more new members than any year before, and we opened with an interactive scavenger hunt. Around 45 people came to the team workshops that followed, which filled out our subteams and gave us some new leads.",
          "Day to day, I direct engineering progress on the rover through five subteam leads, manage a roughly $10,000 operating budget, and run recruiting and fundraising. It's the same playbook I used as Science Team Lead (documentation, design reviews, and a concrete goal for every meeting), now applied to the whole club."
        ]
      },
      {
        title: "Science Team Lead",
        date: "Apr 2024 – Apr 2026",
        oneliner: "I learned what leadership actually means when no one has to listen to you.",
        story: [
          "This was my first real leadership role, and it taught me things no class has. Managing a volunteer student team means you have no authority in any traditional sense. People are busy during midterms, finals, and everything else, so the project is not always the priority. Without clear direction, even motivated people lose focus, so I learned quickly that my job was to set explicit, concrete goals so each meeting ended with something finished, not just discussed.",
          "I made mistakes early on and learned from them, about setting expectations, following up, and being direct about what needed to get done. What eventually worked was leading by example: thorough Confluence documentation, consistent design reviews, whiteboarding sessions to work through system design as a team, and doing the work myself when it needed to get done.",
          "Most of my own work on the module was mechanical design. In my second year I spent winter break finishing the science module in SolidWorks, and I set up the module's dedicated Raspberry Pi with an Ethernet connection for testing, which made it much easier for the team to work on. Within our science software I tested the cameras, the motors, and the custom spectrometer the previous science team had built. The module ended up half the size of the previous year's. It still has room to improve, but it has a strong foundation, and I handed it to the next science lead in April when I became President."
        ],
        media: [
          { type: "youtube", videoId: "Eyu1dI5hLIE", timestamp: 222 }
        ]
      }
    ],
    alts: {
      "Science Module Design 2026.png": "SolidWorks model of the 2026 science module above a red soil test bed",
      "z. last.jpg": "LUSI members standing with the Mars rover on the lawn at a campus club fair"
    }
  },
  {
    id: "bridgeusa",
    group: "experience",
    name: "BridgeUSA at Lehigh",
    subtitle: "Campus chapter of a national nonpartisan dialogue organization",
    date: "Jan 2026 – Present",
    category: "Leadership",
    roles: [
      {
        title: "Founder & President",
        date: "Jan 2026 – Present",
        oneliner: "A politically neutral, moderated space to talk honestly and respectfully with people who disagree with you.",
        story: [
          "I started the process of founding Lehigh's BridgeUSA chapter at the beginning of spring 2026. BridgeUSA is a national, nonpartisan organization, and our chapter exists because Lehigh students didn't have a place to talk honestly about political and social issues with people who disagree with them. Our events are discussions, not debates.",
          "A typical discussion runs about 90 minutes: a short background presentation, small-group rounds with prompts, then the full room together. This fall we've covered the midterms, voting rights, and Flock cameras and AI surveillance, and we hosted an election watch party that paired muted live coverage with structured discussion. We run a post-dialogue survey at every discussion, and we've worked with groups like the Society for Engineering Ethics, Lehigh Votes, and the Lehigh AI Club.",
          "A lot of the work has been the unglamorous kind. We missed the spring registration deadline, and as a trial club we couldn't table, reserve rooms through the usual system, or request university funding, which made marketing hard. Our first discussion drew 8 people because it was early on a Friday and the flyers went up late. I've also worked to keep the club nonpartisan in practice, building a politically mixed board and reaching out to groups across the spectrum. Our best-attended discussion so far drew 12, and we're in the final stage of Student Senate recognition now."
        ]
      }
    ]
  },
  {
    id: "auto-ninjas",
    group: "experience",
    name: "Auto Ninjas",
    subtitle: "Car-leasing startup · New York, NY",
    date: "Jan 2025 – Aug 2025",
    category: "Internship",
    roles: [
      {
        title: "Software Development Engineer Intern",
        date: "May 2025 – Aug 2025",
        oneliner: "I came in knowing the codebase and left having built a production AI backend from scratch.",
        story: [
          "This role came directly out of my spring SDET internship and the full-time summer offer I earned there. By the time summer started I had already spent a semester in the codebase, so I hit the ground running. I expanded the test suite to cover full end-to-end user workflows: logging in as a customer, admin, and salesperson and running through the entire car leasing flow. I also did manual QA, intentionally trying to break things: character limits, malicious inputs, submitting Shakespeare's Hamlet into a single text field.",
          "Beyond the QA work, I built the entire backend for an AI feature, a chatbot and lease summary tool, with another intern handling the frontend. I taught myself Node.js and Express through a YouTube tutorial and figured out the rest as I went. I added prompt injection safeguards, cached lease summaries, integrated it into the production codebase, and organized it with a thorough folder and utility structure.",
          "I also worked in a hybrid environment, going into the office and working directly with the CEO, COO, CTO, and the rest of the team. The flexibility worked because of what I was producing. The output made it easy to navigate."
        ],
        media: [
          { type: "google-slides", slideId: "1qbKqDJMgkqa3WsV2nxYDEJRpUyHu9XppsLYCts3WoV8" }
        ]
      },
      {
        title: "Software Development Engineer in Test Intern",
        date: "Jan 2025 – May 2025",
        oneliner: "I taught myself the tools before I walked in the door, and earned a paid offer by the time I left.",
        story: [
          "This internship came through the LehighWest program: 10 hours a week, fully remote, unpaid, while carrying a full course load. Two weeks before starting I found a Cypress tutorial on YouTube and taught myself the framework during winter break so I could contribute immediately.",
          "I worked directly with the CTO, communicated consistently at the start and end of every shift, and expanded an underdeveloped test suite throughout the semester. By the end of spring the CTO offered me a paid full-time position for that same summer. That offer was the result of the work and clear communication. Nothing else."
        ],
        media: [
          { type: "google-slides", slideId: "1sw7uIZcv4lRHXKLAADc9GEtHPrrb2kpG" }
        ]
      }
    ],
    alts: {
      "Auto_Ninjas_and_interns.jpg": "Auto Ninjas and Lehigh on the Nasdaq tower screen in Times Square"
    }
  },
  {
    id: "global-social-impact",
    group: "experience",
    name: "Lehigh University Office of Creative Inquiry",
    subtitle: "PlasTech Ventures",
    date: "Jan 2024 – Dec 2024",
    category: "Research",
    roles: [
      {
        title: "Global Social Impact Fellow",
        date: "Jan 2024 – Dec 2024",
        oneliner: "A year of research gave me clarity about where I can do the most good.",
        story: [
          "I joined this Lehigh research program as a freshman by applying to three projects I wanted to contribute to. PlasTech Ventures was my top choice: sustainable plastic waste management in the Philippines. I cared about climate change, the project sounded genuinely interesting, and it was a worthwhile cause. Over the course of a year I took a weekly night class on business models and startup design, ran material tests on mixed plastic samples, did data analysis in Python, and spent a summer doing full-time research at Lehigh.",
          "I personally dug through years of accumulated Google Drive files from past teams, organized everything that had been lost to turnover, and focused my own work on the business model side, figuring out whether the thing could actually work financially in the Philippines. During the spring and fall semesters we gave startup-style pitch presentations to industry judges, and I later came back as a judge myself. We also spent two weeks doing fieldwork in the Philippines.",
          "I coauthored a literature review that we published and presented at the IEEE GHTC 2024 conference at Villanova, and I did some of the material testing for a separate paper on the team. I'm glad I did it. What I came away with wasn't cynicism. It was clarity about where my strengths actually are. I'm most effective when I'm building and implementing something concrete, and that realization has shaped everything I've done since."
        ]
      }
    ],
    media: [
      { type: "link", label: "IEEE GHTC 2024: Published Paper", url: "https://ieeexplore.ieee.org/document/10771525" },
      { type: "link", label: "Tensile Tests Data Analysis on GitHub", url: "https://github.com/PlasTech-Ventures/Tensile-Tests-Data-Analysis" },
      { type: "link", label: "PlasTech Ventures: Journey So Far", url: "https://wordpress.lehigh.edu/plastech/journey-so-far/" }
    ],
    alts: {
      "DBIL3997.jpg": "Fellows and judges in front of a welcome banner at a Lehigh startup event",
      "IMG_3980.jpg": "Teams working at round tables during a pitch session",
      "PXL_20240719_194303953.MP.jpg": "Fellows sitting together in an airport terminal on the way to the Philippines",
      "PXL_20240723_023938048.jpg": "PlasTech team posing in a meeting room in the Philippines",
      "c2dcc55d-dc22-41e2-b79b-dc6a34e0fa29.jpg": "PlasTech team with collaborators in the Philippines",
      "gsif.jpg": "Global Social Impact Fellows posing in front of a red curtain"
    }
  },
  {
    id: "wilbur-powerhouse",
    group: "experience",
    name: "Wilbur Powerhouse Makerspace",
    subtitle: "Lehigh University",
    date: "Oct 2023 – Present",
    category: "Work-Study",
    roles: [
      {
        title: "Design Labs Tech Fellow",
        date: "Oct 2023 – Present",
        oneliner: "My home base on campus for building things.",
        story: [
          "I've worked at Wilbur Powerhouse, Lehigh's makerspace, since my freshman year. These days I'm based in its new robotics lab, the same space where LUSI keeps its materials, and a lot of my extracurricular and personal project work happens there.",
          "On my own time I also went to the makerspace's optional training sessions on microcontrollers, waterjet fundamentals, and laser cutter fundamentals, to learn more about the tools than my coursework covered."
        ]
      }
    ]
  }
];




// ---------------------------------
// Projects
// ---------------------------------

const projects: WorkItem[] = [
  {
    id: "simon-game",
    group: "project",
    name: "Simon-Style Memory Game",
    subtitle: "ECE 132 Microcontroller Laboratory",
    date: "Apr 2026",
    category: "Course Project",
    roles: [
      {
        date: "Apr 2026",
        oneliner: "Thin instructions, interesting hardware, and a working demo at the end.",
        story: [
          "This was the final project for my microcontrollers class, built on a TM4C123 microcontroller in C. The course was challenging in a specific way: the instructions often didn't tell you how a peripheral actually behaved, so understanding it meant hands-on testing with oscilloscopes and power supplies rather than relying on documentation.",
          "My group of three met regularly at Wilbur Powerhouse, Lehigh's makerspace, which had the electronics tools we needed. We chose our peripherals deliberately: the joystick and 2D LED matrix were the most interesting options available, so we designed a Simon-style memory game around them. The joystick moved a cursor on the LED matrix, the IR sensor registered guesses, and a servo motor showed the difficulty level.",
          "Most of the software was mine. I set up our project and development environment, designed the nested Moore state machine that runs the game, and built non-blocking timing on SysTick instead of busy-wait delays. I also documented the codebase thoroughly so all three of us could follow how the state machine, the timing, and each peripheral fit together. Along the way I learned how to keep a group moving: being proactive about meeting in different places and at different times so we kept making and tracking progress. We finished with a full live hardware demo, a group report, and an individual reflection. The most valuable part was learning how to figure things out when the instructions don't give you what you need."
        ]
      }
    ],
    alts: {
      "simon (1).png": "Simon game hardware: a TivaC LaunchPad wired to an LED matrix, joystick, IR sensor, and servo",
      "simon (2).png": "Wiring diagram mapping each peripheral to its TivaC GPIO pins"
    }
  },
  {
    id: "the-buzz",
    group: "project",
    name: "The Buzz",
    subtitle: "CSE 216 Software Engineering",
    date: "Aug 2025 – Dec 2025",
    category: "Course Project",
    roles: [
      {
        date: "Aug 2025 – Dec 2025",
        oneliner: "Everyone else was angling for the easy roles. I volunteered for the hard ones.",
        story: [
          "This was a semester-long group project in my software engineering class where a team of four rotated through frontend, backend, admin, and PM roles each phase. Some phases are notoriously harder for certain roles, and people fought over assignments accordingly. I went the other direction.",
          "When the Google OAuth 2.0 phase came around and backend was known to be the hardest role, I volunteered because I had the most relevant experience and knew I was the best person for it. I did the same in other phases. On the backend I designed the full API contract, the database ERD, and the Supabase table structure, and I implemented Google OAuth 2.0 token verification by hand in Java instead of pulling in a library. Separately, I built the admin CLI in Java with complete CRUD operations. I kept communication consistent across the team and stayed organized throughout.",
          "At the end of the semester two of my group members specifically vouched for me when asked who deserved an A. I got one."
        ]
      }
    ],
    media: [
      { type: "link", label: "The Buzz API Contract", url: "https://docs.google.com/spreadsheets/d/1MPgqW0V23wUhav8eVYHLCTgdTvvQs1MmeJqfyd5lToc/edit?usp=sharing" }
    ],
    alts: {
      "buzz (1).png": "The Buzz feed page with posts and comments",
      "buzz (2).png": "The Buzz sign-in page with Google login",
      "the buzz (1).png": "System diagram: web and mobile frontends, Dokku backend, cloud database, and Bitbucket",
      "the buzz (3).png": "Database ERD for users, posts, and likes"
    }
  },
  {
    id: "nourishlu",
    group: "project",
    name: "NourishLU",
    subtitle: "Lehigh Valley Hackathon 2025",
    date: "Oct 2025",
    category: "Hackathon",
    roles: [
      {
        date: "Oct 2025",
        oneliner: "I stayed up all night building something I'd never built before, and it worked.",
        story: [
          "This was a two-day hackathon with a health and wellness theme. After a round of brainstorming with my team we landed on a food and diet web app. I took ownership of the backend and spent most of the night configuring AWS services I hadn't used before: EC2, RDS, PostgreSQL, Nginx, and SSL. The hackathon sponsors provided free AWS credits and encouraged teams to use them, so I figured it out in real time under a deadline.",
          "I also integrated an open source LLM (LLaMA 3.1 through Groq) to generate meal recommendations from user data, while teammates handled the frontend. By morning we had a working full-stack application.",
          "I learned more about infrastructure configuration in those two days than I had in any semester-long class."
        ]
      }
    ],
    media: [
      { type: "link", label: "NourishLU on Devpost", url: "https://devpost.com/software/nourishlu" }
    ],
    alts: {
      "nourish (1).png": "NourishLU dashboard with a daily nutrition summary and a chatbot panel",
      "nourish (2).png": "NourishLU dining services page listing top dining options"
    }
  }
];




// ---------------------------------
// Export
// ---------------------------------

const work: WorkItem[] = [...experience, ...projects];

export default work;